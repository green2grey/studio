'use client';

import type { User } from '@/lib/data';
import { AppHeader } from '@/components/app-header';
import { departments } from '@/lib/data';
import { ChatWidget } from '@/components/chat-widget';
import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // States for controlling the chat widget from other components
  const [isChatOpen, setChatOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<'department' | 'support'>('department');
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getCurrentUser();
        if (!fetchedUser) {
          redirect('/login');
        } else {
          setUser(fetchedUser);
        }
      } catch (e) {
        redirect('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Or a proper skeleton loader
  }
  
  if (!user) {
    // This should theoretically not be reached due to the redirect, but it's good practice
    return null;
  }

  const currentUserDept = departments.find(d => d.id === user.departmentId);

  const openSupportChat = () => {
    setActiveChat('support');
    setChatOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <AppHeader user={user} onContactSupportClick={openSupportChat} />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        {children}
      </main>
      {currentUserDept && (
        <ChatWidget
          user={user}
          department={currentUserDept}
          isOpen={isChatOpen}
          onOpenChange={setChatOpen}
          activeChat={activeChat}
          setActiveChat={setActiveChat}
        />
      )}
    </div>
  );
}
