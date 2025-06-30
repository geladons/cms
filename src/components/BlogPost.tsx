
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, Paper } from '@mui/material';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blog/${slug}`);
        setArticle(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchArticle();
  }, [slug]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {article.title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          By {article.author.name} on {new Date(article.createdAt).toLocaleDateString()}
        </Typography>
        <Paper sx={{ p: 3, mt: 3 }}>
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </Paper>
      </Box>
    </Container>
  );
};

export default BlogPost;
