CREATE DATABASE clinic_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE clinic_system;


-- roles can also be in code, but we'll store role string per user


CREATE TABLE clinics (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
address VARCHAR(500),
city VARCHAR(100),
phone VARCHAR(50),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
clinic_id INT NULL,
full_name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password_hash VARCHAR(255) NOT NULL,
role ENUM('SUPER_ADMIN','CLINIC_ADMIN','STAFF','PATIENT') NOT NULL,
phone VARCHAR(50),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE SET NULL
);


CREATE TABLE patients (
id INT AUTO_INCREMENT PRIMARY KEY,
clinic_id INT NOT NULL,
user_id INT NULL, -- optional link to users table (if patient has account)
first_name VARCHAR(100),
last_name VARCHAR(100),
dob DATE,
gender ENUM('M','F','O') DEFAULT 'O',
contact VARCHAR(100),
notes TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE CASCADE
);


CREATE TABLE appointments (
id INT AUTO_INCREMENT PRIMARY KEY,
clinic_id INT NOT NULL,
patient_id INT NOT NULL,
dentist_id INT NULL, -- user id of dentist
scheduled_at DATETIME NOT NULL,
status ENUM('SCHEDULED','COMPLETED','CANCELLED') DEFAULT 'SCHEDULED',
notes TEXT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (clinic_id) REFERENCES clinics(id) ON DELETE CASCADE,
FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
FOREIGN KEY (dentist_id) REFERENCES users(id) ON DELETE SET NULL
);