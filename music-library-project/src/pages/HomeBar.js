import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import SearchResults from './SearchResults';
import Song from './Song';
import Album from './Album';
import Artist from './Artist';
import Library from './Library';
import { useState } from 'react';

const theme = createTheme();

export default function HomeBar() {
  const [refresh, setRefresh] = useState(true)

  const handleRefresh = () => {
    setRefresh(!refresh)
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavigationBar handleRefresh={handleRefresh}/>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/:input" element={<Home />} />
        <Route exact path="/search/:entry" element={<SearchResults />} />
        <Route exact path="/song/:id" element={<Song />} />
        <Route exact path="/album/:id" element={<Album />} />
        <Route exact path="/artist/:id" element={<Artist />} />
        <Route exact path="/library" element={<Library />} />
        <Route exact path="/library/:input" element={<Library />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}