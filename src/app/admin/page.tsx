import { redirect } from 'next/navigation';

export default function AdminPage() {
  // This page is protected by middleware
  // If user reaches here, they're authenticated, so redirect to dashboard
  redirect('/admin/dashboard');
}
