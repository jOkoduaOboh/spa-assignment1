import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Data from '../components/UserData';
import ListItems from '../components/ListItems';

const Library = () => {
    const navigate = useNavigate()
    const userData = Data.getUserInfo();

    console.log(userData)

    useEffect(() => {
        if (Data.getLoggedIn() === false) {
            navigate("/");
        }
    }, )

    return (
        <>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 1,
                    px: 10
                }}
            >
                <Container maxWidth="sm" sx={{ pt: 3 }}>
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        {userData.firstName.toUpperCase()} {userData.lastName.toUpperCase()}
                    </Typography>
                    <Typography variant="h4" align="center" color="text.secondary" paragraph>
                        Welcome to your Library. <br /> <br />
                        Here lies all your saved Songs, Albums, and Artists
                    </Typography>
                    <Stack
                        sx={{
                            pt: 1,
                            pb: 4
                        }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                    </Stack>
                </Container>
            </Box>
            {Data.getUserSongs() !== null &&
                <>
                    <Container sx={{ pt: 2 }} maxWidth="sm">
                        <Typography variant="h4" align="center" color="white">
                            Songs:
                        </Typography>
                    </Container>
                    <ListItems type='song' items={Object.values(Data.getUserSongs())} />
                </>
            }
            {Data.getUserAlbums() !== null && JSON.stringify(Data.getUserAlbums()) !== '{}' &&
                <>
                    <Container sx={{ pt: 1 }} maxWidth="sm">
                        <Typography variant="h4" align="center" color="white">
                            Albums:
                        </Typography>
                    </Container>
                    <ListItems type='album' items={Object.values(Data.getUserAlbums())} />
                </>
            }
            {Data.getUserArtists() !== null && JSON.stringify(Data.getUserArtists()) !== '{}' &&
                <>
                    <Container sx={{ pt: 1 }} maxWidth="sm">
                        <Typography variant="h4" align="center" color="white">
                            Artists:
                        </Typography>
                    </Container>
                    <ListItems type='artist' items={Object.values(Data.getUserArtists())} />
                </>
            }
        </>
    )
}

export default Library;