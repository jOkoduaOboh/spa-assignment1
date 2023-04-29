import './App.css';
import NavigationBar from './components/AppBar';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Settings from './pages/Settings';
import Statistics from './pages/Statistics';

function GuessApp() {
  return (
    <div className="App">
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default GuessApp;
