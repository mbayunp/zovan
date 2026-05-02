import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import Pages
import Home from './pages/Home';
import Tentang from './pages/Tentang';
import Survey from './pages/Survey';
import Statistik from './pages/Statistik';
import Kontak from './pages/Kontak';
import Login from './pages/admin/Login';
import Register from './pages/admin/Register';
import Dashboard from './pages/admin/Dashboard';

// 1. Buat komponen Layout khusus untuk area publik
const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-geoGray flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow">
        <Outlet /> {/* Di sinilah Home, Survey, dll akan dirender */}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>

        {/* =========================================
            RUTE PUBLIK (Menggunakan Navbar & Footer)
            ========================================= */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/statistik" element={<Statistik />} />
          <Route path="/kontak" element={<Kontak />} />
        </Route>

        {/* =========================================
            RUTE ADMIN (Tanpa Navbar & Footer utama)
            ========================================= */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />

      </Routes>
    </Router>
  );
}

export default App;