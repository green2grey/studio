"use client";

import type { User, Department } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Users, User as UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface LeaderboardsProps {
  departments: (Department & { totalSteps: number, members: User[] })[];
  allUsers: User[];
  currentUser: User;
}

const DepartmentLeaderboard = ({ departments }: { departments: LeaderboardsProps['departments'] }) => (
  <div className="space-y-3">
    {departments.map((dept, index) => (
      <Card key={dept.id} className="p-4 flex items-center gap-4 transition-all hover:border-primary/50 hover:shadow-md">
        <span className="text-xl font-bold font-headline w-8 text-center text-primary">{index + 1}</span>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <p className="font-semibold font-headline text-lg">{dept.name}</p>
            <p className="font-bold text-primary">{dept.totalSteps.toLocaleString()} steps</p>
          </div>
          <p className="text-sm text-muted-foreground">{dept.members.length} members</p>
        </div>
      </Card>
    ))}
  </div>
);

const UserLeaderboard = ({ department, allUsers, currentUser }: { department?: LeaderboardsProps['departments'][0], allUsers: User[], currentUser: User }) => {
  if (!department) {
    return <p>Your department could not be found.</p>;
  }
  const members = allUsers.filter(u => u.departmentId === department.id);
  members.sort((a, b) => b.steps - a.steps);

  return (
    <div className="space-y-3">
      {members.map((member, index) => (
        <Card key={member.id} className={`p-3 flex items-center gap-4 transition-all hover:shadow-md ${member.id === currentUser.id ? 'border-primary' : ''}`}>
          <span className="text-lg font-bold w-6 text-center">{index + 1}</span>
          <Avatar>
            <AvatarImage src={member.avatar} alt={member.name} data-ai-hint="profile person" />
            <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold">{member.name}</p>
            <p className="text-sm text-muted-foreground">{member.steps.toLocaleString()} steps</p>
          </div>
          {index < 3 && <Award className={`w-6 h-6 ${index === 0 ? 'text-yellow-500' : index === 1 ? 'text-slate-400' : 'text-amber-700'}`} />}
        </Card>
      ))}
    </div>
  );
}

export function Leaderboards({ departments, allUsers, currentUser }: LeaderboardsProps) {
  const currentUserDept = departments.find(d => d.id === currentUser.departmentId);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2"><Award className="text-primary"/> Leaderboards</CardTitle>
        <CardDescription>See how you and your department stack up against the competition.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="department">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="department"><Users className="mr-2 h-4 w-4" />Departments</TabsTrigger>
            <TabsTrigger value="user"><UserIcon className="mr-2 h-4 w-4" />My Department</TabsTrigger>
          </TabsList>
          <TabsContent value="department" className="mt-4">
            <DepartmentLeaderboard departments={departments} />
          </TabsContent>
          <TabsContent value="user" className="mt-4">
            <UserLeaderboard department={currentUserDept} allUsers={allUsers} currentUser={currentUser} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
