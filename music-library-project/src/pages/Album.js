import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { StyledLink, formatTime } from '../components/utilities';

const Album = () => {
    const album = useParams();
    const [albumData, setAlbumData] = useState("")

    useEffect(() => {
        const getResult = async () => {
            const url = `https://deezerdevs-deezer.p.rapidapi.com/album/${album.id}`;
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
                setAlbumData(result)
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }
        getResult();
    }, [])

    if (albumData === "") {
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
                        alt={albumData.title}
                        src={albumData.cover_big}
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
                            {albumData.record_type.toUpperCase()}
                        </Typography>
                        {albumData.title}
                        <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
                            {albumData.nb_tracks} SONGS
                        </Typography>
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Artist: <StyledLink to={`/artist/${albumData.artist.id}`} contents={albumData.artist.name} />
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Release Date: {albumData.release_date}
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Genre(s): {albumData.genres.data.map((genre) =>
                            <em key={genre.id}>{genre.name}. </em>)}
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Duration: {formatTime(albumData.duration)}
                    </Typography>
                    <Stack
                        sx={{ pt: 1, pb: 4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                        {false && <Button variant="contained">Add to Library</Button>}
                        {true && <Button variant="outlined">Remove from Library</Button>}
                    </Stack>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Songlist:
                    </Typography>
                    <Stack
                        sx={{ pt: 1, pb: 4, px: 3 }}
                        spacing={1}
                        justifyContent="center"
                    >
                        {albumData.tracks.data.map((track) =>
                            <Stack
                                key={track.id}
                                direction="row"
                                justifyContent="space-between"
                                alignItems="baseline"
                            >
                                <Typography variant="h6" align="center" color="text.secondary" paragraph>
                                    <StyledLink to={`/song/${track.id}`} contents={track.title_short} />
                                </Typography>
                                {false && <Button variant="contained">Add to Library</Button>}
                                {true && <Button variant="outlined">Remove</Button>}
                            </Stack>
                        )}
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

export default Album;