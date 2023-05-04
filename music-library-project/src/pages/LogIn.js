import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import Data from '../components/UserData';
import { getUserAlbums, setUserAlbums } from '../components/UserData';

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function LogIn() {
  const navigate = useNavigate();
  const userItemName = "pro-music-lib-users";

  useEffect(() => {
    Data.setUserAlbums({test:"Testing"});
    console.log("Another one")
  })
  

  const [users] = useState(JSON.parse(localStorage.getItem(userItemName)));
  const [incorrectInfo, setIncorrectInfo] = useState(false);


  console.log("Albums from Login: ", Data.getUserAlbums());

  useEffect (() => {
    if(users === null){
      //navigate("/signup")
    }
  }, [])

  

  const handleSubmit = (event) => {
    event.preventDefault();
    setIncorrectInfo(true);
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Log in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              sx={{
                input: { color: 'white' },
                borderColor: 'white',
                "& .MuiInputLabel-root": { color: 'white' }, //styles the label
                "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "white" } },
                "& .MuiOutlinedInput-root:hover": { "& > fieldset": { borderColor: "white" } }
              }}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              sx={{
                input: { color: 'white' },
                borderColor: 'white',
                "& .MuiInputLabel-root": { color: 'white' }, //styles the label
                "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "white" } },
                "& .MuiOutlinedInput-root:hover": { "& > fieldset": { borderColor: "white" } }
              }}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" style ={{color: "white"}}/>}
              label="Remember me"
            />
            {incorrectInfo && <Typography color={'#E55B5B'}>Incorrect email or password</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs/>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}