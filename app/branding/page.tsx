import { redirect } from 'next/navigation';

export default function BrandingRedirectPage() {
  redirect('/?brand=branding');
}
