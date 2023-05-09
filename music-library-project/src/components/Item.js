import React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Data from './UserData';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StyledLink } from './utilities';

const Item = ({ data, type, addData, removeData }) => {
    const navigate = useNavigate()

    const loggedIn = Data.getLoggedIn()
    const [isInLibrary, setIsInLibrary] = useState(true)
    const [coverImage, setCoverImage] = useState()

    useEffect(() => {
        if (loggedIn === true) {
            if (type === 'song') {
                if (Data.getUserSongs() === null || Data.getUserSongs()[data.id] === undefined) {
                    setIsInLibrary(false)
                }
                setCoverImage(data.album.cover_big)
            } else if (type === 'album') {
                if (Data.getUserAlbums() === null || Data.getUserAlbums()[data.id] === undefined) {
                    setIsInLibrary(false)
                }
                setCoverImage(data.cover_big)
            } else {
                if (Data.getUserArtists() === null || Data.getUserArtists()[data.id] === undefined) {
                    setIsInLibrary(false)
                }
                setCoverImage(data.picture_big)
            }
        } else {
            setCoverImage(data.album.cover_big)
        }
    }, [])

    const handleButtonClick = (e) => {
        console.log(e.target.value)
        switch (e.target.value) {
            case 'View':
                navigate(`/${type}/${data.id}`)
                break;
            case 'Add':
                console.log("Data ", data)
                addData(data)
                setIsInLibrary(!isInLibrary)
                break;
            case 'Remove':
                removeData(data)
                setIsInLibrary(!isInLibrary)
                break;
            default:
        }
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="img"
                    sx={{
                        // 16:9
                        pt: '2.25%',
                    }}
                    image={coverImage}
                    alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                        {type === 'song' && data.title_short}
                        {type === 'album' && data.title}
                        {type === 'artist' && data.name}
                    </Typography>
                    {type !== 'artist' &&
                        <Typography>
                            Artist: <StyledLink to={`/artist/${data.artist.id}`} contents={data.artist.name} />
                        </Typography>
                    }
                    {type === 'song' &&
                        <Typography>
                            Album: <StyledLink to={`/album/${data.album.id}`} contents={data.album.title} />
                        </Typography>
                    }

                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleButtonClick} value="View">View</Button>
                    {loggedIn && !isInLibrary &&
                        <Button size="small" onClick={handleButtonClick} value="Add">Add</Button>}
                    {loggedIn && isInLibrary &&
                        <Button size="small" onClick={handleButtonClick} value="Remove">Remove</Button>}
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Item;