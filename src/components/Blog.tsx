
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/blog');
        setArticles(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchArticles();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mt: 4 }}>
        Blog
      </Typography>
      <Grid container spacing={4}>
        {articles.map((article: any) => (
          <Grid item key={article._id} xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  By {article.author.name} on {new Date(article.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/blog/${article.slug}`}>
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Blog;
