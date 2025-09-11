-- 1. Create the database
CREATE DATABASE IF NOT EXISTS People;

-- 2. Create the user and grant privileges
CREATE USER IF NOT EXISTS 'peopleuser'@'%' IDENTIFIED BY 'peoplepassword';
GRANT ALL PRIVILEGES ON People.* TO 'peopleuser'@'%';
FLUSH PRIVILEGES;

-- 3. Use the database
USE People;

-- 4. Create the Users table
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    lastname VARCHAR(50),
    firstname VARCHAR(50),
    email VARCHAR(100),
    password VARCHAR(100)
);

-- 5. Insert 12 fake users
INSERT INTO Users (lastname, firstname, email, password) VALUES
('Smith', 'John', 'john.smith@example.com', 'pass123'),
('Doe', 'Jane', 'jane.doe@example.com', 'secure456'),
('Brown', 'Charlie', 'charlie.brown@example.com', 'abc789'),
('Taylor', 'Emily', 'emily.taylor@example.com', 'mypwd321'),
('Wilson', 'Liam', 'liam.wilson@example.com', 'qwerty123'),
('Johnson', 'Olivia', 'olivia.johnson@example.com', 'letmein456'),
('Lee', 'Noah', 'noah.lee@example.com', 'password1'),
('Martin', 'Ava', 'ava.martin@example.com', 'hello123'),
('Clark', 'Sophia', 'sophia.clark@example.com', 'testpass'),
('Walker', 'Mason', 'mason.walker@example.com', 'passw0rd'),
('Hall', 'Isabella', 'isabella.hall@example.com', 'ilovecats'),
('Allen', 'Lucas', 'lucas.allen@example.com', 'sunshine');

-- Done!
