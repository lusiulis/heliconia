import { Request, Response } from 'express';
import { Category } from '../models/category.model';

const getCategories = async (req: Request, res: Response) => {
  const categories = await Category.findAll();
  res.status(200).json({
    categories,
    count: categories.length,
  });
};

const createCategory = async (req: Request, res: Response) => {
  const { name, sectionId } = req.body;
  const savedCategory = await Category.create({ name, sectionId });
  res.status(200).json({
    msg: 'Category saved successfully',
    category: savedCategory,
  });
};

const updateCategory = async (req: Request, res: Response) => {
  const { name, sectionId } = req.body;
  const { id } = req.params;

  const category = await Category.findOne({ where: { id: id } });
  if (!category) return res.status(404).json({ msg: 'Category not found' });

  if (name) category.name = name;
  if (sectionId) category.sectionId = sectionId;
  await category.save();
  res.status(200).json({
    msg: 'Category updated successfully',
    category,
  });
};

const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const category = await Category.findOne({ where: { id: id } });
  if (!category) return res.status(404).json({ msg: 'Category not found' });

  await category.destroy();
  res.status(200).json({
    msg: 'Category deleted successfully',
  });
};

export { getCategories, createCategory, updateCategory, deleteCategory };
