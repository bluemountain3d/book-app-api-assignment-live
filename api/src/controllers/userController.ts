import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.ts';
import { RegisterUserBody } from '../types/user.ts';

// Funktion för att registrera användare
export const registerUser = async (req: Request<{}, {}, RegisterUserBody>, res: Response) => {
  try {
    const { username, password, is_admin } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      is_admin,
    });

    await newUser.save();

    return res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    return res.status(500).json({ message: 'Error registering user', error: (error as Error).message });
  }
};

// Funktion för att logga in en användare
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    return res.status(500).json({ message: 'Error logging in user', error });
  }
};