import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Copyright() {
    return (
      <Typography variant="body2" color="white" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          MUI
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const Footer = () => {
    return (
        <Box component="footer">
            <Typography
                variant="subtitle1"
                align="center"
                color="white"
                component="p"
            >
                Happy Searching!
            </Typography>
            <Copyright />
        </Box>
    )
}

export default Footer;