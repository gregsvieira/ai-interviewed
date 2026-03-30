export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: Date;
}

export type UserWithoutPassword = Omit<User, 'passwordHash'>;
