export interface User {
  id: string;
  name: string;
  avatar: string;
  steps: {
    daily: number;
    weekly: number;
    total: number;
  };
  dailyGoal: number;
  departmentId: string;
  role?: 'admin' | 'user';
}

export interface Department {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  departmentId: string;
  content: string;
  timestamp: number;
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
  { id: 'babken.egoian@dhs.lacounty.gov', name: 'Babken Egoian', password: 'password123', avatar: 'https://placehold.co/100x100.png', steps: { daily: 8543, weekly: 45210, total: 85430 }, dailyGoal: 10000, departmentId: 'eng', role: 'admin' },
  { id: 'brianna.smith@dhs.lacounty.gov', name: 'Brianna Smith', password: 'password123', avatar: 'https://placehold.co/100x100.png', steps: { daily: 12345, weekly: 61234, total: 123450 }, dailyGoal: 8000, departmentId: 'eng', role: 'user' },
  { id: 'charlie.brown@dhs.lacounty.gov', name: 'Charlie Brown', password: 'password123', avatar: 'https://placehold.co/100x100.png', steps: { daily: 7654, weekly: 38901, total: 76540 }, dailyGoal: 9000, departmentId: 'eng', role: 'user' },

  // Marketing
  { id: 'diana.prince@dhs.lacounty.gov', name: 'Diana Prince', password: 'password123', avatar: 'https://placehold.co/100x100.png', steps: { daily: 15234, weekly: 78901, total: 152340 }, dailyGoal: 12000, departmentId: 'mkt', role: 'user' },
  { id: 'ethan.hunt@dhs.lacounty.gov', name: 'Ethan Hunt', password: 'password123', avatar: 'https://placehold.co/100x100.png', steps: { daily: 6789, weekly: 34567, total: 67890 }, dailyGoal: 7000, departmentId: 'mkt', role: 'user' },
  { id: 'fiona.glenanne@dhs.lacounty.gov', name: 'Fiona Glenanne', password: 'password123', avatar: 'https://placehold.co/100x100.png', steps: { daily: 9876, weekly: 50123, total: 98760 }, dailyGoal: 10000, departmentId: 'mkt', role: 'user' },

  // Sales
  { id: 'george.costanza@dhs.lacounty.gov', name: 'George Costanza', password: 'password123', avatar: 'https://placehold.co/100x100.png', steps: { daily: 18001, weekly: 91234, total: 180010 }, dailyGoal: 15000, departmentId: 'sales', role: 'user' },
  { id: 'hannah.montana@dhs.lacounty.gov', name: 'Hannah Montana', password: 'password123', avatar: 'https://placehold.co/100x100.png', steps: { daily: 2100, weekly: 10500, total: 21000 }, dailyGoal: 5000, departmentId: 'sales', role: 'user' },

  // HR
  { id: 'ian.malcolm@dhs.lacounty.gov', name: 'Ian Malcolm', password: 'password123', avatar: 'https://placehold.co/100x100.png', steps: { daily: 11111, weekly: 55555, total: 111110 }, dailyGoal: 11000, departmentId: 'hr', role: 'user' },
  { id: 'jane.doe@dhs.lacounty.gov', name: 'Jane Doe', password: 'password123', avatar: 'https://placehold.co/100x100.png', steps: { daily: 8888, weekly: 44444, total: 88880 }, dailyGoal: 8000, departmentId: 'hr', role: 'user' },
];

export let messages: Message[] = [
  { id: 'msg1', senderId: 'babken.egoian@dhs.lacounty.gov', senderName: 'Babken Egoian', senderAvatar: 'https://placehold.co/100x100.png', departmentId: 'eng', content: 'Hey Engineering team! How is everyone doing on the step challenge?', timestamp: Date.now() - 1000 * 60 * 60 * 2 },
  { id: 'msg2', senderId: 'brianna.smith@dhs.lacounty.gov', senderName: 'Brianna Smith', senderAvatar: 'https://placehold.co/100x100.png', departmentId: 'eng', content: "Doing great! Just hit my daily goal.", timestamp: Date.now() - 1000 * 60 * 55 },
  { id: 'msg3', senderId: 'charlie.brown@dhs.lacounty.gov', senderName: 'Charlie Brown', senderAvatar: 'https://placehold.co/100x100.png', departmentId: 'eng', content: "Almost there! Need a final push.", timestamp: Date.now() - 1000 * 60 * 30 },
  { id: 'msg4', senderId: 'diana.prince@dhs.lacounty.gov', senderName: 'Diana Prince', senderAvatar: 'https://placehold.co/100x100.png', departmentId: 'mkt', content: 'Marketing team, let\'s rally! We can catch up to Sales!', timestamp: Date.now() - 1000 * 60 * 120 },
  { id: 'msg5', senderId: 'george.costanza@dhs.lacounty.gov', senderName: 'George Costanza', senderAvatar: 'https://placehold.co/100x100.png', departmentId: 'sales', content: 'We are unstoppable!', timestamp: Date.now() - 1000 * 60 * 10 },
];

export const CHALLENGE_TARGET_STEPS = 250000;
