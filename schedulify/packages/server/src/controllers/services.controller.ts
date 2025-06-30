
import { Request, Response } from 'express';
import Service from '../../models/service.model';

// --- Admin Controllers ---
export const createService = async (req: Request, res: Response) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const updateService = async (req: Request, res: Response) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// --- Public Controller ---
export const getActiveServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find({ isActive: true });
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
