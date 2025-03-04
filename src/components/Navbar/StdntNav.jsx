import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


export default function StudentNav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" variant='outlined'>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Student
          </Typography>
          <Link to={"/student/login"} style={{ textDecoration: 'none', color: 'white' }}>
          <Button color="primary">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}