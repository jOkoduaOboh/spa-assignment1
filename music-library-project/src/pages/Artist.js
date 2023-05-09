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

const Artist = () => {
    const artist = useParams();
    const [artistData, setArtistData] = useState("")
    const [isInLibrary, setIsInLibrary] = useState(true)
    const loggedIn = Data.getLoggedIn()

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
        getResult();
    }, [])
    useEffect(() => {
        if (loggedIn === true) {
            if (Data.getUserArtists() === null || Data.getUserArtists()[artist.id] === undefined) {
                setIsInLibrary(false)
            }
        }
    }, [])

    const handleButtonClick = (type) => {
        console.log(type)
        let newData;
        switch (type) {
            case 'Add':
                console.log("Data to add: ", artistData)
                newData = Data.getUserArtists() === null ? {} : Data.getUserArtists();
                newData[artistData.id] = artistData
                Data.setUserArtists(newData)
                setIsInLibrary(!isInLibrary)
                break;
            case 'Remove':
                newData = Data.getUserArtists()
                delete newData[artistData.id]
                Data.setUserArtists(newData)
                console.log(newData)
                setIsInLibrary(!isInLibrary)
                break;
            default:
        }
    }

    if (artistData === "") {
        return (
            <>
                <main>
                    Loading...
                    <Box
                        sx={{
                            pt: '25vh',
                            pb: '25vh',
                        }}
                    />
                </main>
            </>
        );
    }


    return (
        <>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 1,
                }}
            >
                <Container maxWidth="sm">
                    <Box
                        component="img"
                        sx={{
                            pt: 2,
                            width: "100%",
                        }}
                        alt={artistData.name}
                        src={artistData.picture_big}
                    />
                </Container>
                <Container maxWidth="sm" sx={{ pt: 3 }}>
                    <Typography
                        component="h1"
                        variant="h3"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        <Typography variant="h6" align="center" color="text.secondary" paragraph>
                            ARTIST
                        </Typography>
                        {artistData.name}
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
                        {loggedIn && !isInLibrary &&
                            <Button variant="contained" onClick={() => handleButtonClick("Add")}>
                                Add to Library
                            </Button>}
                        {loggedIn && isInLibrary &&
                            <Button variant="outlined" onClick={() => handleButtonClick("Remove")}>
                                Remove from Library
                            </Button>}
                    </Stack>
                </Container>
            </Box>

            <Container sx={{ py: 8 }} maxWidth="sm">
                {/* End hero unit */}
                <Grid container spacing={4}>
                </Grid>
            </Container>
        </>

    )
}

export default Artist;