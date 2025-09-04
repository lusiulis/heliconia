import { Request, Response } from 'express';
import { Device } from '../models/device.model';
import jwt from 'jsonwebtoken';
import { compareEncyrpt, encrypt, jwt_secret } from '../utils/encryptation';

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

const accessDevice = async (req: Request, res: Response) => {
  const { id, secret } = req.body;
  const device = await Device.findOne({ where: { id } });
  if (!device) return res.status(404).json({ message: 'No device found' });

  const { secret: hashedSecret, ...sanitizedDevice } = device.dataValues;
  try {
    if (!(await compareEncyrpt(secret, hashedSecret))) {
      return res.status(401).json({ message: 'Bad device creedentials' });
    } else {
      const token = jwt.sign(sanitizedDevice, jwt_secret, {expiresIn: '2h'})
    }
  } catch (e) {}
};

const registerDevice = async (req: Request, res: Response) => {
  const { secret, name, role } = req.body;
  const savedDevice = await Device.create({
    secret: await encrypt(secret),
    name,
    role,
    deleted: false,
  });
  res.status(200).json({
    msg: 'Device saved successfully',
    device: savedDevice,
  });
};

const updateDevice = async (req: Request, res: Response) => {
  const { secret, name, role } = req.body;
  const { id } = req.params;

  const device = await Device.findOne({ where: { id } });
  if (!device) return res.status(404).json({ msg: 'No device found' });

  if (secret) device.secret = await encrypt(secret);
  if (name) device.name = name;
  if (role) device.role = role;

  await device.save();
  res.status(200).json({
    msg: 'Device updated successfully',
    device,
  });
};

export {
  accessDevice,
  registerDevice,
  updateDevice,
  getDevices,
  getDeletedDevices,
};
