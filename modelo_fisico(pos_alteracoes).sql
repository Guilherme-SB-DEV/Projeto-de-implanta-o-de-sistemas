-- MySQL dump 10.13  Distrib 8.0.41, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: estacionamento
-- ------------------------------------------------------
-- Server version	8.0.41-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `BACKUP`
--
CREATE DATABASE estacionamento3;
USE estacionamento3;

DROP TABLE IF EXISTS `BACKUP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BACKUP` (
  `id_backup` int NOT NULL,
  `data_backup` date DEFAULT NULL,
  `horario_backup` time DEFAULT NULL,
  PRIMARY KEY (`id_backup`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BACKUP`
--

LOCK TABLES `BACKUP` WRITE;
/*!40000 ALTER TABLE `BACKUP` DISABLE KEYS */;
/*!40000 ALTER TABLE `BACKUP` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GERA_backup`
--

DROP TABLE IF EXISTS `GERA_backup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GERA_backup` (
  `FK_RELATORIO_id_relatorio` int DEFAULT NULL,
  `FK_BACKUP_id_backup` int DEFAULT NULL,
  KEY `FK_GERA_4` (`FK_RELATORIO_id_relatorio`),
  KEY `FK_GERA_2` (`FK_BACKUP_id_backup`),
  CONSTRAINT `FK_GERA_2` FOREIGN KEY (`FK_BACKUP_id_backup`) REFERENCES `BACKUP` (`id_backup`) ON DELETE RESTRICT,
  CONSTRAINT `FK_GERA_4` FOREIGN KEY (`FK_RELATORIO_id_relatorio`) REFERENCES `RELATORIO` (`id_relatorio`) ON DELETE RESTRICT,
  CONSTRAINT `GERA_backup_ibfk_1` FOREIGN KEY (`FK_RELATORIO_id_relatorio`) REFERENCES `RELATORIO` (`id_relatorio`),
  CONSTRAINT `GERA_backup_ibfk_2` FOREIGN KEY (`FK_BACKUP_id_backup`) REFERENCES `BACKUP` (`id_backup`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GERA_backup`
--

LOCK TABLES `GERA_backup` WRITE;
/*!40000 ALTER TABLE `GERA_backup` DISABLE KEYS */;
/*!40000 ALTER TABLE `GERA_backup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GERA_relatorio`
--

DROP TABLE IF EXISTS `GERA_relatorio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GERA_relatorio` (
  `FK_REGISTRO_ESTACIONAMENTO_id_registro` int DEFAULT NULL,
  `FK_RELATORIO_id_relatorio` int DEFAULT NULL,
  KEY `FK_GERA_3` (`FK_RELATORIO_id_relatorio`),
  KEY `FK_GERA_1` (`FK_REGISTRO_ESTACIONAMENTO_id_registro`),
  CONSTRAINT `FK_GERA_1` FOREIGN KEY (`FK_REGISTRO_ESTACIONAMENTO_id_registro`) REFERENCES `REGISTRO_ESTACIONAMENTO` (`id_registro`) ON DELETE RESTRICT,
  CONSTRAINT `FK_GERA_3` FOREIGN KEY (`FK_RELATORIO_id_relatorio`) REFERENCES `RELATORIO` (`id_relatorio`) ON DELETE RESTRICT,
  CONSTRAINT `GERA_relatorio_ibfk_1` FOREIGN KEY (`FK_REGISTRO_ESTACIONAMENTO_id_registro`) REFERENCES `REGISTRO_ESTACIONAMENTO` (`id_registro`),
  CONSTRAINT `GERA_relatorio_ibfk_2` FOREIGN KEY (`FK_RELATORIO_id_relatorio`) REFERENCES `RELATORIO` (`id_relatorio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GERA_relatorio`
--

LOCK TABLES `GERA_relatorio` WRITE;
/*!40000 ALTER TABLE `GERA_relatorio` DISABLE KEYS */;
/*!40000 ALTER TABLE `GERA_relatorio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GERENCIA`
--

DROP TABLE IF EXISTS `GERENCIA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GERENCIA` (
  `FK_USUARIO_id_usuario` varchar(50) DEFAULT NULL,
  `FK_REGISTRO_ESTACIONAMENTO_id_registro` int DEFAULT NULL,
  KEY `FK_REGISTRO_ESTACIONAMENTO_id_registro` (`FK_REGISTRO_ESTACIONAMENTO_id_registro`),
  KEY `FK_GERENCIA_1` (`FK_USUARIO_id_usuario`),
  CONSTRAINT `FK_GERENCIA_1` FOREIGN KEY (`FK_USUARIO_id_usuario`) REFERENCES `USUARIO` (`id_usuario`) ON DELETE RESTRICT,
  CONSTRAINT `GERENCIA_ibfk_1` FOREIGN KEY (`FK_USUARIO_id_usuario`) REFERENCES `USUARIO` (`id_usuario`) ON DELETE RESTRICT,
  CONSTRAINT `GERENCIA_ibfk_2` FOREIGN KEY (`FK_REGISTRO_ESTACIONAMENTO_id_registro`) REFERENCES `REGISTRO_ESTACIONAMENTO` (`id_registro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GERENCIA`
--

LOCK TABLES `GERENCIA` WRITE;
/*!40000 ALTER TABLE `GERENCIA` DISABLE KEYS */;
/*!40000 ALTER TABLE `GERENCIA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PAGAMENTO`
--

DROP TABLE IF EXISTS `PAGAMENTO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PAGAMENTO` (
  `id_pagamento` int NOT NULL,
  `tipo_pagamento` varchar(100) DEFAULT NULL,
  `valor_pagamento` float DEFAULT NULL,
  `valor_total` float DEFAULT NULL,
  `FK_REGISTRO_ESTACIONAMENTO_id_registro` int DEFAULT NULL,
  PRIMARY KEY (`id_pagamento`),
  KEY `FK_PAGAMENTO_2` (`FK_REGISTRO_ESTACIONAMENTO_id_registro`),
  CONSTRAINT `FK_PAGAMENTO_2` FOREIGN KEY (`FK_REGISTRO_ESTACIONAMENTO_id_registro`) REFERENCES `REGISTRO_ESTACIONAMENTO` (`id_registro`),
  CONSTRAINT `PAGAMENTO_ibfk_1` FOREIGN KEY (`FK_REGISTRO_ESTACIONAMENTO_id_registro`) REFERENCES `REGISTRO_ESTACIONAMENTO` (`id_registro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PAGAMENTO`
--

LOCK TABLES `PAGAMENTO` WRITE;
/*!40000 ALTER TABLE `PAGAMENTO` DISABLE KEYS */;
/*!40000 ALTER TABLE `PAGAMENTO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `REGISTRO_ESTACIONAMENTO`
--

DROP TABLE IF EXISTS `REGISTRO_ESTACIONAMENTO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `REGISTRO_ESTACIONAMENTO` (
  `id_registro` int NOT NULL,
  `data_entrada` date DEFAULT NULL,
  `data_saida` date DEFAULT NULL,
  `hora_saida` time DEFAULT NULL,
  `tempo_permanencia` time DEFAULT NULL,
  `FK_VEICULOS_id_veiculo` varchar(50) DEFAULT NULL,
  `FK_VAGA_id_vaga` varchar(50) DEFAULT NULL,
  `hora_entrada` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_registro`),
  KEY `REGISTRO_ESTACIONAMENTO_ibfk_1` (`FK_VEICULOS_id_veiculo`),
  KEY `REGISTRO_ESTACIONAMENTO_ibfk_2` (`FK_VAGA_id_vaga`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `REGISTRO_ESTACIONAMENTO`
--

LOCK TABLES `REGISTRO_ESTACIONAMENTO` WRITE;
/*!40000 ALTER TABLE `REGISTRO_ESTACIONAMENTO` DISABLE KEYS */;
INSERT INTO `REGISTRO_ESTACIONAMENTO` VALUES (36,'2025-02-14',NULL,NULL,NULL,'GHI9101','4','04:01:18');
/*!40000 ALTER TABLE `REGISTRO_ESTACIONAMENTO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RELATORIO`
--

DROP TABLE IF EXISTS `RELATORIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RELATORIO` (
  `id_relatorio` int NOT NULL,
  `tipo_relatorio` varchar(100) DEFAULT NULL,
  `data_geracao` date DEFAULT NULL,
  PRIMARY KEY (`id_relatorio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RELATORIO`
--

LOCK TABLES `RELATORIO` WRITE;
/*!40000 ALTER TABLE `RELATORIO` DISABLE KEYS */;
/*!40000 ALTER TABLE `RELATORIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USUARIO`
--

DROP TABLE IF EXISTS `USUARIO`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USUARIO` (
  `id_usuario` varchar(50) NOT NULL,
  `login` varchar(100) DEFAULT NULL,
  `senha` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USUARIO`
--

LOCK TABLES `USUARIO` WRITE;
/*!40000 ALTER TABLE `USUARIO` DISABLE KEYS */;
INSERT INTO `USUARIO` VALUES ('d464d3dc-a770-49ac-923d-3457b18d6d44','999','$2b$10$GrbuoF4Dmsbwq6s5wl4nROg29OmujUntaQLyvAXEz4BDS2vQsSZUe'),('ef997fcf-881e-420a-9c97-903d4f24a4b4','666','$2b$10$n3PJ.Hj7HIRKPf/1vXRwjODyhayUoGOvaBG/Dqv/W3jwlnKOvkh.S');
/*!40000 ALTER TABLE `USUARIO` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VAGA`
--

DROP TABLE IF EXISTS `VAGA`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VAGA` (
  `id_vaga` varchar(50) NOT NULL,
  `status_vaga` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_vaga`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VAGA`
--

LOCK TABLES `VAGA` WRITE;
/*!40000 ALTER TABLE `VAGA` DISABLE KEYS */;
INSERT INTO `VAGA` VALUES ('1','Disponível'),('2','Disponível'),('3','Disponível'),('4','Ocupada'),('5','Disponível'),('V001','Disponível'),('V002','Disponível'),('V003','Disponível'),('V004','Disponível'),('V005','Disponível');
/*!40000 ALTER TABLE `VAGA` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VEICULOS`
--

DROP TABLE IF EXISTS `VEICULOS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VEICULOS` (
  `id_veiculo` varchar(50) NOT NULL,
  `placa` varchar(100) DEFAULT NULL,
  `cor` varchar(100) DEFAULT NULL,
  `modelo` varchar(100) DEFAULT NULL,
  `porte` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_veiculo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VEICULOS`
--

LOCK TABLES `VEICULOS` WRITE;
/*!40000 ALTER TABLE `VEICULOS` DISABLE KEYS */;
INSERT INTO `VEICULOS` VALUES ('3','GHI9101','Branco','Ford Focus','Médio'),('4','JKL1213','Azul','Chevrolet Onix','Pequeno'),('5','MNO1415','Vermelho','Volkswagen Golf','Médio');
/*!40000 ALTER TABLE `VEICULOS` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-14 11:12:36
