/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 10.4.32-MariaDB : Database - fleet
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`fleet` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `fleet`;

/*Table structure for table `allocatedexpenses` */

DROP TABLE IF EXISTS `allocatedexpenses`;

CREATE TABLE `allocatedexpenses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `allocationid` int(11) DEFAULT NULL,
  `expenseid` int(11) DEFAULT NULL,
  `description` varchar(50) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `totalamount` int(11) DEFAULT NULL,
  `addedby` int(11) DEFAULT NULL,
  `dateadded` datetime DEFAULT current_timestamp(),
  `deleted` tinyint(1) DEFAULT 0,
  `datedeleted` datetime DEFAULT NULL,
  `deletedby` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `allocatedexpenses` */

insert  into `allocatedexpenses`(`id`,`allocationid`,`expenseid`,`description`,`amount`,`totalamount`,`addedby`,`dateadded`,`deleted`,`datedeleted`,`deletedby`) values (62,28,61,NULL,30000,NULL,5,'2025-03-11 17:40:36',0,NULL,NULL),(63,28,62,NULL,100000,NULL,5,'2025-03-11 17:40:36',0,NULL,NULL),(68,26,62,NULL,20000,NULL,5,'2025-03-11 17:41:56',0,NULL,NULL),(69,26,65,NULL,8000,NULL,5,'2025-03-11 17:41:56',0,NULL,NULL),(76,35,61,NULL,40000,NULL,5,'2025-03-19 09:28:00',0,NULL,NULL),(77,35,62,NULL,50000,NULL,5,'2025-03-19 09:28:00',0,NULL,NULL),(78,0,66,NULL,10000,NULL,5,'2025-05-19 10:24:00',0,NULL,NULL),(79,47,61,NULL,50000,NULL,5,'2025-05-19 10:25:08',0,NULL,NULL),(80,47,62,NULL,40000,NULL,5,'2025-05-19 10:25:08',0,NULL,NULL),(82,52,61,NULL,30000,NULL,5,'2025-05-19 10:31:40',0,NULL,NULL);

/*Table structure for table `allocationdetails` */

DROP TABLE IF EXISTS `allocationdetails`;

CREATE TABLE `allocationdetails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `allocationid` int(11) DEFAULT NULL,
  `driverid` int(11) NOT NULL,
  `driverstatus` varchar(50) DEFAULT NULL,
  `truckid` int(11) NOT NULL,
  `truckstatus` varchar(50) DEFAULT 'Not Availble',
  `dateout` date DEFAULT NULL,
  `expecteddate` date DEFAULT NULL,
  `addedby` int(11) DEFAULT NULL,
  `dateadded` datetime DEFAULT NULL,
  `remarks` varchar(500) DEFAULT NULL,
  `statusremarks` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `allocationdetails` */

insert  into `allocationdetails`(`id`,`allocationid`,`driverid`,`driverstatus`,`truckid`,`truckstatus`,`dateout`,`expecteddate`,`addedby`,`dateadded`,`remarks`,`statusremarks`) values (1,34,3,'Not Available',8,'In Transit','2025-03-11','2025-03-15',3,'2025-03-11 18:25:14','Perishable',NULL),(2,35,1,'Not Available',7,'In Transit','2025-03-12','2025-03-17',3,'2025-03-12 11:25:02','Perishable Goods Delivery needs to be Fast.\nTruck is in Good Condition.',NULL),(3,36,2,'Not Available',0,'In Transit','2025-03-13','2025-03-18',3,'2025-03-13 15:26:06','Perishable Goods involved.',NULL),(4,37,2,'Not Available',0,'In Transit','2025-03-13','2025-03-18',3,'2025-03-13 15:28:11','Perishable Goods involved.',NULL),(5,38,2,'Not Available',0,'In Transit','2025-03-13','2025-03-18',3,'2025-03-13 15:29:33','Perishable Goods involved.',NULL),(6,39,2,'Not Available',3,'In Transit','2025-03-13','2025-03-17',3,'2025-03-13 15:34:04','PERISHABLE GOODS INVOLVED DELIVERY SHOULD BE FAST','PERISHABLE GOODS INVOLVED DELIVERY SHOULD BE FAST'),(7,40,4,'Not Available',4,'In Transit','2025-04-04','2025-04-06',3,'2025-04-04 18:11:41','Not Perishable',NULL),(8,41,1,'Not Available',7,'In Transit','2025-03-12','2025-03-17',3,'2025-04-04 18:39:42','Perishable Goods Delivery needs to be Fast.\nTruck is in Good Condition.',NULL),(9,42,1,'Not Available',7,'In Transit','2025-03-12','2025-03-17',3,'2025-04-04 18:42:15','Perishable Goods Delivery needs to be Fast.\nTruck is in Good Condition.',NULL),(10,43,1,'Not Available',7,'In Transit','2025-03-12','2025-03-17',3,'2025-04-04 18:53:56','Perishable Goods Delivery needs to be Fast.\nTruck is in Good Condition.',NULL),(11,44,1,'Not Available',7,'In Transit','2025-03-12','2025-03-17',3,'2025-04-04 18:54:19','Perishable Goods Delivery needs to be Fast.\nTruck is in Good Condition.',NULL),(12,45,1,'Not Available',7,'In Transit','2025-03-12','2025-03-17',3,'2025-04-04 18:56:53','Perishable Goods Delivery needs to be Fast.\nTruck is in Good Condition.',NULL),(13,46,1,'Not Available',7,'In Transit','2025-03-12','2025-03-17',3,'2025-04-04 19:05:36','Perishable Goods Delivery needs to be Fast.\nTruck is in Good Condition.',NULL),(14,47,1,'Not Available',7,'In Transit','2025-03-12','2025-03-17',3,'2025-04-04 19:05:42','Perishable Goods Delivery needs to be Fast.\nTruck is in Good Condition.',NULL),(15,41,5,'Available',5,'1','2025-03-12','2025-03-17',3,'2025-04-04 19:15:37',NULL,'The Truck failed'),(16,41,5,'Available',5,'1','2025-03-12','2025-03-17',3,'2025-04-04 19:32:41',NULL,'The Truck failed'),(17,48,5,'Not Available',5,'In Transit','2025-05-02','2025-05-06',3,'2025-05-02 11:52:08','The goods are not perishable','The goods are not perishable'),(18,49,4,'Not Available',7,'In Transit','2025-05-12','2025-05-14',3,'2025-05-12 09:44:05','Goods are perishable',NULL),(19,50,4,'Not Available',4,'In Transit','0000-00-00','2025-05-16',3,'2025-05-12 09:48:58','The Goods are Perishable and the truck is in good condition to have them delivered on time.',NULL),(20,51,5,'Not Available',5,'In Transit','2025-05-19','2025-05-21',5,'2025-05-19 10:20:45','The Truck is in Perfect Condition',NULL),(21,52,5,'Not Available',5,'In Transit','2025-05-19','2025-05-21',5,'2025-05-19 10:23:05','The Truck and Goods are in good Condition','The Truck and Goods are in good Condition');

/*Table structure for table `allocations` */

DROP TABLE IF EXISTS `allocations`;

CREATE TABLE `allocations` (
  `allocationid` int(11) NOT NULL AUTO_INCREMENT,
  `deliveryorderno` varchar(50) DEFAULT NULL,
  `route` varchar(50) DEFAULT NULL,
  `destination` varchar(50) DEFAULT NULL,
  `kilometers` int(11) DEFAULT NULL,
  `clientid` int(50) DEFAULT NULL,
  `particular` varchar(50) DEFAULT NULL,
  `containerid` int(50) DEFAULT NULL,
  `containernumber` varchar(50) DEFAULT NULL,
  `others` varchar(50) DEFAULT NULL,
  `amount` decimal(18,2) DEFAULT NULL,
  `currency` varchar(50) DEFAULT NULL,
  `exchangerate` decimal(18,2) DEFAULT NULL,
  `invoiced` bit(1) DEFAULT b'0',
  `credited` bit(1) DEFAULT b'0',
  `dateadded` datetime DEFAULT current_timestamp(),
  `addedby` int(11) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `datedeleted` datetime DEFAULT NULL,
  `deletedby` int(11) DEFAULT NULL,
  PRIMARY KEY (`allocationid`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `allocations` */

insert  into `allocations`(`allocationid`,`deliveryorderno`,`route`,`destination`,`kilometers`,`clientid`,`particular`,`containerid`,`containernumber`,`others`,`amount`,`currency`,`exchangerate`,`invoiced`,`credited`,`dateadded`,`addedby`,`deleted`,`datedeleted`,`deletedby`) values (24,'DN000001','Upcountry','Embu',1000,1,'Bags of Cement',3,'CNT002','Bags of Maize','150000.00','1','1.00','\0','\0','2025-03-10 11:22:16',NULL,0,NULL,NULL),(25,'DN000002','Local','CBD',150,6,'Cement 60 Bags',6,'BUK001','None','300000.00','1','1.00','\0','\0','2025-03-10 11:23:51',NULL,0,NULL,NULL),(26,'DN000003','Transit','Nairobi.',300,3,'Sheep',5,'LC001','Maize','3000.00','1','1.00','\0','\0','2025-03-10 11:32:26',NULL,0,NULL,NULL),(27,'DN000004','Upcountry','Embu',1000,3,'20 Bags of Rice',6,'CNT003','30 Bags of Cement','300000.00','1','1.00','\0','\0','2025-03-11 15:47:14',NULL,0,NULL,NULL),(28,'DN000005','Transit','Nairobi',1500,3,'20 Bags of Cement',2,'CNT004','10 Bags of Maize','150000.00','1','1.00','\0','\0','2025-03-11 17:05:58',NULL,0,NULL,NULL),(34,'DN000006','Local','Mombasa CBD',500,2,'Bag of Cement',5,'LC0001','','30000.00','1','1.00','','\0','2025-03-11 18:25:14',NULL,0,NULL,NULL),(35,'DN000007','Upcountry','Migori',2500,6,'16 Crates of Fish',4,'UN0001','','56500.00','1','1.00','','\0','2025-03-12 11:25:02',NULL,1,'2025-04-22 10:22:03',1),(36,'DN000008','Transit','Nairobi CBD',2000,1,'1000 bags of Cement',6,'BUK0002','Fish 600kgs','1900000.00','1','1.00','','\0','2025-03-13 15:26:06',NULL,0,NULL,NULL),(37,'DN000009','Transit','Nairobi CBD',2000,1,'1000 bags of Cement',6,'BUK0002','Fish 600kgs','1900000.00','1','1.00','','\0','2025-03-13 15:28:11',NULL,0,NULL,NULL),(38,'DN000010','Transit','Nairobi CBD',2000,1,'1000 bags of Cement',6,'BUK0002','Fish 600kgs','1900000.00','1','1.00','','\0','2025-03-13 15:29:33',NULL,0,NULL,NULL),(39,'DN000011','Transit','Nairobi CBD',490,1,'1000 BAGS OF CEMENT',4,'CNT0003','FISH 600KGS','1250000.00','1','1.00','','\0','2025-03-13 15:34:04',NULL,0,NULL,NULL),(40,'DN000012','Local','Migori',500,4,'Cement 150 bags',6,'BUK-002','Bags of Cement','587000.00','1','1.00','','\0','2025-04-04 18:11:41',NULL,1,'2025-04-22 10:36:40',1),(41,'DN000013','Upcountry','Migori',2500,6,'16 Crates of Fish',4,'UN0001','','56500.00','1','1.00','','\0','2025-04-04 18:39:42',NULL,1,'2025-04-22 10:24:54',1),(42,'DN000014','Upcountry','Migori',2500,6,'16 Crates of Fish',4,'UN0001','','56500.00','1','1.00','','\0','2025-04-04 18:42:15',NULL,1,'2025-04-22 10:27:04',1),(43,'DN000015','Upcountry','Migori',2500,6,'16 Crates of Fish',4,'UN0001','','56500.00','1','1.00','','\0','2025-04-04 18:53:56',NULL,1,'2025-04-22 10:35:42',1),(44,'DN000016','Upcountry','Migori',2500,6,'16 Crates of Fish',4,'UN0001','','56500.00','1','1.00','','\0','2025-04-04 18:54:19',NULL,1,'2025-04-22 10:35:58',1),(45,'DN000017','Upcountry','Migori',2500,6,'16 Crates of Fish',4,'UN0001','','56500.00','1','1.00','\0','\0','2025-04-04 18:56:53',NULL,1,'2025-04-22 11:17:58',1),(46,'DN000018','Upcountry','Migori',2500,6,'16 Crates of Fish',4,'UN0001','','56500.00','1','1.00','\0','\0','2025-04-04 19:05:36',NULL,1,'2025-04-22 11:18:08',1),(47,'DN000019','Upcountry','Migori',2500,6,'16 Crates of Fish',4,'UN0001','','56500.00','1','1.00','','\0','2025-04-04 19:05:42',NULL,0,NULL,NULL),(48,'DN000020','Upcountry','Mombasa Mikindani',300,4,'600 Bags of Cement',3,'CNT002','','154789.00','1','1.00','','\0','2025-05-02 11:52:08',NULL,1,'2025-05-19 10:18:32',1),(49,'DN000021','Upcountry','Migori',450,1,'Cement 150 bags',2,'CNT0004','Bags of rice','90500.00','1','1.00','','\0','2025-05-12 09:44:05',NULL,1,'2025-05-12 09:46:07',1),(50,'DN000022','Upcountry','Machakos',450,1,'350 Bags of Cement',2,'CNT0004','Fresh Sea Food','95000.00','1','1.00','','\0','2025-05-12 09:48:58',NULL,1,'2025-05-14 13:22:13',1),(51,'DN000023','Upcountry','Kisii',500,6,'10000 boxes of Sardine',6,'CNT0004','1000 Bags of Cement','1800000.00','1','1.00','\0','\0','2025-05-19 10:20:45',NULL,1,'2025-05-19 10:21:51',1),(52,'DN000024','Upcountry','Kisumu',500,6,'10000 Boxes of Sardine',6,'CNT0004','1000 Bags of Cement','1800000.00','1','1.00','','\0','2025-05-19 10:23:05',NULL,0,NULL,NULL);

/*Table structure for table `audittrail` */

DROP TABLE IF EXISTS `audittrail`;

CREATE TABLE `audittrail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timestamp` datetime DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `operation` varchar(50) DEFAULT NULL,
  `narration` varchar(5000) DEFAULT NULL,
  `platform` varchar(1000) DEFAULT NULL,
  `originalvalues` mediumtext DEFAULT NULL,
  `updatedvalues` mediumtext DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10624 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `audittrail` */

insert  into `audittrail`(`id`,`timestamp`,`userid`,`operation`,`narration`,`platform`,`originalvalues`,`updatedvalues`) values (10620,'2025-05-07 16:49:55',7,'Insert','Added system admin account user for Overland Logistics LTD id 1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36','',''),(10621,'2025-05-07 16:57:33',8,'Insert','Added system admin account user for Overland Logistics LTD id 1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36','',''),(10622,'2025-05-07 17:09:47',2,'Insert','Added system admin account user for Overland Logistics LTD id 1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36','',''),(10623,'2025-05-07 17:42:51',4,'Insert','Added system admin account user for Overland Logistics LTD id 1','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36','','');

/*Table structure for table `clients` */

DROP TABLE IF EXISTS `clients`;

CREATE TABLE `clients` (
  `clientid` int(11) NOT NULL AUTO_INCREMENT,
  `clientname` varchar(100) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `contactperson` varchar(50) DEFAULT NULL,
  `addedby` int(11) DEFAULT NULL,
  `datesaved` datetime DEFAULT current_timestamp(),
  `deleted` tinyint(1) DEFAULT 0,
  `datedeleted` datetime DEFAULT NULL,
  `deletedby` int(11) DEFAULT NULL,
  PRIMARY KEY (`clientid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `clients` */

insert  into `clients`(`clientid`,`clientname`,`address`,`telephone`,`contactperson`,`addedby`,`datesaved`,`deleted`,`datedeleted`,`deletedby`) values (1,'Spedag Interfreight limited','P.O. Box 23456 Nairobi','0721429115','Charonyi ni Wasi',1,'2025-01-30 05:44:27',0,NULL,NULL),(2,'Kamenchu Enterprises Ltd','12548 Mombasa','0721458789','Rueben',1,'2025-01-31 16:29:58',0,NULL,NULL),(3,'Akwamar Enterprises','56847 Mombasa','0745824136','Paluku',1,'2025-01-31 16:54:11',0,NULL,NULL),(4,'Shashamane International','23674 Kisumu','0725896514','Oparanya',1,'2025-01-31 17:32:28',0,'2025-02-03 16:50:32',1),(5,'Charo Wamae Importers','23434 Kilifi','0712548963','Katana',1,'2025-01-31 17:36:10',1,'2025-02-03 17:22:47',1),(6,'Apollo Importers','54872 Kisumu','0712548789','Acholli',1,'2025-01-31 17:38:48',0,'2025-02-03 16:45:32',1),(7,'Warsaw Pact','Upper Hill','0721429115','Allain Konkou',1,'2025-01-31 17:41:15',1,'2025-02-03 16:51:51',1);

/*Table structure for table `company` */

DROP TABLE IF EXISTS `company`;

CREATE TABLE `company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `logo` varchar(1000) DEFAULT NULL,
  `companyname` varchar(50) DEFAULT NULL,
  `postaladdress` varchar(1000) DEFAULT NULL,
  `tel1` varchar(50) DEFAULT NULL,
  `tel2` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `company` */

insert  into `company`(`id`,`logo`,`companyname`,`postaladdress`,`tel1`,`tel2`,`email`) values (1,'company/tlogo.png','OVERLAND LOGISTICS LIMITED','P.O Box 12627 Nairobi, 00100','0719555415','0733199615','info@overlandlogisticsltd.com');

/*Table structure for table `containers` */

DROP TABLE IF EXISTS `containers`;

CREATE TABLE `containers` (
  `containerid` int(11) NOT NULL AUTO_INCREMENT,
  `containername` varchar(50) DEFAULT NULL,
  `dateadded` datetime DEFAULT NULL,
  `addedby` int(11) DEFAULT NULL,
  `datedeleted` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `deletedby` int(11) DEFAULT NULL,
  PRIMARY KEY (`containerid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `containers` */

insert  into `containers`(`containerid`,`containername`,`dateadded`,`addedby`,`datedeleted`,`deleted`,`deletedby`) values (2,'CN 1x40','2025-02-28 10:01:37',5,NULL,0,NULL),(3,'CN 1x20','2025-02-28 10:01:43',5,NULL,0,NULL),(4,'UNIT 1x1','2025-02-28 10:01:45',5,NULL,0,NULL),(5,'LC 1x1','2025-02-28 10:01:47',5,NULL,0,NULL),(6,'BUK 1x1','2025-02-28 10:01:49',5,NULL,0,NULL);

/*Table structure for table `creditnote` */

DROP TABLE IF EXISTS `creditnote`;

CREATE TABLE `creditnote` (
  `creditnoteid` int(11) NOT NULL AUTO_INCREMENT,
  `creditnoteno` varchar(50) DEFAULT NULL,
  `clientid` int(11) DEFAULT NULL,
  `currency` varchar(50) DEFAULT NULL,
  `dateadded` datetime DEFAULT current_timestamp(),
  `addedby` int(11) DEFAULT NULL,
  `deleted` int(1) DEFAULT 0,
  `datedeleted` date DEFAULT NULL,
  `deletedby` int(11) DEFAULT NULL,
  PRIMARY KEY (`creditnoteid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `creditnote` */

insert  into `creditnote`(`creditnoteid`,`creditnoteno`,`clientid`,`currency`,`dateadded`,`addedby`,`deleted`,`datedeleted`,`deletedby`) values (1,'CRNT000000',1,NULL,'2025-04-16 11:51:31',3,1,'2025-05-08',3),(2,'CRNT000001',1,NULL,'2025-04-17 11:55:43',3,1,'2025-05-06',3),(3,'CRNT000002',2,NULL,'2025-05-08 18:06:35',3,0,NULL,NULL);

/*Table structure for table `creditnotedetails` */

DROP TABLE IF EXISTS `creditnotedetails`;

CREATE TABLE `creditnotedetails` (
  `creditnoteid` int(11) DEFAULT NULL,
  `invoiceid` int(11) DEFAULT NULL,
  `amount` decimal(18,2) DEFAULT NULL,
  `currency` varchar(50) DEFAULT NULL,
  `tax` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `creditnotedetails` */

insert  into `creditnotedetails`(`creditnoteid`,`invoiceid`,`amount`,`currency`,`tax`) values (1,1,'50000.00','Shillings(KES)',1),(2,2,'300000.00','Shillings(KES)',1),(3,6,'800.00','Shillings(KSH)',1);

/*Table structure for table `currencies` */

DROP TABLE IF EXISTS `currencies`;

CREATE TABLE `currencies` (
  `currencyid` int(11) NOT NULL AUTO_INCREMENT,
  `currencyname` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`currencyid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `currencies` */

insert  into `currencies`(`currencyid`,`currencyname`) values (1,'Shillings(KSH)'),(2,'USD($)'),(4,'Shillings(Tsh)'),(5,'Shillings(Ugx)');

/*Table structure for table `drivers` */

DROP TABLE IF EXISTS `drivers`;

CREATE TABLE `drivers` (
  `driverid` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `idtype` int(11) DEFAULT NULL,
  `identityno` varchar(50) DEFAULT NULL,
  `telephoneno` varchar(50) DEFAULT NULL,
  `residence` varchar(50) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `dateadded` datetime DEFAULT NULL,
  `deleted` bit(1) DEFAULT b'0',
  `deletedby` int(11) DEFAULT NULL,
  `datedeleted` datetime DEFAULT NULL,
  PRIMARY KEY (`driverid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `drivers` */

insert  into `drivers`(`driverid`,`firstname`,`lastname`,`idtype`,`identityno`,`telephoneno`,`residence`,`userid`,`dateadded`,`deleted`,`deletedby`,`datedeleted`) values (1,'Charonyi','Ni Wasi',1,'22275119','0720871576','Mikindani - Kwa Shee',1,NULL,'\0',1,'2025-02-09 10:48:23'),(2,'Wanjala','Kimapenzi',2,'5487','0721429115','Jomvu - Madafuni',1,'2025-02-04 18:09:00','\0',NULL,NULL),(3,'Bloomberg Durenberg','Ocholla',3,'78WER345AS','0745897526','Migadini',1,'2025-02-04 18:11:20','\0',NULL,NULL),(4,'Sam',' Mosabi',1,'78546321','0712345678','Mombasa Mikindani',1,'2025-03-13 15:35:41','\0',NULL,NULL),(5,'Martin','Obwaka',1,'23659874','0789654123','Nairobi',1,'2025-04-04 18:18:46','\0',NULL,NULL);

/*Table structure for table `emailconfiguration` */

DROP TABLE IF EXISTS `emailconfiguration`;

CREATE TABLE `emailconfiguration` (
  `emailaddress` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `smtpserver` varchar(100) DEFAULT NULL,
  `usessl` tinyint(4) DEFAULT NULL,
  `smtpport` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `emailconfiguration` */

insert  into `emailconfiguration`(`emailaddress`,`password`,`smtpserver`,`usessl`,`smtpport`) values ('insurance@cuvva.co.ke','New@Old-Man','mail.cuvva.co.ke',1,465);

/*Table structure for table `employeerecords` */

DROP TABLE IF EXISTS `employeerecords`;

CREATE TABLE `employeerecords` (
  `employeeid` int(11) NOT NULL AUTO_INCREMENT,
  `staffno` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `termid` int(11) DEFAULT NULL,
  `categoryid` int(11) DEFAULT NULL,
  `departmentid` int(11) DEFAULT NULL,
  `religionid` int(11) DEFAULT NULL,
  `salutationid` int(11) DEFAULT NULL,
  `iddocumentid` int(11) DEFAULT NULL,
  `iddocreferenceno` varchar(50) DEFAULT NULL,
  `iddocexpirydate` date DEFAULT NULL,
  `dateofbirth` date DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `pinno` varchar(50) DEFAULT NULL,
  `nssfno` varchar(50) DEFAULT NULL,
  `nhifno` varchar(50) DEFAULT NULL,
  `disabled` tinyint(1) DEFAULT 1,
  `disabilitytype` varchar(50) DEFAULT NULL,
  `disabilitydescription` varchar(100) DEFAULT NULL,
  `disabilitycertificateno` varchar(50) DEFAULT NULL,
  `onpayroll` tinyint(1) DEFAULT NULL,
  `fixedpaye` tinyint(1) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `positionid` int(11) DEFAULT NULL,
  `jobgroupid` int(11) DEFAULT NULL,
  `notchid` int(11) DEFAULT NULL,
  `bankbranchid` int(11) DEFAULT NULL,
  `bankaccountnumber` varchar(50) DEFAULT NULL,
  `employmentdate` date DEFAULT NULL,
  `separationdate` date DEFAULT NULL,
  `separationreason` varchar(50) DEFAULT NULL,
  `physicaladdress` varchar(100) DEFAULT NULL,
  `postaladdress` varchar(50) DEFAULT NULL,
  `town` varchar(50) DEFAULT NULL,
  `postalcode` varchar(50) DEFAULT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `emailaddress` varchar(100) DEFAULT NULL,
  `alternativemobile` varchar(100) DEFAULT NULL,
  `alternativeemailaddress` varchar(100) DEFAULT NULL,
  `dateadded` datetime DEFAULT NULL,
  `addedby` int(11) DEFAULT NULL,
  PRIMARY KEY (`employeeid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `employeerecords` */

insert  into `employeerecords`(`employeeid`,`staffno`,`firstname`,`middlename`,`lastname`,`termid`,`categoryid`,`departmentid`,`religionid`,`salutationid`,`iddocumentid`,`iddocreferenceno`,`iddocexpirydate`,`dateofbirth`,`gender`,`pinno`,`nssfno`,`nhifno`,`disabled`,`disabilitytype`,`disabilitydescription`,`disabilitycertificateno`,`onpayroll`,`fixedpaye`,`status`,`positionid`,`jobgroupid`,`notchid`,`bankbranchid`,`bankaccountnumber`,`employmentdate`,`separationdate`,`separationreason`,`physicaladdress`,`postaladdress`,`town`,`postalcode`,`mobile`,`emailaddress`,`alternativemobile`,`alternativeemailaddress`,`dateadded`,`addedby`) values (1,'NT0001','Richard','Onyango','Akelo',4,2,10,1,1,1,'23657524','0000-00-00','1983-01-11','male','A00389875','7487854','N9879347',0,'none','','',0,0,'active',6,10,8,3,'0250190497310','2009-06-17',NULL,NULL,'Kandisi, Ongata Rongai, Opp SGR','52428','Nairobi','00200','0727709772','akellorich@gmail.com','','','2024-06-15 13:32:58',5),(2,'AC0001','Martin','Lawrence','Jameson',4,1,2,1,2,1,'3487674','0000-00-00','2005-06-01','male','A743657534H','2638764','N27979287',0,'none','',NULL,1,0,'active',10,10,8,3,'0111250456897','2018-01-01',NULL,NULL,'New York','99832','New York','801210','0734556677','akellorich1@gmail.com','','','2024-06-15 13:48:18',5),(3,'TST001','James','Marsden','Cain',4,1,2,1,2,1,'34876747','0000-00-00','2005-06-01','male','A743657534HY','2638764J','N27979287U',1,'permanent','Clubfoot','85796767',1,0,'active',1,10,4,3,'0111250456897','2018-01-01',NULL,NULL,'New York','99832','New York','801210','0734556674','akellorich1@gmail.com','','','2024-06-15 13:50:28',5),(4,'NT0002','Patrice','Lumumba','Emery',4,2,1,1,3,1,'5786547','0000-00-00','1974-03-31','male','A3476865H','873464','R827647',0,'none','','',1,0,'active',12,10,6,2,'1115456','1990-01-01',NULL,NULL,'Gatsabo District, Nyarutarama, Kigali','4587','Kigali, Rwanda','89089','256789456123','akellorich1@gmail.com','','','2024-06-15 15:04:58',5),(5,'NT0003','Marion','Jones','Mayers',4,2,1,1,2,1,'456789798','0000-00-00','1980-04-01','female','A45876465H','376487654','N736746U',0,'none','','',1,0,'active',2,10,4,2,'11156789422','1992-06-01',NULL,NULL,'Beverly Hills, Carlifonia','9485908','Beverly Hills','810210','254753601502','akellorich1@gmail.com','','','2024-06-15 15:11:35',5),(6,'AC0002','Richard','Onyango','',6,1,1,4,3,1,'878976986','0000-00-00','2024-07-15','male','7576545','75876','8766',1,'temporary','Fisheye','8579676709',1,0,'active',7,5,5,1,'79877698765','2024-07-15',NULL,NULL,'','','','','0727709773','akellorich1@gmail.com','','','2024-07-15 19:33:31',5),(7,'ST0321','Leila','Charles','Achieng',4,2,1,1,1,1,'11840101','0000-00-00','2005-08-01','female','A0098749875H','-','-',0,'none','','',1,0,'active',1,11,9,5,'01020017043300','2023-08-01',NULL,NULL,'Haile Sellasie Avenue','52428','Nairobi','00200','0727477757','akellorich1@gmail.com','','','2024-08-09 12:54:36',5),(8,'AC0003','Sam','Mosabi','Mungeli',4,1,12,1,1,1,'37966232','0000-00-00','2005-08-03','male','A009876545','7654321','1234567',0,'temporary','','',1,1,'withdrawn',2,20,10,621,'0987654321','2024-08-19',NULL,NULL,'Donholm','1725','Nairobi','00100','0725162888','mosabisam2@gmail.com','','','2024-08-19 14:19:45',5);

/*Table structure for table `expense` */

DROP TABLE IF EXISTS `expense`;

CREATE TABLE `expense` (
  `expenseid` int(11) NOT NULL AUTO_INCREMENT,
  `allocatedexpensename` varchar(50) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`expenseid`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `expense` */

insert  into `expense`(`expenseid`,`allocatedexpensename`,`deleted`) values (61,'Driver Allowance',0),(62,'Maintenance and Repairs',0),(63,'Insurance',0),(64,'Driver Wages and Benefits',0),(65,'Licensing',0),(66,'road toll',0);

/*Table structure for table `idtypes` */

DROP TABLE IF EXISTS `idtypes`;

CREATE TABLE `idtypes` (
  `typeid` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) DEFAULT NULL,
  `deleted` bit(1) DEFAULT b'0',
  PRIMARY KEY (`typeid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `idtypes` */

insert  into `idtypes`(`typeid`,`description`,`deleted`) values (1,'National ID','\0'),(2,'Passport','\0'),(3,'Alien Card','\0'),(4,'Military','\0');

/*Table structure for table `institution` */

DROP TABLE IF EXISTS `institution`;

CREATE TABLE `institution` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `logo` varchar(1000) DEFAULT NULL,
  `companyname` varchar(50) DEFAULT NULL,
  `physicaladdress` varchar(100) DEFAULT NULL,
  `postaladdress` varchar(1000) DEFAULT NULL,
  `town` varchar(100) DEFAULT NULL,
  `postalcode` varchar(50) DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `baseurl` varchar(1000) DEFAULT NULL,
  `pinno` varchar(50) DEFAULT NULL,
  `nssfno` varchar(50) DEFAULT NULL,
  `nhifno` varchar(50) DEFAULT NULL,
  `supportemail` varchar(100) DEFAULT NULL,
  `supportphone` varchar(100) DEFAULT NULL,
  `essportalurl` varchar(100) DEFAULT NULL,
  `tssportalurl` varchar(100) DEFAULT NULL,
  `appurl` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `institution` */

insert  into `institution`(`id`,`logo`,`companyname`,`physicaladdress`,`postaladdress`,`town`,`postalcode`,`mobile`,`email`,`baseurl`,`pinno`,`nssfno`,`nhifno`,`supportemail`,`supportphone`,`essportalurl`,`tssportalurl`,`appurl`) values (1,'company/tlogo.png','Overland Logistics LTD','Industrial Area Dhanjal House 4th Floor Suite 401','P.O Box 12627 ','Nairobi','00100','+254733199615','info@overlandlogisticsltd.com','overlandlogisticsltd.com/doccheck','A00569898H','86457','N873647F','obwakam@gmail.com','25420871576','http://localhost/rentwise/ess',NULL,NULL);

/*Table structure for table `invoicedetails` */

DROP TABLE IF EXISTS `invoicedetails`;

CREATE TABLE `invoicedetails` (
  `invoiceid` int(11) DEFAULT NULL,
  `deliveryorderno` varchar(50) DEFAULT NULL,
  `amount` decimal(18,2) DEFAULT NULL,
  `tax` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `invoicedetails` */

insert  into `invoicedetails`(`invoiceid`,`deliveryorderno`,`amount`,`tax`) values (1,'DN000008','1900000.00',0),(2,'DN000009','1900000.00',1),(3,'DN000010','1900000.00',1),(4,'DN000020','154789.00',1),(5,'DN000011','1250000.00',1),(6,'DN000006','30000.00',1),(7,'DN000019','56500.00',1),(8,'DN000011','1250000.00',1),(9,'DN000012','587000.00',0),(10,'DN000022','95000.00',1),(11,'DN000021','90500.00',0),(12,'DN000007','56500.00',0),(12,'DN000013','56500.00',0),(12,'DN000014','56500.00',0),(12,'DN000015','56500.00',0),(12,'DN000016','56500.00',0),(13,'DN000024','1800000.00',1);

/*Table structure for table `invoices` */

DROP TABLE IF EXISTS `invoices`;

CREATE TABLE `invoices` (
  `invoiceid` int(11) NOT NULL AUTO_INCREMENT,
  `invoiceno` varchar(50) DEFAULT NULL,
  `clientid` int(11) DEFAULT NULL,
  `invoicedate` date DEFAULT NULL,
  `currency` int(11) DEFAULT NULL,
  `rate` decimal(18,2) DEFAULT NULL,
  `dateadded` datetime DEFAULT current_timestamp(),
  `addedby` int(11) DEFAULT NULL,
  `deleted` int(11) DEFAULT 0,
  `datedeleted` datetime DEFAULT NULL,
  `deletedby` int(11) DEFAULT NULL,
  PRIMARY KEY (`invoiceid`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `invoices` */

insert  into `invoices`(`invoiceid`,`invoiceno`,`clientid`,`invoicedate`,`currency`,`rate`,`dateadded`,`addedby`,`deleted`,`datedeleted`,`deletedby`) values (4,'INV000011',4,'2025-05-02',1,'1.00','2025-05-02 11:56:09',5,1,'2025-05-12 19:02:35',3),(5,'INV000012',1,'2025-05-08',1,'1.00','2025-05-08 17:53:45',5,1,'2025-05-08 17:54:07',3),(6,'INV000013',2,'2025-05-08',1,'1.00','2025-05-08 17:54:24',5,0,NULL,NULL),(7,'INV000014',6,'2025-05-09',1,'1.00','2025-05-09 14:37:13',5,1,'2025-05-13 15:21:17',3),(8,'INV000015',1,'2025-05-09',1,'1.00','2025-05-09 14:44:28',5,1,'2025-05-12 10:13:50',3),(9,'INV000016',4,'2025-05-06',1,'1.00','2025-05-09 15:33:02',5,1,'2025-05-13 13:55:43',3),(10,'INV000017',1,'2025-05-12',1,'1.00','2025-05-12 10:06:48',5,1,'2025-05-12 10:09:22',3),(11,'INV000018',1,'2025-05-12',1,'1.00','2025-05-12 10:09:42',5,1,'2025-05-12 10:27:20',3),(12,'INV000019',6,'2025-05-13',1,'1.00','2025-05-13 15:25:43',5,1,'2025-05-13 15:27:52',3),(13,'INV000020',6,'2025-05-19',1,'1.00','2025-05-19 10:34:22',5,0,NULL,NULL);

/*Table structure for table `objects` */

DROP TABLE IF EXISTS `objects`;

CREATE TABLE `objects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) DEFAULT NULL,
  `module` varchar(50) DEFAULT NULL,
  `restricted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `objects` */

insert  into `objects`(`id`,`description`,`module`,`restricted`) values (1,'View users list','admin',0),(2,'Manage user details','admin',0),(3,'Add Clients','admin',0),(7,'View member statements','finance',0),(8,'Manage client schedule','admin',0),(10,'Manage client documents','admin',0),(11,'Delete Client','admin',0),(14,'Manage system settings','admin',0),(15,'Manage chart of accounts','finance',0),(16,'Manage financial periods','finance',0),(17,'Manage journals','finance',0),(20,'Generate report by company','reports',0),(25,'Print Client receipts','reports',0),(26,'Manage Companies','admin',0),(28,'Manage Chart of Accounts','finance',0),(30,'Manage customer accounts','fosa',0),(45,'Generate qualitative analysis report','reports',0),(46,'Generate quantitative analysis report','reports',0),(47,'Generate company membership report','reports',0),(48,'View System Dashboard','reports',0),(50,'Manage Recoveries','bosa',0),(52,'Manage Communications','bosa',0),(53,'Manage System Users','admin',0),(54,'Manage deliveries','bosa',0),(56,'View reports','bosa',0),(57,'Manage finance','finance',0),(58,'Manage customer deliveries','bosa',0),(59,'Save client details','bosa',0),(60,'Save allocations','admin',0),(61,'Edit allocations','admin',0),(62,'Save invoices','admin',0),(63,'Edit invoices','admin',0),(64,'Cancel invoices','admin',0),(65,'Save credit note','finance',0),(66,'Edit credit note','finance',0),(67,'Cancel credit note','finance',0),(68,'Save receipts','finance',0),(69,'Cancel receipts','finance',0),(70,'View receipts','finance',0),(71,'View invoices','finance',0),(72,'Print Invoices','finance',0),(73,'Print Credit note','finance',0),(74,'Print Delivery note','admin',0),(75,'Add Driver','admin',0),(76,'Add Vehicle','admin',0),(77,'Manage Drivers','admin',0),(78,'Manage Vehicles','admin',0),(79,'Delete Driver','admin',0),(80,'Delete Vehicle','admin',0),(81,'Add Allocation','admin',0),(82,'Delete Allocations','admin',0),(83,'Edit Client','admin',0),(84,'Print Statement','admin',0);

/*Table structure for table `receiptdetails` */

DROP TABLE IF EXISTS `receiptdetails`;

CREATE TABLE `receiptdetails` (
  `receiptid` int(11) NOT NULL,
  `invoiceno` varchar(50) DEFAULT NULL,
  `amount` decimal(18,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `receiptdetails` */

insert  into `receiptdetails`(`receiptid`,`invoiceno`,`amount`) values (1,'INV000008','1900000.00'),(2,'INV000011','154789.00'),(3,'INV000009','1900000.00'),(3,'INV000010','100000.00'),(4,'INV000012','1250000.00'),(4,'INV000015','50000.00'),(6,'INV000014','56500.00'),(7,'INV000019','56500.00'),(8,'INV000019','56500.00'),(8,'INV000019','56500.00'),(8,'INV000019','56500.00'),(8,'INV000019','56500.00'),(8,'INV000019','56500.00'),(10,'INV000020','1800000.00'),(11,'INV000019','56500.00'),(11,'INV000019','3000.00'),(12,'INV000020','500000.00'),(13,'INV000020','1300000.00');

/*Table structure for table `receipts` */

DROP TABLE IF EXISTS `receipts`;

CREATE TABLE `receipts` (
  `receiptid` int(11) NOT NULL AUTO_INCREMENT,
  `clientid` int(11) DEFAULT NULL,
  `receiptno` varchar(50) DEFAULT NULL,
  `receiptdate` date DEFAULT NULL,
  `modeofpayment` int(11) DEFAULT NULL,
  `reference` varchar(50) DEFAULT NULL,
  `paycurrency` int(11) DEFAULT NULL,
  `exchangerate` double(18,2) DEFAULT NULL,
  `dateadded` datetime DEFAULT current_timestamp(),
  `addedby` int(11) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `datedeleted` date DEFAULT NULL,
  `deletedby` int(11) DEFAULT NULL,
  PRIMARY KEY (`receiptid`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `receipts` */

insert  into `receipts`(`receiptid`,`clientid`,`receiptno`,`receiptdate`,`modeofpayment`,`reference`,`paycurrency`,`exchangerate`,`dateadded`,`addedby`,`deleted`,`datedeleted`,`deletedby`) values (1,1,'RCPT000002','2025-04-17',1,'Paid by CASH',1,1.00,'2025-04-17 10:54:52',5,0,NULL,NULL),(2,4,'RCPT000003','2025-05-02',3,'R2RGDVH97387',1,1.00,'2025-05-02 11:58:36',5,0,NULL,NULL),(3,1,'RCPT000004','0000-00-00',1,'Paid by Cash',1,11.00,'2025-05-08 17:37:53',5,1,'2025-05-13',3),(4,1,'RCPT000005','2025-05-09',2,'15248754',1,1.00,'2025-05-09 15:35:06',5,1,'2025-05-13',3),(6,6,'RCPT000006','2025-05-13',1,'paid by Cash',1,1.00,'2025-05-13 14:30:23',5,0,NULL,NULL),(7,6,'RCPT000007','2025-05-13',1,'Paid by Cash',1,1.00,'2025-05-13 15:27:13',5,1,'2025-05-19',3),(11,6,'RCPT000011','2025-05-19',1,'paid by Cash',1,1.00,'2025-05-19 10:53:32',5,0,NULL,NULL),(12,6,'RCPT000012','2025-05-19',1,'Paid by Cash',1,1.00,'2025-05-19 10:54:18',5,0,NULL,NULL),(13,6,'RCPT000013','2025-05-19',1,'Paid by Cash',1,1.00,'2025-05-19 10:55:16',5,0,NULL,NULL);

/*Table structure for table `serials` */

DROP TABLE IF EXISTS `serials`;

CREATE TABLE `serials` (
  `documentid` int(11) NOT NULL AUTO_INCREMENT,
  `document` varchar(50) DEFAULT NULL,
  `prefix` varchar(50) DEFAULT NULL,
  `currentno` int(11) DEFAULT NULL,
  PRIMARY KEY (`documentid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `serials` */

insert  into `serials`(`documentid`,`document`,`prefix`,`currentno`) values (1,'Delivery Note','DN',25),(2,'Invoice','INV',21),(3,'Receipt','RCPT',14),(4,'Creditnote','CRNT',3);

/*Table structure for table `tax` */

DROP TABLE IF EXISTS `tax`;

CREATE TABLE `tax` (
  `taxid` int(11) NOT NULL AUTO_INCREMENT,
  `taxname` varchar(50) DEFAULT NULL,
  `taxrate` varchar(50) DEFAULT NULL,
  `dateadded` date DEFAULT NULL,
  `addedby` int(11) DEFAULT NULL,
  `deleted` int(11) DEFAULT NULL,
  `datedeleted` date DEFAULT NULL,
  `deletedby` int(11) DEFAULT NULL,
  PRIMARY KEY (`taxid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tax` */

/*Table structure for table `tempallocatedexpenses` */

DROP TABLE IF EXISTS `tempallocatedexpenses`;

CREATE TABLE `tempallocatedexpenses` (
  `refno` varchar(50) DEFAULT NULL,
  `expenseid` int(11) DEFAULT NULL,
  `amount` decimal(18,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tempallocatedexpenses` */

insert  into `tempallocatedexpenses`(`refno`,`expenseid`,`amount`) values ('814a84e6ffcc27b92efa',62,'30000.00'),('814a84e6ffcc27b92efa',63,'50000.00'),('814a84e6ffcc27b92efa',64,'30000.00'),('7d3d001f789cb515f6ee',62,'30000.00'),('7d3d001f789cb515f6ee',63,'50000.00'),('7d3d001f789cb515f6ee',64,'30000.00'),('231085ed8e4ecd54091e',62,'30000.00'),('231085ed8e4ecd54091e',63,'50000.00'),('231085ed8e4ecd54091e',64,'30000.00');

/*Table structure for table `tempcreditnote` */

DROP TABLE IF EXISTS `tempcreditnote`;

CREATE TABLE `tempcreditnote` (
  `refno` varchar(50) DEFAULT NULL,
  `invoiceid` int(11) DEFAULT NULL,
  `amount` decimal(18,2) DEFAULT NULL,
  `currency` varchar(50) DEFAULT NULL,
  `tax` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tempcreditnote` */

insert  into `tempcreditnote`(`refno`,`invoiceid`,`amount`,`currency`,`tax`) values ('9192ed306ec10114937efe0591a40edfb824651621c19ba7a5',1,'300000.00','Shillings(KES)',1),('3d5967d15b74e34d5f5cddcc58853e1840aa6d32b780aaf55c',1,'50000.00','Shillings(KES)',1),('b34509e99c308ceb22a308282df9958ee9cb83619d3477e209',2,'300000.00','Shillings(KES)',1),('d9255c3ab5cab6a5077b56f823d5fb0e109d0fd91f540fc463',6,'800.00','Shillings(KSH)',1);

/*Table structure for table `tempinvoices` */

DROP TABLE IF EXISTS `tempinvoices`;

CREATE TABLE `tempinvoices` (
  `refno` varchar(1000) DEFAULT NULL,
  `deliveryorderno` varchar(50) DEFAULT NULL,
  `amount` decimal(18,2) DEFAULT NULL,
  `tax` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tempinvoices` */

insert  into `tempinvoices`(`refno`,`deliveryorderno`,`amount`,`tax`) values ('920443d3de9496ee679422a71478edb385b95766ac9e4935f0f565f8e8716c66','DN000007','56500.00',1),('ee09c0a530c3c0a787bd8aa75266dec594d8c6b87c5469ebcf3c26af33a8c975','DN000007','56500.00',1),('a00af6ca2fc98ce84e412eede5f67a339552acbd15c98fe9f3fb7c775207fdf4','DN000006','30000.00',1),('ce8ca30ecf6575340b8bc265068e0f7b75e4e5ff271227d485d04442ca9a21b1','DN000006','30000.00',1),('88f0e1994e173523f33b584a8e7dfc90a400a93ebaf690fe0b37d3f6e63519a8','DN000008','1900000.00',1),('88f0e1994e173523f33b584a8e7dfc90a400a93ebaf690fe0b37d3f6e63519a8','DN000009','1900000.00',0),('88f0e1994e173523f33b584a8e7dfc90a400a93ebaf690fe0b37d3f6e63519a8','DN000010','1900000.00',1),('926bc82dea8abca00468e89e6a9f16efaad1dc5cf660382d34a748499c1d2d42','DN000008','1900000.00',1),('926bc82dea8abca00468e89e6a9f16efaad1dc5cf660382d34a748499c1d2d42','DN000009','1900000.00',0),('926bc82dea8abca00468e89e6a9f16efaad1dc5cf660382d34a748499c1d2d42','DN000010','1900000.00',1),('5282313e236f58940428b71dcb44f43a369e5321b4ef4bde84b20b7aead54d7c','DN000008','1900000.00',1),('5282313e236f58940428b71dcb44f43a369e5321b4ef4bde84b20b7aead54d7c','DN000009','1900000.00',0),('5282313e236f58940428b71dcb44f43a369e5321b4ef4bde84b20b7aead54d7c','DN000010','1900000.00',1),('9d11e4abaca7f3edba4a0ff77db738a2b3c1fe77bbfc59296b65538502753410','DN000010','1900000.00',1),('9d11e4abaca7f3edba4a0ff77db738a2b3c1fe77bbfc59296b65538502753410','DN000011','1250000.00',0),('bfb402a8ffd46cd711aca6611f94487207cc4fba95e507a827201666b57439a5','DN000008','1900000.00',1),('bfb402a8ffd46cd711aca6611f94487207cc4fba95e507a827201666b57439a5','DN000009','1900000.00',0),('bfb402a8ffd46cd711aca6611f94487207cc4fba95e507a827201666b57439a5','DN000010','1900000.00',1),('33e746e81d34d45d0aa7ace911ee36e6a421e976081665f583b8e1615f90ec6d','DN000007','56500.00',1),('2a2536a90a6703cf6c8d7c512eea5906bfa66c56aba63e94ba72103cd9917e0d','DN000007','56500.00',1),('45a582ea4652f80d99a535dd5f2c29b906cd3518f99f993b436be17cab7bb7fc','DN000008','1900000.00',1),('45a582ea4652f80d99a535dd5f2c29b906cd3518f99f993b436be17cab7bb7fc','DN000009','1900000.00',0),('45a582ea4652f80d99a535dd5f2c29b906cd3518f99f993b436be17cab7bb7fc','DN000010','1900000.00',1),('45a582ea4652f80d99a535dd5f2c29b906cd3518f99f993b436be17cab7bb7fc','DN000011','1250000.00',0),('cfdf2a9bd2ef505f0fe48c24b2f1b88243a8fcf2c044f120eb82269324049095','DN000008','1900000.00',1),('37c10cb193f62f03ae6d9ef3617643d1c853ed95a5add7bc60d85f8f0b23edff','DN000009','1900000.00',1),('37c10cb193f62f03ae6d9ef3617643d1c853ed95a5add7bc60d85f8f0b23edff','DN000010','1900000.00',0),('7afdff11fdc5cfbc9b01e775b0f91bccb16a623f4849db16fb0b663deb484103','DN000006','30000.00',1),('e3dd3e87a77a55bc1c946c86b01c464082a07c9b9b9e5cf48e357cdde67be923','DN000008','1900000.00',1),('6302baa8532a54a755297310d18cfbfa1788c1398685e0688fe4baab1b39e8d3','DN000008','1900000.00',1),('d518f02d618528e0e67a5ecd390a3e2ec5ae38ae4ee32be9191431c70615cbe4','DN000020','154789.00',1),('0016b098591f368d6dcfb1c8ed6d5b858351b7c1b2b75f54ff0bd701b7f21e82','DN000011','1250000.00',1);

/*Table structure for table `tempprivilege` */

DROP TABLE IF EXISTS `tempprivilege`;

CREATE TABLE `tempprivilege` (
  `refno` varchar(50) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `objectid` int(11) DEFAULT NULL,
  `valid` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `tempprivilege` */

insert  into `tempprivilege`(`refno`,`userid`,`objectid`,`valid`) values ('test123',1,101,'');

/*Table structure for table `tempreceipts` */

DROP TABLE IF EXISTS `tempreceipts`;

CREATE TABLE `tempreceipts` (
  `refno` varchar(100) DEFAULT NULL,
  `invoiceno` varchar(50) DEFAULT NULL,
  `amount` decimal(18,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tempreceipts` */

insert  into `tempreceipts`(`refno`,`invoiceno`,`amount`) values ('e58619fbcb0fd2c58f2878da7dfc8c2117fa4ba36823d6059f07ef08e27e24ff','INV000001','1900000.00'),('5130c7646fc0ffa51fb3ad7c19831a9fc4573b13d1b73f76f75407feafdb7bb0','INV000001','1900000.00'),('744c6734b338e7317f0f7c9c193cfdde51da1e964e99e3b624f0e64dbbc0e891','INV000001','1900000.00'),('744c6734b338e7317f0f7c9c193cfdde51da1e964e99e3b624f0e64dbbc0e891','INV000002','1900000.00'),('744c6734b338e7317f0f7c9c193cfdde51da1e964e99e3b624f0e64dbbc0e891','INV000002','1900000.00'),('d61574c92ac4e514887788c5870be0288784278eb86052d55e22f63b40803411','INV000001','1900000.00'),('d61574c92ac4e514887788c5870be0288784278eb86052d55e22f63b40803411','INV000002','1900000.00'),('e56200666cf6247591c657ee9f41143c3bc802ab8ce387da460e09da68802bc0','INV000001','1900000.00'),('e56200666cf6247591c657ee9f41143c3bc802ab8ce387da460e09da68802bc0','INV000002','1900000.00'),('51e8d622929332ffbd2986319cf65edfaab2e51e8a8dfb07e3edec581af4a767','INV000001','1900000.00'),('51e8d622929332ffbd2986319cf65edfaab2e51e8a8dfb07e3edec581af4a767','INV000002','1900000.00');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `middlename` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `accountexpires` tinyint(1) DEFAULT 0,
  `accountexpirydate` datetime DEFAULT NULL,
  `changepasswordonlogon` tinyint(1) DEFAULT 0,
  `accountactive` tinyint(1) DEFAULT 1,
  `reasoninactive` varchar(200) DEFAULT NULL,
  `dateadded` datetime DEFAULT NULL,
  `addedby` int(11) DEFAULT NULL,
  `lastmodifiedon` datetime DEFAULT NULL,
  `lastmodifiedby` int(11) DEFAULT NULL,
  `systemadmin` tinyint(1) DEFAULT 0,
  `profilephoto` varchar(1000) DEFAULT NULL,
  `institutionid` int(11) DEFAULT NULL,
  `salt` varchar(50) DEFAULT NULL,
  `systemlabel` varchar(50) DEFAULT NULL,
  `category` varchar(50) DEFAULT 'system',
  `emailactivationcode` varchar(50) DEFAULT NULL,
  `phoneactivationcode` varchar(50) DEFAULT NULL,
  `platform` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`userid`),
  KEY `institutionid` (`institutionid`),
  KEY `addedby` (`addedby`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `user` */

insert  into `user`(`userid`,`username`,`firstname`,`middlename`,`lastname`,`email`,`mobile`,`password`,`accountexpires`,`accountexpirydate`,`changepasswordonlogon`,`accountactive`,`reasoninactive`,`dateadded`,`addedby`,`lastmodifiedon`,`lastmodifiedby`,`systemadmin`,`profilephoto`,`institutionid`,`salt`,`systemlabel`,`category`,`emailactivationcode`,`phoneactivationcode`,`platform`) values (3,'admin','System','Administrator','Fleet','mosabisam2@gmail.com','0725162888','1c986a5f526fda89666cdb2a9547a436',0,NULL,0,1,NULL,NULL,NULL,'2025-05-21 16:44:36',3,1,NULL,1,NULL,NULL,'system',NULL,NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36'),(4,'Manager','Martin','Obwaka','M','obwakam@gmail.com','0720871576','f6b4c23d64b0b7343be66e4614d1f06a6df0c47c',0,NULL,0,1,NULL,'2025-05-07 17:42:51',3,'2025-05-19 10:57:39',3,1,NULL,1,'81dc9bdb52d04dc20036dbd8313ed055',NULL,'system',NULL,NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36');

/*Table structure for table `usercompanies` */

DROP TABLE IF EXISTS `usercompanies`;

CREATE TABLE `usercompanies` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL,
  `companyid` int(11) DEFAULT NULL,
  `dateadded` datetime DEFAULT NULL,
  `addedby` int(11) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `datedeleted` datetime DEFAULT NULL,
  `deletedby` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userid` (`userid`),
  KEY `companyid` (`companyid`),
  KEY `addedby` (`addedby`),
  KEY `deletedby` (`deletedby`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

/*Data for the table `usercompanies` */

/*Table structure for table `userprivileges` */

DROP TABLE IF EXISTS `userprivileges`;

CREATE TABLE `userprivileges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `objectid` int(11) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `allowed` tinyint(1) DEFAULT NULL,
  `dateadded` datetime DEFAULT current_timestamp(),
  `addedby` int(11) DEFAULT NULL,
  `lastdateupdated` datetime DEFAULT NULL,
  `lastupdatedby` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2389 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `userprivileges` */

insert  into `userprivileges`(`id`,`objectid`,`userid`,`allowed`,`dateadded`,`addedby`,`lastdateupdated`,`lastupdatedby`) values (2336,81,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2337,3,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2338,75,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2339,76,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2340,67,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2341,64,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2342,69,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2343,82,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2344,11,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2345,79,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2346,80,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2347,61,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2348,83,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2349,66,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2350,63,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2351,47,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2352,45,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2353,46,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2354,20,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2355,28,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2356,15,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2357,10,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2358,8,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2359,52,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2360,26,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2361,30,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2362,58,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2363,54,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2364,77,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2365,57,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2366,16,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2367,17,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2368,50,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2369,14,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2370,53,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2371,2,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2372,78,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2373,25,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2374,73,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2375,74,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2376,72,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2377,84,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2378,60,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2379,59,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2380,65,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2381,62,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2382,68,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2383,71,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2384,7,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2385,70,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2386,56,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2387,48,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3),(2388,1,4,1,'2025-05-07 17:42:51',3,'2025-05-07 17:42:51',3);

/*Table structure for table `vehicles` */

DROP TABLE IF EXISTS `vehicles`;

CREATE TABLE `vehicles` (
  `vehicleid` int(11) NOT NULL AUTO_INCREMENT,
  `trucknumber` varchar(50) DEFAULT NULL,
  `trailerno` varchar(50) DEFAULT NULL,
  `model` varchar(50) DEFAULT NULL,
  `manufacturedyear` int(11) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `vehicletype` int(11) DEFAULT NULL,
  `dateadded` datetime DEFAULT current_timestamp(),
  `addedby` int(11) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  `datedeleted` datetime DEFAULT NULL,
  `deletedby` int(11) DEFAULT NULL,
  PRIMARY KEY (`vehicleid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `vehicles` */

insert  into `vehicles`(`vehicleid`,`trucknumber`,`trailerno`,`model`,`manufacturedyear`,`color`,`vehicletype`,`dateadded`,`addedby`,`deleted`,`datedeleted`,`deletedby`) values (2,'KDD 628M','ZD 1234','Mercedes Actros',2019,'White',1,'2025-01-18 14:02:18',1,1,'2025-02-26 11:35:32',1),(3,'KCM 628K','ZC 456J','MAN',2014,'White',1,'2025-01-21 14:27:09',1,0,'2025-01-31 19:47:06',1),(4,'KDJ 345G','ZC 546W','MAN',2015,'Blue',1,'2025-01-31 16:44:13',1,0,'2025-01-31 20:00:53',1),(5,'KDC 654U','ZB 786W','Renault',2013,'Green',1,'2025-01-31 16:48:35',1,0,'2025-01-31 20:03:10',1),(6,'KCY','BD 756R','Bedford',2019,'Black',1,'2025-01-31 17:31:32',1,1,'2025-01-31 20:23:44',1),(7,'KDH 675R','VB 543R','MAN',2020,'Green',2,'2025-01-31 17:39:38',1,0,NULL,NULL),(8,'KDJ 546L','GT 542','Renault',2018,'Green',2,'2025-02-03 10:04:30',1,0,NULL,NULL);

/*Table structure for table `vehicletype` */

DROP TABLE IF EXISTS `vehicletype`;

CREATE TABLE `vehicletype` (
  `vehicletypeid` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`vehicletypeid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

/*Data for the table `vehicletype` */

insert  into `vehicletype`(`vehicletypeid`,`description`,`deleted`) values (1,'Heavy Commercial',0),(2,'Light Commercial',0),(3,'Staff',0);

/* Function  structure for function  `fn_generatecreditnoteno` */

/*!50003 DROP FUNCTION IF EXISTS `fn_generatecreditnoteno` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` FUNCTION `fn_generatecreditnoteno`() RETURNS varchar(50) CHARSET utf8mb4 COLLATE utf8mb4_general_ci
BEGIN
	DECLARE $creditnoteno VARCHAR(50);
	SELECT CONCAT(`prefix`,
	CASE  CHAR_LENGTH(`currentno`)	
		WHEN 1 THEN '00000'
		WHEN 2 THEN '0000'
		WHEN 3 THEN '000'
		WHEN 4 THEN '00'
		WHEN 5 THEN '0'
	ELSE
		''
	END,
	`currentno`) INTO $creditnoteno
	FROM `serials` WHERE `documentid`=4;
	
	RETURN $creditnoteno;	
    END */$$
DELIMITER ;

/* Function  structure for function  `fn_generatedeliveryno` */

/*!50003 DROP FUNCTION IF EXISTS `fn_generatedeliveryno` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` FUNCTION `fn_generatedeliveryno`() RETURNS varchar(50) CHARSET utf8mb4 COLLATE utf8mb4_general_ci
BEGIN
	DECLARE $deliveryno VARCHAR(50);
	SELECT CONCAT(`prefix`,
	CASE  CHAR_LENGTH(`currentno`)	
		WHEN 1 THEN '00000'
		WHEN 2 THEN '0000'
		WHEN 3 THEN '000'
		WHEN 4 THEN '00'
		WHEN 5 THEN '0'
	ELSE
		''
	END,
	`currentno`) INTO $deliveryno
	FROM `serials` WHERE `documentid`=1;
	
	RETURN $deliveryno;	
    END */$$
DELIMITER ;

/* Function  structure for function  `fn_generateinvoiceno` */

/*!50003 DROP FUNCTION IF EXISTS `fn_generateinvoiceno` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` FUNCTION `fn_generateinvoiceno`() RETURNS varchar(50) CHARSET utf8mb4 COLLATE utf8mb4_general_ci
BEGIN
	DECLARE $invoiceno VARCHAR(50);
	SELECT CONCAT(`prefix`,
	CASE  CHAR_LENGTH(`currentno`)	
		WHEN 1 THEN '00000'
		WHEN 2 THEN '0000'
		WHEN 3 THEN '000'
		WHEN 4 THEN '00'
		WHEN 5 THEN '0'
	ELSE
		''
	END,
	`currentno`) INTO $invoiceno
	FROM `serials` WHERE `documentid`=2;
	
	RETURN $invoiceno;	
    END */$$
DELIMITER ;

/* Function  structure for function  `fn_generatereceiptno` */

/*!50003 DROP FUNCTION IF EXISTS `fn_generatereceiptno` */;
DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` FUNCTION `fn_generatereceiptno`() RETURNS varchar(50) CHARSET utf8mb4 COLLATE utf8mb4_general_ci
BEGIN
	DECLARE $receiptno VARCHAR(50);
	SELECT CONCAT(`prefix`,
	CASE  CHAR_LENGTH(`currentno`)	
		WHEN 1 THEN '00000'
		WHEN 2 THEN '0000'
		WHEN 3 THEN '000'
		WHEN 4 THEN '00'
		WHEN 5 THEN '0'
	ELSE
		''
	END,
	`currentno`) INTO $receiptno
	FROM `serials` WHERE `documentid`=3;
	
	RETURN $receiptno;	
    END */$$
DELIMITER ;

/* Procedure structure for procedure `spsaveuser` */

/*!50003 DROP PROCEDURE IF EXISTS  `spsaveuser` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `spsaveuser`(
	IN `$refno` VARCHAR(50),
    IN `$userid` INT, 
    IN `$password` VARCHAR(50), 
    IN `$salt` VARCHAR(50), 
    IN `$systemadmin` BIT,
    IN `$username` VARCHAR(50), 
    IN `$firstname` VARCHAR(50), 
    IN `$middlename` VARCHAR(50), 
    IN `$lastname` VARCHAR(50),
    IN `$email` VARCHAR(50), 
    IN `$mobile` VARCHAR(50), 
    IN `$changepasswordonlogon` BIT, 
    IN `$accountactive` BIT, 
    IN `$addedby` INT, 
    IN `$institutionid` INT, 
    IN `$platform` VARCHAR(1000)
)
BEGIN
	DECLARE $id int;
	    -- Get institution name
	    SELECT `companyname` INTO @institutionname FROM `institution` WHERE `id` = $institutionid;
	    
	    IF $userid = 0 THEN
		-- Insert new user
		INSERT INTO `user`(`username`, `password`, `firstname`, `middlename`, `lastname`, `email`, `mobile`, `changepasswordonlogon`, `accountactive`, 
				`addedby`, `systemadmin`, `institutionid`, `salt`, `platform`, `dateadded`)
		VALUES ($username, $password, $firstname, $middlename, $lastname, $email, $mobile, $changepasswordonlogon, $accountactive, 
				$addedby, $systemadmin, $institutionid, $salt, $platform, NOW());
		-- Get the last inserted userid (assuming `userid` is auto-increment)
		SElect max(userid) into $userid  from `user`;
		
		-- delete all privileges
		DELETE FROM `userprivileges` WHERE `userid`=$userid;
		-- add the ones from the temp table
		INSERT INTO `userprivileges` (`userid`,`objectid`,`allowed`,`addedby`,`lastupdatedby`,`lastdateupdated`)
		SELECT $userid,`objectid`,`valid`,$userid,$userid,NOW() FROM `tempprivilege` WHERE `refno`=$refno;
		
		-- Remove temporary data
		DELETE FROM `tempprivilege` WHERE `refno`=$refno;
		
		
		-- Add audit trail entry
		SET @narration = CONCAT('Added system admin account user for ', @institutionname, ' id ', $institutionid); 
		CALL `sp_saveaudittrailentry`($userid, 'Insert', @narration, $platform, '', '');
	    ELSE
		-- Update existing user
		CALL `sp_gettabledata`('username', 'userid', $userid, @originalvalues);
		
		UPDATE `user` 
		SET 
		    `username` = $username, 
		    `firstname` = $firstname, 
		    `middlename` = $middlename, 
		    `lastname` = $lastname, 
		    `email` = $email, 
		    `mobile` = $mobile,
		    `changepasswordonlogon` = $changepasswordonlogon, 
		    `systemadmin` = $systemadmin, 
		    `lastmodifiedby` = $addedby,
		    `lastmodifiedon` = NOW(), 
		    `salt` = $salt
		WHERE `userid` = $userid;
		
		-- delete all privileges
		DELETE FROM `userprivileges` WHERE `userid`=$userid;
		-- add the ones from the temp table
		INSERT INTO `userprivileges` (`userid`,`objectid`,`allowed`,`addedby`,`lastupdatedby`,`lastdateupdated`)
		SELECT $userid,`objectid`,`valid`,$userid,$userid,NOW() FROM `tempprivilege` WHERE `refno`=$refno;
		
		-- Remove temporary data
		DELETE FROM `tempprivilege` WHERE `refno`=$refno;
		
		-- Get updated values for audit trail comparison
		CALL `sp_gettabledata`('user', 'userid', $userid, @currentvalues);
		
		-- If data has changed, save audit trail
		IF @originalvalues <> @currentvalues THEN
		    SET @narration = CONCAT('Updated details of user id ', $userid); 
		    CALL `sp_saveaudittrailentry`($addedby, 'Update', @narration, $platform, @originalvalues, @currentvalues);
		END IF;
	    END IF;
	    
	    -- Return the user ID
	    SELECT $userid AS `userid`;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_cancelcreditnote` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_cancelcreditnote` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_cancelcreditnote`($creditnoteid INT)
BEGIN
	UPDATE `creditnote` SET `deleted`=1,`datedeleted`=NOW(),`deletedby`=3
	WHERE `creditnoteid`=$creditnoteid;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_changeuserpassword` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_changeuserpassword` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_changeuserpassword`($userid NUMERIC, $userpassword VARCHAR(100),$changepasswordonlogon BOOL)
BEGIN
	UPDATE `user` 
	SET `password`=$userpassword,`changepasswordonlogon`=$changepasswordonlogon 
	WHERE `userid`=$userid;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_checkexpenses` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_checkexpenses` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_checkexpenses`()
BEGIN
		select * from `expenses` where `deleted` = 0;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_checkforallocatedvehicle` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_checkforallocatedvehicle` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_checkforallocatedvehicle`($allocationid int, $truckno varchar(50), $trailerno varchar(50))
BEGIN
	start transaction;
		if $allocationid=0 then
			select * from `allocatedvehicles` where `allocationid`!=$allocationid and `truckno`=$truckno and `trailerno`=$trailerno and `deleted`=0
			order by $allocationid;
			
		end if;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_checkfordeliveryorderstatus` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_checkfordeliveryorderstatus` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_checkfordeliveryorderstatus`($deliveryorderid int)
begin
		select * from `deliveryorderstatus` where $deliveryorderid = `deliveryorderid` and`deleted` = 0;
	END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_checkifinvoiceispaid` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_checkifinvoiceispaid` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_checkifinvoiceispaid`($invoiceno VARCHAR(50))
BEGIN
	SELECT `invoiceno` 
	FROM `receiptdetails` as rd
	INNER JOIN `receipts` as r
	inner join `invoicedetails` as id on id.`amount` = rd.`amount`
	WHERE r.`receiptid`=rd.`receiptid`
	AND r.`deleted`=0 AND rd.`invoiceno`=$invoiceno AND rd.`amount`= id.`amount`;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_checkrole` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_checkrole` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_checkrole`(`$roleid` INT, `$rolename` VARCHAR(50))
BEGIN
	SELECT * 
	FROM `roles` 
	WHERE `roleid`<>$roleid AND `rolename`=$rolename;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_checkuser` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_checkuser` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_checkuser`(
    IN _userid INT, 
    IN _checkfield VARCHAR(50), 
    IN _checkvalue VARCHAR(50)
)
BEGIN
    IF _checkfield = 'username' THEN
        IF _userid IS NULL THEN
            SELECT * FROM `user` WHERE `username` = _checkvalue;
        ELSE
            SELECT * FROM `user` WHERE `userid` <> _userid AND `username` = _checkvalue;
        END IF;
    ELSEIF _checkfield = 'email' THEN
        IF _userid IS NULL THEN
            SELECT * FROM `user` WHERE `email` = _checkvalue;
        ELSE
            SELECT * FROM `user` WHERE `userid` <> _userid AND `email` = _checkvalue;
        END IF;
    ELSEIF _checkfield = 'mobile' THEN
        IF _userid IS NULL THEN
            SELECT * FROM `user` WHERE `mobile` = _checkvalue;
        ELSE
            SELECT * FROM `user` WHERE `userid` <> _userid AND `mobile` = _checkvalue;
        END IF;
    END IF;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_createemployeeuseraccount` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_createemployeeuseraccount` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_createemployeeuseraccount`($staffno VARCHAR(50),$mobile VARCHAR(50),$emailaddress VARCHAR(50),$salt VARCHAR(50),
	$userpassword VARCHAR(100),$emailactivationcode VARCHAR(50),$phoneactivationcode VARCHAR(50),
	$userid INT,$platform VARCHAR(50))
BEGIN
		DECLARE $firstname VARCHAR(50);
		DECLARE $middlename VARCHAR(50);
		DECLARE $lastname VARCHAR(50);
		
		SELECT `firstname`,`middlename`,`lastname` 
		INTO $firstname,$middlename,$lastname
		FROM  `employeerecords` WHERE `staffno`=$staffno;
		
		START TRANSACTION;		
			IF NOT EXISTS(SELECT * FROM `user` WHERE `username`=$staffno) THEN 
				-- Create user account for employee
				INSERT INTO `user`(`category`,`username`,`firstname`,`middlename`,`lastname`,`email`,`mobile`,`password`,`salt`,
				`emailactivationcode`,`phoneactivationcode`,`dateadded`,`addedby`)
				VALUES('employee',$staffno,$firstname,$middlename,$lastname,$emailaddress,$mobile,$userpassword,$salt,
				$emailactivationcode,$phoneactivationcode,NOW(),$userid);
				
				-- Update mobile and email addresses
				UPDATE `employeerecords`
				SET `mobile`=$mobile,`emailaddress`=$emailaddress
				WHERE `staffno`=$staffno;
				
				-- Add audit trails for the same
				SELECT CONCAT('Created ESS portal access account for  staff: ',$staffno,' names:',$firstname,' ',$middlename,' ',$lastname)
				INTO @narration;
				CALL `sp_saveaudittrailentry`($userid,'insert',@narration,$platform,'','',NULL);
				
				SELECT CONCAT('Updated concat details for  staff: ',$staffno,' names:',$firstname,' ',$middlename,' ',$lastname)
				INTO @narration;
				CALL `sp_saveaudittrailentry`($userid,'update',@narration,$platform,'','',NULL);
			END IF;
		COMMIT;
	END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_deleteallocatedvehicle` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_deleteallocatedvehicle` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_deleteallocatedvehicle`($allocationid INT)
BEGIN
	UPDATE `allocations` SET `deleted`=1,`datedeleted`=NOW(),`deletedby`=1
	WHERE `allocationid`=$allocationid;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_deleteclient` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_deleteclient` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_deleteclient`($clientid INT)
BEGIN
	UPDATE `clients` SET deleted=1, datedeleted=NOW(),deletedby=3
	WHERE clientid=$clientid;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_deletedriver` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_deletedriver` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_deletedriver`($driverid int)
BEGIN
	UPDATE `drivers` SET `deleted`=1,`deletedby`=3,`datedeleted`=NOW()
	WHERE `driverid`=$driverid;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_deleteinvoice` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_deleteinvoice` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_deleteinvoice`($invoiceid int)
BEGIN
	UPDATE `invoices` SET `deleted`=1,`datedeleted`=NOW(),`deletedby`=3
	where `invoiceid`=$invoiceid;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_deletereceipt` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_deletereceipt` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_deletereceipt`($receiptid INT)
BEGIN
	UPDATE `receipts` SET `deleted`=1,`datedeleted`=NOW(),`deletedby`=3
	WHERE `receiptid`=$receiptid;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_deleteuser` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_deleteuser` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_deleteuser`(`$id` INT, `$userid` INT)
BEGIN
	UPDATE `user` SET `accountactive`=0,`lastmodifiedon`=NOW(),`lastmodifiedby`=$userid, `reasoninactive`='Account deleted'
	WHERE `id`=$id;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_deletevehicle` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_deletevehicle` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_deletevehicle`($vehicleid int)
BEGIN
	UPDATE `vehicles` SET `deleted`=1,`datedeleted`=NOW(),`deletedby`=3
	WHERE `vehicleid`=$vehicleid;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_disableuseraccount` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_disableuseraccount` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_disableuseraccount`(`$id` INT, `$reason` VARCHAR(500), `$userid` INT)
BEGIN
	UPDATE `user` SET `accountactive`=0,`reasoninactive`=$reason,`lastmodifiedby`=$userid,`lastmodifiedon`=NOW()
	WHERE `id`=$id;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_enableuseraccount` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_enableuseraccount` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_enableuseraccount`(`$id` INT, `$userid` INT)
BEGIN
	UPDATE `user` SET `accountactive`=1, `lastmodifiedon`=NOW(),`lastmodifiedby`=$userid
	WHERE `userid`=$id;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getallcurrencies` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getallcurrencies` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getallcurrencies`()
BEGIN
	SELECT * FROM `currencies` 
	ORDER BY `currencyid`;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getalldeliveryorders` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getalldeliveryorders` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getalldeliveryorders`($clientid int)
BEGIN
		SELECT c.clientid,a.deliveryorderno,ad.`dateout`,a.`destination`,a.`containernumber`,a.`exchangerate`,cs.`currencyname`,c.`address`,a.amount
		FROM allocations AS a
		JOIN clients AS c ON a.clientid = c.clientid
		JOIN `allocationdetails` AS ad ON a.`allocationid` = ad.`allocationid`
		JOIN `currencies` AS cs ON a.`currency` = cs.`currencyid`
		WHERE a.clientid = $clientid
		and `invoiced` = 0;
		
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getallexpenses` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getallexpenses` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getallexpenses`()
BEGIN
	select * from `expense`
	-- SELECT  `expenseid`,`expensedescription`,`expenseamount` FROM `expense`
	WHERE `deleted` = 0;
	-- ORDER BY `expenseid` DESC
	-- LIMIT 1;
	
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getallinvoicedclients` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getallinvoicedclients` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getallinvoicedclients`()
BEGIN
	SELECT i.*,c.clientname,c.`clientid`
	FROM `invoices` AS i
	LEFT JOIN `clients` AS c ON i.`clientid` = c.`clientid`
	GROUP BY c.clientname;
	/*SELECT id.*,i.invoiceno,c.clientname
	FROM `invoicedetails` AS id
	-- JOIN `invoices` AS i ON i.`invoiceid`=id.`invoiceid`
	LEFT JOIN `clients` AS c ON i.`clientid` = c.`clientid`;*/
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getallinvoicedclientsdetails` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getallinvoicedclientsdetails` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getallinvoicedclientsdetails`($clientid int)
BEGIN
	SELECT i.`invoiceid`, invoiceno,c.clientid,c.`clientname`,i.`invoicedate`,id.`amount`,
	IFNULL((SELECT SUM(amount) from `receiptdetails` rd INNER JOIN `receipts` r on r.`receiptid`=rd.`receiptid` where `invoiceno`=i.`invoiceno` and `clientid`=c.`clientid` and r.`deleted`=0),0) amountpaid,
	id.`amount`- IFNULL((SELECT SUM(amount) FROM `receiptdetails` rd INNER JOIN `receipts` r ON r.`receiptid`=rd.`receiptid` WHERE `invoiceno`=i.`invoiceno` AND `clientid`=c.`clientid` AND r.`deleted`=0),0) amountdue,
	0 payment
	FROM `invoices` AS i
	INNER JOIN `clients` AS c ON i.`clientid` = c.`clientid`
	INNER JOIN `invoicedetails` AS id ON i.`invoiceid` = id.`invoiceid`
	where i.`clientid` = $clientid
	and id.`amount`- IFNULL((SELECT SUM(amount) FROM `receiptdetails` rd INNER JOIN `receipts` r ON r.`receiptid`=rd.`receiptid` WHERE `invoiceno`=i.`invoiceno` AND `clientid`=c.`clientid` AND r.`deleted`=0),0)>0;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getallinvoices` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getallinvoices` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getallinvoices`()
BEGIN
	SELECT i.*,c.`clientid`,c.`clientname`,c.`address`,c.`telephone`,id.`amount`,id.`deliveryorderno`,a.`particular`,a.`containernumber`,a.`destination`,`trucknumber`,currencyname
	FROM `invoices` AS i
	JOIN `clients` AS c ON i.`clientid` = c.`clientid`
	INNER JOIN `invoicedetails` AS id ON i.`invoiceid` = id.`invoiceid`
	INNER JOIN `allocations` AS a ON a.`deliveryorderno`=id.`deliveryorderno`
	INNER JOIN `allocationdetails` ad ON ad.`allocationid`=a.`allocationid`
	INNER JOIN `vehicles` AS v ON v.`vehicleid`=ad.`truckid`
	INNER JOIN `currencies` AS cu ON cu.`currencyid` = i.`currency`
	WHERE i.`deleted`=0
	ORDER BY `invoiceno`;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getallocateddriversandvehicles` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getallocateddriversandvehicles` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getallocateddriversandvehicles`()
BEGIN
	SELECT ad.`allocationid`,v.`trucknumber`, CONCAT(d.`firstname`,' ',d.`lastname`)AS drivername,d.`telephoneno`,ad.`dateout`,ad.`expecteddate`,a.`destination`
	FROM `allocationdetails` AS ad
	INNER JOIN allocations AS a ON a.`allocationid` = ad.`allocationid`
	LEFT JOIN `vehicles` AS v ON v.`vehicleid`=ad.`truckid`
	LEFT JOIN `drivers` AS d ON d.`driverid`=ad.`driverid`
	WHERE a.`deleted`=0 AND v.`trucknumber` != '';
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getallocatedexpenses` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getallocatedexpenses` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getallocatedexpenses`()
BEGIN
		select * from `allocatedexpenses` where `deleted`=0
		order by `allocationid`;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getallocatedvehicles` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getallocatedvehicles` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getallocatedvehicles`()
BEGIN
    SELECT v.*,ad.driverid,ad.truckid,ad.truckstatus,ad.driverstatus
    FROM `vehicles` AS v
    JOIN `allocationdetails` AS ad ON v.`vehicleid` = ad.`truckid`
    ORDER BY `dateadded`;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getallocatedvehiclesdetails` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getallocatedvehiclesdetails` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getallocatedvehiclesdetails`($allocationid INT)
BEGIN
	
	SELECT a.`allocationid`,ad.driverid,c.clientid,v.vehicleid,deliveryorderno, CONCAT(`firstname`,' ',`lastname`) drivername,route,destination,kilometers,c.clientname,c.`address`,c.`telephone`
        ,particular,containerid,containernumber,trucknumber,trailerno,others,amount,currency,dateout,expecteddate expecteddatein,remarks,statusremarks
       FROM `allocations` a
       JOIN  `allocationdetails` AS ad ON ad.`allocationid`=a.`allocationid`      
       JOIN `drivers` d ON d.`driverid`=ad.`driverid`
       JOIN `clients` c ON c.`clientid`=a.`clientid`
       -- inner JOIN `containers` t ON t.`containerid`=a.`containerid`
       JOIN `vehicles` AS v ON v.`vehicleid`=ad.`truckid`
       WHERE $allocationid = ad.`allocationid` AND a.`deleted`=0;
		
       /*SELECT a.*, ad.driverid,c.clientid,v.vehicleid, CONCAT(`firstname`,' ',`lastname`) drivername,clientname,containername,trucknumber,trailerno,dateout,expecteddate expecteddatein,remarks
       FROM `allocations` a
       JOIN  `allocationdetails` AS ad ON ad.`allocationid`=a.`allocationid`      
       JOIN `drivers` d ON d.`driverid`=ad.`driverid`
       JOIN `clients` c ON c.`clientid`=a.`clientid`
       JOIN `containers` t ON t.`containerid`=a.`containerid`
       JOIN `vehicles` AS v ON v.`vehicleid`=ad.`truckid`
       WHERE $allocationid = ad.`allocationid` and a.`deleted`=0;*/
			
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getallocationcontainers` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getallocationcontainers` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getallocationcontainers`()
BEGIN
	SELECT * FROM `containers`
	order by `containerid`;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getallocationcurrencies` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getallocationcurrencies` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getallocationcurrencies`()
BEGIN
	SELECT * FROM `currencies` 
	order by `currencyid`;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getallocationexpenses` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getallocationexpenses` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getallocationexpenses`($allocationid int)
BEGIN
	SELECT `id` AS allocationexpenseid, e.`expenseid`,`allocatedexpensename` expensename, `amount`
	FROM `allocatedexpenses` AS e
	JOIN `expense` AS X ON x.`expenseid`=e.`expenseid`
	where `allocationid`=$allocationid;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getallreceipts` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getallreceipts` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getallreceipts`()
BEGIN
	SELECT *, c.`clientname`,cu.`currencyname` FROM `receipts` AS r 
	LEFT JOIN `clients` AS c ON c.`clientid`= r.`clientid`
	LEFT JOIN `currencies` AS cu ON cu.`currencyid`=r.`clientid`
	LEFT JOIN `receiptdetails` AS rd ON rd.`receiptid`=r.`receiptid`
	WHERE r.`deleted`=0
	order by r.`receiptno`;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getalltransactionclients` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getalltransactionclients` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getalltransactionclients`()
BEGIN
	SELECT `clientid`,`clientname` FROM clients
	where `deleted`=0;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getalltransactionclientsdetails` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getalltransactionclientsdetails` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getalltransactionclientsdetails`()
BEGIN
	SELECT `clientid`,`clientname` FROM clients;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getallusers` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getallusers` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getallusers`()
BEGIN
	SELECT u.*, IFNULL(CONCAT(a.firstname,' ',a.middlename,' ',a.lastname),'System') AS addedbyname 
	FROM `user` u  
	LEFT OUTER JOIN `user` a ON u.addedby = a.userid  
	ORDER BY u.userid ASC;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getallvehicles` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getallvehicles` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getallvehicles`()
BEGIN
	
        select v.*,`description` from `vehicles` v
        inner join `vehicletype` vt on vt.`vehicletypeid`= v.`vehicletype`
        where v.`deleted`= 0;
    
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getclientdetails` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getclientdetails` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getclientdetails`($clientid INT)
BEGIN
	SELECT * FROM `clients`
	WHERE `clientid`=$clientid AND `deleted`=0;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getclients` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getclients` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getclients`()
BEGIN
	SELECT * FROM `clients`
	WHERE `deleted`=0;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getcompanydetails` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getcompanydetails` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getcompanydetails`()
BEGIN
	select * from company;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getcreditnotedetails` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getcreditnotedetails` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getcreditnotedetails`($clientid int)
BEGIN
	SELECT cn.`creditnoteid`,`creditnoteno`,cd.`currency`,c.`clientname`,c.`address`,c.`telephone`,cd.`amount`,i.`invoiceno`,i.`rate`,cn.`dateadded`,u.`username`,a.`particular`
	FROM creditnote AS cn
	INNER JOIN `creditnotedetails` AS cd ON cd.`creditnoteid` = cn.`creditnoteid`
	LEFT JOIN clients AS c ON c.`clientid` = cn.`clientid`
	LEFT JOIN invoices AS i ON i.`invoiceid` = cd.`invoiceid`
	LEFT JOIN `user` AS u ON u.`userid` = cn.`addedby`
	LEFT JOIN `invoicedetails` AS id ON id.`invoiceid`=cd.`invoiceid`
	LEFT JOIN `allocations` AS a ON a.`deliveryorderno`=id.`deliveryorderno`
	where cn.`deleted`=0 AND cn.`clientid` = $clientid
	ORDER BY cn.`dateadded` ASC;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getcreditnoteprintdetails` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getcreditnoteprintdetails` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getcreditnoteprintdetails`($clientid INT)
BEGIN
	SELECT cn.`creditnoteid`,`creditnoteno`,cd.`currency`,c.`clientname`,c.`address`,c.`telephone`,cd.`amount`,i.`invoiceno`,i.`rate`,cn.`dateadded`,u.`username`,a.`particular`
	FROM creditnote AS cn
	INNER JOIN `creditnotedetails` AS cd ON cd.`creditnoteid` = cn.`creditnoteid`
	LEFT JOIN clients AS c ON c.`clientid` = cn.`clientid`
	LEFT JOIN invoices AS i ON i.`invoiceid` = cd.`invoiceid`
	LEFT JOIN `user` AS u ON u.`userid` = cn.`addedby`
	LEFT JOIN `invoicedetails` AS id ON id.`invoiceid`=cd.`invoiceid`
	LEFT JOIN `allocations` AS a ON a.`deliveryorderno`=id.`deliveryorderno`
	WHERE cn.`deleted`=0 AND cn.`clientid` = $clientid
	ORDER BY cn.`dateadded` ASC;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getcreditnotes` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getcreditnotes` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getcreditnotes`($clientid int)
BEGIN
	SELECT  id.`invoiceid`,`invoiceno`,`invoicedate`,CASE WHEN `tax`=1 THEN SUM(`amount`)+((16/100)*SUM(`amount`)) ELSE SUM(`amount`) END amount, 0 cramount,`currencyname`,`tax` FROM `invoices` i
	INNER JOIN `invoicedetails` id ON id.`invoiceid`=i.`invoiceid`
	INNER JOIN `currencies` c ON c.`currencyid`=i.`currency`
	WHERE `invoiceno` NOT IN (SELECT `invoiceno` FROM `receiptdetails` rd, `receipts` r WHERE r.`receiptid`=rd.`receiptid` AND `deleted`=0)
	AND `deleted`=0 and `clientid`=$clientid
	GROUP BY `invoiceno`,`invoicedate`,`currency`,`tax`;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getdashboardcreditnotes` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getdashboardcreditnotes` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getdashboardcreditnotes`()
BEGIN
	SELECT *, cl.`clientname`,crd.`amount`,i.`invoiceno`
	FROM `creditnote` AS c
	LEFT JOIN `clients` AS cl ON cl.`clientid`=c.`clientid`
	LEFT JOIN `creditnotedetails` AS crd ON crd.`creditnoteid`=c.`creditnoteid`
	LEFT JOIN `invoices` AS i ON i.`clientid`=c.`clientid`
	WHERE c.`deleted`=0;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getdashboardusers` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getdashboardusers` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getdashboardusers`()
BEGIN
	SELECT `userid`,`username`, `email`, `mobile`, `accountactive` FROM `user`;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getdeliveryordernodetails` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getdeliveryordernodetails` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getdeliveryordernodetails`($deliveryorderno VARCHAR(50))
BEGIN
    SELECT a.deliveryorderno, ad.`dateout`, a.destination,a.containernumber,a.exchangerate, cs.currencyname
    FROM `allocations` AS a
    JOIN `clients` AS c ON a.`clientid` = c.`clientid`
    JOIN `allocationdetails` AS ad ON a.`allocationid` = ad.`allocationid`
    JOIN `currencies` AS cs ON a.`currency` = cs.`currencyid`
    WHERE a.deliveryorderno = deliveryorderno;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getdriverdetails` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getdriverdetails` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getdriverdetails`($driverid INT)
BEGIN
	select * from `drivers`
	where `driverid`=$driverid AND `deleted`=0;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getdrivers` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getdrivers` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getdrivers`()
BEGIN
	select * from `drivers`
	where `deleted`=0;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getemailconfiguration` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getemailconfiguration` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getemailconfiguration`()
BEGIN
	SELECT * FROM `emailconfiguration`;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getexpecteddatein` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getexpecteddatein` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getexpecteddatein`($allocationid int, $dateout date)
BEGIN
	select * from `allocations` where $allocationid = `allocationid` and $dateout = `dateout` and `deleted` = 0;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getfilteredallocation` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getfilteredallocation` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getfilteredallocation`(IN startdate DATE, IN enddate DATE)
BEGIN	
	SELECT a.allocationid,deliveryorderno, CONCAT(`firstname`,' ',`lastname`) drivername,c.clientid,c.clientname,destination,c.address,c.telephone,particular,route,containername,containernumber,v.trucknumber,v.trailerno,dateout,expecteddate expecteddatein,remarks,statusremarks
       FROM `allocations` a
       JOIN  `allocationdetails` AS ad ON ad.`allocationid`=a.`allocationid`      
       JOIN `drivers` d ON d.`driverid`=ad.`driverid`
       JOIN `clients` c ON c.`clientid`=a.`clientid`
       JOIN `containers` t ON t.`containerid`=a.`containerid`
       JOIN `vehicles` AS v ON v.`vehicleid`=ad.`truckid`
	WHERE ad.`dateout` BETWEEN startdate AND enddate and a.`deleted`=0;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getfilteredinvoices` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getfilteredinvoices` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getfilteredinvoices`(in startdate DATE, in enddate DATE)
BEGIN
	SELECT i.*,c.`clientname`,c.`address`,id.`amount`,id.`deliveryorderno`
	FROM `invoices` AS i
	JOIN `clients` AS c ON i.`clientid` = c.`clientid`
	LEFT JOIN `invoicedetails` AS id ON i.`invoiceid` = id.`invoiceid`
	WHERE i.`invoicedate` BETWEEN startdate AND enddate;
	    /*SELECT c.clientname, c.`address`, i.invoiceno, a.deliveryorderno, a.amount, i.invoicedate
	    FROM allocations AS a
	    JOIN clients AS c ON a.clientid = c.clientid
	    JOIN `allocationdetails` AS ad ON a.`allocationid` = ad.`allocationid`
	    JOIN `currencies` AS cs ON a.`currency` = cs.`currencyid`
	    JOIN `invoices` AS i ON a.`clientid` = i.`clientid`*/
    
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getfilteredreceipts` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getfilteredreceipts` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getfilteredreceipts`(IN startdate DATE, IN enddate DATE)
BEGIN
	SELECT *, c.`clientname`,cu.`currencyname`
	FROM `receipts` AS r
	INNER JOIN `clients` AS c ON c.`clientid` = r.`clientid`
	INNER JOIN `currencies` AS cu ON cu.`currencyid`=r.`clientid`
	INNER JOIN `receiptdetails` AS rd ON rd.`receiptid`=r.`receiptid`
	WHERE r.`receiptdate` BETWEEN startdate AND enddate;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getfilteredreports` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getfilteredreports` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getfilteredreports`(IN startdate DATE, IN enddate DATE)
BEGIN
    -- Payments total
    SELECT 'Payments' AS category,
        COUNT(DISTINCT r.`receiptid`) AS count,
        IFNULL(SUM(rd.`amount`), 0) AS total
    FROM `receipts` AS r
    INNER JOIN `receiptdetails` AS rd ON rd.`receiptid` = r.`receiptid`
    WHERE r.`receiptdate` BETWEEN startdate AND enddate
    
    UNION ALL
    
    -- Invoices total
    SELECT 'Invoices',
        COUNT(DISTINCT i.`invoiceid`),
        IFNULL(SUM(id.`amount`), 0)
    FROM `invoices` AS i
    INNER JOIN `invoicedetails` AS id ON id.`invoiceid` = i.`invoiceid`
    WHERE i.`invoicedate` BETWEEN startdate AND enddate
    
    UNION ALL
    
    -- Credit Notes total
    SELECT 'CreditNotes',
        COUNT(DISTINCT cr.`creditnoteid`),
        IFNULL(SUM(crd.`amount`), 0)
    FROM `creditnote` AS cr
    INNER JOIN `creditnotedetails` AS crd ON crd.`creditnoteid` = cr.`creditnoteid`
    WHERE cr.`dateadded` BETWEEN startdate AND enddate;
    
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getidtypes` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getidtypes` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getidtypes`()
BEGIN
	select * from `idtypes`
	where `deleted`=0;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getinbuiltsystemuser` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getinbuiltsystemuser` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getinbuiltsystemuser`()
BEGIN
		SELECT * FROM `user`
		WHERE systemlabel='INBUILT SYSTEM ACCOUNT';
	END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getinstitution` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getinstitution` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getinstitution`()
BEGIN
	SELECT * FROM institution;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getinvoicedetails` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getinvoicedetails` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getinvoicedetails`($invoiceid int)
BEGIN
	SELECT i.*,c.`clientid`,c.`clientname`,c.`address`,c.`telephone`,id.`amount`,id.`deliveryorderno`,a.`particular`,a.`containernumber`,a.`destination`,`trucknumber`,currencyname
	FROM `invoices` AS i
	JOIN `clients` AS c ON i.`clientid` = c.`clientid`
	INNER JOIN `invoicedetails` AS id ON i.`invoiceid` = id.`invoiceid`
	INNER JOIN `allocations` AS a ON a.`deliveryorderno`=id.`deliveryorderno`
	INNER JOIN `allocationdetails` ad ON ad.`allocationid`=a.`allocationid`
	INNER JOIN `vehicles` AS v ON v.`vehicleid`=ad.`truckid`
	INNER JOIN `currencies` AS cu ON cu.`currencyid` = i.`currency`
	WHERE i.`deleted`=0
	ORDER BY `invoiceno`;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getobjects` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getobjects` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getobjects`(`$module` VARCHAR(50))
BEGIN
	IF $module='' THEN
		SELECT `id`,`description`,`module` FROM `objects` ORDER BY `description`;
	ELSE
		SELECT `id`,`description`,`module`  FROM `objects` WHERE `module`=$module ORDER BY `description`;
	END IF;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getroledetails` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getroledetails` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getroledetails`(`$roleid` INT)
BEGIN
	SELECT * FROM `roles` WHERE `roleid`=$roleid;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getroleprivileges` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getroleprivileges` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getroleprivileges`(`$roleid` INT)
BEGIN
	SELECT * FROM `roleprivileges` WHERE `roleid`=$roleid;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getroles` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getroles` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getroles`()
BEGIN
	SELECT * FROM `roles` WHERE IFNULL(`deleted`,0)=0
	ORDER BY `rolename`;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getrolesforuserassignment` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getrolesforuserassignment` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getrolesforuserassignment`()
BEGIN
	SELECT `roleid`,`rolename` FROM `roles` ORDER BY `rolename`;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getroleusers` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getroleusers` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getroleusers`(`$roleid` INT)
BEGIN
	SELECT r.`userid`, `username`,`firstname`,`middlename`,`lastname` FROM `roleusers` r, `user` u
	WHERE r.`userid`=u.`userid` AND `roleid`=$roleid
	ORDER BY `firstname`,`middlename`,`lastname`;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getsavedexpenses` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getsavedexpenses` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getsavedexpenses`()
BEGIN
		select * from `allocatedexpenses`;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getstatement` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getstatement` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getstatement`($datefrom DATE, $dateto DATE, $clientid INT)
BEGIN
	SELECT 'Bal B/f' AS TYPE,clientid, `clientname`, `address`, `telephone`,DATE_SUB($datefrom, INTERVAL 1 DAY) AS transactdate,
	-- ifnull((select sum(`amount`) from `invoicedetails` id inner join `invoices` i on i.`invoiceid`=id.`invoiceid` where `deleted`=0 and `clientid`=c.`clientid`),0) invoices,
	-- IFNULL((SELECT SUM(`amount`) FROM `receiptdetails` rd INNER JOIN `receipts` r ON r.`receiptid`=rd.`receiptid` WHERE `deleted`=0 AND `clientid`=c.`clientid`),0) payments,
	IFNULL((SELECT SUM(`amount`) FROM `invoicedetails` id INNER JOIN `invoices` i ON i.`invoiceid`=id.`invoiceid` WHERE `deleted`=0 AND `clientid`=c.`clientid` and `invoicedate`<$datefrom),0) -
	IFNULL((SELECT SUM(`amount`) FROM `receiptdetails` rd INNER JOIN `receipts` r ON r.`receiptid`=rd.`receiptid` WHERE `deleted`=0 AND `clientid`=c.`clientid` and `receiptdate`<$datefrom),0) amount,
	'Bal B/f' AS naration,'Previous Balance' AS Ref 
	FROM clients c WHERE `deleted`=0 AND `clientid`=$clientid
	UNION
	SELECT 'Invoice' AS TYPE, i.`clientid`,`clientname`,`address`,`telephone`,`invoicedate` AS transactdate,id.`amount`,'' AS narration, CONCAT('Invoice # - ',i.invoiceno) AS Ref
	FROM `invoices` AS i
	INNER JOIN `invoicedetails` AS id ON id.`invoiceid` = i.`invoiceid` inner join `clients` c on c.`clientid`=i.`clientid`
	WHERE i.`deleted` = 0 AND `invoicedate` BETWEEN $datefrom AND $dateto AND i.`clientid`=$clientid
	UNION
	SELECT 'Payments',r.`clientid`,`clientname`,`address`,`telephone`,`receiptdate`,-1*(rd.`amount`),'payment received. Thank you',CASE WHEN `modeofpayment`='Cash' THEN 'Cash' ELSE `reference` END 
	FROM `receipts` AS r
	INNER JOIN `receiptdetails` AS rd ON rd.`receiptid`=r.`receiptid` INNER JOIN `clients` c ON c.`clientid`=r.`clientid`
	WHERE r.`deleted` = 0 AND `receiptdate` BETWEEN $datefrom AND $dateto AND r.`clientid`=$clientid
	ORDER BY transactdate;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getstatementclients` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getstatementclients` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getstatementclients`()
BEGIN
	/*SELECT DISTINCT c.`clientid`,c.`clientname` 
	FROM receipts AS r
	INNER JOIN `clients` AS c ON c.`clientid`= r.`clientid`;*/
	SELECT `clientid`,`clientname`,`address`,`telephone` FROM `clients`;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_gettabledata` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_gettabledata` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_gettabledata`($tablename VARCHAR(50),$idfieldname VARCHAR(50),$idvalue VARCHAR(50), OUT outputdata VARCHAR(10000))
BEGIN
	SET @tablename=$tablename;
	SET @idfieldname=$idfieldname;
	SET @idvalue=$idvalue;
	
	SELECT DATABASE() INTO @db;
	SET @v=CONCAT("SELECT GROUP_CONCAT(CONCAT('''',column_name,''',',' ',column_name)) 
	FROM information_schema.columns 
	WHERE table_name='",@tablename,"' AND table_schema='",@db,"'INTO @fields");
	
	-- select @v as `fields`;
	
	PREPARE stmt FROM @v;
	EXECUTE stmt;
	
	-- SELECT @fields;
	
	DEALLOCATE PREPARE stmt;
	SET @sql=CONCAT("SELECT JSON_OBJECT(",@fields,") as fields FROM ",@tablename," WHERE ",@idfieldname,"=",@idvalue," INTO @data");
	
	SELECT @sql;
	
	PREPARE stmt FROM @sql;
	EXECUTE stmt;
	SET outputdata=@data;
	DEALLOCATE PREPARE stmt;
	-- set outputdata='';
	SELECT outputdata;
	
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_gettrailernumbers` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_gettrailernumbers` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_gettrailernumbers`($vehicleid int)
BEGIN
		select * from `vehicles` 
		where $vehicleid=`vehicleid` and `deleted` = 0;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getunallocateddrivers` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getunallocateddrivers` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getunallocateddrivers`()
BEGIN
	SELECT * FROM `drivers` WHERE `driverid` NOT IN(SELECT `driverid` FROM `allocationdetails`);
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getunallocatedvehicles` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getunallocatedvehicles` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getunallocatedvehicles`()
BEGIN
	SELECT * FROM `vehicles`
	WHERE vehicleid NOT IN (SELECT truckid FROM allocationdetails) and deleted=0;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getunpaidinvoices` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getunpaidinvoices` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getunpaidinvoices`($clientid int)
BEGIN
	SELECT  `clientid`,`invoicedate`,`description`,`originalamount`,
	    CASE 
		WHEN `amountpaid` = 0 THEN '' 
		ELSE `reference` 
	    END AS `reference`,
	    `manualamount`,
	    `amountpaid`,
	    `balance`
	FROM `paidinvoices`
	WHERE `balance` != 0 AND `clientid` = $clientid;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getuserbydetails` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getuserbydetails` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getuserbydetails`($userid INT)
BEGIN
	
	SELECT * FROM `user` WHERE `userid`=$userid;
	
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getuserbyid` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getuserbyid` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getuserbyid`(`$userid` INT)
BEGIN
	SELECT * FROM `user` WHERE `userid`=$userid;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getusercompanies` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getusercompanies` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getusercompanies`(`$userid` INT)
BEGIN
	SELECT c.companyid, companyname
	FROM `usercompanies` u, `companies` c
	WHERE u.companyid=c.companyid AND IFNULL(u.deleted,0)=0
	AND u.userid=$userid
	ORDER BY companyname;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getuserdetails` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getuserdetails` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getuserdetails`(`$username` VARCHAR(50))
BEGIN
    -- Fetch institution details (company name, support email, and phone)
    SELECT `companyname`, `supportemail`, `supportphone` 
    INTO @companyname, @supportemail, @supportphone 
    FROM `institution`;
    -- Fetch user details including password, account status, and other information
    SELECT 
        u.userid, 
        u.firstname, 
        u.middlename, 
        u.lastname, 
        u.email, 
        u.mobile, 
        u.password,  -- Include password in the result
        u.accountactive, 
        u.changepasswordonlogon,
        @companyname AS companyname, 
        @supportemail AS supportemail, 
        @supportphone AS supportphone,
        IFNULL((SELECT `employeeid` FROM `employeerecords` WHERE `staffno`=u.username), 0) AS employeeid
    FROM `user` u 
    WHERE u.username = $username;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getusernamefromuserid` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getusernamefromuserid` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getusernamefromuserid`(`$userid` INT)
BEGIN
	SELECT * FROM `user` WHERE `userid`=$userid;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getuserprivileges` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getuserprivileges` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getuserprivileges`(`$userid` INT)
BEGIN
	SELECT * FROM `userprivileges` WHERE userid=$userid;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getuserroles` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getuserroles` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getuserroles`(`$userid` INT)
BEGIN
	SELECT r.* FROM `roles` r, `roleusers` u
	WHERE r.`roleid`=u.`roleid` AND `userid`=$userid
	AND IFNULL(u.`deleted`,0)=0
	ORDER BY `rolename`;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getusers` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getusers` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getusers`($userid int)
BEGIN
	SELECT `username` FROM `user` 
	where `userid`=$userid;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getusersdetails` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getusersdetails` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getusersdetails`($userid int)
BEGIN
        SELECT * FROM `user`
        where `userid`=$userid;
        
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getvehicledetails` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getvehicledetails` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getvehicledetails`($vehicleid int)
BEGIN
        SELECT v.*,`description` FROM `vehicles` v
        INNER JOIN `vehicletype` vt ON vt.`vehicletypeid`= v.`vehicletype`
        WHERE v.`deleted`= 0 AND `vehicleid`=$vehicleid;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_getvehicletype` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_getvehicletype` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_getvehicletype`()
BEGIN

        select * from `vehicletype`

        where `deleted` = 0;

    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_loadallocatedvehicles` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_loadallocatedvehicles` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_loadallocatedvehicles`()
BEGIn	
	SELECT a.allocationid,deliveryorderno, CONCAT(`firstname`,' ',`lastname`) drivername,c.clientid,c.clientname,destination,c.address,c.telephone,particular,route,containername,containernumber,v.trucknumber,v.trailerno,dateout,expecteddate expecteddatein,remarks,statusremarks
       FROM `allocations` a
       JOIN  `allocationdetails` AS ad ON ad.`allocationid`=a.`allocationid`      
       JOIN `drivers` d ON d.`driverid`=ad.`driverid`
       JOIN `clients` c ON c.`clientid`=a.`clientid`
       JOIN `containers` t ON t.`containerid`=a.`containerid`
       JOIN `vehicles` AS v ON v.`vehicleid`=ad.`truckid`
       WHERE a.`deleted`=0;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_printdeliverynote` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_printdeliverynote` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_printdeliverynote`($allocationid int)
BEGIN
	SELECT a.`allocationid`,ad.driverid,c.clientid,v.vehicleid,deliveryorderno, CONCAT(`firstname`,' ',`lastname`) drivername,route,destination,kilometers,c.clientname,c.`address`,c.`telephone`
        ,particular,t.`containername`,containernumber,trucknumber,trailerno,others,amount,currency,dateout,expecteddate expecteddatein,remarks,statusremarks
       FROM `allocations` a
       JOIN  `allocationdetails` AS ad ON ad.`allocationid`=a.`allocationid`      
       JOIN `drivers` d ON d.`driverid`=ad.`driverid`
       JOIN `clients` c ON c.`clientid`=a.`clientid`
       JOIN `containers` t ON t.`containerid`=a.`containerid`
       JOIN `vehicles` AS v ON v.`vehicleid`=ad.`truckid`
       WHERE $allocationid = ad.`allocationid` AND a.`deleted`=0;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_saveallocatedexpenses` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_saveallocatedexpenses` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_saveallocatedexpenses`($refno varchar(50),$allocationid int,$userid int)
BEGIN
		START TRANSACTION;
			-- Delete existing expenses to be replaced with newly inserted values
			delete from `allocatedexpenses` where `allocationid`=$allocationid;
			
			-- Add the newly added expenses
			INSERT INTO `allocatedexpenses`(`allocationid`,`expenseid`,`amount`,`addedby`,`dateadded`)
			SELECT $allocationid,`expenseid`,`amount`,$userid,NOW() 
			FROM `tempallocatedexpenses` WHERE `refno`=$refno;
			
			/*-- Add Audit trail
			SELECT @narration=CONCAT('Created new allocation for order #',$deliveryno);*/
			
			-- Remove data fom temporary table
			DELETE FROM `tempallocatedexpenses`
			WHERE `refno`=$refno;
		COMMIT;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_saveallocatedvehicle` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_saveallocatedvehicle` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_saveallocatedvehicle`($allocationid INT,  $truckno INT,  $driverid INT, $route VARCHAR(50), $destination VARCHAR(50), $kilometers INT,
		 $dateout date,$expecteddatein date, $clientid INT, $particular VARCHAR(50), $containerid INT, $containernumber VARCHAR(50), $others VARCHAR(50), $amount NUMERIC (18,2),
		 $currency VARCHAR(50), $exchangerate NUMERIC (18,2), $remarks VARCHAR(1000), $userid INT, $newdriverid INT, $newdriverstatus VARCHAR(50), $newvehicleid INT, $newvehiclestatus VARCHAR(50),
		 $newremarks VARCHAR(1000),$updated INT)
BEGIN
    DECLARE $deliveryno VARCHAR(50);
    DECLARE $allocateid INT;
    DECLARE $newdateout DATETIME;
    DECLARE $newexpecteddate DATETIME;
    
    START TRANSACTION;
    
    IF $allocationid = 0 THEN
        -- Generate delivery note number
        SELECT `fn_generatedeliveryno`() INTO $deliveryno;
        
        -- Add delivery allocation details
        INSERT INTO `allocations`(`deliveryorderno`,`route`,`destination`,`kilometers`,`clientid`,`particular`,
        `containerid`,`containernumber`,`others`,`amount`,`currency`,`exchangerate`)							
        VALUES($deliveryno, $route, $destination, $kilometers, $clientid, $particular, $containerid, $containernumber, $others, $amount, $currency, $exchangerate);
        
        -- Get generated allocationid
        SELECT MAX(allocationid) FROM `allocations` INTO $allocateid;
        
        INSERT INTO `allocationdetails` (`allocationid`,`driverid`,`driverstatus`,`truckid`,`truckstatus`,`dateout`,`expecteddate`,`addedby`,`dateadded`,`remarks`)
        VALUES($allocateid, $driverid, 'Not Available', $truckno, 'In Transit', $dateout, $expecteddatein, $userid, NOW(), $remarks);
        
        -- Increment counter
        UPDATE `serials` SET `currentno`=`currentno`+1 WHERE `documentid`=1;
        
    ELSE
    
	SELECT `deliveryorderno` INTO $deliveryno FROM `allocations` WHERE `allocationid`=$allocationid limit 1;
	
        IF $updated = 0 THEN
            -- Update all tables
            UPDATE `allocations` SET `route`=$route, `destination`=$destination,`kilometers`=$kilometers,`clientid`=$clientid,`particular`=$particular,
            `containerid`=$containerid,`containernumber`=$containernumber,`others`=$others,`amount`=$amount,`currency`=$currency,`exchangerate`=$exchangerate
            WHERE `allocationid`=$allocationid;
            
            UPDATE `allocationdetails` SET `driverid`=$driverid,`truckid`=$truckno,`dateout`=$dateout,`expecteddate`=$expecteddatein,`statusremarks`=$remarks
            WHERE `allocationid`=$allocationid;
            
        ELSEIF $updated = 1 THEN
            SELECT `dateout`,`expecteddate` INTO $newdateout, $newexpecteddate FROM allocationdetails WHERE `allocationid`=$allocationid limit 1;
            -- SELECT  INTO FROM allocationdetails WHERE `allocationid`=$allocationid;
           
            INSERT INTO `allocationdetails` (`allocationid`,`driverid`,`driverstatus`,`truckid`,`truckstatus`,`dateout`,`expecteddate`,`addedby`,`dateadded`,`statusremarks`)
            VALUES($allocationid, $newdriverid, $newdriverstatus, $newvehicleid, $newvehiclestatus, $newdateout, $newexpecteddate, $userid, NOW(), $newremarks);
        END IF;
    END IF;
    
    -- Return delivery note number generated
    SELECT $deliveryno AS `deliveryno`;
    
    COMMIT;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_saveallocationexpenses` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_saveallocationexpenses` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_saveallocationexpenses`($expenseid int, $allocatedexpensename varchar(50))
BEGIN
		start transaction;
		if $expenseid=0 then
			insert into `expense`(`allocatedexpensename`)
			values($allocatedexpensename);
		end if;
	commit;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_saveaudittrailentry` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_saveaudittrailentry` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_saveaudittrailentry`($userid INT,$operation VARCHAR(100),$narration VARCHAR(5000),$platform VARCHAR(1000),
$previousvalues VARCHAR(5000),$currentvalues VARCHAR(5000))
BEGIN
	INSERT INTO `audittrail`(`timestamp`,`userid`,`operation`,`narration`,`platform`,`originalvalues`,`updatedvalues`)
	VALUES(NOW(),$userid,$operation,$narration,$platform,$previousvalues,$currentvalues);
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_saveclients` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_saveclients` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_saveclients`($clientid int, $clientname varchar(50), $address varchar(50), $telephone varchar(50), $contactperson varchar(50))
BEGIN
	IF $clientid = 0 THEN
		INSERT INTO `clients`(`clientname`,`address`,`telephone`,`contactperson`,`addedby`)
		VALUES($clientname, $address, $telephone, $contactperson, 1);
	ELSE
		UPDATE `clients`
		SET `clientname`=$clientname, `address`=$address, `telephone`=$telephone, `contactperson`=$contactperson
		WHERE `clientid`=$clientid;
	END IF;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_savecreditnote` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_savecreditnote` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_savecreditnote`($refno VARCHAR(50),$clientid INT,$userid INT)
BEGIN	
	DECLARE $creditnoteid INT;
	DECLARE $creditnoteno VARCHAR(50);
	declare $currency varchar(50);
	DECLARE $amount DECIMAL(18, 2);
	DECLARE $tax TINYINT(1);
	
	SELECT `fn_generatecreditnoteno`() INTO $creditnoteno;
	
	START TRANSACTION;
		INSERT INTO `creditnote`(`creditnoteno`,`clientid`,`addedby`)
		VALUES($creditnoteno,$clientid,$userid);
		
		 -- Get generated creditnoteid
		SELECT MAX(`creditnoteid`) FROM `creditnote` INTO $creditnoteid ;
		
		-- insert into creditnote details
		INSERT INTO `creditnotedetails` (`creditnoteid`,`invoiceid`,`amount`,`currency`,`tax`) 
		SELECT $creditnoteid,`invoiceid`,`amount`,`currency`,`tax`
		FROM `tempcreditnote`
		WHERE `refno`=$refno;
		
		UPDATE `serials` SET `currentno` = `currentno`+1 
		WHERE `documentid` = 4;
		
		-- DELETE Temp
		/*DELETE FROM `tempcreditnote` 
		WHERE `refno`=$refno;*/
		
	    /*ELSE
		-- Add logic here to handle existing invoices (e.g., update)
		UPDATE `invoices`
		SET `clientid` = $clientid, `deliveryorderno` = $deliveryorderno, `invoicedate` = $invoicedate, `totalamount` = $totalamount, `tax` = $tax
		WHERE `invoiceid` = $invoiceid;
	    END IF;*/
	    
	    -- select $invoiceid as invoiceid,$refno refno;
	COMMIT;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_savedrivers` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_savedrivers` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_savedrivers`($driverid INT,$firstname VARCHAR(50),$lastname VARCHAR(50),$idtype INT,$identityno varchar(50),
    $telephoneno VARCHAR(50),$residence VARCHAR(50))
BEGIN
	IF $driverid=0 THEN
		INSERT INTO `drivers`(`firstname`,`lastname`,`idtype`,`identityno`,`telephoneno`,`residence`,`userid`,`dateadded`)
		VALUES($firstname,$lastname,$idtype,$identityno,$telephoneno,$residence,1,NOW());
	ELSE
	
		UPDATE `drivers` SET `firstname`=$firstname, `lastname`=$lastname,`idtype`=$idtype,`identityno`=$identityno,`telephoneno`=$telephoneno,`residence`=$residence
		WHERE `driverid`=$driverid;
	END IF;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_saveemailconfiguration` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_saveemailconfiguration` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_saveemailconfiguration`(`$emailaddress` VARCHAR(100), `$emailpassword` VARCHAR(50), `$smtpserver` VARCHAR(50), `$smtpport` INT, `$usessl` BOOLEAN)
BEGIN
	IF NOT EXISTS(SELECT * FROM `emailconfiguration`) THEN
		INSERT INTO `emailconfiguration`(`emailaddress`,`password`,`smtpserver`,`usessl`,`smtpport`)
		VALUES($emailaddress,$emailpassword,$smtpserver,$usessl,$smtpport);
	ELSE
		UPDATE `emailconfiguration` 
		SET `emailaddress`=$emailaddress,`password`=$emailpassword,`smtpserver`=$smtpserver,`usessl`=$usessl,`smtpport`=$smtpport;
	END IF;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_saveinvoices` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_saveinvoices` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_saveinvoices`($refno varchar(100),$clientid INT,$invoicedate DATE,$currency int,$rate decimal(18,2), $userid int)
BEGIN	
	DECLARE $invoiceid INT;
	declare $invoiceno varchar(50);
	declare $deliveryorderno VARCHAR(50);
	declare $amount DECIMAL(18, 2);
	declare $tax TINYINT(1);
	
	select `fn_generateinvoiceno`() into $invoiceno;
	
	START TRANSACTION;
		INSERT INTO `invoices`(`invoiceno`,`clientid`, `invoicedate`,`currency`, `rate`, `addedby`)
		VALUES($invoiceno,$clientid,$invoicedate,$currency,$rate,$userid);
		
		 -- Get generated invoiceid
		select max(`invoiceid`) from `invoices` into $invoiceid;
		
		-- insert into invoice details
		insert into `invoicedetails` (`invoiceid`,`deliveryorderno`,`amount`,`tax`) 
		select $invoiceid,`deliveryorderno`,`amount`,`tax`
		from `tempinvoices` 
		WHERE `refno`=$refno;
		
		update `serials` set `currentno` = `currentno`+1 
		where `documentid` = 2;
		
		update `allocations` set `invoiced` = 1 
		where `deliveryorderno` in (select `deliveryorderno`
		FROM `tempinvoices` 
		WHERE `refno`=$refno);  
		
		-- DELETE Temp
		delete from `tempinvoices` 
		WHERE `refno`=$refno;
		
	    /*ELSE
		-- Add logic here to handle existing invoices (e.g., update)
		UPDATE `invoices`
		SET `clientid` = $clientid, `deliveryorderno` = $deliveryorderno, `invoicedate` = $invoicedate, `totalamount` = $totalamount, `tax` = $tax
		WHERE `invoiceid` = $invoiceid;
	    END IF;*/
	    
	    -- select $invoiceid as invoiceid,$refno refno;
	COMMIT;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_saveprivileges` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_saveprivileges` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_saveprivileges`(`$id` INT, `$category` VARCHAR(50), `$refno` VARCHAR(50), `$userid` INT)
BEGIN
	START TRANSACTION;
		IF $category='user' THEN 
			BEGIN
				-- delete all privileges
				DELETE FROM `userprivileges` WHERE `userid`=$id;
				-- add the ones from the temp table
				INSERT INTO `userprivileges` (`userid`,`objectid`,`allowed`,`addedby`,`lastupdatedby`,`lastdateupdated`)
				SELECT $id,`objectid`,`valid`,$userid,$userid,NOW() FROM `tempprivilege` WHERE `refno`=$refno;
			END;
		ELSE
			BEGIN
				-- delete all role privileges
				DELETE FROM `roleprivileges` WHERE `roleid`=$id;
				-- add new ones from the temp table
				INSERT INTO `roleprivileges`(`roleid`,`objectid`,`allowed`,`dateadded`,`addedby`)
				SELECT $id,`objectid`,`valid`,NOW(),$userid FROM `tempprivilege` WHERE `refno`=$refno; 
			END;
		END IF;
		-- Remove temporary data
		DELETE FROM `tempprivilege` WHERE `refno`=$refno;
	COMMIT;
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_savereceipts` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_savereceipts` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_savereceipts`($refno varchar(100),$clientid int,$receiptdate DATE,$modeofpayment int,$reference VARCHAR(50),
						$paycurrency int,$exchangerate DOUBLE, $userid int)
BEGIN	
	DECLARE $receiptid INT;
	DECLARE $receiptno VARCHAR(50);
	DECLARE $invoiceno VARCHAR(50);
	DECLARE $amount DECIMAL(18,2);
			-- Generate Receiptno  number
			SELECT `fn_generatereceiptno`() INTO $receiptno;
			
	START TRANSACTION;
			INSERT INTO `receipts`(`receiptno`,`clientid`,`receiptdate`,`modeofpayment`,`reference`,`paycurrency`,`exchangerate`,`addedby`)
			VALUES ($receiptno,$clientid,$receiptdate,$modeofpayment,$reference,$paycurrency,$exchangerate,$userid);
			
			 -- Get generated receiptid
			 SELECT MAX(receiptid) FROM `receipts` INTO $receiptid;
			 
			 insert into `receiptdetails` (`receiptid`,`invoiceno`,`amount`)
			 select $receiptid,`invoiceno`,`amount` from `tempreceipts`
			 where `refno`=$refno;
			
			 -- Increment counter
			UPDATE `serials` SET `currentno`=`currentno`+1 WHERE `documentid`=3;
			
			-- DELETE TEMPORARY RECEIPTS
			delete from `tempreceipts` 
			where `refno`=$refno;
		COMMIT;
	    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_savetempallocatedexpenses` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_savetempallocatedexpenses` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_savetempallocatedexpenses`($refno varchar(50),$expenseid int,$amount decimal(18,2))
BEGIN
	insert into `tempallocatedexpenses`(`refno`,`expenseid`,`amount`)
	values($refno,$expenseid,$amount);
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_savetempcreditnotes` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_savetempcreditnotes` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_savetempcreditnotes`($refno VARCHAR(50),$invoiceid int,$amount DECIMAL (18,2),$currency varchar(50),$tax INT)
BEGIN
	INSERT INTO `tempcreditnote`(`refno`,`invoiceid`,`amount`,`currency`,`tax`)
	VALUES($refno,$invoiceid,$amount,$currency,$tax);
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_savetempinvoices` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_savetempinvoices` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_savetempinvoices`($refno varchar(100),$deliveryorderno varchar(50), $amount DECIMAL (18,2), $tax int)
BEGIN
	insert into `tempinvoices`(`refno`,`deliveryorderno`,`amount`,`tax`)
	values($refno,$deliveryorderno, $amount, $tax);
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_savetempprivilege` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_savetempprivilege` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_savetempprivilege`(`$refno` VARCHAR(50), `$userid` INT, `$objectid` INT, `$valid` BIT)
BEGIN
	INSERT INTO `tempprivilege`(`refno`,`userid`,`objectid`,`valid`)
	VALUES($refno,$userid,$objectid,$valid);
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_savetempreceipts` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_savetempreceipts` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_savetempreceipts`($refno VARCHAR(1000),$invoiceno VARCHAR(50),$amount INT)
BEGIN
	INSERT INTO `tempreceipts`(`refno`,`invoiceno`,`amount`)
	VALUES($refno,$invoiceno,$amount);
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_saveuserprivilege` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_saveuserprivilege` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_saveuserprivilege`(`$userid` INT, `$objectid` INT, `$allowed` BIT, `$useradding` INT)
BEGIN
	IF NOT EXISTS(SELECT * FROM `userprivileges` WHERE `objectid`=$objectid AND `userid`=$userid) THEN
		INSERT INTO `userprivileges`(`objectid`,`userid`,`allowed`,`dateadded`,`addedby`)
		VALUES($objectid,$userid,$allowed,NOW(),$useradding);
	ELSE
		UPDATE `userprivileges` SET `allowed`=$allowed, `lastdateupdated`=NOW(),`lastupdatedby`=$useradding 
		WHERE `objectid`=$objectid AND `userid`=$userid;
	END IF ;
		
    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_savevehicles` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_savevehicles` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_savevehicles`($vehicleid int,$trucknumber varchar(50),$trailerno varchar(50),$model varchar(50),$manufacturedyear int, $color varchar(50),$vehicletype int)
BEGIN

       start transaction;

            if $vehicleid = 0 then 

            

                 insert into `vehicles`(`trucknumber`,`trailerno`,`model`,`manufacturedyear`,`color`,`vehicletype`,`dateadded`,`addedby`)

                 values($trucknumber,$trailerno,$model,$manufacturedyear,$color,$vehicletype,now(),1);

                 

            else 

                update `vehicles`

                set `model`=$model,`manufacturedyear`=$manufacturedyear,`color`=$color,`vehicletype`=$vehicletype

                where `vehicleid`=$vehicleid;

            end if;

        commit;

  

    END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_updateallocatedvehicle` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_updateallocatedvehicle` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_updateallocatedvehicle`($allocationid int,$driverid int,$driverstatus varchar(50),$truckid int,$truckstatus varchar(50),$dateout datetime,
						$expecteddate datetime, $remarks varchar(50), $userid INT)
BEGIN
	DECLARE $allocateid INT;
	START TRANSACTION;
		IF $allocationid=0 THEN
			 -- get generated allocationid
			SELECT MAX(allocationid) FROM `allocations` INTO $allocateid;
			INSERT INTO `allocationdetails` (`allocationid`,`driverid`,`driverstatus`,`truckid`,`truckstatus`,`dateout`,`expecteddate`,`addedby`,`dateadded`,`remarks`)
			VALUES($allocateid,$driverid,$driverstatus,$truckno,$truckstatus,$dateout,$expecteddatein,$userid,NOW(),$remarks);
		END IF;
	COMMIT;
END */$$
DELIMITER ;

/* Procedure structure for procedure `sp_validateuserprivilege` */

/*!50003 DROP PROCEDURE IF EXISTS  `sp_validateuserprivilege` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_validateuserprivilege`(`$userid` INT, `$objectid` INT)
BEGIN
	DECLARE $admin INT;
	DECLARE $valid INT DEFAULT 0;
	SET $admin=(SELECT systemadmin FROM `user` WHERE `id`=$userid);
	IF $admin=1 THEN
		SET $valid=1;
	ELSE
		SET $valid=IFNULL((SELECT `allowed` FROM `userprivileges` WHERE `userid`=$userid AND `objectid`=$objectid),0);
	END IF;
	
	SELECT $valid AS `allowed`;
	
    END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
