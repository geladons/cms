
import { Request, Response } from 'express';
import Service from '../models/service.model';

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

import availabilityService from '../plugins/common/availability.service';
import User from '../models/user.model';

export const getAvailableEmployees = async (req: Request, res: Response) => {
  try {
    const { serviceId, date, startTime } = req.query;
    
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    const bookingDate = new Date(date as string);
    const [startHours, startMinutes] = (startTime as string).split(':').map(Number);
    bookingDate.setHours(startHours, startMinutes);

    const endTime = new Date(bookingDate.getTime() + service.duration * 60000);
    const endTimeString = `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`;

    const employees = await User.find({ role: 'employee' });
    const availableEmployees = [];

    for (const employee of employees) {
      const isAvailable = await availabilityService.isEmployeeAvailable(employee._id, {
        date: bookingDate,
        startTime: startTime as string,
        endTime: endTimeString,
      } as any);

      if (isAvailable) {
        availableEmployees.push(employee);
      }
    }

    res.status(200).json(availableEmployees);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
