import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ClientDashboardShell from '@/components/client-dashboard/Shell';

export const metadata = { title: 'Client Dashboard — Touchline' };

export default async function ClientDashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/client-dashboard/login');

  return (
    <ClientDashboardShell session={session}>
      {children}
    </ClientDashboardShell>
  );
}
