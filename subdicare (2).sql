-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 31, 2025 at 03:56 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `subdicare`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` varchar(10) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `email`, `password`) VALUES
('AD001', 'admin1', 'admin1@example.com', '$2y$10$suWQolxsf9Kou1uX5S6mo.WHKg4WOi6QPcrqul8vNyM99aRLsoEAS');

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `date_published` timestamp NOT NULL DEFAULT current_timestamp(),
  `filed_by` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`id`, `title`, `date_published`, `filed_by`, `description`) VALUES
(1, 'test announcement', '2025-01-15 16:16:46', 'AD001', 'testing\n'),
(2, 'testing', '2025-01-31 04:32:13', 'AD001', 'testing announcement\n\ntest'),
(3, 'this is my announcement', '2025-01-31 13:18:42', 'MD009', 'moderator');

-- --------------------------------------------------------

--
-- Table structure for table `members`
--

CREATE TABLE `members` (
  `id` varchar(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `middle_initial` char(1) DEFAULT NULL,
  `address` text NOT NULL,
  `number` varchar(13) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ;

--
-- Dumping data for table `members`
--

INSERT INTO `members` (`id`, `email`, `password`, `first_name`, `last_name`, `middle_initial`, `address`, `number`, `created_at`) VALUES
('SD001', 'testuser@member.com', '$2y$10$CoyoAIlkUyg6e60D34PXSOyY2FvNjGqI7A3HLW0siwvVfjfMo.KB.', 'test', 'user', 'm', 'Block 16, Lot 1, Phase 3, Street Bacuan, Camella', '+639123123123', '2025-01-15 16:06:03'),
('SD002', 'david@member.com', '$2y$10$jjjxhjAySSPdPwON8tJaauCE0vvstuMxvWIoLYND1z9TIc62VHeei', 'david', 'userrrr', 't', 'Block 16, Lot 11, Phase 2, Street Bakauan, Camella', '+639156016444', '2025-01-17 11:54:29'),
('SD003', 'test@member.com', '$2y$10$NOcmRGCaUv2TYjmk16FEduTjPojbr52UgxpEPdDc2wFddavdQSkVy', 'test', 'test', 'o', 'Block 16, Lot 1, Phase 2, Street Malefecient, South Garden', '+639156016444', '2025-01-17 13:27:57'),
('SD004', 'testdavid@member.com', '$2y$10$Cufne6g.ehKZjfr6AiFdSOGIuHRXyrzDaiwPdn0xr.jP6jtWYJPVe', 'David', 'Mendoza', 'T', 'Block 16, Lot 1, Phase 2, Street Bacuawan, South Garden', '+639123123123', '2025-01-17 13:47:46'),
('SD005', 'member@member.com', '$2y$10$AkxlItXbTH/t6S0wFLyoW.LSi2F3qeNaSg5P3zvKDs7c6RTesKg26', 'member', 'member', '', 'Block 16, Lot 1, Phase 2, Street maleficient, South Garden', '+639156016444', '2025-01-17 14:30:03'),
('SD006', 'testv@member.com', '$2y$10$Hc2/CzppFJJnS3vGTtQzlONt7kPMr403NrS8.ofb1LGfLQXdOZv2S', 'viance', 'cruz', 's', 'Block 1, Lot 2, Phase 3rd, Street testing, South Garden', '+639156016444', '2025-01-18 01:29:16'),
('SD007', 'david123@member.com', '$2y$10$et4NE7Fnh.5HGZRwLeFFc.xFhT8exRIZ9nk5rEOeuu3lBIe8dj9I2', 'david', 'member', 'o', 'Block 16, Lot 12, Phase 3rd, Street maleficent, South Garden', '+639156016444', '2025-01-18 01:43:59'),
('SD008', 'miguel12@member.com', '$2y$10$S.4gTN0S6Zip.KF7PKCoSuBuctmKuLYwBT0DDjTZpjh4ya4HiehrG', 'miguel', 'narito', 'u', 'Block 16, Lot 11, Phase 2, Street bakauan, South Garden', '+639569823589', '2025-01-18 01:56:41'),
('SD009', 'carlo@member.com', '$2y$10$Vz8VZksBok0FTTKFBNVTEew7MxENwJCSwy1wrZ0fThG8hVYeh7oAC', 'carlo', 'morallo', 't', 'Block 15, Lot 11, Phase 2, Street bakauan, South Garden', '+639569823589', '2025-01-18 05:57:08');

-- --------------------------------------------------------

--
-- Table structure for table `moderators`
--

CREATE TABLE `moderators` (
  `id` varchar(10) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `status` enum('active','inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `moderators`
--

INSERT INTO `moderators` (`id`, `username`, `email`, `password`, `status`) VALUES
('MD006', 'moderator testing two', 'mod2@mod.com', '$2y$10$bStVQLtyPLBsYRBri15kP.8JrPajjh4rQrd2UbjB4eNB87QWy2qwW', 'inactive'),
('MD009', 'testingg', 'test@moderator.com', '$2y$10$Z0WMgRTzb6FLWMirKAtzKO1gVj/RUgKlrQ1zFignTu45uvDPktv5C', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `priority_level` enum('high','medium','low') NOT NULL DEFAULT 'medium',
  `filed_by` varchar(255) NOT NULL,
  `resident_id` varchar(10) NOT NULL,
  `date_filed` datetime NOT NULL DEFAULT current_timestamp(),
  `description` text NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'Pending',
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reports`
--

INSERT INTO `reports` (`id`, `title`, `priority_level`, `filed_by`, `resident_id`, `date_filed`, `description`, `status`, `image`) VALUES
(13, 'report number 1', 'medium', 'david mendoza', 'SD002', '2025-01-31 04:39:52', 'testubg', 'Deleted', NULL),
(14, 'test', 'high', 'david mendoza', 'SD002', '2025-01-31 07:02:13', 'testing', 'Deleted', NULL),
(15, 'testing', 'high', 'david mendoza', 'SD002', '2025-01-31 07:02:27', 'testing', 'Resolved', NULL),
(16, 'testing', 'low', 'david mendoza', 'SD002', '2025-01-31 07:02:38', 'testingg 12', 'Resolved', NULL),
(17, 'tetingg', 'medium', 'david mendoza', 'SD002', '2025-01-31 07:02:49', 'testing', 'Pending', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `event` varchar(255) NOT NULL,
  `status` enum('pending','approved','rejected','deleted') DEFAULT NULL,
  `description` text NOT NULL,
  `address` varchar(255) NOT NULL,
  `resident_id` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`id`, `name`, `date`, `event`, `status`, `description`, `address`, `resident_id`, `created_at`, `updated_at`) VALUES
(2, 'test wedding', '2020-05-08', 'wedding', 'deleted', 'test', 'Block 16, Lot 1, Phase 3, Street Bacuan, Camella', 'SD001', '2025-01-18 01:16:43', '2025-01-31 05:52:50'),
(3, 'birthday', '2020-05-08', 'birthday', 'deleted', 'chairs', 'Block 16, Lot 11, Phase 2, Street bakauan, South Garden', 'SD008', '2025-01-18 01:59:17', '2025-01-31 05:50:27'),
(4, 'birthday', '2025-01-14', 'party', 'deleted', 'chairs', 'Block 15, Lot 11, Phase 2, Street bakauan, South Garden', 'SD009', '2025-01-18 05:58:59', '2025-01-31 05:50:34'),
(5, 'birthday', '2025-01-31', 'birthday', 'deleted', 'pls help me', 'Block 16, Lot 11, Phase 2, Street Bakauan, Camella', 'SD002', '2025-01-31 03:40:22', '2025-01-31 05:49:14'),
(6, 'request me', '2025-02-01', 'birthday me', 'pending', 'desc1', 'Block 16, Lot 11, Phase 2, Street Bakauan, Camella', 'SD002', '2025-01-31 06:03:11', '2025-01-31 06:03:11'),
(7, 'request 2', '2025-02-08', 'request 123', 'approved', '12', 'Block 16, Lot 11, Phase 2, Street Bakauan, Camella', 'SD002', '2025-01-31 06:03:36', '2025-01-31 06:13:02'),
(8, 'request 2', '2025-02-08', 'event testing', 'approved', 'eent1', 'Block 16, Lot 11, Phase 2, Street Bakauan, Camella', 'SD002', '2025-01-31 06:03:54', '2025-01-31 14:20:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `members`
--
ALTER TABLE `members`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `moderators`
--
ALTER TABLE `moderators`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `resident_id` (`resident_id`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcement`
--
ALTER TABLE `announcement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reports`
--
ALTER TABLE `reports`
  ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`resident_id`) REFERENCES `members` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
