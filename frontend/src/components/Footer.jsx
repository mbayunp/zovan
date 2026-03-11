import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-geo-teal text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Desc */}
          <div>
            <h2 className="text-2xl font-bold text-geo-orange mb-4 flex items-center gap-2">
              🌍 NgobrolGeo
            </h2>
            <p className="text-gray-200 text-sm leading-relaxed">
              NgobrolGeo adalah platform survei penelitian akademik yang bertujuan untuk memahami persepsi masyarakat terhadap energi panas bumi di Indonesia.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-geo-orange">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              <li><Link to="/" className="hover:text-white transition">Beranda</Link></li>
              <li><Link to="/tentang" className="hover:text-white transition">Tentang Penelitian</Link></li>
              <li><Link to="/survey" className="hover:text-white transition">Survei</Link></li>
              <li><Link to="/statistik" className="hover:text-white transition">Statistik</Link></li>
              <li><Link to="/kontak" className="hover:text-white transition">Kontak</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-geo-orange">Hubungi Peneliti</h3>
            <div className="space-y-3 text-sm text-gray-200">
              <p className="flex items-center gap-2">
                <Mail size={16} /> zovannf972@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} /> 085172249702
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-teal-700 pt-6 text-center text-sm text-gray-300">
          <p>© 2026 NgobrolGeo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}