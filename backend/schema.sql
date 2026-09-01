-- NEXORA Hackathon Registration Database Schema
CREATE DATABASE IF NOT EXISTS nexora_db;
USE nexora_db;

CREATE TABLE IF NOT EXISTS registrations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  team_name VARCHAR(255) NOT NULL,
  team_leader_name VARCHAR(255) NOT NULL,
  college_name VARCHAR(255) NOT NULL,
  department_year VARCHAR(255) NOT NULL,
  phone_number VARCHAR(50) NOT NULL,
  whatsapp_number VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  team_size INT NOT NULL,
  theme VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
