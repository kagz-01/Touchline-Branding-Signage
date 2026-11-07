import { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Admin email allowlist
function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

const hasGoogleConfig = Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'development-secret-change-me',
  providers: hasGoogleConfig
    ? [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
      ]
    : [],
  session: { strategy: 'jwt' },
  pages: {
    // Client portal login (admin login stays at /admin/login)
    signIn: '/client-dashboard/login',
    error:  '/client-dashboard/login',
  },
  callbacks: {
    // Allow ALL Google sign-ins (both admins and clients)
    async signIn() {
      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const admins = getAdminEmails();
        token.isAdmin = admins.includes(user.email.toLowerCase());
        token.role = token.isAdmin ? 'admin' : 'client';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).isAdmin = token.isAdmin ?? false;
        (session.user as any).role = token.role ?? 'client';
      }
      return session;
    },
  },
};

// Helper to check if a session belongs to an admin
export function isAdmin(session: any): boolean {
  return session?.user?.isAdmin === true;
}
