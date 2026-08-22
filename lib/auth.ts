import { type NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// This is a small internal tool (view/manage public-site enquiries), not the
// full multi-tenant inventory-platform, so it deliberately skips a database
// adapter and an invite system: access is a plain email allowlist checked on
// every sign-in. Add/remove admins by editing ADMIN_EMAILS \u2014 no invite flow
// to run first.
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
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      const allowed = getAdminEmails();
      if (allowed.length === 0) {
        // Fail closed: if nobody has been allow-listed yet, nobody gets in \u2014
        // rather than silently letting the first Google account through.
        console.warn('[admin auth] ADMIN_EMAILS is empty \u2014 denying all sign-ins.');
        return false;
      }
      return allowed.includes(user.email.toLowerCase());
    },
    async jwt({ token }) {
      return token;
    },
    async session({ session }) {
      return session;
    },
  },
};
