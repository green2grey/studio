'use client';

import type { User, SupportThread } from '@/lib/data';
import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserManagement } from '@/components/user-management';
import { SupportTickets } from '@/components/support-tickets';

type UserWithDept = User & { departmentName: string };

interface AdminDashboardProps {
  users: UserWithDept[];
  supportThreads: SupportThread[];
  adminUser: User;
}

export function AdminDashboard({
  users: initialUsers,
  supportThreads: initialThreads,
  adminUser,
}: AdminDashboardProps) {
  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const onUserDeleted = (userId: string) => {
    setUsers((currentUsers) => currentUsers.filter((u) => u.id !== userId));
  };
  
  return (
    <Tabs defaultValue="users" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="users">User Management</TabsTrigger>
        <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
      </TabsList>
      <TabsContent value="users" className="mt-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Total Steps</TableHead>
                <TableHead className="w-[80px]">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <UserManagement users={users} onUserDeleted={onUserDeleted} adminUser={adminUser} />
            </TableBody>
          </Table>
        </div>
      </TabsContent>
      <TabsContent value="tickets" className="mt-4">
        <SupportTickets initialThreads={initialThreads} />
      </TabsContent>
    </Tabs>
  );
}
