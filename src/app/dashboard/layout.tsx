import { getAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ImpersonationBanner } from '@/components/impersonation-banner';
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
      {originalUser && <ImpersonationBanner currentUser={currentUser} originalUser={originalUser} />}
      <DashboardClientLayout user={currentUser}>
        {children}
      </DashboardClientLayout>
    </div>
  );
}
