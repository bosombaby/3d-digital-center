-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: 3d_resources
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `model_info`
--

DROP TABLE IF EXISTS `model_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_info` (
  `id` varchar(30) NOT NULL,
  `name` varchar(45) NOT NULL,
  `first_category` varchar(45) NOT NULL,
  `second_category` varchar(45) DEFAULT NULL,
  `tag` varchar(45) DEFAULT NULL,
  `photo_url` varchar(45) NOT NULL,
  `model_url` varchar(45) NOT NULL,
  `owner` varchar(30) DEFAULT 'vrteam提供',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_info`
--

LOCK TABLES `model_info` WRITE;
/*!40000 ALTER TABLE `model_info` DISABLE KEYS */;
INSERT INTO `model_info` VALUES ('1','白领女','人物模型',NULL,'女,人物','/人物模型/白领女/preview.png','/人物模型/白领女/白领女.gltf','vrteam提供'),('12','会议桌','家具家居',NULL,'桌子-会议-办公','/家具家居/会议桌/preview.png','/家具家居/会议桌/会议桌.gltf','vrteam提供'),('2','办公男','人物模型',NULL,NULL,'/人物模型/西装男/preview.png','/人物模型/西装男/西装男.gltf','vrteam提供'),('3','茶几','家具家居',NULL,NULL,'/家具家居/茶几/preview.png','/家具家居/茶几/茶几.gltf','vrteam提供'),('5','保时捷','交通运输',NULL,NULL,'/交通运输/保时捷/preview.png','/交通运输/保时捷/保时捷.gltf','vrteam提供'),('6','出租车','交通运输',NULL,NULL,'/交通运输/出租车/preview.png','/交通运输/出租车/出租车.gltf','vrteam提供'),('6938d1ee993o_r8','圆桌','家具家居',NULL,'家具,桌子,生活','/家具家居/圆桌/preview.png','/家具家居/圆桌/圆桌.gltf','super'),('7','绿化带','植物模型',NULL,NULL,'/植物模型/绿化带/preview.png','/植物模型/绿化带/绿化带.gltf','vrteam提供'),('8','古建筑阁楼','场景模型',NULL,NULL,'/场景模型/古建筑阁楼/preview.png','/场景模型/古建筑阁楼/古建筑阁楼.gltf','vrteam提供'),('9','古建筑凉亭','场景模型',NULL,NULL,'/场景模型/古建筑凉亭/preview.png','/场景模型/古建筑凉亭/古建筑凉亭.gltf','vrteam提供'),('l9o8o7oe7lro775','火凤凰','动物模型',NULL,'动物,鸟类','/动物模型/火凤凰/preview.png','/动物模型/火凤凰/scene.gltf','super');
/*!40000 ALTER TABLE `model_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-16 20:35:33
