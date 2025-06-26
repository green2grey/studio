import { MyStats } from '@/components/my-stats';
import { Leaderboards } from '@/components/leaderboards';
import { 
  departments as initialDepts, 
  users as initialUsers,
  CHALLENGE_TARGET_STEPS 
} from '@/lib/data';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';


export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/login');
  }
  
  const departmentSteps = initialDepts.map(dept => {
    const members = initialUsers.filter(u => u.departmentId === dept.id);
    const totalSteps = members.reduce((sum, member) => sum + member.steps, 0);
    return { ...dept, totalSteps, members };
  });

  departmentSteps.sort((a, b) => b.totalSteps - a.totalSteps);

  const currentUserWithDept = {
    ...currentUser,
    department: initialDepts.find(d => d.id === currentUser.departmentId)!,
    departmentRank: departmentSteps.findIndex(d => d.id === currentUser.departmentId) + 1,
    departmentTotalSteps: departmentSteps.find(d => d.id === currentUser.departmentId)!.totalSteps,
    challengeTargetSteps: CHALLENGE_TARGET_STEPS,
  };

  return (
    <div className="space-y-8">
      <MyStats user={currentUserWithDept} />
      <Leaderboards departments={departmentSteps} allUsers={initialUsers} currentUser={currentUser} />
    </div>
  );
}
