-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: gamesdatabase
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `games`
--

DROP TABLE IF EXISTS `games`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `games` (
  `GameId` int NOT NULL AUTO_INCREMENT,
  `GameName` varchar(100) DEFAULT NULL,
  `AverageRating` decimal(3,1) DEFAULT '0.0',
  `rateCount` int DEFAULT '0',
  `TotalRating` decimal(10,1) DEFAULT '0.0',
  PRIMARY KEY (`GameId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `games`
--

LOCK TABLES `games` WRITE;
/*!40000 ALTER TABLE `games` DISABLE KEYS */;
INSERT INTO `games` VALUES (1,'Memory Game',4.0,5,20.0),(2,'Rock Paper scissors',3.7,3,11.0),(3,'Tic Tac Toe',4.2,5,21.0);
/*!40000 ALTER TABLE `games` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userinfo` (
  `row` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `score` int DEFAULT NULL,
  `memPoint` int DEFAULT NULL,
  `rpsPoint` int DEFAULT NULL,
  `profilePic` varchar(2000) DEFAULT '\\Upload\\Profile\\defaultProfile.png',
  PRIMARY KEY (`row`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo`
--

LOCK TABLES `userinfo` WRITE;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` VALUES (1,'mthikhin@gmail.com','mthikhinispretty','Mahaythi',925,825,100,'\\Upload\\Profile\\89b3845b-4dd9-4609-b736-5543377a3cba.jpg'),(6,'oow624177@gmail.com','Waivezo9000%','Wai ve zoe',850,600,250,'\\Upload\\Profile\\88690fe9-10cd-4c34-a396-c4996547be6e.jpg'),(9,'wankarwillie@gmail.com','HelloWankar','Willy',200,150,50,'\\Upload\\Profile\\beba51f4-4637-4746-a47f-5c34b8842f6b.png'),(16,'whiddleson@gmail.com','lokithegodoflying','William Hiddlestan',0,0,0,'\\Upload\\Profile\\27f666e0-39ec-4732-892b-5f7b8e0ded72.png'),(18,'theboys@gmail.com','Robacca123%','Billy Butcher',0,0,0,'\\Upload\\Profile\\defaultProfile.png'),(19,'theseven@gmail.com','ImBetter777&','Homelander',0,0,0,'\\Upload\\Profile\\defaultProfile.png');
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-28 19:25:33
