import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';

import Data from './components/UserData';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Routes>
          <Route path="/" element={<Home data={Data}/>} />
          <Route path="/signup" element={<SignUp data={Data}/>} />
          <Route path="/login" element={<LogIn data={Data}/>} />
        </Routes>
      </Router>
      </header>
    </div>
  );
}

export default App;
