'use server';

import { getPersonalizedMotivation, PersonalizedMotivationInput } from '@/ai/flows/personalized-motivation';
import { users as usersDB, pendingVerifications, User } from '@/lib/data';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';

let users = usersDB;

export async function getMotivationAction(input: PersonalizedMotivationInput) {
    try {
        const motivation = await getPersonalizedMotivation(input);
        return { success: true, data: motivation };
    } catch (error) {
        console.error('Error fetching personalized motivation:', error);
        return { success: false, error: 'Failed to get personalized motivation. Please try again later.' };
    }
}

// Mock sign-up action
export async function signupAction(prevState: unknown, data: FormData) {
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const password = data.get('password') as string;
    const departmentId = data.get('departmentId') as string;

    if (!name || !email || !password || !departmentId) {
        return { success: false, error: 'All fields are required.' };
    }

    if (!email.endsWith('@dhs.lacounty.gov')) {
        return { success: false, error: 'Only @dhs.lacounty.gov emails are allowed.' };
    }

    if (users.some(user => user.id === email)) {
        return { success: false, error: 'User with this email already exists.' };
    }

    // In a real app, you would use a secure random code generator
    const code = '123456'; // Mock verification code
    console.log(`Verification code for ${email}: ${code}`);

    pendingVerifications.set(email, {
        code,
        user: { name, avatar: `https://placehold.co/100x100.png`, steps: 0, dailyGoal: 10000, departmentId, password, role: 'user' },
        timestamp: Date.now(),
    });

    return { success: true };
}

// Mock email verification action
export async function verifyEmailAction(prevState: unknown, data: FormData) {
    const email = data.get('email') as string;
    const code = data.get('code') as string;

    if (!email || !code) {
        return { success: false, error: 'Email and code are required.' };
    }
    
    const pending = pendingVerifications.get(email);

    if (!pending || pending.code !== code) {
        return { success: false, error: 'Invalid verification code.' };
    }
    
    // Optional: Check if verification code has expired
    // const fiveMinutes = 5 * 60 * 1000;
    // if (Date.now() - pending.timestamp > fiveMinutes) {
    //     pendingVerifications.delete(email);
    //     return { success: false, error: 'Verification code expired.' };
    // }

    users.push({ ...pending.user, id: email });
    pendingVerifications.delete(email);

    return { success: true };
}

// Mock login action
export async function loginAction(prevState: unknown, data: FormData) {
    const email = data.get('email') as string;
    const password = data.get('password') as string;

    if (!email || !password) {
        return { success: false, error: 'Email and password are required.' };
    }

    const user = users.find(u => u.id === email);

    if (!user || user.password !== password) {
        return { success: false, error: 'Invalid email or password.' };
    }

    cookies().set('auth_token', user.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });

    return { success: true };
}

export async function logoutAction() {
    cookies().delete('auth_token');
    redirect('/login');
}

// Admin Actions
export async function deleteUserAction(userId: string) {
    const adminUser = await getCurrentUser();
    if (adminUser?.role !== 'admin') {
        return { success: false, error: 'Unauthorized action.' };
    }
    if (adminUser.id === userId) {
        return { success: false, error: "Admins cannot delete their own account." };
    }
    
    const initialLength = users.length;
    users = users.filter(u => u.id !== userId);

    if (users.length === initialLength) {
        return { success: false, error: "User not found." };
    }

    return { success: true };
}

export async function resetPasswordAction(userId: string) {
    const adminUser = await getCurrentUser();
    if (adminUser?.role !== 'admin') {
        return { success: false, error: 'Unauthorized action.' };
    }

    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
        return { success: false, error: 'User not found.' };
    }
    
    const newPassword = 'password123'; // Reset to a default password
    users[userIndex].password = newPassword;

    console.log(`Password for user ${userId} has been reset to "${newPassword}"`);

    return { success: true, message: `Password reset successfully to "${newPassword}".` };
}
