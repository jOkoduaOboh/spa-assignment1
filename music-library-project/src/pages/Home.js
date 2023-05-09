import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ListItems from '../components/ListItems';
import Recommendations from '../components/HomeSongs';
import Data from '../components/UserData';

export default function Home() {

    console.log("All Songs Data, ", Data.getAllSongs())

    return (
        <main>
            <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
            >
                <Container maxWidth="sm">
                    <Typography
                        component="h1"
                        variant="h2"
                        align="center"
                        color="text.primary"
                        gutterBottom
                    >
                        Welcome
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        With Music Library, you are able to search for new songs, 
                        view albums and artists, and add them to your library <br/>
                    </Typography>
                    <Typography variant="h5" align="center" color="text.secondary" paragraph>
                        Here are some song suggestions for you:
                    </Typography>
                </Container>
            </Box>

            <ListItems type='song' items={Recommendations}/>
        </main>
            /* Footer  Cones After*/ 
    );
}