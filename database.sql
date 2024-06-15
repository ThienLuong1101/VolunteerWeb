DROP DATABASE IF EXISTS projects;
CREATE DATABASE IF NOT EXISTS projects;

USE projects;

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `FullName` varchar(255) DEFAULT NULL,
  `LinkedURL` varchar(255) DEFAULT NULL,
  `Avatar` blob,
  `Email` varchar(255) DEFAULT NULL,
  `Phone` varchar(50) DEFAULT NULL,
  `DateOfBirth` varchar(50) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;

UNLOCK TABLES;

CREATE TABLE posts (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    subject TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(36) UNIQUE,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(10) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT chk_email CHECK (email LIKE '%@gmail.com' OR email LIKE '%@manager.com' OR email LIKE '%@admin.com')
);



-- Password: manager@123
INSERT INTO accounts (email, password_hash, user_id, role) VALUES
('YouX@manager.com', '$2b$10$QRM4ElHOhk4gB2nV5zFLGeZNO/fr9kKcyoC7weSI0kPWBdrReyiPu', '11012004', '02'),
('vietan@admin.com', '$2b$10$QRM4ElHOhk4gB2nV5zFLGeZNO/fr9kKcyoC7weSI0kPWBdrReyiPu', '12345678', '03');

-- CREATE TABLE members (
--     member_id INT AUTO_INCREMENT PRIMARY KEY,
--     user_id INT NOT NULL,
--     manager_id INT NOT NULL,
--     FOREIGN KEY (user_id) REFERENCES users(user_id),
--     FOREIGN KEY (manager_id) REFERENCES managers(manager_id)
-- );


CREATE TABLE organizations (
    organization_id INT PRIMARY KEY AUTO_INCREMENT,
    -- organization_name VARCHAR(100) NOT NULL,
    organization_url VARCHAR(255)
);

CREATE TABLE make_event (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    event_name VARCHAR(255) NOT NULL,
    event_time DATETIME NOT NULL,
    event_street VARCHAR(255) NOT NULL,
    event_city VARCHAR(255) NOT NULL,
    event_state VARCHAR(255) NOT NULL,
    event_zip VARCHAR(10) NOT NULL,
    event_description TEXT
);

INSERT INTO make_event (event_id, event_name, event_time,  event_street, event_city, event_state, event_zip, event_description) VALUES
(1, 'NEW', '2024-06-15 18:00:00', '123 Main St', 'Sample City', 'Sample State', '12345', 'This is a sample event description.');


CREATE TABLE your_activities (
    event_id INT NOT NULL,
    event_name VARCHAR(255) NOT NULL,
    event_time DATETIME NOT NULL,
    PRIMARY KEY (event_id)
);

-- INSERT INTO your_activities (event_id, event_name, event_time,  event_street, event_city, event_state, event_zip, event_description) VALUES
-- (1, 'NEW', '2024-06-15 18:00:00', '123 Main St', 'Sample City', 'Sample State', '12345', 'This is a sample event description.');
