import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Player from '../components/Player';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { StyledLink } from '../components/utilities';
import Data from '../components/UserData';

const Song = () => {
    const song = useParams();
    const [songData, setSongData] = useState("")
    const [isInLibrary, setIsInLibrary] = useState(true)
    const loggedIn = Data.getLoggedIn()

    useEffect(() => {
        const getResult = async () => {
            const url = `https://deezerdevs-deezer.p.rapidapi.com/track/${song.id}`;
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
                setSongData(result)
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }
        getResult();
    }, [])

    useEffect(() => {
        if (loggedIn === true) {
            if (Data.getUserSongs() === null || Data.getUserSongs()[song.id] === undefined) {
                setIsInLibrary(false)
            }
        }
    }, [])

    const handleButtonClick = (type) => {
        console.log(type)
        let newData;
        switch (type) {
            case 'Add':
                console.log("Data to add: ", songData)
                newData = Data.getUserSongs() === null? {} : Data.getUserSongs();
                newData[songData.id] = songData
                Data.setUserSongs(newData)
                setIsInLibrary(!isInLibrary)
                break;
            case 'Remove':
                newData = Data.getUserSongs()
                delete newData[songData.id]
                Data.setUserSongs(newData)
                setIsInLibrary(!isInLibrary)
                break;
            default:
        }
    }

    if (songData === "") {
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
                        alt={songData.title}
                        src={songData.album.cover_big}
                    />
                    <Player src={songData.preview} />
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
                            SONG
                        </Typography>
                        {songData.title}
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Artist: <StyledLink to={`/artist/${songData.artist.id}`} contents={songData.artist.name} />
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Album: <StyledLink to={`/album/${songData.album.id}`} contents={songData.album.title} />
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Release Date: {songData.release_date}
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Rank: {songData.rank}
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
                            <Button variant="contained" onClick={() => { handleButtonClick('Add') }}>
                                Add to Library
                            </Button>}
                        {loggedIn && isInLibrary &&
                            <Button variant="outlined" onClick={() => { handleButtonClick("Remove") }}>
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

export default Song;