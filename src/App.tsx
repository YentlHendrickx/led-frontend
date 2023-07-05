import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Styles
import './App.css'

// Components
import Navigation from './components/Navigation';

// Pages
import Home from './pages/Home';
import Effects from './pages/Effects';
import Colors from './pages/Colors';
import Info from './pages/Info';

function App() {
  return (
    <div className='w-screen h-screen bg-secondary text-primary-text'>
      <Router>
        <Navigation />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/effects" element={<Effects />} />
            <Route path="/colors" element={<Colors />} />
            <Route path="/info" element={<Info />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
