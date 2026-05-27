import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';

export async function listUsers(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ users: users.map((user) => user.toJSON()) });
  } catch (error) {
    next(error);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { name, role, department, status } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ code: 'USER_NOT_FOUND', message: 'User not found.' });
      return;
    }

    if (role && !['Admin', 'General User'].includes(role)) {
      res.status(400).json({ code: 'INVALID_ROLE', message: 'Role must be Admin or General User.' });
      return;
    }

    if (status && !['Active', 'Inactive'].includes(status)) {
      res.status(400).json({ code: 'INVALID_STATUS', message: 'Status must be Active or Inactive.' });
      return;
    }

    if (name) user.name = name;
    if (role) user.role = role;
    if (department !== undefined) user.department = department;
    if (status) user.status = status;

    await user.save();
    res.json({ user: user.toJSON() });
  } catch (error) {
    next(error);
  }
}
