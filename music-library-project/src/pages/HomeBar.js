import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import NavigationBar from '../components/NavigationBar';
import { Route, Routes } from 'react-router-dom';

import Home from './Home';
import SearchResults from './SearchResults';

const theme = createTheme();

export default function HomeBar() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavigationBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/search/:entry" element={<SearchResults />} />
      </Routes>
    </ThemeProvider>
  );
}