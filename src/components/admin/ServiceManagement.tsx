
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
  TextField,
  Switch,
  FormControlLabel,
} from '@mui/material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    duration: 60,
    price: 50,
    isActive: true,
  });

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/services', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleOpen = (service: any = null) => {
    setSelectedService(service);
    if (service) {
      setFormData(service);
    } else {
      setFormData({ name: '', description: '', duration: 60, price: 50, isActive: true });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedService(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (selectedService) {
        await axios.put(`http://localhost:5000/api/services/${selectedService._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/services', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchServices();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/services/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchServices();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography component="h1" variant="h5">
            Service Management
          </Typography>
          <Button variant="contained" onClick={() => handleOpen()}>
            Create Service
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Duration (min)</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service: any) => (
                <TableRow key={service._id}>
                  <TableCell>{service.name}</TableCell>
                  <TableCell>{service.duration}</TableCell>
                  <TableCell>${service.price.toFixed(2)}</TableCell>
                  <TableCell>{service.isActive ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpen(service)} sx={{ mr: 1 }}>Edit</Button>
                    <Button onClick={() => handleDelete(service._id)} color="secondary">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography variant="h6">{selectedService ? 'Edit Service' : 'Create Service'}</Typography>
            <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth margin="normal" multiline rows={3} />
            <TextField label="Duration (minutes)" name="duration" type="number" value={formData.duration} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Price" name="price" type="number" value={formData.price} onChange={handleChange} fullWidth margin="normal" />
            <FormControlLabel control={<Switch checked={formData.isActive} onChange={handleChange} name="isActive" />} label="Active" />
            <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>Save</Button>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
};

export default ServiceManagement;
