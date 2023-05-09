import * as React from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Item from './Item';
import { useState } from 'react';
import Data from './UserData';

const getStoredData = (type) => {
    switch (type) {
        case 'song':
            console.log("Stored Data, ", Data.getUserSongs())
            return Data.getUserSongs() === null ? {} : Data.getUserSongs();
        case 'album':
            return Data.getUserAlbums() === null ? {} : Data.getUserAlbums();
        case 'artist':
            return Data.getUserArtists() === null ? {} : Data.getUserArtists();
        default:
    }
}

const ListItems = ({ type, items }) => {
    console.log("Items are here? ", items)
    const cards = items
    const [libraryData, setLibraryData] = useState(getStoredData(type));

    const addData = (data) => {
        console.log("Adding Data")
        let newData = libraryData
        newData[data.id] = data
        setLibraryData(newData)
        switch (type) {
            case 'song':
                Data.setUserSongs(libraryData)
                break;
            case 'album':
                Data.setUserAlbums(libraryData)
                break;
            case 'artist':
                Data.setUserArtists(libraryData)
                break;
            default:
        }
        console.log("Data in List Library, ", libraryData)
    }

    const removeData = (data) => {
        console.log("Removing Data")
        let newData = libraryData
        delete newData[data.id]
        setLibraryData(newData)
        switch (type) {
            case 'song':
                Data.setUserSongs(libraryData)
                break;
            case 'album':
                Data.setUserAlbums(libraryData)
                break;
            case 'artist':
                Data.setUserArtists(libraryData)
                break;
            default:
        }
        console.log("Data in List Library, ", libraryData)
    }
    return (
        <Container sx={{ py: 3 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
                {cards.map((card) => (
                    <Item
                        key={card.id}
                        data={card}
                        type={type}
                        list={libraryData}
                        addData={addData}
                        removeData={removeData}
                    />
                ))
                }
            </Grid>
        </Container>
    )
}

export default ListItems;

