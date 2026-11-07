import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function SignInButton() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  // optional auto-redirect if already signed in
  useEffect(() => {
    if (session) {
      // you could redirect to dashboard here if desired
    }
  }, [session]);

  if (loading) return <button disabled className="btn" aria-label="Loading">Loading…</button>;

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm">{session.user?.name}</span>
        <button onClick={() => signOut()} className="btn btn-primary">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <button onClick={() => signIn("google")} className="btn btn-primary">
      Sign in with Google
    </button>
  );
}

