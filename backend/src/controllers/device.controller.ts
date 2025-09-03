import { Request, Response } from 'express';
import { Device } from '../models/device.model';
import jwt from 'jsonwebtoken';
import {
  compareEncyrpt,
  encrypt,
  jwt_refresh_secret,
  jwt_secret,
} from '../utils/encryptation';

const accessDevice = async (req: Request, res: Response) => {
  const { id, secret } = req.body;
  const device = await Device.findOne({ where: { id } });
  if (!device) return res.status(404).json({ message: 'No device found' });

  try {
    const isValid = await compareEncyrpt(secret, device.secret);
    if (!isValid)
      return res.status(401).json({ message: 'Bad device creedentials' });

    const payload: LoggedDevice = {
      id: device.id,
      role: device.role,
      kitchenId: device.kitchenId,
    };

    const token = jwt.sign(payload, jwt_secret, { expiresIn: '2h' });
    const refresh_token = jwt.sign(payload, jwt_refresh_secret, {
      expiresIn: '7d',
    });
    const tokenName =
      device.role === 'KITCHEN'
        ? `kitchen_${device.id}`
        : device.role === 'WAITER'
        ? 'waiter'
        : 'checkout';

    res.cookie(`${tokenName}_token`, token, {
      httpOnly: true,
      sameSite: 'strict',
    });
    res.cookie(`${tokenName}_refresh_token`, refresh_token, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/devices/refresh',
    });
    res
      .status(200)
      .json({ message: 'Device login successfully', device: payload });
  } catch (e) {
    res.status(500).json({ message: 'Error with password encryptation' });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const { role, kitchenId } = req.body;
    const tokenName =
      role === 'KITCHEN'
        ? `kitchen_${kitchenId}`
        : role === 'WAITER'
        ? 'waiter'
        : 'checkout';
    const refreshToken = req.cookies[`${tokenName}_refresh_token`];
    if (!refreshToken)
      return res.status(401).json({ message: 'No refresh token' });

    const payload = jwt.verify(refreshToken, jwt_refresh_secret) as any;
    const { exp, iat, ...rest } = payload;

    const newAccessToken = jwt.sign(rest, jwt_secret, { expiresIn: '2h' });
    const newRefreshToken = jwt.sign(rest, jwt_refresh_secret, {
      expiresIn: '7d',
    });

    res.cookie(`${tokenName}_token`, newAccessToken, {
      httpOnly: true,
      sameSite: 'strict',
    });
    res.cookie(`${tokenName}_refresh_token`, newRefreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/devices/refresh',
    });
    res
      .status(200)
      .json({ message: 'Device login successfully', device: rest });
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

const getDevices = async (req: Request, res: Response) => {
  const devices = await Device.findAll({ where: { deleted: false } });
  res.status(200).json({
    devices,
    count: devices.length,
  });
};

const getDeletedDevices = async (req: Request, res: Response) => {
  const devices = await Device.findAll({ where: { deleted: true } });
  res.status(200).json({
    devices,
    count: devices.length,
  });
};

const registerDevice = async (req: Request, res: Response) => {
  const { secret, name, role, kitchenId } = req.body;
  const savedDevice = await Device.create({
    secret: await encrypt(secret),
    name,
    role,
    kitchenId,
    deleted: false,
  });
  res.status(200).json({
    msg: 'Device saved successfully',
    device: savedDevice,
  });
};

const updateDevice = async (req: Request, res: Response) => {
  const { secret, name, role, kitchenId } = req.body;
  const { id } = req.params;

  const device = await Device.findOne({ where: { id } });
  if (!device) return res.status(404).json({ msg: 'No device found' });

  if (secret) device.secret = await encrypt(secret);
  if (name) device.name = name;
  if (role) device.role = role;
  if (kitchenId) device.kitchenId = kitchenId;

  await device.save();
  res.status(200).json({
    msg: 'Device updated successfully',
    device,
  });
};

export {
  accessDevice,
  refreshToken,
  registerDevice,
  updateDevice,
  getDevices,
  getDeletedDevices,
};
