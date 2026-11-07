import RequestDetail from '@/components/client-dashboard/RequestDetail';

export const metadata = { title: 'Request Detail — Client Dashboard' };

export default function RequestDetailPage({ params }: { params: { id: string } }) {
  return <RequestDetail id={params.id} />;
}

