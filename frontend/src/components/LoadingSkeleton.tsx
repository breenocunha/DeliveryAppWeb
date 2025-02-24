import React from 'react';
import { Skeleton, Container, Grid } from '@mui/material';

const LoadingSkeleton: React.FC = () => (
  <Container>
    <Grid container spacing={3}>
      {[1,2,3,4,5,6].map(i => (
        <Grid item xs={12} sm={6} md={4} key={i}>
          <Skeleton variant="rectangular" height={240} />
          <Skeleton width="60%" height={32} sx={{ mt: 2 }} />
          <Skeleton width="80%" height={20} sx={{ mt: 1 }} />
        </Grid>
      ))}
    </Grid>
  </Container>
);

export default LoadingSkeleton; 