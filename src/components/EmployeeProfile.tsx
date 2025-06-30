
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Box, Paper, List, ListItem, ListItemText, Rating, Divider } from '@mui/material';

const EmployeeProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/public/team/${id}`);
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const averageRating = profile.reviews.reduce((acc: number, review: any) => acc + review.rating, 0) / profile.reviews.length;

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {profile.employee.name}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {profile.employee.bio}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={averageRating} precision={0.5} readOnly />
          <Typography sx={{ ml: 1 }}>({profile.reviews.length} reviews)</Typography>
        </Box>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h5" component="h2" gutterBottom>
          Client Reviews
        </Typography>
        <Paper>
          <List>
            {profile.reviews.map((review: any) => (
              <ListItem key={review._id}>
                <ListItemText
                  primary={<Rating value={review.rating} readOnly />}
                  secondary={`${review.comment} - ${review.client.name}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default EmployeeProfile;
