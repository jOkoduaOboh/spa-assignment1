import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import HomeBar from './pages/HomeBar';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Data from './components/UserData';

function App() {
  // Saves Data locally before closing the webpage
  window.onbeforeunload = () => {
    console.log("Saving Data Locally...")
    if(Data.getLoggedIn() === true){
      // save user info
      const user = Data.getUserInfo();
      Data.saveUserInfoLocally(user);

      // save user albums
      const albums = Data.getUserAlbums();
      if(albums !== null)
        Data.saveUserAlbumsLocally(albums);

      // save user songs
      const songs = Data.getUserSongs();
      if(songs !== null)
        Data.saveUserSongsLocally(songs);

      // save user artists
      const artists = Data.getUserArtists();
      if(artists !== null)
        Data.saveUserArtistsLocally(artists);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Routes>
          <Route path="*" element={<HomeBar />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Router>
      </header>
    </div>
  );
}

export default App;
