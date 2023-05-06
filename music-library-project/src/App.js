import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import HomeBar from './pages/HomeBar';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';

function App() {
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
