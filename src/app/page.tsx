"use client";

import { useState } from 'react';
import { AppHeader } from '@/components/app-header';
import { MyStats } from '@/components/my-stats';
import { Leaderboards } from '@/components/leaderboards';
import { 
  departments as initialDepts, 
  users as initialUsers, 
  currentUser as initialCurrentUser, 
  CHALLENGE_TARGET_STEPS 
} from '@/lib/data';
import type { User, Department } from '@/lib/data';
import { useToast } from "@/hooks/use-toast"

export default function Home() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const { toast } = useToast()

  const handleAddSteps = (newSteps: number) => {
    setUsers(currentUsers => {
      return currentUsers.map(user => 
        user.id === initialCurrentUser.id ? { ...user, steps: user.steps + newSteps } : user
      );
    });
    toast({
      title: "Steps Added!",
      description: `You've added ${newSteps.toLocaleString()} steps. Keep it up!`,
    })
  };

  const currentUser = users.find(u => u.id === initialCurrentUser.id)!;
  
  const departmentSteps = initialDepts.map(dept => {
    const members = users.filter(u => u.departmentId === dept.id);
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
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader user={currentUserWithDept} onAddSteps={handleAddSteps} />
      <main className="flex-1 container mx-auto p-4 md:p-8 space-y-8">
        <MyStats user={currentUserWithDept} />
        <Leaderboards departments={departmentSteps} allUsers={users} currentUser={currentUser} />
      </main>
    </div>
  );
}
