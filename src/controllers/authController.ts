import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { UserCreateInput, UserUpdateInput } from '../types';
import { AuthRequest } from '../middleware/authMiddleware';

export const signup = async (req: Request, res: Response) => {
  try {
    const userData: UserCreateInput = req.body;
    const user = await authService.signup(userData);
    res.status(201).json(user);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(401).json({ error: message });
  }
};

export const logout = async (req: AuthRequest, res: Response) => {
  try {
    await authService.logout(req.user!.id);
    res.json({ message: 'Logged out successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: message });
  }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await authService.getProfile(req.user!.id);
    res.json(user);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: message });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userData: UserUpdateInput = req.body;
    const user = await authService.updateProfile(req.user!.id, userData);
    res.json(user);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: message });
  }
};

export const deleteProfile = async (req: AuthRequest, res: Response) => {
  try {
    await authService.deleteProfile(req.user!.id);
    res.json({ message: 'Profile deleted successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(400).json({ error: message });
  }
};