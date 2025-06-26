import { getAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { DevSwitchBanner } from '@/components/dev-switch-banner';
import { DashboardClientLayout } from '@/components/dashboard-client-layout';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, originalUser } = await getAuth();

  if (!currentUser) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col min-h-screen">
      {originalUser && <DevSwitchBanner adminUser={originalUser} />}
      <DashboardClientLayout user={currentUser} originalUser={originalUser}>
        {children}
      </DashboardClientLayout>
    </div>
  );
}
