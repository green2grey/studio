import { AdminDashboard } from '@/components/admin-dashboard';
import { getCurrentUser } from '@/lib/auth';
import { departments, users } from '@/lib/data';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const currentUser = await getCurrentUser();

  if (currentUser?.role !== 'admin') {
    redirect('/dashboard');
  }

  // Combine users with department names for easy display
  const allUsersWithDept = users.map((u) => ({
    ...u,
    departmentName:
      departments.find((d) => d.id === u.departmentId)?.name || 'N/A',
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage users and application data.
        </p>
      </div>
      <AdminDashboard users={allUsersWithDept} />
    </div>
  );
}
