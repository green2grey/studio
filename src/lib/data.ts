export interface User {
  id: string;
  name: string;
  avatar: string;
  steps: number;
  dailyGoal: number;
  departmentId: string;
}

export interface Department {
  id: string;
  name: string;
}

export const departments: Department[] = [
  { id: 'eng', name: 'Engineering' },
  { id: 'mkt', name: 'Marketing' },
  { id: 'sales', name: 'Sales' },
  { id: 'hr', name: 'Human Resources' },
];

export const users: User[] = [
  // Current User
  { id: 'u1', name: 'Alex Williams', avatar: 'https://placehold.co/100x100.png', "data-ai-hint": "profile person", steps: 8543, dailyGoal: 10000, departmentId: 'eng' },

  // Engineering
  { id: 'u2', name: 'Brianna Smith', avatar: 'https://placehold.co/100x100.png', "data-ai-hint": "profile woman", steps: 12345, dailyGoal: 8000, departmentId: 'eng' },
  { id: 'u3', name: 'Charlie Brown', avatar: 'https://placehold.co/100x100.png', "data-ai-hint": "profile man", steps: 7654, dailyGoal: 9000, departmentId: 'eng' },

  // Marketing
  { id: 'u4', name: 'Diana Prince', avatar: 'https://placehold.co/100x100.png', "data-ai-hint": "professional woman", steps: 15234, dailyGoal: 12000, departmentId: 'mkt' },
  { id: 'u5', name: 'Ethan Hunt', avatar: 'https://placehold.co/100x100.png', "data-ai-hint": "professional man", steps: 6789, dailyGoal: 7000, departmentId: 'mkt' },
  { id: 'u6', name: 'Fiona Glenanne', avatar: 'https://placehold.co/100x100.png', "data-ai-hint": "smiling woman", steps: 9876, dailyGoal: 10000, departmentId: 'mkt' },

  // Sales
  { id: 'u7', name: 'George Costanza', avatar: 'https://placehold.co/100x100.png', "data-ai-hint": "man portrait", steps: 18001, dailyGoal: 15000, departmentId: 'sales' },
  { id: 'u8', name: 'Hannah Montana', avatar: 'https://placehold.co/100x100.png', "data-ai-hint": "woman portrait", steps: 2100, dailyGoal: 5000, departmentId: 'sales' },

  // HR
  { id: 'u9', name: 'Ian Malcolm', avatar: 'https://placehold.co/100x100.png', "data-ai-hint": "happy person", steps: 11111, dailyGoal: 11000, departmentId: 'hr' },
  { id: 'u10', name: 'Jane Doe', avatar: 'https://placehold.co/100x100.png', "data-ai-hint": "person smiling", steps: 8888, dailyGoal: 8000, departmentId: 'hr' },
];

export const currentUser = users[0];

export const CHALLENGE_TARGET_STEPS = 250000;
