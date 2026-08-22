import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { AdminNav } from "@/components/admin/AdminNav";

// Access is enforced in middleware.ts (redirects to /admin/login without a
// valid session) — this layout just renders the nav when a session exists.
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen">
      {session?.user ? <AdminNav userEmail={session.user.email || ""} /> : null}
      <main className={session?.user ? "max-w-5xl mx-auto px-6 py-8" : ""}>{children}</main>
    </div>
  );
}
