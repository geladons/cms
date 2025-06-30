
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Grid, Card, CardContent, CardActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Team = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/public/team');
        setTeam(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTeam();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mt: 4 }}>
        Our Team
      </Typography>
      <Grid container spacing={4}>
        {team.map((member: any) => (
          <Grid item key={member._id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {member.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {member.bio}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/team/${member._id}`}>
                  View Profile
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Team;
