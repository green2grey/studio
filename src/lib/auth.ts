// @/lib/auth.ts
'use server';

import { cookies } from 'next/headers'
import { users } from './data'
import type { User } from './data'

// This has to be a server function to access cookies, so we can't call it
// directly from client components during initial render.
export async function getCurrentUser(): Promise<(User & { password?: string }) | null> {
  const userId = cookies().get('auth_token')?.value
  if (!userId) {
    return null
  }
  // In a real app, you'd fetch this from a database.
  // Here we find the user in our mock data.
  const user = users.find(u => u.id === userId)
  return user || null
}
