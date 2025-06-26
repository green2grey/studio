import type { User } from '@/lib/data';
import { getCurrentUser } from '@/lib/auth';
import { AppHeader } from '@/components/app-header';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader user={user} />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
