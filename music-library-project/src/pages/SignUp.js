import React, { useState } from 'react';
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

import Data from '../components/UserData';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();
const textSX = {
    input: { color: 'white' },
    borderColor: 'white',
    "& .MuiInputLabel-root": { color: 'white' }, //styles the label
    "& .MuiOutlinedInput-root": { "& > fieldset": { borderColor: "white" } },
    "& .MuiOutlinedInput-root:hover": { "& > fieldset": { borderColor: "white" } }
}

export default function SignUp() {
    const navigate = useNavigate();

    let allUsers = Data.getAllUsers();
    let enteredInfo;

    const [inputError, setInputError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    console.log("Allusers00: ", allUsers)

    if (allUsers === null) {
        allUsers = {}
    }
    console.log(allUsers)

    console.log(Data.getUserAlbums())

    const handleSubmit = (event) => {
        event.preventDefault();
        const userInfo = new FormData(event.currentTarget);
        if (userInfo.get('firstName') === "" || userInfo.get('lastName') === "" ||
            userInfo.get('username') === "" || userInfo.get('password') === "") {
            console.log("Here")
            setErrorMessage("Please enter all required fields");
            setInputError(true);
        } else {
            console.log("All: ", allUsers[userInfo.get('username')])
            if (allUsers[userInfo.get('username')] === undefined) {
                setInputError(false);
                enteredInfo = Data.createUser(
                    userInfo.get('firstName'),
                    userInfo.get('lastName'),
                    userInfo.get('username'),
                    userInfo.get('password')
                )
                console.log("All + user: ", allUsers)
                console.log("Info: ", enteredInfo)
                console.log("UNAME: ", enteredInfo.username)

                Data.saveUserInfoLocally(enteredInfo)
                console.log("Data Users: ", Data.getAllUsers())
                Data.setUserInfo(enteredInfo)
                Data.setLoggedIn(true);
                if(Data.getLoggedIn() === true){
                    navigate("/")
                }                
            } else {
                setErrorMessage("This username is already in use");
                setInputError(true);
            }
        }

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs" sx={{ mb: 5 }}>
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
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    sx={textSX}
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    sx={textSX}
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    sx={textSX}
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    sx={textSX}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                />
                            </Grid>
                        </Grid>
                        {inputError &&
                            <Typography color={'#E55B5B'}>
                                {errorMessage}
                            </Typography>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    Already have an account? Log in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}