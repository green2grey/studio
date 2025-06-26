'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { DepartmentChat } from '@/components/department-chat';
import { MessageCircle } from 'lucide-react';
import type { User, Department } from '@/lib/data';

interface ChatWidgetProps {
  user: User;
  department: Department;
}

export function ChatWidget({ user, department }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  // In a real app, this would be based on actual unread messages.
  const [hasNewMessages, setHasNewMessages] = useState(true);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setHasNewMessages(false); // Hide notification when chat is opened
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl z-50"
          aria-label="Open chat"
        >
          <MessageCircle className="h-8 w-8" />
          {hasNewMessages && (
            <span className="absolute top-1 right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col" side="right">
        <DepartmentChat department={department} currentUser={user} />
      </SheetContent>
    </Sheet>
  );
}
