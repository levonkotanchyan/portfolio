import { Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Algorithms from './components/Algorithms';
import LeetCode from './components/LeetCode';
import Footer from './components/Footer';
import AlgorithmPage from './pages/AlgorithmPage';
import './App.css';

function Home() {
  return (
    <>
      <Hero />
      <Algorithms />
      <LeetCode />
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/algorithm/:slug" element={<AlgorithmPage />} />
      </Routes>
    </div>
  );
}

export default App;
