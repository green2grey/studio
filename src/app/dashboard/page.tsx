import { MyStats } from '@/components/my-stats';
import { Leaderboards } from '@/components/leaderboards';
import { 
  departments as initialDepts, 
  users as initialUsers,
  CHALLENGE_TARGET_STEPS 
} from '@/lib/data';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { DepartmentChat } from '@/components/department-chat';


export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect('/login');
  }
  
  const departmentsWithMembers = initialDepts.map(dept => {
    const members = initialUsers.filter(u => u.departmentId === dept.id);
    const totalSteps = members.reduce((sum, member) => sum + member.steps.total, 0);
    return { ...dept, totalSteps, members };
  });

  departmentsWithMembers.sort((a, b) => b.totalSteps - a.totalSteps);

  const currentUserDept = departmentsWithMembers.find(d => d.id === currentUser.departmentId)!;

  const currentUserWithDept = {
    ...currentUser,
    department: currentUserDept,
    departmentRank: departmentsWithMembers.findIndex(d => d.id === currentUser.departmentId) + 1,
    departmentTotalSteps: currentUserDept.totalSteps,
    challengeTargetSteps: CHALLENGE_TARGET_STEPS,
  };

  return (
    <div className="space-y-8">
      <MyStats user={currentUserWithDept} />
      <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
        <Leaderboards departments={departmentsWithMembers} currentUser={currentUser} />
        <DepartmentChat department={currentUserDept} currentUser={currentUser} />
      </div>
    </div>
  );
}
