import { Request, Response } from 'express';
import { Kitchen } from '../models/kitchen.model';
import { Product } from '../models/product.model';

const getKitchens = async (req: Request, res: Response) => {
  const kitchens = await Kitchen.findAll();
  res.status(200).json({
    kitchens,
    count: kitchens.length,
  });
};

const getKitchen = async (req: Request, res: Response) => {
  const { id } = req.params;

  const kitchen = await Kitchen.findOne({
    where: { id },
    include: [{ model: Product, where: { deleted: false }, required: false }],
  });
  if (!kitchen) return res.status(404).json({ msg: 'Kitchen not found' });

  res.status(200).json(kitchen);
};

const createKitchen = async (req: Request, res: Response) => {
  const { name } = req.body;
  const savedKitchen = await Kitchen.create({ name });
  res.status(200).json({
    msg: 'Kitchen saved successfully',
    kitchen: savedKitchen,
  });
};

const updateKitchen = async (req: Request, res: Response) => {
  const { name } = req.body;
  const { id } = req.params;

  const kitchen = await Kitchen.findOne({ where: { id } });
  if (!kitchen) return res.status(404).json({ msg: 'Kitchen not found' });

  kitchen.name = name;
  await kitchen.save();
  res.status(200).json({
    msg: 'Kitchen updated successfully',
    kitchen,
  });
};

const deleteKitchen = async (req: Request, res: Response) => {
  const { id } = req.params;

  const kitchen = await Kitchen.findOne({ where: { id } });
  if (!kitchen) return res.status(404).json({ msg: 'Kitchen not found' });

  await kitchen.destroy();
  res.status(200).json({
    msg: 'Kitchen deleted successfully',
  });
};

export { getKitchens, createKitchen, updateKitchen, deleteKitchen, getKitchen };
