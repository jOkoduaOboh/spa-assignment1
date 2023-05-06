import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import Data from '../components/UserData';

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

  let users = Data.getAllUsers();

  const [incorrectInfo, setIncorrectInfo] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

   useEffect(() => {
    console.log("users: ", users)
    if (users === null) {
      navigate("/signup")
    }
    if (Data.getLoggedIn() === true) {
      navigate("/")
    }
   }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = users[data.get('username')];

    if (user === undefined) {
      setErrorMessage("User does not exist")
      setIncorrectInfo(true);
    } else if (user.password !== data.get("password")) {
      setErrorMessage("Incorrect username or password")
      setIncorrectInfo(true);
    } else {
      Data.setUserInfo(user)
      Data.setLoggedIn(true);
      if (Data.getLoggedIn() === true) {
        navigate("/")
      }
    }

    console.log({
      username: data.get('username'),
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
              id="username"
              label="Username"
              name="username"
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
            />
            {incorrectInfo && <Typography color={'#E55B5B'}>{errorMessage}</Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs />
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