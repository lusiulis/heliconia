import { Request, Response } from 'express';
import { User } from '../models/user.model';
import {
  compareEncyrpt,
  encrypt,
  jwt_refresh_secret,
  jwt_secret,
} from '../utils/encryptation';
import jwt from 'jsonwebtoken';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) return res.status(404).json({ message: 'No user found' });

  try {
    const isValid = await compareEncyrpt(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Bad credentials' });

    const payload = {
      id: user.id,
      username: username,
    };

    const token = jwt.sign(payload, jwt_secret, { expiresIn: '2h' });
    const refresh_token = jwt.sign(payload, jwt_refresh_secret, {
      expiresIn: '7d',
    });
    res.cookie('admin_token', token, {
      httpOnly: true,
      sameSite: 'strict',
    });
    res.cookie('admin_refresh_token', refresh_token, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/auth/refresh',
    });
    res.status(200).json({ message: 'Login successfully', user: payload });
  } catch (e) {
    res.status(500).json({ message: 'Error with password encryptation' });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.admin_refresh_token;
    if (!token) return res.status(401).json({ message: 'No refresh token' });

    const payload = jwt.verify(token, jwt_refresh_secret) as any;
    const { exp, iat, ...rest } = payload;

    const newAccessToken = jwt.sign(rest, jwt_secret, { expiresIn: '2h' });
    const newRefreshToken = jwt.sign(rest, jwt_refresh_secret, {
      expiresIn: '7d',
    });

    res.cookie('admin_token', newAccessToken, {
      httpOnly: true,
      sameSite: 'strict',
    });
    res.cookie('admin_refresh_token', newRefreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/auth/refresh',
    });

    res.status(200).json({ message: 'Token refreshed', user: rest });
  } catch (e) {
    console.log(e);
    res.status(403).json({
      success: false,
      status: 403,
      message: 'Invalid refresh token',
      stack: process.env.NODE_ENV === 'development' ? e : {},
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });
  if (!user) return res.status(404).json({ msg: 'No user found' });

  const { username, password } = req.body;
  if (username) user.username = username;
  if (password) user.password = await encrypt(password);

  user.save();
  res.status(200).json({
    msg: 'User updated successfully',
    user,
  });
};

export { login, refreshToken, updateUser };
