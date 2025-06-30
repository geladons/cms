
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
} from '@mui/material';
import { Link } from 'react-router-dom';

const BlogManagement = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/blog/admin', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:5000/api/blog/admin/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchArticles();
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
            Blog Management
          </Typography>
          <Button variant="contained" component={Link} to="/admin/blog/new">
            Create Article
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.map((article: any) => (
                <TableRow key={article._id}>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>{article.author.name}</TableCell>
                  <TableCell>{article.status}</TableCell>
                  <TableCell>
                    <Button component={Link} to={`/admin/blog/${article._id}`} sx={{ mr: 1 }}>Edit</Button>
                    <Button onClick={() => handleDelete(article._id)} color="secondary">Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default BlogManagement;
