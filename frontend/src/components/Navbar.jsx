import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Import icon untuk hamburger
import logoImg from '../assets/images/logo2.jpeg';

export default function Navbar() {
  // State untuk melacak apakah menu mobile terbuka atau tertutup
  const [isOpen, setIsOpen] = useState(false);

  // Fungsi untuk menutup menu saat link diklik (di versi mobile)
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-geo-teal text-white shadow-md relative z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold text-geo-orange flex items-center gap-3" onClick={closeMenu}>
          <img 
            src={logoImg} 
            alt="Logo NgobrolGeo" 
            className="h-10 w-auto rounded-full bg-white object-cover" 
          />
          <span className="hidden sm:block">NgobrolGeo</span>
        </Link>

        {/* --- TAMPILAN DESKTOP --- */}
        <div className="hidden md:flex items-center space-x-8 font-medium">
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-geo-orange transition-colors">Beranda</Link>
            <Link to="/tentang" className="hover:text-geo-orange transition-colors">Tentang</Link>
            <Link to="/statistik" className="hover:text-geo-orange transition-colors">Statistik</Link>
            <Link to="/kontak" className="hover:text-geo-orange transition-colors">Kontak</Link>
          </div>
          
          {/* Tombol CTA Desktop */}
          <Link 
            to="/survey" 
            className="bg-geo-orange hover:bg-geo-orange-dark text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Isi Survei
          </Link>
        </div>

        {/* --- TAMPILAN MOBILE (TOMBOL HAMBURGER) --- */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-white hover:text-geo-orange transition-colors focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- MENU DROPDOWN MOBILE --- */}
      {/* Akan muncul di bawah navbar utama jika isOpen === true */}
      {isOpen && (
        <div className="md:hidden bg-teal-800 shadow-inner absolute w-full left-0 top-full">
          <div className="flex flex-col px-6 py-6 space-y-4 text-center font-medium border-t border-teal-700">
            <Link to="/" onClick={closeMenu} className="hover:text-geo-orange transition-colors py-2">Beranda</Link>
            <Link to="/tentang" onClick={closeMenu} className="hover:text-geo-orange transition-colors py-2">Tentang</Link>
            <Link to="/statistik" onClick={closeMenu} className="hover:text-geo-orange transition-colors py-2">Statistik</Link>
            <Link to="/kontak" onClick={closeMenu} className="hover:text-geo-orange transition-colors py-2">Kontak</Link>
            
            {/* Tombol CTA Mobile */}
            <Link 
              to="/survey" 
              onClick={closeMenu}
              className="bg-geo-orange hover:bg-geo-orange-dark text-white px-5 py-3 rounded-xl font-bold transition-colors mt-4 shadow-md inline-block"
            >
              Isi Survei Sekarang
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}