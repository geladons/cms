
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
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

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<any>(null);
  const [formData, setFormData] = useState({
    code: '',
    discountType: 'percentage',
    value: 10,
    expiryDate: '',
    usageLimit: 1,
    isActive: true,
  });

  const fetchCoupons = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/coupons', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCoupons(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleOpen = (coupon: any = null) => {
    setSelectedCoupon(coupon);
    if (coupon) {
      setFormData({ ...coupon, expiryDate: new Date(coupon.expiryDate).toISOString().split('T')[0] });
    } else {
      setFormData({ code: '', discountType: 'percentage', value: 10, expiryDate: '', usageLimit: 1, isActive: true });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCoupon(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value, checked, type } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name as string]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (selectedCoupon) {
        await axios.put(`http://localhost:5000/api/coupons/${selectedCoupon._id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/coupons', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchCoupons();
      handleClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this coupon?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/coupons/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchCoupons();
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
            Coupon Management
          </Typography>
          <Button variant="contained" onClick={() => handleOpen()}>
            Create Coupon
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Code</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Expiry</TableCell>
                <TableCell>Usage</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coupons.map((coupon: any) => (
                <TableRow key={coupon._id}>
                  <TableCell>{coupon.code}</TableCell>
                  <TableCell>{coupon.discountType}</TableCell>
                  <TableCell>{coupon.discountType === 'percentage' ? `${coupon.value}%` : `$${coupon.value.toFixed(2)}`}</TableCell>
                  <TableCell>{new Date(coupon.expiryDate).toLocaleDateString()}</TableCell>
                  <TableCell>{`${coupon.timesUsed} / ${coupon.usageLimit}`}</TableCell>
                  <TableCell>{coupon.isActive ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpen(coupon)} sx={{ mr: 1 }}>Edit</Button>
                    <Button onClick={() => handleDelete(coupon._id)} color="secondary">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography variant="h6">{selectedCoupon ? 'Edit Coupon' : 'Create Coupon'}</Typography>
            <TextField label="Code" name="code" value={formData.code} onChange={handleChange} fullWidth margin="normal" />
            <FormControl fullWidth margin="normal">
              <InputLabel>Discount Type</InputLabel>
              <Select name="discountType" value={formData.discountType} onChange={handleChange}>
                <MenuItem value="percentage">Percentage</MenuItem>
                <MenuItem value="fixed">Fixed Amount</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Value" name="value" type="number" value={formData.value} onChange={handleChange} fullWidth margin="normal" />
            <TextField label="Expiry Date" name="expiryDate" type="date" value={formData.expiryDate} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
            <TextField label="Usage Limit" name="usageLimit" type="number" value={formData.usageLimit} onChange={handleChange} fullWidth margin="normal" />
            <FormControlLabel control={<Switch checked={formData.isActive} onChange={handleChange} name="isActive" />} label="Active" />
            <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>Save</Button>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
};

export default CouponManagement;
