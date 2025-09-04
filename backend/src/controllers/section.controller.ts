import { Request, Response } from 'express';
import { Section } from '../models/section.model';
import { Category } from '../models/category.model';

const getSections = async (req: Request, res: Response) => {
  const sections = await Section.findAll();
  return res.status(200).json({
    sections,
    count: sections.length,
  });
};

const getSection = async (req: Request, res: Response) => {
  const { id } = req.params;
  const section = await Section.findOne({
    where: { id: id },
    include: [Category],
  });
  if (!section) return res.status(404).json({ msg: 'Section not found' });

  res.status(200).json(section);
};

const createSection = async (req: Request, res: Response) => {
  const { name, color } = req.body;
  const savedSection = await Section.create({
    name,
    color,
  });
  res.status(200).json({
    msg: 'Section saved successfully',
    section: savedSection,
  });
};

const updateSection = async (req: Request, res: Response) => {
  const { name, color } = req.body;
  const { id } = req.params;

  const section = await Section.findOne({ where: { id: id } });
  if (!section) return res.status(404).json({ msg: 'No section found' });

  if (name) section.name = name;
  if (color) section.color = color;
  await section.save();
  res.status(200).json({
    msg: 'Section updated successfully',
    section,
  });
};

const deleteSection = async (req: Request, res: Response) => {
  const { id } = req.params;

  const section = await Section.findOne({ where: { id: id } });
  if (!section) return res.status(404).json({ msg: 'No section found' });

  await section.destroy();
  res.status(200).json({
    msg: 'Section updated successfully',
  });
};

export { createSection, deleteSection, updateSection, getSections, getSection };
