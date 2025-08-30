import { Request, Response } from 'express';
import { Product } from '../models/product.model';

const getProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({ where: { deleted: false } });
  res.status(200).json({
    products,
    count: products.length,
  });
};

const getDeletedProducts = async (req: Request, res: Response) => {
  const products = await Product.findAll({ where: { deleted: true } });
  res.status(200).json({
    products,
    count: products.length,
  });
};

const createProduct = async (req: Request, res: Response) => {
  const { name, description, price, img, hasOptions, kitchenId } = req.body;
  const savedProduct = await Product.create({
    name,
    description,
    price,
    img,
    hasOptions,
    kitchenId,
    deleted: false,
  });
  res.status(200).json({
    msg: 'Product saved successfully',
    product: savedProduct,
  });
};

const updateProduct = async (req: Request, res: Response) => {
  const { name, description, price, img, hasOptions, kitchenId, deleted } =
    req.body;
  const { id } = req.params;

  const product = await Product.findOne({ where: { id } });
  if (!product) return res.status(404).json({ msg: 'No product found' });

  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = price;
  if (img) product.img = img;
  if (hasOptions !== undefined) product.hasOptions = hasOptions;
  if (kitchenId) product.kitchenId = kitchenId;
  if (deleted !== undefined) product.deleted = deleted;

  await product.save();
  res.status(200).json({
    msg: 'Product updated successfully',
    product,
  });
};

export { getProducts, createProduct, updateProduct, getDeletedProducts };
