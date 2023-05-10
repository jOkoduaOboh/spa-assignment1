import './App.css';

import { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import Song from './pages/Song';
import Album from './pages/Album';
import Artist from './pages/Artist';
import Library from './pages/Library';

import Data from './components/UserData';
import NavigationBar from './components/NavigationBar';
import Footer from './components/Footer';

const theme = createTheme();

function App() {
  const [refresh, setRefresh] = useState(true)

  const handleRefresh = () => {
    setRefresh(!refresh)
  }

  // Saves Data locally before closing the webpage
  window.onbeforeunload = () => {
    if (Data.getLoggedIn() === true) {
      console.log("Saving Data Locally...")
      // save user info
      const user = Data.getUserInfo();
      Data.saveUserInfoLocally(user);

      // save user albums
      const albums = Data.getUserAlbums();
      if (albums !== null)
        Data.saveUserAlbumsLocally(albums);

      // save user songs
      const songs = Data.getUserSongs();
      if (songs !== null)
        Data.saveUserSongsLocally(songs);

      // save user artists
      const artists = Data.getUserArtists();
      if (artists !== null)
        Data.saveUserArtistsLocally(artists);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <NavigationBar handleRefresh={handleRefresh} />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<LogIn />} />
              <Route exact path="/:input" element={<Home />} />
              <Route exact path="/search/:entry" element={<SearchResults />} />
              <Route exact path="/song/:id" element={<Song />} />
              <Route exact path="/album/:id" element={<Album />} />
              <Route exact path="/artist/:id" element={<Artist />} />
              <Route exact path="/library" element={<Library />} />
              <Route exact path="/library/:input" element={<Library />} />
            </Routes>
            <Footer />
          </Router>
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
