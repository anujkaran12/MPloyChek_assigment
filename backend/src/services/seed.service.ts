import { User } from '../models/User';

const seedUsers = [
  {
    userId: 'admin@example.com',
    password: 'admin123',
    name: 'Aarav Mehta',
    role: 'Admin' as const,
    department: 'Platform Administration'
  },
  {
    userId: 'user@example.com',
    password: 'user123',
    name: 'Nisha Rao',
    role: 'General User' as const,
    department: 'Customer Operations'
  }
];

export async function seedDefaultUsers(): Promise<void> {
  for (const user of seedUsers) {
    const exists = await User.exists({ userId: user.userId });
    if (!exists) {
      await User.create(user);
    }
  }
}
