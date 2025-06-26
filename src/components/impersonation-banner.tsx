'use client';

import { stopImpersonationAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import type { User } from '@/lib/data';
import { AlertTriangle } from 'lucide-react';

interface ImpersonationBannerProps {
  currentUser: User;
  originalUser: User;
}

export function ImpersonationBanner({ currentUser, originalUser }: ImpersonationBannerProps) {
  return (
    <div className="bg-yellow-500 text-yellow-900 py-2 px-4 text-center text-sm font-semibold flex items-center justify-center gap-4 z-50 relative">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5" />
        <span>
          You ({originalUser.name}) are currently impersonating {currentUser.name}.
        </span>
      </div>
      <form action={stopImpersonationAction}>
        <Button
          type="submit"
          variant="ghost"
          size="sm"
          className="h-auto px-2 py-1 border border-yellow-700/50 hover:bg-yellow-600 hover:text-yellow-900"
        >
          Stop Impersonating
        </Button>
      </form>
    </div>
  );
}
