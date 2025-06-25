import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { UserCreateInput, UserUpdateInput } from '../types';

export const signup = async (userData: UserCreateInput) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  return prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword,
    },
  });
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error('Invalid password');
  }

  return jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
};

export const logout = async (userId: string) => {
  // In a real implementation, you might want to invalidate the token
  // by storing it in a blacklist or using a refresh token system
};

export const getProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true },
  });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const updateProfile = async (userId: string, userData: UserUpdateInput) => {
  const updateData: any = { ...userData };
  if (userData.password) {
    updateData.password = await bcrypt.hash(userData.password, 10);
  }
  return prisma.user.update({
    where: { id: userId },
    data: updateData,
  });
};

export const deleteProfile = async (userId: string) => {
  await prisma.user.delete({ where: { id: userId } });
};