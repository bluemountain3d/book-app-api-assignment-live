import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user.ts';
import { RegisterUserBody } from '../types/user.ts';
import jwt from 'jsonwebtoken';

// Registrera användare
export const registerUser = async (req: Request<{}, {}, RegisterUserBody>, res: Response) => {
  try {
    const { username, password, is_admin } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: 'Username already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, is_admin });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: (error as Error).message });
  }
};

// Logga in användare utan cookies (endast token i svaret)
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    console.log('Försöker logga in med användarnamn:', username);  // Logg för felsökning
    const user = await User.findOne({ username });
    
    if (!user) {
      console.log('Användare ej funnen:', username);  // Logga när användaren inte hittas
      res.status(404).json({ message: 'User was not found' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log('Lösenord matchar inte');  // Logga när lösenordet inte matchar
      res.status(400).json({ message: 'Password or username is incorrect' });
      return;
    }

    const token = jwt.sign(
      { id: user._id, username: user.username, is_admin: user.is_admin },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7 // Expires in 7 days
    })

    const { password: _password, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ token, user: userWithoutPassword });

  } catch (error) {
    console.error('Fel vid inloggning:', error);  // Logga eventuella fel vid inloggning
    res.status(500).json({ message: 'Error logging in user', error });
  }
};

// Logga ut användare
export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie('accessToken')
  res.json({message: 'You are logged out'})
};

// Hämta alla användare
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Hämta användare via ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Uppdatera användare (kräver token)
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
    res.status(404).json({ message: 'User not found' });
    return;
    }
    res.status(200).json({ message: 'User updated', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Radera användare (kräver token)
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
    res.status(404).json({ message: 'User not found' });
    return;
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};