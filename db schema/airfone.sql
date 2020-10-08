-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Aug 19, 2020 at 07:55 AM
-- Server version: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `airfone`
--

-- --------------------------------------------------------

--
-- Table structure for table `currentplan`
--

DROP TABLE IF EXISTS `currentplan`;
CREATE TABLE IF NOT EXISTS `currentplan` (
  `phone` varchar(10) DEFAULT NULL,
  `planId` int(11) DEFAULT NULL,
  `starter` datetime DEFAULT NULL,
  KEY `phone` (`phone`),
  KEY `planId` (`planId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `currentplan`
--

INSERT INTO `currentplan` (`phone`, `planId`, `starter`) VALUES
('8610451847', 1, '2020-08-17 02:43:01'),
('8610451847', 8, '2020-08-17 02:43:01'),
('7411359771', 2, '2020-08-17 02:43:01'),
('5555512345', 4, '2020-08-19 10:51:27'),
('1234554321', 6, '2020-08-19 13:09:24');

-- --------------------------------------------------------

--
-- Table structure for table `customerdetails`
--

DROP TABLE IF EXISTS `customerdetails`;
CREATE TABLE IF NOT EXISTS `customerdetails` (
  `custName` varchar(30) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  KEY `phone` (`phone`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customerdetails`
--

INSERT INTO `customerdetails` (`custName`, `dob`, `address`, `gender`, `email`, `phone`) VALUES
('Sivadinesh', '2000-04-23', 'Tamilnadu', 'Male', 'sivadinesh107@gmail.com', '8610451847'),
('Tushar', '1998-11-02', 'karnataka', 'Male', 'tushar123@gmail.com', '7411359771'),
('LeoRam', '1999-04-23', 'Chennai, Tamilnadu', 'Male', 'leo@gmail.com', '1234567890'),
('Adithya', '1999-04-12', 'prodapt infotech, sweden', 'Male', 'sivadinesh107@gmail.com', '5555512345'),
('Ram Kumar M', '1999-04-23', 'Taminadu, india', 'Male', 'sivadinesh107@gmail.com', '1234554321');

-- --------------------------------------------------------

--
-- Table structure for table `logindetails`
--

DROP TABLE IF EXISTS `logindetails`;
CREATE TABLE IF NOT EXISTS `logindetails` (
  `phone` varchar(10) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `otp` varchar(10) DEFAULT NULL,
  UNIQUE KEY `phone` (`phone`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `logindetails`
--

INSERT INTO `logindetails` (`phone`, `email`, `otp`) VALUES
('8610451847', 'sivadinesh107@gmail.com', 'aOqXc9'),
('1234567890', 'leo@gmail.com', '123456'),
('5555512345', 'sivadinesh107@gmail.com', 'mVDsZK'),
('1234554321', 'sivadinesh107@gmail.com', 'MP89Lm');

-- --------------------------------------------------------

--
-- Table structure for table `newcustomers`
--

DROP TABLE IF EXISTS `newcustomers`;
CREATE TABLE IF NOT EXISTS `newcustomers` (
  `custName` varchar(30) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  KEY `phone` (`phone`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `newcustomers`
--

INSERT INTO `newcustomers` (`custName`, `dob`, `address`, `gender`, `email`, `phone`, `status`) VALUES
('LeoRam', '1999-04-23', 'Chennai, Tamilnadu', 'Male', 'leo@gmail.com', '1234567890', 0),
('Adithya', '1999-04-12', 'prodapt infotech, sweden', 'Male', 'sivadinesh107@gmail.com', '2222233333', 0),
('Shakthi', '1999-04-23', 'Chennai, Tamilnadu', 'Male', 'sivadinesh107@gmail.com', '8989898989', 1),
('Ram Kumar', '1999-04-23', 'Taminadu, india', 'Male', 'sivadinesh107@gmail.com', '1234512345', 0);

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

DROP TABLE IF EXISTS `plans`;
CREATE TABLE IF NOT EXISTS `plans` (
  `planId` int(11) NOT NULL,
  `planName` varchar(50) DEFAULT NULL,
  `planCost` int(11) DEFAULT NULL,
  `planValidity` int(11) DEFAULT NULL,
  `planCategory` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`planId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`planId`, `planName`, `planCost`, `planValidity`, `planCategory`) VALUES
(1, '100Rs Full talktime', 100, 28, 'prepaid'),
(2, '200Rs Full talktime', 200, 48, 'prepaid'),
(3, '300Rs Full talktime', 300, 84, 'prepaid'),
(4, 'Small post plan', 600, 28, 'postpaid'),
(5, 'Budget post plan', 1000, 48, 'postpaid'),
(6, 'Unlimited post plan', 1500, 84, 'postpaid'),
(7, 'Small fiber plan', 700, 28, 'broadband'),
(8, 'Budget fiber Data', 1400, 48, 'broadband'),
(9, 'Unlimited fiber plan', 2300, 84, 'broadband');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
CREATE TABLE IF NOT EXISTS `tickets` (
  `ticketId` int(11) NOT NULL AUTO_INCREMENT,
  `dateTicketRaised` datetime DEFAULT NULL,
  `phone` varchar(10) DEFAULT NULL,
  `planCategory` varchar(50) DEFAULT NULL,
  `ticket` varchar(1000) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ticketId`),
  KEY `phone` (`phone`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tickets`
--

INSERT INTO `tickets` (`ticketId`, `dateTicketRaised`, `phone`, `planCategory`, `ticket`, `status`) VALUES
(1, '2020-08-16 19:12:38', '8610451847', 'postpaid', 'I have network Issue', 1),
(2, '2020-08-16 19:20:01', '8610451847', 'prepaid', 'Testing', 1),
(3, '2020-08-17 03:03:55', '8610451847', 'prepaid', 'angular check', 1),
(4, '2020-08-17 16:51:01', '8610451847', 'broadband', 'no internet', 0),
(5, '2020-08-17 16:56:03', '8610451847', 'broadband', 'test net 133456', 1),
(6, '2020-08-17 16:57:21', '8610451847', 'prepaid', 'lets check for last time', 1),
(7, '2020-08-17 17:49:32', '8610451847', 'prepaid', 'sample ticket', 0),
(8, '2020-08-19 10:52:18', '5555512345', 'postpaid', 'postpaid ticket checking', 0),
(9, '2020-08-19 13:11:37', '1234554321', 'postpaid', 'Post paid services is not good', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
