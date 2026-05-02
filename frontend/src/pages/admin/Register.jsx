import React, { useState } from 'react';
import { Lock, Mail, User, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react'; // <-- Tambahkan ArrowLeft
import Swal from 'sweetalert2';

export default function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.error && data.error.includes('Validation error')) {
                    throw new Error('Email ini sudah terdaftar. Silakan gunakan email lain.');
                }
                throw new Error(data.message || data.error || 'Gagal mendaftar');
            }

            Swal.fire({
                icon: 'success',
                title: 'Pendaftaran Berhasil!',
                text: 'Selamat datang Admin.',
                confirmButtonColor: '#0d9488',
                confirmButtonText: 'Masuk ke Dashboard'
            });

            setTimeout(() => {
                window.location.href = '/admin/login';
            }, 2000);

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-geo-gray flex items-center justify-center p-6 font-sans relative">

            {/* Tombol Kembali ke Beranda */}
            <button
                onClick={() => window.location.href = '/'}
                className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-gray-500 hover:text-geo-teal font-bold transition-colors"
            >
                <ArrowLeft size={20} /> <span className="hidden md:inline">Kembali ke Beranda</span>
            </button>

            <div className="max-w-md w-full">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-geo-teal text-white mb-4 shadow-lg">
                        <ShieldCheck size={36} />
                    </div>
                    <h1 className="text-3xl font-black text-gray-800">Daftar Admin</h1>
                    <p className="text-gray-500 mt-2">Buat akun untuk akses analitik NgobrolGeo</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-xl shadow-teal-900/5 border border-gray-100">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold mb-6 text-center border border-red-100">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-50 text-green-600 p-4 rounded-xl text-sm font-bold mb-6 text-center border border-green-100">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Nama Lengkap</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <User size={20} />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full bg-gray-50 pl-12 pr-4 py-4 rounded-2xl border-2 border-transparent focus:border-geo-teal focus:bg-white outline-none transition-all"
                                    placeholder="Nama Peneliti"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Peneliti</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full bg-gray-50 pl-12 pr-4 py-4 rounded-2xl border-2 border-transparent focus:border-geo-teal focus:bg-white outline-none transition-all"
                                    placeholder="admin@ngobrolgeo.com"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Kata Sandi</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    minLength="6"
                                    className="w-full bg-gray-50 pl-12 pr-4 py-4 rounded-2xl border-2 border-transparent focus:border-geo-teal focus:bg-white outline-none transition-all"
                                    placeholder="Minimal 6 karakter"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || success !== ''}
                            className="w-full bg-geo-orange hover:bg-geo-orange-dark text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-70 disabled:hover:translate-y-0"
                        >
                            {isLoading ? 'Memproses...' : (
                                <>Daftar Sekarang <ArrowRight size={20} /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <span className="text-sm text-gray-500">Sudah punya akun? </span>
                        <button
                            onClick={() => window.location.href = '/admin/login'}
                            className="text-sm font-bold text-geo-teal hover:underline"
                        >
                            Masuk di sini
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}