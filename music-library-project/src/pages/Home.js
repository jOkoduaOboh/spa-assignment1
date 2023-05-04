import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import NavigationBar from '../components/NavigationBar';
import PlayArea from '../components/PlayArea';
import Footer from '../components/Footer';
import ListItems from '../components/ListItems';
import Data from '../components/UserData';

const theme = createTheme();

export default function Home() {

  console.log(Data.getUserAlbums())

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavigationBar/>
      <main>
        {/* Hero unit */}
        <PlayArea/>
        <ListItems/>
      </main>
      {/* Footer */}
        <Footer/>
    </ThemeProvider>
  );
}