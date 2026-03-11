import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Pages
import Home from './pages/Home';
import Tentang from './pages/Tentang';
// import Survey from './pages/Survey';
import Statistik from './pages/Statistik';
import Kontak from './pages/Kontak';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-geoGray flex flex-col font-sans">
        {/* Navbar akan selalu muncul di setiap halaman */}
        <Navbar />

        {/* Area Konten Dinamis */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tentang" element={<Tentang />} />
            {/* <Route path="/survey" element={<Survey />} /> */}
            <Route path="/statistik" element={<Statistik />} />
            <Route path="/kontak" element={<Kontak />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;