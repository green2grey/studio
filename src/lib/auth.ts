// @/lib/auth.ts
'use server';

import { cookies } from 'next/headers'
import { users } from './data'
import type { User } from './data'
import { unstable_noStore as noStore } from 'next/cache';

export async function getAuth(): Promise<{
  currentUser: (User & { password?: string }) | null;
  originalUser: (User & { password?: string }) | null;
}> {
  noStore();
  const originalUserId = cookies().get('auth_token')?.value
  const impersonatedUserId = cookies().get('impersonation_token')?.value

  if (!originalUserId) {
    return { currentUser: null, originalUser: null }
  }

  const originalUser = users.find(u => u.id === originalUserId)

  if (!originalUser) {
    // Clean up bad cookies
    cookies().delete('auth_token');
    cookies().delete('impersonation_token');
    return { currentUser: null, originalUser: null }
  }

  if (originalUser.role === 'admin' && impersonatedUserId) {
    const impersonatedUser = users.find(u => u.id === impersonatedUserId);
    // Ensure admin cannot impersonate themselves
    if (impersonatedUser && impersonatedUser.id !== originalUser.id) {
      return { currentUser: impersonatedUser, originalUser: originalUser };
    }
  }

  // If not impersonating or impersonation is invalid, ensure the impersonation cookie is cleared.
  if (impersonatedUserId) {
    cookies().delete('impersonation_token');
  }
  
  return { currentUser: originalUser, originalUser: null };
}
