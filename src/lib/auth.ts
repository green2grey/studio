import { cookies } from 'next/headers'
import { users } from './data'
import type { User } from './data'

export async function getCurrentUser(): Promise<(User & { password?: string }) | null> {
  const userId = cookies().get('auth_token')?.value
  if (!userId) {
    return null
  }
  const user = users.find(u => u.id === userId)
  return user || null
}
