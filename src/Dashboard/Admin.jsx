import React from 'react';
import { Container, Grid, Box } from '@mui/material';
import CreateQuestionForm from '../Forms/createQuestion';
import QuestionList from '../components/Admin/QuestionList';


const AdminDashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CreateQuestionForm />
          </Grid>
          <Grid item xs={12}>
            <QuestionList />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
