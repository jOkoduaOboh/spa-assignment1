import AudioPlayer from 'material-ui-audio-player';
import { ThemeProvider, makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material';

const Player = ({ src }) => {
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