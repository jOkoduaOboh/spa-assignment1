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

const Item = ({key, data, type}) => {
    const navigate = useNavigate()

    const loggedIn = Data.getLoggedIn()
    const[likeStatus, setLikeStatus] = useState(true)
    
    useEffect(()=> {
        if (type === 'search'){
            if (loggedIn === true){
                if(Data.getUserSongs() === null){
                    setLikeStatus(false)
                } else if(Data.getUserSongs()[data.id] === undefined){
                    setLikeStatus(false)
                }
            }
        }
    }, [])

    
    

    const handleButtonClick = (e) => {
        console.log(e.target.value)
        switch(e.target.value){
            case 'View':
                navigate(`/song/${data.id}`)
                break;
            case 'Add':
                setLikeStatus(!likeStatus)
                break;
            case 'Remove':
                setLikeStatus(!likeStatus)
                break;
            default:
        }

    }

    return (
        <Grid item key={key} xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="img"
                    sx={{
                        // 16:9
                        pt: '2.25%',
                    }}
                    image={data.album.cover_big}
                    alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                        {data.title_short}
                    </Typography>
                    <Typography>
                        Artist: {data.artist.name}
                    </Typography>
                    <Typography>
                        Album: {data.album.title}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleButtonClick} value="View">View</Button>
                    {loggedIn && !likeStatus && 
                    <Button size="small" onClick={handleButtonClick} value="Add">Add</Button>}
                    {loggedIn && likeStatus && 
                    <Button size="small" onClick={handleButtonClick} value="Remove">Remove</Button>}
                </CardActions>
            </Card>
        </Grid>
    )
}

export default Item;