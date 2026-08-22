import { redirect } from 'next/navigation';

export default function SignageRedirectPage() {
  redirect('/?brand=signage');
}
