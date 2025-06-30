
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'draft',
  });

  useEffect(() => {
    if (id) {
      const fetchArticle = async () => {
        try {
          const token = localStorage.getItem('token');
          const res = await axios.get(`http://localhost:5000/api/blog/admin/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setFormData(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchArticle();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name as string]: value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (id) {
        await axios.put(`http://localhost:5000/api/blog/admin/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:5000/api/blog/admin', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/admin/blog');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          {id ? 'Edit Article' : 'Create Article'}
        </Typography>
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Content (Markdown supported)"
          name="content"
          value={formData.content}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={15}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select name="status" value={formData.status} onChange={handleChange}>
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="published">Published</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
          Save Article
        </Button>
      </Box>
    </Container>
  );
};

export default BlogEditor;
