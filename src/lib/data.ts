export interface User {
  id: string;
  name: string;
  avatar: string;
  steps: number;
  dailyGoal: number;
  departmentId: string;
  role?: 'admin' | 'user';
}

export interface Department {
  id: string;
  name: string;
}

// This is a mock in-memory store for pending verifications.
// In a real app, this would be a database table with an expiration timestamp.
export const pendingVerifications = new Map<string, { code: string; user: Omit<User, 'id'> & { password?: string }, timestamp: number }>();

export const departments: Department[] = [
  { id: 'eng', name: 'Engineering' },
  { id: 'mkt', name: 'Marketing' },
  { id: 'sales', name: 'Sales' },
  { id: 'hr', name: 'Human Resources' },
];

// Note: Passwords are in plain text for this mock.
// In a real app, you should NEVER store plain-text passwords.
export let users: (User & { password?: string })[] = [
  // Engineering - Babken is an Admin
  { id: 'babken.egoian@dhs.lacounty.gov', name: 'Babken Egoian', password: 'password123', avatar: 'https://placehold.co/100x100.png', steps: 8543, dailyGoal: 10000, departmentId: 'eng', role: 'admin' },
  { id: 'brianna.smith@dhs.lacounty.gov', name: 'Brianna Smith', password: 'password123', avatar: 'https://placehold.co/100x100.png', steps: 12345, dailyGoal: 8000, departmentId: 'eng', role: 'user' },
  { id: 'charlie.brown@dhs.lacounty.gov', name: 'Charlie Brown', password: 'password123', avatar: 'https://placehold.co/100x100.png', steps: 7654, dailyGoal: 9000, departmentId: 'eng', role: 'user' },

  // Marketing
  { id: 'diana.prince@dhs.lacounty.gov', name: 'Diana Prince', password: 'password123', avatar: 'https://placehold.co/100x100.png', steps: 15234, dailyGoal: 12000, departmentId: 'mkt', role: 'user' },
  { id: 'ethan.hunt@dhs.lacounty.gov', name: 'Ethan Hunt', password: 'password123', avatar: 'https://placehold.co/100x100.png', steps: 6789, dailyGoal: 7000, departmentId: 'mkt', role: 'user' },
  { id: 'fiona.glenanne@dhs.lacounty.gov', name: 'Fiona Glenanne', password: 'password123', avatar: 'https://placehold.co/100x100.png', steps: 9876, dailyGoal: 10000, departmentId: 'mkt', role: 'user' },

  // Sales
  { id: 'george.costanza@dhs.lacounty.gov', name: 'George Costanza', password: 'password123', avatar: 'https://placehold.co/100x100.png', steps: 18001, dailyGoal: 15000, departmentId: 'sales', role: 'user' },
  { id: 'hannah.montana@dhs.lacounty.gov', name: 'Hannah Montana', password: 'password123', avatar: 'https://placehold.co/100x100.png', steps: 2100, dailyGoal: 5000, departmentId: 'sales', role: 'user' },

  // HR
  { id: 'ian.malcolm@dhs.lacounty.gov', name: 'Ian Malcolm', password: 'password123', avatar: 'https://placehold.co/100x100.png', steps: 11111, dailyGoal: 11000, departmentId: 'hr', role: 'user' },
  { id: 'jane.doe@dhs.lacounty.gov', name: 'Jane Doe', password: 'password123', avatar: 'https://placehold.co/100x100.png', steps: 8888, dailyGoal: 8000, departmentId: 'hr', role: 'user' },
];

export const CHALLENGE_TARGET_STEPS = 250000;
