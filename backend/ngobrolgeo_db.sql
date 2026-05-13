-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Bulan Mei 2026 pada 14.12
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ngobrolgeo_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `answers`
--

CREATE TABLE `answers` (
  `id` int(11) NOT NULL,
  `respondent_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `answer_value` int(11) NOT NULL CHECK (`answer_value` between 1 and 5),
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `questions`
--

CREATE TABLE `questions` (
  `id` int(11) NOT NULL,
  `variable_id` int(11) NOT NULL,
  `question_text` text NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `questions`
--

INSERT INTO `questions` (`id`, `variable_id`, `question_text`, `is_active`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Saya khawatir proyek geothermal akan mencemari sumber air bersih di sekitar saya.', 1, '2026-05-01 23:38:11', '2026-05-01 23:38:11'),
(2, 1, 'Menurut saya, aktivitas pengeboran geothermal dapat memicu gempa bumi kecil.', 1, '2026-05-01 23:38:11', '2026-05-01 23:38:11'),
(3, 2, 'Saya percaya proyek geothermal akan membuka banyak lapangan pekerjaan baru.', 1, '2026-05-01 23:38:11', '2026-05-01 23:38:11'),
(4, 7, 'Saya sangat mendukung pembangunan pembangkit listrik tenaga panas bumi di daerah saya.', 1, '2026-05-01 23:38:11', '2026-05-01 23:38:11');

-- --------------------------------------------------------

--
-- Struktur dari tabel `respondents`
--

CREATE TABLE `respondents` (
  `id` int(11) NOT NULL,
  `usia` varchar(255) DEFAULT NULL,
  `x1_score` float DEFAULT NULL,
  `x2_score` float DEFAULT NULL,
  `x3_score` float DEFAULT NULL,
  `x4_score` float DEFAULT NULL,
  `y_score` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `edu` varchar(255) DEFAULT NULL,
  `income` varchar(255) DEFAULT NULL,
  `raw_answers` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `respondents`
--

INSERT INTO `respondents` (`id`, `usia`, `x1_score`, `x2_score`, `x3_score`, `x4_score`, `y_score`, `createdAt`, `updatedAt`, `gender`, `edu`, `income`, `raw_answers`) VALUES
(1, '17-25', 5, 5, 5, 5, 5, '2026-05-02 00:27:16', '2026-05-02 00:27:16', 'Laki-laki', 'SD', '<UMK', '{\"X1.1\":5,\"X1.2\":5,\"X1.3\":5,\"X1.4\":5,\"X1.5\":5,\"X2.1\":5,\"X2.2\":5,\"X2.3\":5,\"X2.4\":5,\"X2.5\":5,\"X3.1\":5,\"X3.2\":5,\"X3.3\":5,\"X3.4\":5,\"X3.5\":5,\"X4.1\":5,\"X4.2\":5,\"X4.3\":5,\"X4.4\":5,\"X4.5\":5,\"Y1\":5,\"Y2\":5,\"Y3\":5,\"Y4\":5}'),
(2, '26-35', 5, 5, 5, 5, 5, '2026-05-13 12:03:52', '2026-05-13 12:03:52', 'Laki-laki', 'SD', '<UMK', '{\"X1.1\":5,\"X1.2\":5,\"X1.3\":5,\"X1.4\":5,\"X1.5\":5,\"X2.1\":5,\"X2.2\":5,\"X2.3\":5,\"X2.4\":5,\"X2.5\":5,\"X3.1\":5,\"X3.2\":5,\"X3.3\":5,\"X3.4\":5,\"X3.5\":5,\"X4.1\":5,\"X4.2\":5,\"X4.3\":5,\"X4.4\":5,\"X4.5\":5,\"Y1\":5,\"Y2\":5,\"Y3\":5,\"Y4\":5}');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','researcher') DEFAULT 'admin',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES
(1, 'Admin NgobrolGeo', 'admin@ngobrolgeo.com', 'password123', 'admin', '2026-05-01 23:38:10', '2026-05-01 23:38:10'),
(3, 'Bayu Admin Baru', 'admin2@ngobrolgeo.com', '$2b$10$k1dnhBVLPvSXDEgfgQ235./z5TyTZtCG3f3hlOGsUm3KuLtYTM2oq', 'admin', '2026-05-01 23:50:50', '2026-05-01 23:50:50'),
(4, 'Zova', 'zova@ngobrolgeo.com', '$2b$10$vytYfwBJG3WATqGOu91Rse49hR/aG9b0YWvGemRpIkjETAJfF/CNS', 'admin', '2026-05-01 23:54:17', '2026-05-01 23:54:17'),
(5, 'bayu', 'muhammadbayunp@gmail.com', '$2b$10$cl/X5K9V01CcHaGQomUHNOA1EUK91k.L2UuUqX7F4BQT8oRPQv85G', 'admin', '2026-05-13 12:02:06', '2026-05-13 12:02:06');

-- --------------------------------------------------------

--
-- Struktur dari tabel `variables`
--

CREATE TABLE `variables` (
  `id` int(11) NOT NULL,
  `code` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `variables`
--

INSERT INTO `variables` (`id`, `code`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'X1', 'Persepsi Risiko Lingkungan', 'Pandangan mengenai potensi dampak lingkungan', '2026-05-01 23:38:11', '2026-05-01 23:38:11'),
(2, 'X2', 'Persepsi Manfaat Ekonomi', 'Pandangan mengenai manfaat ekonomi (lapangan kerja, dll)', '2026-05-01 23:38:11', '2026-05-01 23:38:11'),
(3, 'X3', 'Kepercayaan terhadap Pemerintah', 'Tingkat kepercayaan dalam mengatur proyek', '2026-05-01 23:38:11', '2026-05-01 23:38:11'),
(4, 'X4', 'Kepercayaan terhadap Perusahaan', 'Tingkat kepercayaan terhadap entitas proyek', '2026-05-01 23:38:11', '2026-05-01 23:38:11'),
(5, 'X5', 'Pengetahuan Geothermal', 'Tingkat pemahaman konsep energi panas bumi', '2026-05-01 23:38:11', '2026-05-01 23:38:11'),
(6, 'X6', 'Partisipasi Masyarakat', 'Sejauh mana masyarakat dilibatkan', '2026-05-01 23:38:11', '2026-05-01 23:38:11'),
(7, 'Y', 'Penerimaan Sosial', 'Tingkat dukungan masyarakat terhadap proyek geothermal', '2026-05-01 23:38:11', '2026-05-01 23:38:11');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `answers`
--
ALTER TABLE `answers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `respondent_id` (`respondent_id`),
  ADD KEY `question_id` (`question_id`);

--
-- Indeks untuk tabel `questions`
--
ALTER TABLE `questions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `variable_id` (`variable_id`);

--
-- Indeks untuk tabel `respondents`
--
ALTER TABLE `respondents`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `email_16` (`email`),
  ADD UNIQUE KEY `email_17` (`email`),
  ADD UNIQUE KEY `email_18` (`email`);

--
-- Indeks untuk tabel `variables`
--
ALTER TABLE `variables`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `answers`
--
ALTER TABLE `answers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `questions`
--
ALTER TABLE `questions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT untuk tabel `respondents`
--
ALTER TABLE `respondents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `variables`
--
ALTER TABLE `variables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `answers`
--
ALTER TABLE `answers`
  ADD CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`respondent_id`) REFERENCES `respondents` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `questions`
--
ALTER TABLE `questions`
  ADD CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`variable_id`) REFERENCES `variables` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
