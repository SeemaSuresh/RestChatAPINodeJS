CREATE DATABASE  IF NOT EXISTS `chatdb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `chatdb`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: chatdb
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `emailid` char(30) NOT NULL,
  `pwd` char(30) NOT NULL,
  `fname` char(40) DEFAULT NULL,
  `lname` char(40) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Seema','chat','Seema','Suresh'),(2,'test@gmail.com','test','john',NULL),(3,'test1@gmail.com','test',NULL,NULL),(4,'test2@gmail.com','test',NULL,NULL),(5,'test3@gmail.com','test',NULL,NULL),(6,'test4@gmail.com','test',NULL,NULL),(7,'test5@gmail.com','test',NULL,NULL),(8,'test6@gmail.com','test',NULL,NULL),(9,'test7@gmail.com','test',NULL,NULL),(10,'test8@gmail.com','test',NULL,NULL),(11,'test9@gmail.com','test',NULL,NULL),(12,'test10@gmail.com','test',NULL,NULL),(13,'test11@gmail.com','test',NULL,NULL),(14,'test12@gmail.com','test',NULL,NULL),(15,'test13@gmail.com','test',NULL,NULL),(16,'test14@gmail.com','test',NULL,NULL),(18,'abc1@abc.com','abc',NULL,NULL),(19,'abc2@abc.com','abc',NULL,NULL),(20,'abc3@abc.com','abc',NULL,NULL),(21,'abc4@abc.com','abc',NULL,NULL),(22,'abc5@abc.com','abc',NULL,NULL),(23,'abc6@abc.com','abc',NULL,NULL),(24,'a@abc.com','abc',NULL,NULL),(25,'av@abc.com','abc',NULL,NULL),(26,'seema@abc.com','abc',NULL,NULL),(27,'seema@seema.com','abc',NULL,NULL),(28,'seem@seema.com','abc',NULL,NULL),(29,'hello','abc',NULL,NULL),(30,'john@gmail.com','test','Snow',NULL),(31,'john@test.com','test',NULL,NULL),(32,'john@test1.com','test',NULL,NULL),(33,'abc@abc.com','abc','a',NULL),(35,'signup@gmail.com','test','test',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-03-30  0:03:21
