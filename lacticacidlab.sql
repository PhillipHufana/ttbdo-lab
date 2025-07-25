-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 25, 2025 at 10:04 AM
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
-- Database: `lacticacidlab`
--

-- --------------------------------------------------------

--
-- Table structure for table `chemicals`
--

CREATE TABLE `chemicals` (
  `chemical_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `item_code` varchar(100) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `container_type` varchar(100) DEFAULT NULL,
  `container_size` varchar(50) DEFAULT NULL,
  `form` varchar(50) DEFAULT NULL,
  `date_received` date DEFAULT NULL,
  `date_opened` date DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `hazard_level` varchar(50) DEFAULT NULL,
  `msds_file` varchar(255) DEFAULT NULL,
  `disposal_method` varchar(255) DEFAULT NULL,
  `remarks` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chemicals`
--

INSERT INTO `chemicals` (`chemical_id`, `name`, `item_code`, `category`, `brand`, `quantity`, `container_type`, `container_size`, `form`, `date_received`, `date_opened`, `expiration_date`, `location`, `status`, `hazard_level`, `msds_file`, `disposal_method`, `remarks`) VALUES
(1, 'Lactic Acid 85%,  FCC', 'LA-2025-001', 'Lactic Acid', 'Sigma-Aldrich', 1, 'Plastic Jar', '1 kg', 'Solid', NULL, NULL, '2024-03-01', 'Shelf 2B', 'EXPIRED: Opened', '0', '0', '0', 'For Reference'),
(2, 'Lactic Acid Solution 85%,  ACS ', 'LA-2025-002', 'Lactic Acid', 'Sigma-Aldrich', 1, 'Plastic Jar', '500 g', 'Solid', NULL, NULL, NULL, 'Shelf 2B', 'EXPIRED: Opened', '', '', '', 'For Reference'),
(3, 'Lactic Acid Solution 85%,  ACS ', 'LA-2025-003', 'Lactic Acid', 'Sigma-Aldrich', 1, 'Plastic Jar', '500 g', 'Solid', NULL, NULL, NULL, 'Shelf 2B', 'EXPIRED: Opened', '', '', '', 'For Reference'),
(4, 'Lactic Acid Food Grade', 'LA-2025-004', 'Lactic Acid', 'Dalkem', 1, 'Plastic Jar', '1 L', 'Liquid', NULL, NULL, '2022-09-05', 'Shelf 2B', 'EXPIRED: Opened', '', '', '', 'For Reference'),
(5, 'Lactic Acid', 'LA-2025-005', 'Lactic Acid', 'CSM Biology', 1, 'Vial', '1 Vial', 'Liquid', NULL, '2019-12-04', NULL, 'Shelf 2B', 'EXPIRED: Opened', '', '', '', 'For Reference'),
(6, 'Sodium Lactate', 'LA-2025-006', 'Lactic Acid', 'n.d', 1, 'Vial', '25 mL', 'Liquid', NULL, NULL, NULL, 'Shelf 2B', 'EXPIRED: Opened', '', '', '', 'For Reference'),
(7, 'Lactic Acid Powder', 'LA-2025-007', 'Lactic Acid', 'Monde Nissin', 1, 'Petri Dish', 'n.d', 'Solid', NULL, NULL, NULL, 'Shelf 2B', 'EXPIRED: Opened', '', '', '', 'For Reference'),
(8, 'Lactic Acid Powder', 'LA-2025-008', 'Lactic Acid', 'Monde Nissin', 1, 'Plastic Jar', '100 g', 'Solid', NULL, '2020-01-29', NULL, 'Shelf 2B', 'EXPIRED: Opened', '', '', '', 'For Reference'),
(9, 'Lactic Acid 88% Heatstable Grade ', 'LA-2025-009', 'Lactic Acid', 'Jindan', 1, 'Plastic Galloon', '25 kg', 'Liquid', NULL, NULL, '2024-09-30', 'Table 2, Cabinet 4', 'EXPIRED: Opened', '', '', '', ''),
(10, 'Lactic Acid 88% Heatstable Grade ', 'LA-2025-010', 'Lactic Acid', 'Jindan', 1, 'Plastic Galloon', '25 kg', 'Liquid', NULL, NULL, '2024-09-30', 'Table 2, Cabinet 4', 'EXPIRED: Unopened', '', '', '', ''),
(11, 'Lactic Acid 88% AR', 'LA-2025-011', 'Lactic Acid', 'Loba Chemie Pvt.Ltd', 1, 'Plastic Jar', '500mL', 'Liquid', '2024-02-23', NULL, '2028-12-01', 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(12, 'Lactic Acid 88% AR', 'LA-2025-012', 'Lactic Acid', 'Loba Chemie Pvt.Ltd', 1, 'Plastic Jar', '500mL', 'Liquid', '2024-02-23', NULL, '2028-12-01', 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(13, 'Lactic Acid 88% AR', 'LA-2025-013', 'Lactic Acid', 'Loba Chemie Pvt.Ltd', 1, 'Plastic Jar', '500mL', 'Liquid', '2024-02-23', NULL, '2028-12-01', 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(14, 'Lactic Acid 88% AR', 'LA-2025-014', 'Lactic Acid', 'Loba Chemie Pvt.Ltd', 1, 'Plastic Jar', '500mL', 'Liquid', '2024-02-23', NULL, '2028-12-01', 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(15, 'Lactic Acid 88% AR', 'LA-2025-015', 'Lactic Acid', 'Loba Chemie Pvt.Ltd', 1, 'Plastic Jar', '500mL', 'Liquid', '2024-02-23', NULL, '2028-12-01', 'Table 3, Cabinet 3', ' ', '', '', '', ''),
(16, 'Lactic Acid 88% AR', 'LA-2025-016', 'Lactic Acid', 'Loba Chemie Pvt.Ltd', 1, 'Plastic Jar', '500mL', 'Liquid', '2024-02-23', NULL, '2028-12-01', 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(17, 'Lactic Acid 88% AR', 'LA-2025-017', 'Lactic Acid', 'Loba Chemie Pvt.Ltd', 1, 'Plastic Jar', '500mL', 'Liquid', '2024-02-23', NULL, '2028-12-01', 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(18, 'Lactic Acid 88% AR', 'LA-2025-018', 'Lactic Acid', 'Loba Chemie Pvt.Ltd', 1, 'Plastic Jar', '500mL', 'Liquid', '2024-02-23', NULL, '2028-12-01', 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(19, 'Lactic Acid 88% AR', 'LA-2025-019', 'Lactic Acid', 'Loba Chemie Pvt.Ltd', 1, 'Plastic Jar', '500mL', 'Liquid', '2024-02-23', NULL, '2028-12-01', 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(20, 'Lactic Acid 88% AR', 'LA-2025-020', 'Lactic Acid', 'Loba Chemie Pvt.Ltd', 1, 'Plastic Jar', '500mL', 'Liquid', '2024-02-23', NULL, '2028-12-01', 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(21, 'Yeast Extract for Microbiology', 'LA-2025-021', 'Lactic Acid Fermentation', 'Conda', 1, 'Plastic Jar', '500 g', 'Solid', '2012-05-14', NULL, '2015-12-01', 'Shelf 1D', 'EXPIRED: Opened', '', '', '', 'For disposal'),
(22, 'Yeast Extract Powder', 'LA-2025-022', 'Lactic Acid Fermentation', 'Himedia', 1, 'Plastic Jar', '500 g', 'Solid', NULL, '2020-01-10', '2023-06-01', 'Shelf 1D', 'EXPIRED: Opened', '', '', '', 'For disposal'),
(23, 'Starch Soluble, Synthesis Grade', 'LA-2025-023', 'Lactic Acid Fermentation', 'Scharlau', 1, 'Plastic Jar', '500g ', 'Solid', '2012-12-10', NULL, '2016-12-01', 'Shelf 1D', 'EXPIRED: Opened', '', '', '', 'For disposal'),
(24, 'Agar Powder, Bacteriological Grade ', 'LA-2025-024', 'Lactic Acid Fermentation', 'Himedia', 1, 'Plastic Jar', '500 g', 'Solid', NULL, '2020-01-21', NULL, 'Shelf 2B', 'Opened', '', '', '', ''),
(25, 'Agar Powder, Bacteriological Grade ', 'LA-2025-025', 'Lactic Acid Fermentation', 'Himedia', 1, 'Plastic Jar', '500 g', 'Solid', NULL, '2020-01-21', NULL, 'Shelf 2B', 'Unopened', '', '', '', ''),
(26, 'Starch Soluble', 'LA-2025-026', 'Lactic Acid Fermentation', 'Himedia', 1, 'Plastic Jar', '500 g', 'Solid', NULL, NULL, NULL, 'Shelf 2B', 'Unopened', '', '', '', ''),
(27, 'D (+) -Glucose monohydrate, extra pure', 'LA-2025-027', 'Lactic Acid Fermentation', 'Scharlau', 1, 'Plastic Jar', '1 kg', 'Solid', NULL, NULL, '2022-07-01', 'Shelf 2B', 'EXPIRED: Opened', '', '', '', 'For Disposal'),
(28, 'Peptone, Bacteriological', 'LA-2025-028', 'Lactic Acid Fermentation', 'Himedia', 1, 'Plastic Jar', '500 g', 'Solid', '2020-08-07', NULL, '2024-06-01', 'Shelf 2B', 'EXPIRED: Opened', '', '', '', 'For Disposal'),
(29, 'Peptone, Bacteriological', 'LA-2025-029', 'Lactic Acid Fermentation', 'Himedia', 1, 'Plastic Jar', '500 g', 'Solid', '2020-08-07', NULL, '2024-06-01', 'Shelf 2B', 'EXPIRED: Sealed', '', '', '', ''),
(30, 'B. Meat Extract Powder (Bovine) for Microbiology', 'LA-2025-030', 'Lactic Acid Fermentation', 'TM Media', 1, 'Plastic Jar', '500 g', 'Solid', NULL, '2024-05-04', '2026-09-01', 'Shelf 2B', 'Opened', '', '', '', ''),
(31, 'Yeast Extract Powder', 'LA-2025-031', 'Lactic Acid Fermentation', 'Himedia ', 1, 'Plastic Jar', '500 g', 'Solid', '2020-07-08', NULL, '2024-10-01', 'Shelf 2B', 'EXPIRED: Sealed', '', '', '', ''),
(32, 'Yeast Extract Powder', 'LA-2025-032', 'Lactic Acid Fermentation', 'Himedia ', 1, 'Plastic Jar', '500 g', 'Solid', '2020-07-08', NULL, '2024-10-01', 'Shelf 2B', 'EXPIRED: Sealed', '', '', '', ''),
(33, 'Dry Yeast ', 'LA-2025-033', 'Lactic Acid Fermentation', 'n.d', 1, 'Plastic Jar', '202 g', 'Solid', NULL, NULL, NULL, 'Shelf 2B', 'Opened', '', '', '', ''),
(34, 'Peptone, Bacteriological', 'LA-2025-034', 'Lactic Acid Fermentation', 'Himedia', 1, 'Plastic Jar', '500g', 'Solid', NULL, NULL, '2027-04-01', 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(35, 'Peptone, Bacteriological', 'LA-2025-035', 'Lactic Acid Fermentation', 'Himedia', 1, 'Plastic Jar', '500g', 'Solid', NULL, NULL, '2027-04-01', 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(36, 'B. Meat Extract Powder (Bovine)', 'LA-2025-036', 'Lactic Acid Fermentation', 'TM Media', 1, 'Plastic Jar', '500g', 'Solid', '2023-12-15', NULL, '2026-09-01', 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(37, 'Yeast Extract Powder', 'LA-2025-037', 'Lactic Acid Fermentation', 'Himedia', 1, 'Plastic Jar', '500g', 'Solid', NULL, NULL, '2023-06-01', 'Table 3, Cabinet 3', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(38, 'Yeast Extract Powder', 'LA-2025-038', 'Lactic Acid Fermentation', 'Himedia', 1, 'Plastic Jar', '500g', 'Solid', NULL, NULL, '2027-10-01', 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(39, 'Yeast Extract Powder', 'LA-2025-039', 'Lactic Acid Fermentation', 'Himedia', 1, 'Plastic Jar', '500g', 'Solid', NULL, NULL, '2027-10-01', 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(40, 'Instant Dry Yeast', 'LA-2025-040', 'Lactic Acid Fermentation', 'Gloripan', 1, 'Plastic Packaging', '500 g', 'Solid', NULL, NULL, '2021-10-01', 'Table 3, Cabinet 3', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(41, 'Instant Dry Yeast', 'LA-2025-041', 'Lactic Acid Fermentation', 'Gloripan', 1, 'Plastic Packaging', '500 g', 'Solid', NULL, NULL, '2021-10-01', 'Table 3, Cabinet 3', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(42, 'Instant Dry Yeast', 'LA-2025-042', 'Lactic Acid Fermentation', 'Gloripan', 1, 'Plastic Packaging', '500 g', 'Solid', NULL, NULL, '2021-10-01', 'Table 3, Cabinet 3', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(43, 'Instant Dry Yeast', 'LA-2025-043', 'Lactic Acid Fermentation', 'Gloripan', 1, 'Plastic Packaging', '500 g', 'Solid', NULL, NULL, '2021-10-01', 'Table 3, Cabinet 3', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(44, 'Instant Dry Yeast', 'LA-2025-044', 'Lactic Acid Fermentation', 'Gloripan', 1, 'Plastic Packaging', '500 g', 'Solid', NULL, NULL, '2021-10-01', 'Table 3, Cabinet 3', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(45, 'Instant Dry Yeast', 'LA-2025-045', 'Lactic Acid Fermentation', 'Gloripan', 1, 'Plastic Packaging', '500 g', 'Solid', NULL, NULL, '2021-10-01', 'Table 3, Cabinet 3', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(46, 'Instant Dry Yeast', 'LA-2025-046', 'Lactic Acid Fermentation', 'Gloripan', 1, 'Plastic Packaging', '500 g', 'Solid', NULL, NULL, '2021-10-01', 'Table 3, Cabinet 3', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(47, 'Instant Dry Yeast', 'LA-2025-047', 'Lactic Acid Fermentation', 'Gloripan', 1, 'Plastic Packaging', '500 g', 'Solid', NULL, NULL, '2021-10-01', 'Table 3, Cabinet 3', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(48, 'Instant Dry Yeast', 'LA-2025-048', 'Lactic Acid Fermentation', 'Gloripan', 1, 'Plastic Packaging', '500 g', 'Solid', NULL, NULL, '2021-10-01', 'Table 3, Cabinet 3', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(49, 'Instant Dry Yeast', 'LA-2025-049', 'Lactic Acid Fermentation', 'Gloripan', 1, 'Plastic Packaging', '500 g', 'Solid', NULL, NULL, '2021-10-01', 'Table 3, Cabinet 3', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(50, 'Instant Dry Yeast', 'LA-2025-050', 'Lactic Acid Fermentation', 'Gloripan', 1, 'Plastic Packaging', '500 g', 'Solid', NULL, NULL, '2021-10-01', 'Table 3, Cabinet 3', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(51, 'Instant Dry Yeast', 'LA-2025-051', 'Lactic Acid Fermentation', 'Gloripan', 1, 'Plastic Packaging', '500 g', 'Solid', NULL, NULL, '2021-10-01', 'Table 3, Cabinet 3', 'EXPIRED: Opened', '', '', '', 'For Disposal'),
(52, 'Instant Dry Yeast', 'LA-2025-052', 'Lactic Acid Fermentation', 'Gloripan', 1, 'Plastic Packaging', '500 g', 'Solid', NULL, NULL, '2021-10-01', 'Table 3, Cabinet 3', 'EXPIRED: Opened', '', '', '', 'For Disposal'),
(53, 'Agar Powder, Bacteriological Grade ', 'LA-2025-053', 'Lactic Acid Fermentation', 'Himedia', 1, 'Plastic Jar', '500 g', 'Solid', '2024-02-13', NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(54, 'Starch Soluble', 'LA-2025-054', 'Lactic Acid Fermentation', 'UNI-CHEM', 1, 'Plastic Jar', '500 g', 'Solid', NULL, NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(55, 'D-(+)-Glucose anhydrous', 'LA-2025-055', 'Sugar Analysis', 'Sigma-Aldrich', 1, 'Plastic Jar', '100 g', 'Solid', NULL, NULL, NULL, 'Shelf 2C', 'Opened', '', '', '', ''),
(56, 'D-(+)-Glucose anhydrous for biochem', 'LA-2025-056', 'Sugar Analysis', 'Millipore', 1, 'Plastic Jar', '250 g', 'Solid', NULL, NULL, '2027-04-03', 'Shelf 2C', 'Unopened', '', '', '', ''),
(57, 'D-(+)-Glucose anhydrous for biochem', 'LA-2025-057', 'Sugar Analysis', 'Millipore', 1, 'Plastic Jar', '250 g', 'Solid', NULL, NULL, '2027-04-03', 'Shelf 2C', 'Unopened', '', '', '', ''),
(58, 'D-(-)-Fructose', 'LA-2025-058', 'Sugar Analysis', 'Sigma-Aldrich', 1, 'Plastic Jar', '250 g', 'Solid', NULL, NULL, NULL, 'Shelf 2C', 'Opened', '', '', '', ''),
(59, 'L-(+)-Arabinose', 'LA-2025-059', 'Sugar Analysis', 'Sigma-Aldrich', 1, 'Plastic Jar', '25 g', 'Solid', NULL, NULL, NULL, 'Shelf 2C', 'Opened', '', '', '', ''),
(60, 'Sucrose', 'LA-2025-060', 'Sugar Analysis', 'Sigma-Aldrich', 1, 'Plastic Jar', '250 g', 'Solid', '2020-04-09', NULL, NULL, 'Shelf 2C', 'Opened', '', '', '', ''),
(61, 'Amylose from Potato', 'LA-2025-061', 'Sugar Analysis', 'Sigma-Aldrich', 1, 'Plastic Jar', '1 kg', 'Solid', NULL, '2025-04-01', NULL, 'Shelf 2C', 'Opened', '', '', '', ''),
(62, 'D-(+)-Glucose anhydrous', 'LA-2025-062', 'Sugar Analysis', 'Himedia', 1, 'Plastic Jar', '500g', 'Solid', '2024-02-13', NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(63, 'D-(+)-Glucose anhydrous', 'LA-2025-063', 'Sugar Analysis', 'Himedia', 1, 'Plastic Jar', '500g', 'Solid', '2024-02-13', NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(64, 'D-(+)-Glucose anhydrous', 'LA-2025-064', 'Sugar Analysis', 'Himedia', 1, 'Plastic Jar', '500g', 'Solid', '2024-02-13', NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(65, 'D-(+)-Glucose anhydrous', 'LA-2025-065', 'Sugar Analysis', 'Himedia', 1, 'Plastic Jar', '500g', 'Solid', '2024-02-13', NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(66, 'D-(+)-Maltose monohydrate', 'LA-2025-066', 'Sugar Analysis', 'Himedia', 1, 'Plastic Jar', '500g', 'Solid', '2023-12-15', NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(67, 'D-(+)-Maltose monohydrate', 'LA-2025-067', 'Sugar Analysis', 'Sigma-Aldrich', 1, 'Plastic Jar', '25 g', 'Solid', '2020-09-04', NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(68, 'D-Lactose monohydrate', 'LA-2025-068', 'Sugar Analysis', 'Sigma-Aldrich', 1, 'Plastic Jar', '25 g', 'Solid', '2020-09-04', NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(69, 'D-(+)-Galactose', 'LA-2025-069', 'Sugar Analysis', 'Sigma-Aldrich', 1, 'Plastic Jar', '25 g', 'Solid', '2020-09-04', NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(70, 'Starch Soluble', 'LA-2025-070', 'Sugar Analysis', 'UNI-CHEM', 1, 'Plastic Jar', '500 g', 'Solid', NULL, NULL, NULL, 'Table 3, Cabinet 4', 'Unopened', '', '', '', ''),
(71, 'Food Coloring, Blue', 'LA-2025-071', 'Polymerization', 'McCormick', 1, 'Glass Bottle', '20 ml', 'Liquid', NULL, NULL, '2018-01-27', 'Shelf 1D', 'EXPIRED: Opened', '', '', '', ''),
(72, 'Food Coloring, Green', 'LA-2025-072', 'Polymerization', 'McCormick', 1, 'Glass Bottle', '20 ml', 'Liquid', NULL, NULL, '2018-03-01', 'Shelf 1D', 'EXPIRED: Opened', '', '', '', ''),
(73, 'Food Coloring, Yellow', 'LA-2025-073', 'Polymerization', 'McCormick', 1, 'Glass Bottle', '20 ml', 'Liquid', NULL, NULL, '2018-02-01', 'Shelf 1D', 'EXPIRED: Opened', '', '', '', ''),
(74, 'Calcium Hydroxide', 'LA-2025-074', 'Polymerization', 'Himedia', 1, 'Plastic Jar', '500 g', 'Solid', NULL, NULL, NULL, 'Shelf 2C', 'Sealed', '', '', '', ''),
(75, 'Calcium Hydroxide', 'LA-2025-075', 'Polymerization', 'Himedia', 1, 'Plastic Jar', '500 g', 'Solid', NULL, NULL, NULL, 'Shelf 2C', 'Sealed', '', '', '', ''),
(76, 'Tin(II) 2-ethylhexanoate', 'LA-2025-076', 'Polymerization', 'Sigma-Aldrich', 1, 'Glass Bottle', '250 g', 'Liquid', NULL, NULL, NULL, 'Shelf 2C', 'Opened', '', '', '', ''),
(77, 'Tin(II) 2-ethylhexanoate', 'LA-2025-077', 'Polymerization', 'Sigma-Aldrich', 1, 'Glass Bottle', '250 g', 'Liquid', '2024-02-03', NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(78, 'Tin(II) 2-ethylhexanoate', 'LA-2025-078', 'Polymerization', 'Sigma-Aldrich', 1, 'Glass Bottle', '250 g', 'Liquid', '2024-02-03', NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(79, 'Manganese (II) Sulphate Monohydrate', 'LA-2025-079', 'Filtration and Purification', 'Techno Pharmachem', 1, 'Plastic Jar', '500 g', 'Solid', NULL, '2020-01-21', '2016-06-01', 'Shelf 1D', 'EXPIRED: Opened', '', '', '', 'For disposal'),
(80, 'Activated Carbon (6x12 mesh CTC 55)', 'LA-2025-080', 'Filtration and Purification', 'Philips Carbon, Inc.', 1, 'Plastic Jar', '500 g', 'Solid', NULL, NULL, NULL, 'Shelf 2C', 'Opened', '', '', '', ''),
(81, 'Activated Carbon PCCARB-100 Iodine 900', 'LA-2025-081', 'Filtration and Purification', 'BF Industries, Inc.', 1, 'Plastic Jar', '500 g', 'Solid', NULL, NULL, NULL, 'Shelf 2C', 'Opened', '', '', '', ''),
(82, 'Activated Carbon PCCARB-100 Iodine 900', 'LA-2025-082', 'Filtration and Purification', 'Philips Carbon, Inc.', 1, 'Plastic Jar', '1 kg', 'Solid', NULL, NULL, NULL, 'Shelf 2C', 'Opened', '', '', '', ''),
(83, 'Magnesium Sulphate Heptahydrate', 'LA-2025-083', 'Filtration and Purification', 'Techno Pharmachem', 1, 'Plastic Jar', '500 g', 'Solid', '2012-04-13', '2020-01-21', '2016-06-01', 'Shelf 2C', 'EXPIRED: Opened', '', '', '', ''),
(84, 'Ammonium Sulfate, Reagent Grade', 'LA-2025-084', 'Filtration and Purification', 'Scharlau', 1, 'Plastic Jar', '500 g', 'Solid', NULL, '2013-09-09', '2016-12-01', 'Shelf 2C', 'EXPIRED: Opened', '', '', '', ''),
(85, 'Silicon Oil', 'LA-2025-085', 'Others', 'Spanjaard', 1, 'Plastic Galloon', '4L', 'Liquid', '2018-10-22', NULL, NULL, 'Shelf 1C', 'Opened', '', '', '', ''),
(86, 'Silicon Oil ', 'LA-2025-086', 'Others', 'Getz L-30', 1, 'Plastic Galloon', '1 gallon', 'Liquid', NULL, NULL, NULL, 'Shelf 1C', 'Opened', '', '', '', ''),
(87, 'Silicon Oil', 'LA-2025-087', 'Others', 'n.d', 1, 'Plastic Galloon', '1.5 L', 'Liquid', NULL, NULL, NULL, 'Shelf 1C', 'Opened', '', '', '', ''),
(88, 'Vacuum Pump Oil', 'LA-2025-088', 'Others', 'Vacpo', 1, 'Plastic Bottle', '500 mL', 'Liquid', NULL, NULL, NULL, 'Shelf 1C', 'Opened', '', '', '', ''),
(89, 'Vacuum Pump Oil', 'LA-2025-089', 'Others', 'Vacpo', 1, 'Plastic Bottle', '500 mL', 'Liquid', NULL, NULL, NULL, 'Shelf 1C', 'Opened', '', '', '', ''),
(90, 'Vacuum Oil', 'LA-2025-090', 'Others', 'n.d', 1, 'Plastic Bottle', 'N/A', 'Liquid', NULL, NULL, NULL, 'Shelf 1C', 'Opened', '', '', '', ''),
(91, 'Sodium Carbonate Anhydrous', 'LA-2025-091', 'Others', 'Scharlau', 1, 'Plastic Jar', '1 kg', 'Solid', '2012-10-12', NULL, '2016-06-01', 'Shelf 1D', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(92, 'Lugol\'s Iodine', 'LA-2025-092', 'Others', 'Medic Diagnostic Reagents', 1, 'Glass Bottle', '500 mL', 'Liquid', '2020-08-07', NULL, '2022-03-01', 'Shelf 1D', 'EXPIRED: Opened', '', '', '', 'For Disposal'),
(93, 'Carrageenan Powder (Kapppa High Gel)', 'LA-2025-093', 'Others', 'Dalkem', 1, 'Plastic Jar', '250 g', 'Solid', NULL, NULL, '2024-11-01', 'Shelf 1D', 'EXPIRED: Opened', '', '', '', 'For disposal'),
(94, 'Potassium Sodium (+)- Tartarate AR', 'LA-2025-094', 'Others', 'Techno Pharmachem', 1, 'Plastic Jar', '500 g', 'Solid', NULL, NULL, '2015-04-01', 'Shelf 1D', 'EXPIRED: Unopened', '', '', '', 'For disposal'),
(95, 'Sodium Acetate 3-hydrate', 'LA-2025-095', 'Others', 'UNI-CHEM', 1, 'Plastic Jar', '500 g', 'Solid', NULL, '2020-01-21', NULL, 'Shelf 1D', 'EXPIRED: Opened', '', '', '', 'For disposal'),
(96, 'Lactose Technical Grade', 'LA-2025-096', 'Others', 'n.d', 1, 'Plastic Jar', 'n.d', 'Solid', NULL, NULL, NULL, 'Shelf 2B', 'n.d', '', '', '', ''),
(97, 'Sodium Hydroxide', 'LA-2025-097', 'Others', 'Vetec', 1, 'Plastic Jar', '1 kg', 'Solid', NULL, NULL, NULL, 'Shelf 2C', 'Opened', '', '', '', ''),
(98, 'Sodium Acetate Trihydrate', 'LA-2025-098', 'Others', 'Himedia', 1, 'Plastic Jar', '500 g', 'Solid', NULL, NULL, NULL, 'Shelf 2C', 'Opened', '', '', '', ''),
(99, 'Sodium Carbonate', 'LA-2025-099', 'Others', 'Supelco', 1, 'Plastic Jar', '5oo g', 'Solid', NULL, NULL, NULL, 'Shelf 2C', 'Opened', '', '', '', ''),
(100, 'Tris(hydroxymethyl) amino methane', 'LA-2025-100', 'Others', 'Sigma-Aldrich', 1, 'Plastic Jar', '100 g', 'Solid', NULL, NULL, NULL, 'Shelf 2C', 'Opened', '', '', '', ''),
(101, 'Anion Exchange Resin', 'LA-2025-101', 'Others', 'Lanxess', 1, 'Sack', '25 L', 'Solid', NULL, NULL, NULL, 'Left Side Table 1, Cabinet 1', 'Unopened', '', '', '', ''),
(102, 'Anion Exchange Resin', 'LA-2025-102', 'Others', 'Lanxess', 1, 'Sack', '25 L', 'Solid', NULL, NULL, NULL, 'Left Side Table 1, Cabinet 1', 'Unopened', '', '', '', ''),
(103, 'Poly(L-lactide)', 'LA-2025-103', 'Others', 'Himedia', 1, 'Plastic Jar', '1 g', 'Solid', NULL, NULL, NULL, 'Refrigerator ', 'Opened', '', '', '', ''),
(104, 'Amyloglucosidase from Aspergillus niger', 'LA-2025-104', 'Others', 'Sigma-Aldrich', 1, 'Glass Bottle', '50 ml', 'LIquid', NULL, NULL, NULL, 'Refrigerator', 'Opened', '', '', '', ''),
(105, '3,5-Dinitrosalicylic acid', 'LA-2025-105', 'Others', 'Himedia', 1, 'Glass Bottle', '100 g', 'Liquid', NULL, NULL, NULL, 'Refrigerator', 'Unopened', NULL, '1753330072571-Final Presentation (TTBDO).pdf', '', ''),
(106, 'Maleic Acid', 'LA-2025-106', 'Others', 'n.d', 1, 'Plastic Jar', '250 mL', 'Solid', NULL, NULL, NULL, 'Shelf 2A', 'Opened', '', '', '', ''),
(107, 'Glacial Acetic Acid', 'LA-2025-107', 'Others', 'n.d', 1, 'Plastic Jar', '250 mL', 'Liquid', NULL, NULL, NULL, 'Shelf 2A', 'Opened', '', '', '', ''),
(108, 'Calcium Chloride Dihydride ', 'LA-2025-108', 'Others', 'n.d', 1, 'Plastic Jar', '250 mL', 'Solid', NULL, NULL, NULL, 'Shelf 2A', 'Opened', '', '', '', ''),
(109, 'Potassium Hydroxide Flakes', 'LA-2025-109', 'Others', 'Dalkem', 1, 'Plastic Jar', '285 g', 'Solid', NULL, NULL, '2026-05-15', 'Shelf 2A', 'Opened', '', '', '', ''),
(110, 'Potassium Chloride', 'LA-2025-110', 'Others', 'Dallkem', 1, 'Plastic Jar', '125 g', 'Solid', NULL, NULL, '2027-10-23', 'Shelf 2A', 'Opened', '', '', '', ''),
(111, 'Lactic Acid Powder', 'LA-2025-111', 'Others', 'Monde Nissin', 1, 'Plastic Jar', '202 g', 'Solid', NULL, NULL, NULL, 'Shelf 2A', 'Opened', '', '', '', ''),
(112, 'Potassium Iodide', 'LA-2025-112', 'Others', 'N/A', 1, 'Plastic Jar', '250 mL', 'Solid', NULL, NULL, NULL, 'Shelf 2A', 'Opened', '', '', '', ''),
(113, 'Sodium Hydroxide Pellet, Food/Pharma Grade', 'LA-2025-113', 'Others', 'Jeedy Scents & Soapery', 1, 'Plastic Jar', '250 g', 'Solid', NULL, NULL, NULL, 'Shelf 2A', 'Opened', '', '', '', ''),
(114, 'Phenol Red', 'LA-2025-114', 'Others', 'Himedia ', 1, 'Plastic Jar', '25g', 'Solid', '2023-12-15', NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(115, 'Phenol Red', 'LA-2025-115', 'Others', 'Himedia ', 1, 'Plastic Jar', '25g', 'Solid', '2023-12-15', NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(116, 'Boric Acid', 'LA-2025-116', 'Others', 'Himedia', 1, 'Plastic Jar', '500g', 'Solid', '2024-07-15', NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(117, 'Boric Acid', 'LA-2025-117', 'Others', 'Himedia', 1, 'Plastic Jar', '500g', 'Solid', '2024-07-15', NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(118, 'Sodium Acetate Trihydrate', 'LA-2025-118', 'Others', 'Himedia', 1, 'Plastic Jar', '500g', 'Solid', '2024-02-13', NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(119, 'Gram Stain Set: Gram Stain Decolorizer', 'LA-2025-119', 'Others', 'Medic Diagnostic Reagents', 1, 'Plastic Bottle', '500mL', 'Liquid', NULL, NULL, '2021-07-01', 'Table 3, Cabinet 3', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(120, 'Gram Stain Set: Safranin', 'LA-2025-120', 'Others', 'Medic Diagnostic Reagents', 1, 'Plastic Bottle', '500 mL', 'Liquid', '2019-11-19', NULL, '2021-07-01', 'Table 3, Cabinet 3', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(121, 'Gram Stain Set: Crystal Violet', 'LA-2025-121', 'Others', 'Medic Diagnostic Reagents', 1, 'Plastic Bottle', '500 mL', 'Liquid', '2019-11-19', NULL, '2021-07-01', 'Table 3, Cabinet 3', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(122, 'Gram Stain Set: Grams Iodine', 'LA-2025-122', 'Others', 'Medic Diagnostic Reagents', 1, 'Glass Bottle', '500 mL', 'Liquid', '2019-11-19', NULL, '2021-07-01', 'Table 3, Cabinet 3', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(123, 'Malt Exract Powder, Refined', 'LA-2025-123', 'Others', 'Himedia', 1, 'Plastic Jar', '500 g', 'Solid', NULL, NULL, '2029-01-01', 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(124, 'Sodium Hydroxide', 'LA-2025-124', 'Others', 'Vetec', 1, 'Plastic Jar ', '1 kg', 'Solid', NULL, NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(125, 'Sodium Hydroxide', 'LA-2025-125', 'Others', 'Vetec', 1, 'Plastic Jar ', '1 kg', 'Solid', NULL, NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(126, 'Sodium Hydroxide', 'LA-2025-126', 'Others', 'Vetec', 1, 'Plastic Jar ', '1 kg', 'Solid', NULL, NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(127, 'Sodium Hydroxide', 'LA-2025-127', 'Others', 'Vetec', 1, 'Plastic Jar ', '1 kg', 'Solid', NULL, NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(128, 'Sodium Hydroxide', 'LA-2025-128', 'Others', 'Vetec', 1, 'Plastic Jar ', '1 kg', 'Solid', NULL, NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(129, 'Sodium Hydroxide', 'LA-2025-129', 'Others', 'Vetec', 1, 'Plastic Jar ', '1 kg', 'Solid', NULL, NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(130, 'Sodium Hydroxide', 'LA-2025-130', 'Others', 'Vetec', 1, 'Plastic Jar ', '1 kg', 'Solid', NULL, NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(131, 'Fluorescent Brightener ', 'LA-2025-131', 'Others', 'Sigma-Aldrich', 1, 'Glass Bottle', '1 g', 'Solid', NULL, NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(132, 'High Vacuum Grease', 'LA-2025-132', 'Others', 'Molykote', 1, 'Aluminum Tube', 'N/A', 'Solid', NULL, NULL, '2023-07-21', 'Table 3, Drawer 4', 'EXPIRED: Opened', '', '', '', 'For Disposal'),
(133, 'Silica Gel', 'LA-2025-133', 'Others', 'n.d', 1, 'Plastic Jar', '1kg', 'Solid', '2023-12-15', NULL, NULL, 'Table3, Cabinet 3', 'Unopened', '', '', '', ''),
(134, 'Silica Gel', 'LA-2025-134', 'Others', 'n.d', 1, 'Plastic Jar', '1kg', 'Solid', '2023-12-15', NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(135, 'Silica Gel', 'LA-2025-135', 'Others', 'n.d', 1, 'Plastic Jar', '1kg', 'Solid', '2023-12-15', NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(136, 'Silica Gel', 'LA-2025-136', 'Others', 'n.d', 1, 'Plastic Jar', '1kg', 'Solid', '2023-12-15', NULL, NULL, 'Table 3, Cabinet 3', 'Opened', '', '', '', ''),
(137, 'di-Sodium Hydrogen Phosphate Dodecahydrate', 'LA-2025-137', 'Others', 'Himedia', 1, 'Plastic Jar', '500g', 'Solid', '2023-12-13', NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(138, 'Sodium Dihydrogen Orthophosphate Dihydrate 99%', 'LA-2025-138', 'Others', 'Loba Chemie Pvt.Ltd', 1, 'Plastic Jar', '500 g', 'Solid', '2023-12-15', NULL, '2027-04-01', 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(139, 'Sodium Dihydrogen Orthophosphate Dihydrate 99%', 'LA-2025-139', 'Others', 'Loba Chemie Pvt.Ltd', 1, 'Plastic Jar', '500 g', 'Solid', '2023-12-15', NULL, '2027-04-01', 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(140, 'Bile Extract Porcine', 'LA-2025-140', 'Others', 'Sigma-Aldrich', 1, 'Plastic Jar', '100 g', 'Solid', '2025-06-13', NULL, NULL, 'Table 3, Cabinet 3', 'Unopened', '', '', '', ''),
(141, 'pH 4.01 Buffer', 'LA-2025-141', 'pH Determination', 'Thermo Scientific ', 1, 'Plastic Bottle', '475 mL', 'Liquid', NULL, '2019-10-23', '2021-06-01', 'Shelf 1D', 'EXPIRED: Opened', '', '', '', 'For Disposal'),
(142, 'pH 7.00 Buffer', 'LA-2025-142', 'pH Determination', 'Thermo Scientific ', 1, 'Plastic Bottle', '475 mL', 'Liquid', NULL, '2019-10-23', '2021-06-01', 'Shelf 1D', 'EXPIRED: Opened', '', '', '', 'For Disposal'),
(143, 'pH 10.01', 'LA-2025-143', 'pH Determination', 'Thermo Scientific ', 1, 'Plastic Bottle', '475 mL', 'Liquid', NULL, '2019-10-23', '2021-06-01', 'Shelf 1D', 'EXPIRED: Opened', '', '', '', 'For Disposal'),
(144, 'Storage Solution', 'LA-2025-144', 'pH Determination', 'Thermo Scientific ', 1, 'Plastic Bottle', '475 mL', 'Liquid', NULL, '2019-10-23', '2021-06-01', 'Shelf 1D', 'EXPIRED: Opened', '', '', '', 'For Disposal'),
(145, 'pH anhydrous NaSO4', 'LA-2025-145', 'pH Determination', 'n.d', 1, 'Plastic Packet', 'packet', 'Solid', NULL, NULL, NULL, 'Shelf 1D', 'Opened', '', '', '', ''),
(146, 'Electrode Storage Bottle', 'LA-2025-146', 'pH Determination', 'Thermo Scientific ', 1, 'Plastic Bottle', '60 mL', 'Liquid', NULL, NULL, NULL, 'Shelf 1D', 'Opened', '', '', '', ''),
(147, 'Reference Electrode Filing Solution', 'LA-2025-147', 'pH Determination', 'Thermo Scientific ', 1, 'Plastic Bottle', '60 mL', 'Liquid', NULL, NULL, NULL, 'Shelf 1D', 'Unopened', '', '', '', ''),
(148, '692 ppm as NaCl Conductivity/TDS Standard', 'LA-2025-148', 'pH Determination', 'Thermo Scientific ', 1, 'Plastic Bottle', '60 mL', 'Liquid', NULL, NULL, '2020-10-01', 'Shelf 1D', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(149, '692 ppm as NaCl Conductivity/TDS Standard', 'LA-2025-149', 'pH Determination', 'Thermo Scientific ', 1, 'Plastic Bottle', '60 mL', 'Liquid', NULL, NULL, '2020-10-01', 'Shelf 1D', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(150, '692 ppm as NaCl Conductivity/TDS Standard', 'LA-2025-150', 'pH Determination', 'Thermo Scientific ', 1, 'Plastic Bottle', '60 mL', 'Liquid', NULL, NULL, '2020-10-01', 'Shelf 1D', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(151, '692 ppm as NaCl Conductivity/TDS Standard', 'LA-2025-151', 'pH Determination', 'Thermo Scientific ', 1, 'Plastic Bottle', '60 mL', 'Liquid', NULL, NULL, '2020-10-01', 'Shelf 1D', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(152, '692 ppm as NaCl Conductivity/TDS Standard', 'LA-2025-152', 'pH Determination', 'Thermo Scientific ', 1, 'Plastic Bottle', '60 mL', 'Liquid', NULL, NULL, '2020-10-01', 'Shelf 1D', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(153, '692 ppm as NaCl Conductivity/TDS Standard', 'LA-2025-153', 'pH Determination', 'Thermo Scientific ', 1, 'Plastic Bottle', '60 mL', 'Liquid', NULL, NULL, '2020-10-01', 'Shelf 1D', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(154, '7230 ppm as NaCl Condutivity/ TDS Standard', 'LA-2025-154', 'pH Determination', 'Thermo Scientific ', 1, 'Plastic Bottle', '60 mL', 'Liquid', NULL, NULL, '2020-12-01', 'Shelf 1D', 'EXPIRED: Opened', '', '', '', 'For Disposal'),
(155, 'pH Standard Powder Solution', 'LA-2025-155', 'pH Determination', 'Shanghai Hongbei Reagent Co.,', 3, 'Packet', '250 mL', 'Solid', NULL, NULL, NULL, 'Shelf 1D', 'Unopened', '', '', '', ''),
(156, 'pH Cleaner for General Cleaning, Oil & Grease Removal', 'LA-2025-156', 'pH Determination', 'Thermo Scientific ', 1, 'Plastic Bottle', '60 mL', 'Liquid', NULL, NULL, NULL, 'Shelf 1D', 'Unopened', '', '', '', ''),
(157, 'Ethanol Absolute, Technical Grade', 'LA-2025-157', 'Solvents', 'Scharlau', 1, 'Plastic Galloon', '4 L', 'Liquid', NULL, NULL, '2027-06-01', 'Shelf 1C', 'Unopened', '', '', '', ''),
(158, 'Ethanol Absolute, Technical Grade', 'LA-2025-158', 'Solvents', 'Scharlau', 1, 'Plastic Galloon', '4 L', 'Liquid', NULL, NULL, '2027-06-01', 'Shelf 1C', 'Unopened', '', '', '', ''),
(159, 'Ethanol Absolute, Technical Grade', 'LA-2025-159', 'Solvents', 'Scharlau', 1, 'Plastic Galloon', '4 L', 'Liquid', NULL, NULL, '2027-06-01', 'Shelf 1C', 'Unopened', '', '', '', ''),
(160, 'Ethanol Absolute, Technical Grade', 'LA-2025-160', 'Solvents', 'Scharlau', 1, 'Plastic Galloon', '4 L', 'Liquid', NULL, '2023-11-21', '2027-06-01', 'Shelf 1C', 'Opened', '', '', '', ''),
(161, 'Ethanol Absolute, Technical Grade', 'LA-2025-161', 'Solvents', 'Scharlau', 1, 'Plastic Galloon', '4 L', 'Liquid', NULL, '2023-11-21', '2027-06-01', 'Shelf 1C', 'Opened', '', '', '', ''),
(162, 'Ethyl Alcohol 70% Solution', 'LA-2025-162', 'Solvents', 'Green Cross', 1, 'Plastic Galloon', '3785 mL', 'Liquid', NULL, NULL, '2023-07-01', 'Shelf 1C', 'EXPIRED: Opened', '', '', '', 'For disposal'),
(163, 'Hydrochloric Acid, 36,5- 38%', 'LA-2025-163', 'Solvents', 'Scharlau', 1, 'Glass Bottle', '2.5L', 'Liquid', NULL, NULL, '2022-02-01', 'Table 3, Cabinet 4', 'EXPIRED: Opened', '', '', '', 'For disposal '),
(164, 'Hydrochloric Acid, 36,5- 38%', 'LA-2025-164', 'Solvents', 'Scharlau', 1, 'Glass Bottle', '2.5L', 'Liquid', NULL, NULL, '2022-02-01', 'Table 3, Cabinet 4', 'EXPIRED: Opened', '', '', '', 'For disposal '),
(165, 'Hydrochloric Acid, 36,5- 38%', 'LA-2025-165', 'Solvents', 'Scharlau', 1, 'Glass Bottle', '2.5L', 'Liquid', NULL, NULL, '2022-02-01', 'Table 3, Cabinet 4', 'EXPIRED: Opened', '', '', '', 'For disposal '),
(166, 'Hydrochloric Acid, 36,5- 38%', 'LA-2025-166', 'Solvents', 'Scharlau', 1, 'Glass Bottle', '2.5L', 'Liquid', NULL, NULL, '2022-02-01', 'Table 3, Cabinet 4', 'EXPIRED: Opened', '', '', '', 'For disposal '),
(167, 'Ethyl Acetate', 'LA-2025-167', 'Solvents', 'RCL Labscan', 1, 'Amber Bottle', '4L', 'Liquid', NULL, NULL, NULL, 'Table 3, Cabinet 4', 'Unopened', '', '', '', ''),
(168, 'Ethyl Acetate ', 'LA-2025-168', 'Solvents', 'Scharlau', 1, 'Plastic Galloon', '4L', 'Liquid', '2020-04-09', NULL, '2020-11-01', 'Table 3, Cabinet 4', 'EXPIRED: Opened', '', '', '', 'For disposal'),
(169, 'Ethyl Acetate ', 'LA-2025-169', 'Solvents', 'Scharlau', 1, 'Plastic Galloon', '4L', 'Liquid', '2020-04-09', NULL, '2020-11-01', 'Table 3, Cabinet 4', 'EXPIRED: Opened', '', '', '', 'For disposal'),
(170, 'Acetonitrile', 'LA-2025-170', 'Solvents', 'PHARMCO-AAPER', 1, 'Amber Bottle', '4L', 'Liquid', NULL, '2019-12-05', NULL, 'Table 3, Cabinet 4', 'Opened', '', '', '', ''),
(171, 'Acetonitrile', 'LA-2025-171', 'Solvents', 'PHARMCO-AAPER', 1, 'Amber Bottle', '4L', 'Liquid', NULL, '2019-12-05', NULL, 'Table 3, Cabinet 4', 'Unopened', '', '', '', ''),
(172, 'Sulfuric Acid', 'LA-2025-172', 'Solvents', 'J.T.Baker', 1, 'Amber Bottle', '2.5L', 'Liquid', '2023-04-09', NULL, NULL, 'Table 3, Cabinet 4', 'Opened', '', '', '', ''),
(173, 'Methanol', 'LA-2025-173', 'Solvents', 'LiChrosolv', 1, 'Amber Bottle', '4L', 'Liquid', NULL, '2019-12-05', '2022-03-31', 'Table 3, Cabinet 4', 'EXPIRED: Opened', '', '', '', 'For Disposal'),
(174, 'Methanol', 'LA-2025-174', 'Solvents', 'LiChrosolv', 1, 'Amber Bottle', '4L', 'Liquid', NULL, '2019-12-05', '2022-03-31', 'Table 3, Cabinet 4', 'EXPIRED: Unopened', '', '', '', 'For Disposal'),
(175, 'Glycerol', 'LA-2025-175', 'Solvents', 'Univar', 1, 'Amber Bottle', '2.5L', 'Liquid', NULL, NULL, NULL, 'Table 3, Cabinet 4', 'Opened', '', '', '', ''),
(176, 'Acetic Acid, glacial', 'LA-2025-176', 'Solvents', 'Univar', 1, 'Amber Bottle', '2.5L', 'Liquid', NULL, NULL, NULL, 'Table 3, Cabinet 4', 'Opened', '', '', '', ''),
(177, 'Ethyl Acetate', 'LA-2025-177', 'Solvents ', 'Scharlau', 1, 'Plastic Gallon', '4L', 'Liquid', NULL, NULL, '2024-11-01', 'Table 3, Cabinet 2', 'EXPIRED: Unopened', '', '', '', 'For disposal'),
(178, 'Ethyl Acetate', 'LA-2025-178', 'Solvents ', 'Scharlau', 1, 'Plastic Gallon', '4L', 'Liquid', NULL, NULL, '2024-11-01', 'Table 3, Cabinet 2', 'EXPIRED: Unopened', '', '', '', 'For disposal'),
(179, 'Ethyl Acetate', 'LA-2025-179', 'Solvents ', 'Scharlau', 1, 'Plastic Gallon', '4L', 'Liquid', NULL, NULL, '2024-11-01', 'Table 3, Cabinet 2', 'EXPIRED: Unopened', '', '', '', 'For disposal'),
(180, 'Ethyl Acetate', 'LA-2025-180', 'Solvents ', 'Scharlau', 1, 'Plastic Gallon', '4L', 'Liquid', NULL, NULL, '2024-11-01', 'Table 3, Cabinet 2', 'EXPIRED: Unopened', '', '', '', 'For disposal'),
(181, 'Hydrochloric Acid, 36,5- 38%', 'LA-2025-181', 'Solvents ', 'Scharlau', 1, 'Glass Bottle', '2.5L', 'Liquid', NULL, '2020-02-21', '2022-02-01', 'Table 3, Cabinet 2', 'EXPIRED: Opened', '', '', '', 'For disposal');

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `equipment_id` int(11) NOT NULL,
  `equipment_code` varchar(100) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `model` varchar(100) DEFAULT NULL,
  `serial_no` varchar(100) DEFAULT NULL,
  `other_details` text DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `remarks` text DEFAULT NULL,
  `date_received` date DEFAULT NULL,
  `po_no` varchar(100) DEFAULT NULL,
  `purchase_price` decimal(12,2) DEFAULT NULL,
  `fund_source` varchar(100) DEFAULT NULL,
  `supplier` varchar(255) DEFAULT NULL,
  `supplier_contact` text DEFAULT NULL,
  `last_updated` date DEFAULT NULL,
  `maintenance_schedule` text DEFAULT NULL,
  `last_calibration_date` date DEFAULT NULL,
  `next_calibration_date` date DEFAULT NULL,
  `other_name` varchar(255) DEFAULT NULL,
  `manual_file` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`equipment_id`, `equipment_code`, `name`, `location`, `brand`, `model`, `serial_no`, `other_details`, `status`, `remarks`, `date_received`, `po_no`, `purchase_price`, `fund_source`, `supplier`, `supplier_contact`, `last_updated`, `maintenance_schedule`, `last_calibration_date`, `next_calibration_date`, `other_name`, `manual_file`) VALUES
(1, 'LA-BIOTECH-2019-001A', 'Water Purifier - Type II', 'Right Side Table Countertop', 'Thermoscientific', 'tbd', '', '', 'Working', '-pump noise', '2012-09-05', '', 0.00, 'PCIEERD DOST', '', 'tbd', NULL, '', NULL, NULL, '', ''),
(2, 'LA-BIOTECH-2019-001B', 'Water Purifier - Tank Unit', 'Right Side Table Countertop', 'Thermoscientific', '', '', '', '', '', '2012-09-05', '', 0.00, 'PCIEERD DOST', '', '', NULL, '', NULL, NULL, '', ''),
(3, 'LA-BIOTECH-2019-001C', 'Water Purifier - Type I', 'Right Side Table Countertop', 'Thermoscientific', 'tbd', '', '', 'To be fixed', '-power ', '2012-09-05', '', 0.00, 'PCIEERD DOST', '', 'tbd', NULL, '', NULL, NULL, '', ''),
(4, 'LA-BIOTECH-2019-001D', 'Water Purifier - Dispenser', 'Sink Table Countertop', 'Thermoscientific', '', '', '', '', '', '2012-09-05', '', 0.00, 'PCIEERD DOST', '', '', NULL, '', NULL, NULL, '', ''),
(5, 'LA-MNC- UP-001', 'Electrodialysis', 'Left Side Table 3 Countertop', 'Astom', 'Acylizer EX3B', 'EX3B19-063R', '', 'Working', 'Replacement membrane for delivery (as of December 27, 2024)', '2019-10-08', '4900044802', 1551000.00, 'Monde Nissin Corporation', 'Astom Corporation', 'Astom Corporation / Daiki Hosaka (d.hosaka.pd@tokuyamagr.com)\nMembrane replacement c/o Tsubaco Singapore Pte Ltd. / Kevin Lim (kevinlong@tsubaco.com.sg; 10 Toh Guan Road, #02-02/03, Lobby A, Singapore 608838; Mobile: +65 9489 4302; Office: +65 6862 6800; Fax: +65 6862 6820)', NULL, '', NULL, NULL, 'ED', ''),
(6, 'LA-MNC-UP-002', 'Air Compressor', 'Storage Room', 'Vespa', 'MT-275P', '155099', '7.5HP; 1-phase; 250 L cap.; 8kg/cm2 pressure', 'Working', '', '2019-10-08', '4900046112', 101050.00, 'Monde Nissin Corporation', '', '', NULL, '', NULL, NULL, 'none', 'Hard copy available'),
(7, 'LA-MNC-UP-003A', 'Decanter Centrifuge - Main Unit', 'Table 1 Countertop', 'Lemitec', 'MD60Sn', '199', '', 'Working', '', '2019-10-08', '4900044800', 2834205.66, 'Monde Nissin Corporation', 'Lemitec GmBH', 'Lemitec GmBH/ Christian Otto (christian.otto@lemitec.com ; info@lemitec.com)', NULL, '', NULL, NULL, 'none', 'LA-MNC-UP-003A - Decanter Centrifuge.pdf'),
(8, 'LA-MNC-UP-003B', 'Decanter Centrifuge - Control Unit', 'Table 1 Countertop', 'Lemitec', 'CU-MD60-2', '1199', '', 'Working', '', '2019-10-08', '4900044800', 0.00, 'Monde Nissin Corporation', 'Lemitec GmBH', 'Lemitec GmBH/ Christian Otto (christian.otto@lemitec.com ; info@lemitec.com)', NULL, '', NULL, NULL, 'none', ''),
(9, 'LA-MNC-UP-003C', 'Peristaltic Pump (for Decanter Centrifuge)', 'Table 1 Countertop', 'Cole-Parmer Instrument Co.', 'Master Flex 77200-62', '07528-10', 'Accessory to Decanter Centrifuge', 'Working', 'Need to purchase spare silicon hose', '2019-10-08', '4900044800', 0.00, 'Monde Nissin Corporation', 'Lemitec GmBH', 'Lemitec GmBH/ Christian Otto (christian.otto@lemitec.com ; info@lemitec.com)', NULL, '', NULL, NULL, 'none', 'LA-MNC-UP-003C - DC Peristaltic Pump.pdf'),
(10, 'LA-MNC-UP-004', 'Filter Press', 'Front Corner ', 'MW Watermark LLC', 'FP320G32L-6-0.3MXX', 'FP01206', '', 'Working', 'Can perform cleaning as maintenance exercise', '2019-10-08', '4900044804', 788773.80, 'Monde Nissin Corporation', 'MW Watermark, LLC.', '', NULL, '', NULL, NULL, 'none', 'LA-MNC-UP-004 - Filter Press.pdf'),
(11, 'LA-MNC-UP-005', 'Analytic Balance', 'Table 2 Countertop', 'Shimadzu', 'ATY 224', 'D307535484', '', 'Working', 'Need to purchase calibration weights, and external calibration', '2019-10-08', '4900044918', 67800.00, 'Monde Nissin Corporation', 'Noveaulab Asia Corporation', 'Noveaulab / Emmanuel Chio (emmanuel.chio@noveaulab.com / quotations@noveaulab.com)', NULL, '', NULL, NULL, 'none', 'LA-MNC-UP-005 - Analytical Balance.pdf'),
(12, 'LA-MNC-UP-006', 'Water Bath Shaker', 'Left Side Table 3 Countertop', 'LABTECH', 'LSB-045S', '2019070506', '', 'Working', 'Need to perform maintenance exercise', '2019-10-08', '4900044918', 195628.00, 'Monde Nissin Corporation', 'Noveaulab Asia Corporation', 'Noveaulab / Emmanuel Chio (emmanuel.chio@noveaulab.com / quotations@noveaulab.com)', NULL, '', NULL, NULL, 'Shaking Water Bath', 'Hard copy available'),
(13, 'LA-MNC-UP-007', 'Laminar Flow Hood', 'Right Center Corner ', 'Biobase', 'BBS-V1300', 'BBS13V1808148D', '', 'Working', 'Need to purchase replacement Fluorescent light', '2019-10-08', '4900044918', 158000.00, 'Monde Nissin Corporation', 'Noveaulab Asia Corporation', 'Noveaulab / Emmanuel Chio (emmanuel.chio@noveaulab.com / quotations@noveaulab.com)', NULL, '', NULL, NULL, 'Biosafety Cabinet', 'Hard copy available'),
(14, 'LA-MNC-UP-008', 'Autoclave', 'Right Corner 1 ', 'Shanghai Shenan Medical Instrument Factory', 'LDZH-100L', '100G190159', 'Vertical Pressure Steam Sterilizer; 100L cap.', 'To be fixed', 'Accessory step-up transformer requires fixing', '2019-10-08', '4900044792', 162858.90, 'Monde Nissin Corporation', 'Unimac', '', NULL, '', NULL, NULL, 'none', 'Hard copy available'),
(15, 'LA-MNC-UP-009', 'Step-down Transformer 100V', 'Left Side Table 3 Countertop', '*not indicated*', 'EXFA1-0K1P', 'EI.OK-0719-0525', '1KV, 1P cap.; isolation type; primary 220V, secondary 100V', 'Working', '', '2019-10-08', '4900046212', 6950.00, 'Monde Nissin Corporation', 'Trans-Tech Philippines System Corp.', '', NULL, '', NULL, NULL, 'none', 'No manual provided'),
(16, 'LA-MNC-UP-010A', 'Rotary Evaporator - Main Unit', 'Table 3 Countertop', 'Shanghai Better Industry Co. Ltd.', 'RE-52AA', '201908069', '0.5-2L', 'To be fixed', '-temperature sensor and reading, unaligned', '2019-10-08', '4900044792', 304932.90, 'Monde Nissin Corporation', 'Unimac', '', NULL, '', NULL, NULL, 'Vacuum evaporator', 'Hard copy available'),
(17, 'LA-MNC-UP-010B', 'Rotary Evaporator - Vacuum Pump', 'Table 3 Countertop', 'Shanghai Better Industry Co. Ltd.', 'SHZ-D(III)', '1908P68', 'Accessory to Rotary Evaporator', 'Working', '', '2019-10-08', '4900044792', 0.00, 'Monde Nissin Corporation', 'Unimac', '', NULL, '', NULL, NULL, 'Water Vacuum Pump', 'Hard copy available'),
(18, 'LA-MNC-UP-011A', 'Fermenter Component - 2L Double-walled Glass Vessel', 'Left Side Table 1 Countertop', 'Shanghai Bailun', 'BLBIO-2GJGG', '114211', '', 'To be fixed', '-wiring, - lubrication', '2019-10-08', '4900044792', 1110808.20, 'Monde Nissin Corporation', 'Unimac', '', NULL, '', NULL, NULL, 'Fermenter', ''),
(19, 'LA-MNC-UP-011B', 'Fermenter Component - Air Drier', 'Right Corner 1 ', 'Shanghai Bailun', 'JRD-1.5', '190621113', '', 'Working', 'Needs test run', '2019-10-08', '4900044792', 0.00, 'Monde Nissin Corporation', 'Unimac', '', NULL, '', NULL, NULL, 'Air Drier', ''),
(20, 'LA-MNC-UP-011C', 'Fermenter Component - Circulating Pump', 'Front Corner ', 'Shanghai Bailun', 'HCV-51-40', 'BT1908070', '', 'To be fixed', '-pipe leaking', '2019-10-08', '4900044792', 0.00, 'Monde Nissin Corporation', 'Unimac', '', NULL, '', NULL, NULL, 'Low Temp. Circulating Pump', ''),
(21, 'LA-MNC-UP-011D', 'Fermenter Component - Chiller', 'Left Side Table 1, Countertop', 'Shanghai Bailun', 'BLBIO-LD600', 'C19061294', '', 'To be fixed', '-wiring, leaking (due to rat-infestation)', '2019-10-08', '4900044792', 0.00, 'Monde Nissin Corporation', 'Unimac', '', NULL, '', NULL, NULL, 'Chiller', ''),
(22, 'LA-MNC-UP-012', 'Peristaltic Pump', '-', 'Heidolph', 'Hei-FLOW Value 0.1EU', '523-50010-00-5', '', 'Working', 'Needs test run', '2019-10-08', '4900044032', 129339.99, 'Monde Nissin Corporation', 'Yana Chemodities Inc.', '', NULL, '', NULL, NULL, 'Hei Flow Precision 01', ''),
(23, 'LA-MNC-UP-013', 'pH & Conductivity Meter', 'Table 2, Countertop', 'Thermoscientific', 'ORION Star A215', 'X51294', 'Benchtop', 'Working', 'Need to purchase calibration buffers', '2019-10-08', '4900044032', 129600.00, 'Monde Nissin Corporation', 'Yana Chemodities Inc.', '', NULL, '', NULL, NULL, 'pH meter; conductivity meter', ''),
(24, 'LA-MNC-UP-014', 'Convection Oven', 'Left Side Table 2, Countertop', 'Memmert', 'UN55', 'B219.0896', '', 'Working', '', '2019-10-08', '4900044032', 86800.00, 'Monde Nissin Corporation', 'Yana Chemodities Inc.', '', '2025-06-13', '2025-12-13', '2019-07-27', NULL, 'Mechanical convection oven', 'LA-MNC-UP-014 - Memmert Oven.pdf'),
(25, 'LA-MNC-UP-015', 'Incubator', 'Left Side Table 2, Countertop', 'Memmert', 'IN30', 'D119.0215', '', 'Working', '', '2019-10-08', '4900044032', 82443.20, 'Monde Nissin Corporation', 'Yana Chemodities Inc.', '', '2026-06-13', '2026-12-13', '2019-08-31', NULL, 'none', 'LA-MNC-UP-015 - Memmert Incubator.pdf'),
(26, 'LA-MNC-UP-018', 'Tangential Flow Filteration System', 'Table 1,  Countertop', 'Pall', 'SemiAuto CM500 TFF', 'Project No. 05.000874', '', 'Working', 'Needs regular test runs', '2019-11-07', '', 3850000.00, 'Monde Nissin Corporation', 'Yana Chemodities Inc.', '', NULL, '', '2013-03-18', NULL, 'TFF; Ultra Micro Nano Filtration', 'Hard copy available'),
(27, 'LA-UP-015', 'Analog Hot Plate w/Stirrer', 'Left Side Table 2, Countertop', 'Torrey Pines Scientific', 'EcoTherm MRC HS10-04', 'C22.2 No.61010.1', '', 'Working', '', '2019-09-25', '2019-08-646', 30500.00, 'UP Mindanao', 'Golden Bat Far East Inc.', '', NULL, '', NULL, NULL, 'Hot Plate', ''),
(28, 'LA-UP-016', 'Chiller', 'Left Side Table 1, Countertop', 'Fujidenzo', 'SU-35A', '*not indicated*', '', 'Working', 'For cleaning', '2019-10-02', 'to check', 14250.00, 'UP Mindanao', 'RJ Homes', '', NULL, '', NULL, NULL, 'none', ''),
(29, 'LA-UPAUGF-2022-001', 'FTIR', 'Table 2 Countertop', 'Shimadzu', 'tbd', '', '', 'Working', '', NULL, '', 0.00, 'UPMin TTBDO Augmentation', 'Shimadzu Philippines Corp.', 'tbd', NULL, '', NULL, NULL, 'Fourier Transform Infrared Spectroscopy', 'Hard copy available'),
(30, 'LA-UPAUGF-2022-002A', 'Polymerization Reactor - Jacketed Glass Reactor', 'Left Corner 2', '*not indicated*', 'S212-5L', '22125229', 'Set Model: PBM 2022-23; Explosion-proof', 'Working', '', '2023-05-17', '', 0.00, 'UPMin TTBDO Augmentation', 'Rainbud Scientific', '', NULL, '', NULL, NULL, 'Jacketed Glass Hydorthermal Polymerization Reactor', 'Hard copy available'),
(31, 'LA-UPAUGF-2022-002B', 'Polymerization Reactor - Stirring Motor', 'Left Corner 2', 'LABS NOVA', 'EXS212-5L', '22125229', 'Set Model: PBM 2022-23;90W; 0-1400RPM; 220V/50Hz', 'Working', '', '2023-05-17', '', 0.00, 'UPMin TTBDO Augmentation', 'Rainbud Scientific', '', NULL, '', NULL, NULL, '', 'Hard copy available'),
(32, 'LA-UPAUGF-2022-002C', 'Polymerization Reactor - Heating Circulator', 'Left Corner 2', 'LABS NOVA', 'GY-5L', '22125230', 'Set Model: PBM 2022-23; 220V/60Hz; 2KW', 'Working', '', '2023-05-17', '', 0.00, 'UPMin TTBDO Augmentation', 'Rainbud Scientific', '', NULL, '', NULL, NULL, 'Heater', 'Hard copy available'),
(33, 'LA-UPAUGF-2022-002D', 'Polymerization Reactor - Cooling Chiller', 'Left Corner 2', 'LABS NOVA', 'DLSB-5/30', '22121275', 'Set Model: PBM 2022-23; 887W; 220V/60Hz; 5A', 'Working', '', '2023-05-17', '', 0.00, 'UPMin TTBDO Augmentation', 'Rainbud Scientific', '', NULL, '', NULL, NULL, 'Chiller', 'Hard copy available'),
(34, 'LA-UPAUGF-2022-002E', 'Polymerization Reactor - Rotary Vane Pump Vacuum', 'Table 3, Countertop', 'LABS NOVA', '2XZ-1', '2122', 'Set Model: PBM 2022-23; 1L/s pumping speed; 1720 r/min rev. speed; 1.33 Pa ultimate pressure;   0.25 kW', 'To be fixed', '', '2023-05-17', '', 0.00, 'UPMin TTBDO Augmentation', 'Rainbud Scientific', '', NULL, '', NULL, NULL, 'Vacuum Pump', 'Hard copy available'),
(35, 'LA-UPAUGF-2022-003', 'Digital Ultrasonic Cleaner', 'Table 2, Countertop', 'Biobase', 'UC-40A', 'UC40A2308133', '220V/60Hz', 'Working', 'For cleaning', '2023-10-11', '', 24510.00, 'UPMin TTBDO Augmentation', 'Noveaulab Asia Corporation', 'Noveaulab / Emmanuel Chio (emmanuel.chio@noveaulab.com / quotations@noveaulab.com)', NULL, '', NULL, NULL, 'Sonicator', 'Hard copy available'),
(36, 'LA-UPAUGF-2024-001', 'Polymerization Reactor - Rotary Vane Pump Vacuum', 'Left Corner 2', '*not indicated*', '2XZ-1', '2122', '220V/60Hz; <6x10-2Pa ultimate pressure; 1L/s pumping speed; 0.25 kW motor power; 1720 r/min rotational speed', 'Working', 'Replacement for LA-UPAUGF-2022-002E', NULL, '', 0.00, '', '', '', NULL, '', NULL, NULL, 'Vacuum Pump', ''),
(37, 'LA-UPAUGF-2024-002', 'Magnetic Stirrer with Heating', 'Left Side Table 2, Countertop', 'JOANLAB', 'HS-19', '2024050214', '220V; 50/60Hz; 600W; 5L stirring cap.; 19x19 plate size; anti-corrision ceramic plate; 200-2000 RPM', 'Working', '', '2024-12-10', '', 0.00, 'UPMin TTBDO Augmentation', 'Rainbud Scientific', 'Rainbud Scientific', NULL, '', NULL, NULL, 'Hot Plate', 'Hard copy available'),
(38, '', 'Fermenter (30L)', 'Right Corner 2', 'tbd', 'tbd', '', '', 'To be fixed', 'tbd', NULL, '', 0.00, '', '', '', NULL, '', NULL, NULL, 'none', ''),
(39, '', 'HPLC- Column Oven', 'Left Side Table 4, Countertop', 'Shimadzu', 'CTO-10 ASVP 230V', 'C21045311419', '', 'Working', '', '2012-10-29', '', 109760.00, '', 'Shimadzu Philippines Corp.', 'tbd', NULL, '', NULL, NULL, 'High Performance Liquid Chromatography', 'Hard copy available'),
(40, '', 'HPLC- Prominence UV-Vis Detectoor', 'Left Side Table 4, Countertop', 'Shimadzu', 'SPD-20AV', 'L20144400827 AE', '', 'Working', '', '2018-01-01', '', 2500000.00, '', 'Shimadzu Philippines Corp.', '', NULL, '', NULL, NULL, 'High Performance Liquid Chromatography', 'Hard copy available'),
(41, '', 'HPLC- Refractive Index Detector', 'Left Side Table 4, Countertop', 'Shimadzu', 'RID-10A', 'C20934505493 CD', '', 'Working', '', '2018-01-01', '', 0.00, '', 'Shimadzu Philippines Corp.', '', NULL, '', NULL, NULL, 'High Performance Liquid Chromatography', ''),
(42, '', 'HPLC- Prominence Diode Array Detector', 'Left Side Table 4, Countertop', 'Shimadzu', 'SPD-M20A 230V', 'L201455009758 AE', '', 'Working', '', '2018-01-03', '', 1386896.00, 'PCIEERD DOST', 'Shimadzu Philippines Corp.', '', NULL, '', NULL, NULL, 'High Performance Liquid Chromatography', 'Hard copy available '),
(43, '', 'HPLC- System Reservoir Tray', 'Left Side Table 4, Countertop', 'Shimadzu', 'RESERVOIR TRAY', 'L20304508888 SL', '', 'Working', '', NULL, '', 0.00, '', 'Shimadzu Philippines Corp.', '', NULL, '', NULL, NULL, 'High Performance Liquid Chromatography', ''),
(44, '', 'HPLC- Prominence Degasser', 'Left Side Table 4, Countertop', 'Shimadzu', 'GDGU-2083', 'L20254506081 CR', '', 'Working', '', NULL, '', 2500000.00, '', 'Shimadzu Philippines Corp.', '', NULL, '', NULL, NULL, 'High Performance Liquid Chromatography', ''),
(45, '', 'HPLC- Prominence Liquid Chromatograph A', 'Left Side Table 4, Countertop', 'Shimadzu', 'LC-20AD', 'L20104508212 AE', '', 'Working', '', NULL, '', 0.00, '', 'Shimadzu Philippines Corp.', '', NULL, '', NULL, NULL, 'High Performance Liquid Chromatography', 'Hard copy available'),
(46, '', 'HPLC- Prominence Liquid Chromatograph B', 'Left Side Table 4, Countertop', 'Shimadzu', 'LC-20AD', 'L20104508212 AE', '', 'Working', '', NULL, '', 0.00, '', 'Shimadzu Philippines Corp.', '', NULL, '', NULL, NULL, 'High Performance Liquid Chromatography', 'Hard copy available'),
(47, '', 'HPLC- Prominence Communications Bus Module', 'Left Side Table 4, Countertop', 'Shimadzu', 'CBM-20A', 'L20235016998 CD', '', 'Working', '', NULL, '', 269920.00, 'PCIEERD DOST', 'Shimadzu Philippines Corp.', '', NULL, '', NULL, NULL, 'High Performance Liquid Chromatography', 'Hard copy available'),
(48, '', '3D Printer ', 'Table 3, Countertop', 'Flashforge', '', '', '', '', '', NULL, '', 0.00, '', '', '', NULL, '', NULL, NULL, '', ''),
(49, '', 'Microscope ', 'Table 2, Countertop', '', '', '', '', '', '', NULL, '', 0.00, '', '', '', NULL, '', NULL, NULL, '', '');

-- --------------------------------------------------------

--
-- Table structure for table `instruments`
--

CREATE TABLE `instruments` (
  `instrument_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `unit` varchar(10) DEFAULT NULL,
  `capacity` varchar(100) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `condition` varchar(50) DEFAULT NULL,
  `remarks` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `instruments`
--

INSERT INTO `instruments` (`instrument_id`, `name`, `brand`, `description`, `location`, `quantity`, `unit`, `capacity`, `status`, `condition`, `remarks`) VALUES
(1, '2L Plastic Jar ', 'ThermoFisher', 'Plasticware', 'Left Side Table 2, Cabinet 1', 3, '', '2L', 'Used', 'Good', ''),
(2, '1L Plastic Jar ', 'Sigma-Aldrich', 'Plasticware', 'Left Side Table 2, Cabinet 1', 6, '', '1L', 'Used', 'Good', ''),
(3, '500 mL Plastic Jar', NULL, 'Plasticware', 'Left Side Table 2, Cabinet 1', 6, '', '500 mL', 'Used', 'Good', ''),
(4, '250 mL Plastic Jar ', NULL, 'Plasticware', 'Left Side Table 2, Cabinet 1', 6, '', '250 mL', 'Used', 'Good', ''),
(5, '0.45 µm Syringe Filter', 'Corning', '', 'Left Side Table 2, Cabinet 2', 1, 'box', '0.45 µm', 'Opened, unused', 'Good', ''),
(6, '0.2 µm Syringe Filter', NULL, '', 'Left Side Table 2, Cabinet 2', 1, 'box', '0.2  µm', 'Opened, unused', 'Good', ''),
(7, 'Disposable Non-Sterile Syringe Filter', NULL, 'Plasticware', 'Left Side Table 2, Cabinet 2', 500, '', '25 mm diameter', 'Unused ', 'Good', ''),
(8, '25 mm Syringe Filter Holder', NULL, 'Plasticware', 'Left Side Table 2, Cabinet 2', 5, '', '25 mm diameter', 'Unused ', 'Good', ''),
(9, '500 mL Vacum Driven Disposable Bottle Top Filter', NULL, 'Plasticware', 'Left Side Table 2, Cabinet 2', 4, '', '500 ml', 'Sealed', 'Good', ''),
(10, '500 mL Vacum Driven Disposable Bottle Top Filter', NULL, 'Plasticware', 'Left Side Table 2, Cabinet 2', 1, '', '500 mL', 'Opened', 'Good', ''),
(11, 'Dessicants ', NULL, '', 'Left Side Table 2, Cabinet 2', 6, 'sachet', '', 'Unused ', '', ''),
(12, 'Blood Collection Tubes ', NULL, '', 'Left Side Table 2, Cabinet 2', 1, 'box', '', 'Sealed', 'Good', ''),
(13, '1.5 mL Vials without screwcaps', NULL, 'Glassware ', 'Left Side Table 2, Cabinet 2', 1, 'box', '1.5 mL', 'Sealed', 'Good', ''),
(14, 'Screwcaps for Vials ', NULL, 'Plasticware', 'Left Side Table 2, Cabinet 2', 1, 'sachet', '', 'Sealed', 'Good', ''),
(15, 'Vials with screwcaps ', NULL, 'Glassware', 'Left Side Table 2, Cabinet 2', 29, 'pc', '', 'Unused ', 'Good', ''),
(16, 'Iron Ring', NULL, '', 'Left Side Table 2, Cabinet 3', 2, '', '', 'Used', 'Good', ''),
(17, 'Test Tube Clamp', NULL, 'Small', 'Left Side Table 2, Cabinet 3', 1, '', '', 'Used', 'Good', ''),
(18, 'Tongs', NULL, '', 'Left Side Table 2, Drawer 1', 3, '', '', 'Used', 'Good', ''),
(19, 'Alcohol Lamp', NULL, 'Glassware', 'Left Side Table 2, Drawer 2', 4, '', '', 'Used', 'Good', ''),
(20, 'Wire Gauze', NULL, '', 'Left Side Table 2, Drawer 2', 1, '', '', 'Used', 'Good', ''),
(21, 'Crucibles ', NULL, '', 'Left Side Table 2, Drawer 2', 10, '', '', 'Used', 'Good', ''),
(22, 'Iron Stand', NULL, '', 'Left Side Table 2, Drawer 3', 2, '', '', '', '', ''),
(23, 'Iron Clamp', NULL, 'Large', 'Left Side Table 2, Drawer 3', 2, 'clamp', '', '', '', ''),
(24, 'Empty Glass Jar', NULL, 'No Cap', 'Left Side Table 3, Cabinet 1', 24, 'pc', '', 'Unused', '', ''),
(25, '25 mL Serological Pipet', NULL, '25 mL in 1/2 mL', 'Left Side Table 3, Cabinet 1', 3, 'bag', '25 mL', 'Unopened', '', ''),
(26, '1000 mL Filtering Flask ', NULL, 'Glassware', 'Left Side Table 4, Cabinet 1', 2, '', '1000 mL', 'Used', 'Good', ''),
(27, '500 mL Filtering Flask ', NULL, 'Glassware', 'Left Side Table 4, Cabinet 1', 1, '', '500 mL', 'Used', 'Good', ''),
(28, 'Wash Bottle', NULL, '', 'Refrigerator', 2, '', '', 'Used', 'Good', ''),
(29, 'Culture Plate ', NULL, 'Plastic, 12 22mm Well with Lid, Flat Bottom', 'Table 1, Cabinet 4', 18, '', '', 'Unopened', 'Good', ''),
(30, ' Dounce Homogenizer', NULL, 'Glassware', 'Table 1, Cabinet 4', 4, '', '50 mL', 'Used', 'Good', ''),
(31, ' Dounce Homogenizer', NULL, 'Glassware', 'Table 1, Cabinet 4', 2, '', '30 mL', 'Used', 'Good', ''),
(32, ' Dounce Homogenizer', NULL, 'Glassware', 'Table 1, Cabinet 4', 3, '', '10 mL', 'Used', 'Good', ''),
(33, ' Dounce Homogenizer', NULL, 'Glassware', 'Table 1, Cabinet 4', 6, '', '5 mL', 'Used', 'Good', ''),
(34, 'Dounce Tissue Grinder (Pestle B Small Clearnace)', NULL, 'Glassware', 'Table 1, Cabinet 4', 1, '', '', 'Used', 'Good', ''),
(35, '15 mL Tenbroeck Homogenizer Tissue Grinder ', NULL, 'Glassware', 'Table 1, Cabinet 4', 1, '', '15 mL', 'Used', 'Good', ''),
(36, 'Soxhlet Extrator', NULL, 'Glassware', 'Table 1, Cabinet 4', 4, '', '', '', 'Good', ''),
(37, '1000 mL Separatory Funnel', NULL, 'Glassware', 'Table 1, Cabinet 4', 1, 'pc', '1000 mL', 'Tip Chipped', 'Poor', ''),
(38, '2000 mL Beaker  ', NULL, 'Glassware', 'Table 2, Cabinet 1', 3, 'pc', '2000 mL', 'Used', 'Good', ''),
(39, '1000 mL Beaker ', NULL, 'Glassware', 'Table 2, Cabinet 1', 3, 'pc', '1000 ml', 'Used', 'Good', ''),
(40, '800 mL Beaker ', NULL, 'Glassware', 'Table 2, Cabinet 1', 1, 'pc', '800 mL', 'Used', 'Good', ''),
(41, '1000 mL Plastic Beaker ', NULL, 'Plasticware', 'Table 2, Cabinet 1', 5, 'pc', '1000 mL', 'Used', 'Good', ''),
(42, '500 mL Plastic Beaker ', NULL, 'Plasticware', 'Table 2, Cabinet 1', 4, 'pc', '500 mL', 'Used', 'Good', ''),
(43, '2000 mL Erlenmeyer Flask ', NULL, 'without screwcap', 'Table 2, Cabinet 1', 6, 'pc', '2000 mL', 'Used', 'Good', ''),
(44, '1000 mL Erlenmeyer Flask ', NULL, 'without screwcap', 'Table 2, Cabinet 1', 3, 'pc', '1000 mL', 'Used', 'Good', ''),
(45, '500 mL Erlenmeyer Flask ', NULL, 'without screwcap', 'Table 2, Cabinet 1', 5, 'pc', '500 mL', 'Used', 'Good', ''),
(46, '1000 mL Erlenmeyer Flask ', NULL, 'with glass cap ', 'Table 2, Cabinet 1', 1, 'pc', '1000 mL', 'Used', 'Good', ''),
(47, '1000 mL Erlenmeyer Flask ', NULL, 'with screwcap', 'Table 2, Cabinet 1', 3, 'pc', '1000 mL', 'Used', 'Good', ''),
(48, '500 mL Reagent Bottle ', NULL, 'with screwcap', 'Table 2, Cabinet 2', 3, 'pc', '500 mL', 'Used', 'Good', ''),
(49, '1000 mL Rotary Flask', NULL, 'Glassware', 'Table 2, Cabinet 2', 2, 'pc', '1000 mL', 'Used', 'Good', ''),
(50, '1000 mL Rotary Flask', NULL, 'Glassware', 'Table 2, Cabinet 2', 1, 'pc', '1000 mL', 'Broken', 'Poor', 'For Disposal'),
(51, '500 mL Rotary Flask', NULL, 'Glassware', 'Table 2, Cabinet 2', 1, 'pc', '500 mL', 'Used', 'Good', ''),
(52, '100 mL Volumetric Flask', NULL, 'Glassware', 'Table 2, Cabinet 2', 2, 'pc', '100 mL', 'Used', 'Good', ''),
(53, '2000 mL Reagent Bottle ', NULL, 'with screwcap', 'Table 2, Cabinet 2', 1, 'pc', '2000 mL', 'Opened, unused', 'Good', ''),
(54, '1000 mL Reagent Bottle ', NULL, 'with screwcap', 'Table 2, Cabinet 2', 2, 'pc', '1000 mL', 'Opened, unused', 'Good', ''),
(55, '1000 mL Round Bottom Flask ', NULL, 'Glassware', 'Table 2, Cabinet 2', 4, 'pc', '1000 mL', 'Used', 'Good', ''),
(56, '500 mL Round Bottom Flask ', NULL, 'Glassware', 'Table 2, Cabinet 2', 2, 'pc', '500 mL', 'Used', 'Good', ''),
(57, '50 mL Volumetric Flask', NULL, 'Glassware', 'Table 2, Cabinet 2', 1, 'pc', '50 mL', 'Used', 'Good', ''),
(58, 'Test Tube Racks ', NULL, '12 x 5 Holes', 'Table 2, Cabinet 2', 2, '', '', 'Used', 'Good', ''),
(59, 'Test Tube Racks', NULL, '10 x 4 Holes', 'Table 2, Cabinet 2', 2, '', '', 'Used', 'Good', ''),
(60, 'Test Tube', NULL, ' with screwcap ', 'Table 2, Cabinet 2', 3, 'rack', '', 'Opened, unused', 'Good', ''),
(61, 'Test Tube ', NULL, ' without  screwcap ', 'Table 2, Cabinet 2', 20, '', '', 'Opened, unused', 'Good', ''),
(62, '10mL Graduated Cylinder', NULL, 'Glassware', 'Table 2, Cabinet 2', 1, '', '10 mL', 'Used', 'Good', ''),
(63, '25mL Graduated Cylinder', NULL, 'Glassware', 'Table 2, Cabinet 2', 1, '', '10 mL', 'Used', 'Good', ''),
(64, 'Desiccator', NULL, 'Glassware', 'Table 2, Countertop', 1, '', '', 'Used', 'Good', ''),
(65, 'Tissue Culture Dish', NULL, 'Tissue Cultue', 'Table 2, Drawer 1', 6, 'pc', '', 'Opened, unused', 'Good', ''),
(66, 'Petridish', NULL, 'Tissue Cultue', 'Table 2, Drawer 1', 31, 'pc', '', 'Opened, unused', 'Good', ''),
(67, 'Magnetic Stir Bar ', NULL, '', 'Table 2, Drawer 2', 13, 'pc', '', 'Used', 'Good', ''),
(68, 'Magnetic Stir Bar Retriever', NULL, '', 'Table 2, Drawer 2', 3, 'pc', '', 'Used', 'Good', ''),
(69, 'Mortar and Pestle', NULL, '', 'Table 2, Drawer 2', 1, 'pc', '', 'Used', 'Good', ''),
(70, 'Aspirator', NULL, 'Pipeting', 'Table 2, Drawer 2', 5, 'pc', '', 'Used', 'Good', ''),
(71, '2 mL Pipettes', NULL, 'Glassware', 'Table 2, Drawer 2', 2, '', '2 mL', 'Used', 'Good', ''),
(72, '5 mL Pipettes', NULL, 'Glassware', 'Table 2, Drawer 2', 2, '', '5 mL', 'Used', 'Good', ''),
(73, '10 mL Pipettes', NULL, 'Glassware', 'Table 2, Drawer 2', 1, '', '10 mL', 'Used', 'Good', ''),
(74, 'L-rod (large)', NULL, 'Large', 'Table 2, Drawer 2', 6, '', '', 'Used', 'Good', ''),
(75, 'L-rod (small)', NULL, 'Small', 'Table 2, Drawer 2', 5, '', '', 'Used', 'Good', ''),
(76, 'Laboratory Spatula (22cm)', NULL, '22 cm', 'Table 2, Drawer 2', 4, '', '', 'Used', 'Good', ''),
(77, 'Inoculation Loop', NULL, '', 'Table 2, Drawer 2', 5, '', '', 'Used', 'Good', ''),
(78, 'Y Connector Tube', NULL, '', 'Table 2, Drawer 2', 1, '', '', 'Used', 'Good', ''),
(79, 'Filtering Funnel ', NULL, 'large', 'Table 2, Drawer 2', 1, '', '', 'Used', 'Good', ''),
(80, 'Filtering Funnel ', NULL, 'small', 'Table 2, Drawer 2', 1, '', '', 'Used', 'Good', ''),
(81, 'Filtering Funnel ', NULL, 'small', 'Table 2, Drawer 2', 1, '', '', 'Tip Chipped', 'Poor', 'For Disposal'),
(82, 'Stirring Rod', NULL, 'Glassware', 'Table 2, Drawer 2', 7, '', '', 'Used', 'Good', ''),
(83, 'Microscope Cover slides', NULL, '', 'Table 2, Drawer 2', 0, '', '', 'Opened, unused', 'Good', ''),
(84, 'Microscope slides', NULL, '', 'Table 2, Drawer 2', 3, 'pack', '', 'Opened, unused', 'Good', ''),
(85, 'Laboratory Thermometer', NULL, 'Glassware', 'Table 2, Drawer 2', 1, '', '', 'Used', 'Good', ''),
(86, '250 mL Beaker', NULL, 'Glassware', 'Table 2, Drawer 3', 3, 'pc', '250 mL', 'Used', 'Good', ''),
(87, '100 mL Beaker', NULL, 'Glassware', 'Table 2, Drawer 3', 1, 'pc', '100 mL', 'Used', 'Good', ''),
(88, 'Test Tube (with screwcap)', NULL, 'with screwcap', 'Table 2, Drawer 3', 2, 'rack', '', 'Opened, unused', 'Good', ''),
(89, 'Test Tube Racks', NULL, '', 'Table 2, Drawer 3', 2, '', '', 'Used', 'Good', ''),
(90, '250 mL Beaker ', NULL, 'Glassware', 'Table 2, Drawer 3', 1, '', '250 mL', 'Used', 'Good', ''),
(91, '150 mL Beaker', NULL, 'Glassware', 'Table 2, Drawer 3', 2, '', '150 mL', 'Used', 'Good', ''),
(92, '100 mL Beaker ', NULL, 'Glassware', 'Table 2, Drawer 3', 4, '', '100 mL', 'Used', 'Good', ''),
(93, '50 mL Beaker ', NULL, 'Glassware', 'Table 2, Drawer 3', 2, '', '50 mL', 'Used', 'Good', ''),
(94, '50 mL Erlenmeyer Flask', NULL, 'Glassware', 'Table 2, Drawer 3', 2, '', '250 mL', 'Used', 'Good', ''),
(95, '125 mL Erlenmeyer Flask', NULL, 'Glassware', 'Table 2, Drawer 3', 7, '', '125 ml', 'Used', 'Good', ''),
(96, '50 mL Erlenmeyer Flask', NULL, 'Glassware', 'Table 2, Drawer 3', 2, '', '50 mL', 'Used', 'Good', ''),
(97, '25 mL Erlenmeyer Flask', NULL, 'Glassware', 'Table 2, Drawer 3', 3, '', '25 mL', 'Used', 'Good', ''),
(98, '250 mL Erlenmeyer Flask', NULL, 'Glassware', 'Table 2, Drawer 3', 2, '', '250 mL', 'Used', 'Good', ''),
(99, '250 mL Round Bottom Flask ', NULL, 'Glassware', 'Table 2, Drawer 3', 1, '', '250 mL', 'Used', 'Good', ''),
(100, '100 mL Round Bottom Flask ', NULL, 'Glassware', 'Table 2, Drawer 3', 2, '', '100 mL', 'Used', 'Good', ''),
(101, '100 mL Graduated Reagent Bottle ', NULL, 'with screwcap', 'Table 2, Drawer 3', 4, '', '100mL', 'Used', 'Good', ''),
(102, 'Quartz Glass Tube ', NULL, '', 'Table 2, Drawer 4', 10, '', '', 'Opened, unused', 'Good', ''),
(103, 'Glass Stopper', NULL, '', 'Table 2, Drawer 4', 4, '', '', 'Opened, unused', 'Good', ''),
(104, 'Connecting adapter ', NULL, 'large', 'Table 2, Drawer 4', 4, '', '', 'Used', 'Good', ''),
(105, 'Connecting adapter', NULL, 'small', 'Table 2, Drawer 4', 3, '', '', 'Used', 'Good', ''),
(106, 'Culture Flask ', NULL, 'with lid', 'Table 2, Drawer 4', 4, '', '', 'Opened, unused', 'Good', ''),
(107, 'Culture Flask ', NULL, 'without lid', 'Table 2, Drawer 4', 7, '', '', 'Opened, unused', 'Good', ''),
(108, 'Tube 6 x 50 ', NULL, '', 'Table 2, Drawer 4', 1, 'pack', '', 'Opened, unused', 'Good', ''),
(109, 'Culture Plate ', NULL, 'Plastic, 12 22mm Well with Lid, Flat Bottom', 'Table 2, Drawer 4', 16, '', '', 'Opened, unused', 'Good', ''),
(110, 'Culture Plate ', NULL, 'Plastic, 36 Well with Lid, Flat Bottom', 'Table 2, Drawer 4', 1, '', '', 'Opened, unused', 'Good', ''),
(111, 'Plastic Stopper ', NULL, 'Plasticware', 'Table 2, Drawer 4 ', 3, '', '', 'Used', 'Good', ''),
(112, '50 mL Conical Centrifuge Tube', NULL, '', 'Table 2, Drawer 8', 7, '', '50 mL', 'Opened, unused', 'Good', ''),
(113, '15 mL Conical Centrifuge Tube', NULL, 'Plasticware', 'Table 2, Drawer 8', 0, '', '', 'Unused ', 'Good', ''),
(114, '1000 mL Graduated Cylinder ', NULL, 'Plasticware', 'Table 3, Cabinet 1', 4, '', '1000 mL', 'Opened, unused', 'Good', ''),
(115, '500 mL Graduated Cylinder ', NULL, 'Plasticware', 'Table 3, Cabinet 1', 4, '', '500 mL', 'Opened, unused', 'Good', ''),
(116, '250 mL Graduated Cylinder ', NULL, 'Plasticware', 'Table 3, Cabinet 1', 3, '', '250 mL', 'Opened, unused', 'Good', ''),
(117, '1000 mL Graduated Cylinder ', NULL, 'Glassware', 'Table 3, Cabinet 1', 2, '', '1000 mL', 'Opened, unused', 'Good', ''),
(118, '500 mL Graduated Cylinder', NULL, 'Glassware', 'Table 3, Cabinet 1', 2, '', '500 mL', 'Opened, unused', 'Good', ''),
(119, ' 500 mL Graduated Cylinder', NULL, 'Glassware', 'Table 3, Cabinet 1', 1, '', '500 mL', 'Broken', 'Poor', 'For Disposal'),
(120, '250 mL Graduated Cylinder ', NULL, 'Glassware', 'Table 3, Cabinet 1', 3, '', '250 mL', 'Opened, unused', 'Good', ''),
(121, '100 mL Graduated Cylinder ', NULL, 'Glassware', 'Table 3, Cabinet 1', 1, '', '100 mL', 'Broken', 'Poor', 'For Disposal'),
(122, '6000 mL Erlenmeyer Flask ', NULL, 'Glassware', 'Table 3, Cabinet 1', 2, '', '6000 mL', 'Used', 'Good', ''),
(123, '500 mL Volumetric Flask ', NULL, 'Glassware', 'Table 3, Cabinet 1', 1, '', '', 'Used', 'Good', ''),
(124, '1L Volumetric Flask ', NULL, 'Glassware', 'Table 3, Cabinet 1', 2, '', '', 'Used', 'Good', ''),
(125, '1000 mL Graduated Cylinder ', NULL, 'Glassware', 'Table 3, Cabinet 1', 2, '', '1000 mL', 'Broken', 'Poor', 'For Disposal'),
(126, 'Wash Bottle', NULL, '', 'Table 3, Countertop', 2, '', '', 'Used', 'Good', ''),
(127, 'Peek Tubing', NULL, '', 'Table 3, Drawer 1 ', 1, '', '', 'Unused ', 'Good', ''),
(128, 'Rubber Stopper', NULL, '', 'Table 3, Drawer 1 ', 1, 'bag', '', 'Opened, unused', 'Good', ''),
(129, 'Drilled Stopper', NULL, '', 'Table 3, Drawer 1 ', 1, 'bag', '', 'Opened, unused', 'Good', ''),
(130, 'Glass Tubing with Rubber Stopper', NULL, '', 'Table 3, Drawer 1 ', 11, '', '', 'Tip Chipped', 'Poor', 'For Disposal'),
(131, '10 - 100 µl micropipettes', NULL, '', 'Table 3, Drawer 2', 1, 'pcs', '', 'Opened, unused', 'Poor', ''),
(132, '100 - 1000 µl micropipettes', NULL, '', 'Table 3, Drawer 2', 1, 'pcs', '', 'Opened, unused', 'Good', ''),
(133, '200 - 1000 µl micropipettes', NULL, '', 'Table 3, Drawer 2', 1, 'pcs', '', 'Opened, unused', 'Good', ''),
(134, 'Finnpipette', NULL, '', 'Table 3, Drawer 2', 1, '', '', 'Opened, unused', 'Good', ''),
(135, 'Micropipette tips ', NULL, '', 'Table 3, Drawer 2', 1, 'bag', '', 'Opened, unused', 'Good', ''),
(136, 'Microcentrifuge Tubes', NULL, '', 'Table 3, Drawer 2', 1, 'bag', '', 'Opened, unused', 'Good', ''),
(137, 'Screw Cap Transportation Tubea', NULL, '', 'Table 3, Drawer 2', 1, 'bag', '', 'Opened, used', '', ''),
(138, 'Disposable Cuvettes', NULL, '', 'Table 3, Drawer 3', 2, 'box', '', 'Opened, unused', 'Good', ''),
(139, 'Pipettor Tips Set', NULL, '', 'Table 3, Drawer 3', 9, 'box', '', 'Opened, unused', 'Good', ''),
(140, '25 mL Serological Pipet', NULL, '25 mL in 1/2 mL', 'Table 3, Drawer 6', 0, '', '25 mL', 'Unopened', '', ''),
(141, '25 mL Serological Pipet', NULL, '25 mL in 1/2 mL', 'Table 3, Drawer 7', 0, '', '25 mL', 'Opened, unused', '', ''),
(142, '1 mL Serological Pipet', NULL, '1 mL in 1/10 mL', 'Table 3, Drawer 7', 0, '', '1 mL', 'Opened', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `supplies`
--

CREATE TABLE `supplies` (
  `supply_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `remaining_qty` varchar(100) DEFAULT NULL,
  `unit` varchar(10) NOT NULL,
  `date_received` date DEFAULT NULL,
  `expiration_date` date DEFAULT NULL,
  `received_by` varchar(100) DEFAULT NULL,
  `po_no` varchar(100) DEFAULT NULL,
  `unit_price` decimal(12,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `total_price` decimal(12,2) DEFAULT NULL,
  `supplier` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `date_opened` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplies`
--

INSERT INTO `supplies` (`supply_id`, `name`, `category`, `brand`, `description`, `remaining_qty`, `unit`, `date_received`, `expiration_date`, `received_by`, `po_no`, `unit_price`, `quantity`, `total_price`, `supplier`, `location`, `date_opened`) VALUES
(1, 'Kimwipes ', 'Consumables', 'Kimtech', '11x21 cm, 280 Pulls', '17', 'box', NULL, NULL, '', '', 0.00, 0, 0.00, '', 'Table 3, Drawer 4', NULL),
(2, 'Kimwipes', 'Consumables', 'Kimtech', '11x21 cm, 280 Pulls', '1', 'box', NULL, NULL, '', '', 0.00, 0, 0.00, '', 'Table 3, Drawer 4', NULL),
(3, 'Aerobic Count Plate', 'Consumables', 'Petrifilm', '50 Sheets', '1', 'pack', NULL, NULL, '', '', 0.00, 0, 0.00, '', 'Table 2, Drawer 1', NULL),
(4, 'Rpid Yeast and Mold Count Plate', 'Consumables', 'Petrifilm', '25 Sheets', '1', 'pack', NULL, '2025-09-03', '', '', 0.00, 0, 0.00, '', 'Table 2, Drawer 1', NULL),
(5, 'Absorbent Cotton Roll', 'Consumables', 'Rosemed', '', '1', 'roll', NULL, NULL, '', '', 0.00, 0, 0.00, '', 'Table 2, Drawer 7', NULL),
(6, 'Nitrile Examination Gloves ', 'Consumables', 'Indoplas', 'XL 90, 100 Gloves per Box', '6', 'box', NULL, '2025-03-01', '', '', 0.00, 0, 0.00, '', 'Table 2, Drawer 6', NULL),
(7, 'Gauze Bandage ', 'Consumables', 'Rosemed', '4x10 YDS, Mesh 24x20, ', '3', 'box', NULL, NULL, '', '', 0.00, 0, 0.00, '', 'Table 3, Drawer 4', NULL),
(8, 'Disposable Face Masks ', 'Consumables', 'N/A', '3-Layer Mask, White, 50 pcs per Box', '2', 'box', NULL, NULL, '', '', 0.00, 0, 0.00, '', 'Table 2, Drawer 6 ', NULL),
(9, 'Disposable Face Masks ', 'Consumables', 'Aidelai', '17.5x9.5 cm, White, 50 pcs per Box', '10', 'box', NULL, NULL, '', '', 0.00, 0, 0.00, '', 'Table 2, Drawer 6', NULL),
(10, 'Interfolded Hand Towels', 'Consumables', '', '175 pulls', '1', 'pack', '2024-11-13', NULL, 'Ray Adona', '2024-10-1942', 52.00, 20, 1050.00, 'Prince Educational Supply', 'Left Side Table 2, Cabinet 2', NULL),
(11, 'Interfolded Hand Towels', 'Consumables', 'Femme', '175 pulls, 200mmx200mm', '1', 'pack', '2025-06-02', NULL, 'Laboratory Interns', '', 0.00, 0, 0.00, '', 'Left Side Table 2, Cabinet 3', NULL),
(12, 'Interfolded Hand Towels', 'Consumables', 'Femme', '175 pulls, 200mmx200mm', '30', 'pack', '2025-07-07', NULL, 'Pretty Lou Malida', '', 0.00, 30, 0.00, '', 'Left Side Table 2, Cabinet 4', NULL),
(13, 'Filter Papers 1 ', 'Consumables', 'Whatman', 'Diameter: 125mm, 100 circles per box', '3', 'box', NULL, NULL, '', '', 0.00, 0, 0.00, '', 'Table 3, Drawer 1', NULL),
(14, 'Filter Papers 2', 'Consumables', 'Whatman', 'Diameter: 125mm, 100 circles per box', '1', 'box', NULL, NULL, '', '', 0.00, 0, 0.00, '', 'Table 3, Drawer 1', NULL),
(15, 'Filter Papers 1 ', 'Consumables', 'Whatman', 'Diameter: 55mm, 100 circles per box', '5', 'box', '2024-01-23', NULL, '', '', 0.00, 0, 0.00, '', 'Table 3, Drawer 1', NULL),
(16, 'Filter Papers 2', 'Consumables', 'Whatman', 'Diameter: 55mm, 100 circles per box', '5', 'box', NULL, NULL, '', '', 0.00, 0, 0.00, '', 'Table 3, Drawer 1', NULL),
(17, 'Sterilized Membrane Filters', 'Consumables', 'Pall', 'Diameter: 47mm, FR: 0.45 micrometer, 200 per box', '1', 'box', '2023-09-26', '2025-02-01', '', '', 0.00, 0, 0.00, '', 'Left Side Table 2, Drawer 2', NULL),
(18, 'Membrane Filters Nylon', 'Consumables', 'Omicron', 'Diameter: 47mm, FR: 0.45 micrometer, 100 per box', '1', 'box', NULL, NULL, '', '', 0.00, 0, 0.00, '', 'Left Side Table 2, Drawer 2', NULL),
(19, 'Laboratory Film', 'Consumables', 'Seal-R-film', '', '1', 'roll', NULL, NULL, '', '', 0.00, 0, 0.00, '', 'Table 1, Drawer 3', NULL),
(20, 'Dishwashing Liquid', 'Consumables', 'Dewdrops', 'Dewdrops; Lemon Scent; 1 gal per container (3.79L);', '', '', '2024-11-13', NULL, 'Ray Adona', '2024-10-1942', 245.00, 3, 735.00, 'Prince Educational Supply', 'Sink', NULL),
(21, 'Dishwashing Liquid', 'Consumables', 'Jom\'s', 'Jom\'s; Lemon Scent; 1 gal per container', '', '', '2024-11-13', NULL, 'Ray Adona', '2024-10-1942', 0.00, 4, 0.00, 'Prince Educational Supply', 'Sink', NULL),
(22, 'Isopropyl Alcohol 70% Soln.', 'Consumables', 'Comark International Corp.', '3.785 L', '3', 'gallon', '2025-07-07', '2028-01-22', '', '', 0.00, 4, 0.00, 'SH Depot', 'Shelf 1B', NULL),
(23, 'Isopropyl Alcohol 70% Soln.', 'Consumables', 'Comark International Corp.', '3.785 L', '1', 'gallon', '2025-07-07', '2028-01-22', '', '', 0.00, 0, 0.00, '', '', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chemicals`
--
ALTER TABLE `chemicals`
  ADD PRIMARY KEY (`chemical_id`),
  ADD KEY `idx_chemicals_name` (`name`),
  ADD KEY `idx_chemicals_item_code` (`item_code`),
  ADD KEY `idx_chemicals_location` (`location`),
  ADD KEY `idx_chemicals_status` (`status`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`equipment_id`),
  ADD KEY `idx_equipment_code` (`equipment_code`),
  ADD KEY `idx_equipment_name` (`name`),
  ADD KEY `idx_equipment_location` (`location`),
  ADD KEY `idx_equipment_status` (`status`);

--
-- Indexes for table `instruments`
--
ALTER TABLE `instruments`
  ADD PRIMARY KEY (`instrument_id`),
  ADD KEY `idx_instruments_description` (`description`),
  ADD KEY `idx_instruments_location` (`location`),
  ADD KEY `idx_instruments_status` (`status`);

--
-- Indexes for table `supplies`
--
ALTER TABLE `supplies`
  ADD PRIMARY KEY (`supply_id`),
  ADD KEY `idx_supplies_description` (`description`),
  ADD KEY `idx_supplies_brand` (`brand`),
  ADD KEY `idx_supplies_location` (`location`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chemicals`
--
ALTER TABLE `chemicals`
  MODIFY `chemical_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=347;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `equipment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;

--
-- AUTO_INCREMENT for table `instruments`
--
ALTER TABLE `instruments`
  MODIFY `instrument_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=146;

--
-- AUTO_INCREMENT for table `supplies`
--
ALTER TABLE `supplies`
  MODIFY `supply_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
