import bcrypt from 'bcryptjs';
import { Document, Schema, model } from 'mongoose';

export type UserRole = 'Admin' | 'General User';

export interface IUser extends Document {
  userId: string;
  name: string;
  password: string;
  role: UserRole;
  department: string;
  status: 'Active' | 'Inactive';
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    userId: { type: String, required: true, unique: true, trim: true, lowercase: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['Admin', 'General User'], required: true },
    department: { type: String, default: 'Operations', trim: true },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    lastLoginAt: { type: Date }
  },
  { timestamps: true }
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate: string) {
  return bcrypt.compare(candidate, this.password);
};

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    const user = ret as unknown as Record<string, unknown>;

    user['id'] = user['_id'];
    delete user['password'];
    delete user['__v'];
    delete user['_id'];

    return user;
  }
});

export const User = model<IUser>('User', userSchema);
