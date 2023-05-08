import AudioPlayer from 'material-ui-audio-player';
import { ThemeProvider, makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material';

const Player = ({ src }) => {
    //const src = "https://xox.ceoc.cx/api/v1/download?sig=ThWj7Avc938c43SvaLilTlOqO4ymlzzZKg4oQZMPPLMqAmcIMZxx202w8tPrSEZ%2F15GBjHDbyHjEqdcC1hmTJXJfeLJ23J5zheVNqtORy8%2FL1ztd8bV65Tl3mq4SOq%2Byy40hUmEg5YjNBizDTlCGiVHd59Xn4C8TBvTQkhiA%2FKO%2FY9wOMXZj4JQXubhA2VyO5LPYSgaZqHtYBYRtL2X8eONUVSgm1oXbAP0KKQXlDGy9y52Ao8StULda1zkbSCbO9I0Wn%2FFJwOKMLVYp16tIWepaxmTSjpgS7f1Ua6speFZg2q%2B6UutAlmDnGmTqlt3jojDzc1Iqa5DUMqlDuDteAA%3D%3D&v=tZhpPWV9tgM&_=0.37588289296754596";

    const muiTheme = createTheme();

    const useStyles = makeStyles({
        loopIcon: {
            color: '#3f51b5',
            '&.selected': {
                color: '#0921a9'
            },
            '&:hover': {
                color: '#7986cb'
            },
        },
        playIcon: {
            color: '#f50057',
            '&:hover': {
                color: '#ff4081'
            }
        },
        volumeIcon: {
            color: 'rgba(0, 0, 0, 0.54)'
        },
        volumeSlider: {
            color: 'black'
        },
    });

    return (
        <>
            <ThemeProvider theme={muiTheme}>
                <AudioPlayer
                    src={src}
                    useStyles={useStyles}
                    loop={true}
                />
            </ThemeProvider>
        </>
    )
}

export default Player;