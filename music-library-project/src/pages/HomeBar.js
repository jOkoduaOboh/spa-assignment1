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

const theme = createTheme();

export default function HomeBar() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavigationBar />
      <Routes>
        <Route exact path="/:input" element={<Home />} />
        <Route exact path="/search/:entry" element={<SearchResults />} />
        <Route exact path="/song/:id" element={<Song />} />
        <Route exact path="/album/:id" element={<Album />} />
        <Route exact path="/artist/:id" element={<Artist />} />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}