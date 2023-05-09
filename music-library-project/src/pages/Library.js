import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Data from '../components/UserData';
//import ListItems from '../components/ListItems';

const Library = () => {
    const userData = Data.getUserInfo();
    const artist = useParams();
    const [artistData, setArtistData] = useState("")

    console.log(userData)

    useEffect(() => {
        const getResult = async () => {
            const url = `https://deezerdevs-deezer.p.rapidapi.com/artist/${artist.id}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'cc15021543msh4f1f720c4802207p1dee0ejsnea57365bbe43',
                    'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
                }
            };

            try {
                const response = await fetch(url, options);
                const result = await response.json();
                setArtistData(result)
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }
        //getResult();
    }, [])


    return (
        <>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 1,
                }}
            >
                <Container maxWidth="sm" sx={{ pt: 3 }}>
                    <Typography
                        component="h1"
                        variant="h3"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        {userData.firstName.toUpperCase()} {userData.lastName.toUpperCase()}
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Welcome to your Library. <br/>
                        Here lies all your saved Songs, Albums, and Artists
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Albums: {artistData.nb_album}
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Fans: {artistData.nb_fan}
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>

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
                        {false && <Button variant="contained">Add to Library</Button>}
                        {true && <Button variant="outlined">Remove from Library</Button>}
                    </Stack>
                </Container>
            </Box>

            <Container sx={{ py: 8 }} maxWidth="sm">
                {/* End hero unit */}
                <Grid container spacing={4}>
                </Grid>
            </Container>
            {/* <ListItems type='song' items={items}/> */}
        </>

    )
}

export default Library;