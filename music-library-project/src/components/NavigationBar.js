import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { AccountCircle } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import Data from './UserData';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const navItems = ['Home', 'Library'];
let settings = [];

const NavigationBar = () => {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);



    const [anchorElUser, setAnchorElUser] = useState(null);

    useEffect (() => {
        if (Data.getLoggedIn() === true) {
            settings = ['Profile', 'Logout'];
        } else {
            settings = ['Log In', 'Sign Up'];
        }
    }, [Data.getLoggedIn()])


    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleNavClick = (item) => {
        console.log("Here")
        switch (item) {
            case 'Library':
                break;
            case 'Home':
                navigate('/')
                console.log("Clicked")
                break;
            case 'Profile':
                break;
            case 'Logout':
                Data.setLoggedIn(false)
                break;
            case 'Log In':
                navigate('/login')
                break;
            case 'Sign Up':
                navigate('/signup')
                break;
            default:
        }
    }

    const handleKeyUp = (e) => {
        if (e.key === "Enter") {
            console.log(e.target.value)
            if(e.target.value !== "")
                navigate('/search/'+e.target.value)
        }
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Album Layout
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => { handleNavClick(item) }}>
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar component="nav">
                <Toolbar>
                    {/* Menu Drawer */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Website Title */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        Music Library
                    </Typography>

                    {/* Search Bar */}
                    <Box sx={{ flexGrow: 0.6, display: { xs: 'none', sm: 'block' } }} />
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            sx={{ flexGrow: 0.25 }}
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            onKeyUp={(e) => handleKeyUp(e)}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 0.5, display: { xs: 'none', sm: 'block' } }} />

                    {/* Navigation Items */}
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#fff' }} onClick={() => { handleNavClick(item) }}>
                                {item}
                            </Button>
                        ))}
                    </Box>

                    {/* User Login Icon and Menu */}
                    <Box>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenUserMenu}
                            color="inherit"
                            sx={{ position: 'inherit' }}
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right'
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting}
                                    onClick={() => {
                                        handleNavClick(setting)
                                        handleCloseUserMenu()
                                    }}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Drawer Menu */}
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }} // Better open performance on mobile.
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '40%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    display: 'flex',
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(4em)`,
        transition: theme.transitions.create('width'),
        width: '100%',
    },
}));

export default NavigationBar;