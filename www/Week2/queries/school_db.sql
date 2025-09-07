
DROP DATABASE IF EXISTS school_db;

CREATE DATABASE school_db;

USE school_db;

CREATE TABLE students (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name   VARCHAR(50) NOT NULL,
  last_name    VARCHAR(50) NOT NULL,
  email        VARCHAR(120) NOT NULL UNIQUE,
  city         VARCHAR(80) NOT NULL,
  program      VARCHAR(80) NOT NULL,
  gpa          DECIMAL(3,2) NOT NULL CHECK (gpa BETWEEN 0.00 AND 4.30),
  enrolled_date DATE NOT NULL,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_city (city),
  INDEX idx_program (program)
) ENGINE=InnoDB;

CREATE USER IF NOT EXISTS 'user'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON school_db.* TO 'user'@'%';
FLUSH PRIVILEGES;

INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Courtney', 'West', 'lewisheather@example.net', 'Hoffmanshire', 'Biology', 1.57, '2024-07-10');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Renee', 'Spencer', 'heather91@example.com', 'Brownhaven', 'Mathematics', 2.97, '2024-03-10');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Matthew', 'Higgins', 'garciasamuel@example.com', 'Ramirezside', 'Political Science', 3.14, '2024-10-26');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Dana', 'Garcia', 'brandonparsons@example.net', 'Yatesshire', 'Political Science', 1.42, '2024-07-24');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Stacey', 'Stein', 'powellphillip@example.org', 'Silvatown', 'Psychology', 4.26, '2024-11-16');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Peter', 'Barry', 'kim75@example.com', 'Ramosfurt', 'Music', 3.32, '2023-11-22');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Jennifer', 'Roberts', 'khale@example.org', 'Josephchester', 'Economics', 2.4, '2023-05-23');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Karen', 'Flowers', 'jordanthomas@example.org', 'Williamsfurt', 'Business Administration', 2.24, '2023-10-04');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('David', 'Carrillo', 'alee@example.com', 'East Elizabethstad', 'History', 3.67, '2023-10-29');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Alyssa', 'Powell', 'timothy43@example.com', 'New Jeffreyfort', 'Psychology', 3.88, '2023-06-30');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Susan', 'Jensen', 'vegadanielle@example.net', 'Turnerview', 'History', 0.9, '2022-10-16');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Stephanie', 'Johnson', 'ricericardo@example.org', 'Johnstonville', 'Business Administration', 1.39, '2023-02-16');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Jennifer', 'Peterson', 'lindaanderson@example.com', 'Andersonview', 'Political Science', 0.06, '2022-11-11');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Matthew', 'Conner', 'cfaulkner@example.com', 'Paulfurt', 'Computer Science', 3.41, '2022-12-18');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Nathaniel', 'Parker', 'wbaker@example.org', 'Cruzland', 'Physics', 0.61, '2022-05-10');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('David', 'Glover', 'grahambrian@example.net', 'West Melissa', 'Business Administration', 0.22, '2025-09-03');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Albert', 'Mitchell', 'stephenwilliams@example.org', 'Lake Amandahaven', 'Computer Science', 2.1, '2021-12-18');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('George', 'Lucas', 'erichards@example.net', 'East Juliefort', 'Music', 4.12, '2022-09-02');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Angela', 'Chan', 'sarahmcdaniel@example.net', 'Port Thomasville', 'Sociology', 3.71, '2024-07-18');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Lauren', 'Davis', 'donaldruiz@example.net', 'West Matthew', 'Physics', 3.43, '2024-06-03');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Dakota', 'Young', 'ubryant@example.com', 'Luceroside', 'History', 3.73, '2022-06-25');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Derrick', 'Lewis', 'jhernandez@example.com', 'South Kristinaport', 'Computer Science', 3.34, '2023-06-23');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Doris', 'Foley', 'reyeslauren@example.com', 'Sherihaven', 'Psychology', 1.01, '2024-02-13');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Connie', 'Moran', 'iwells@example.org', 'Ayersberg', 'English Literature', 1.51, '2021-09-18');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Miguel', 'Wilson', 'williamsjames@example.net', 'New Donnaville', 'Engineering', 0.01, '2023-06-10');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Xavier', 'Torres', 'relliott@example.org', 'Shaneton', 'Sociology', 3.19, '2024-08-13');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Rachel', 'Garcia', 'parkersarah@example.net', 'South Karishire', 'Political Science', 0.7, '2024-12-20');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Kelsey', 'Thornton', 'cherrera@example.org', 'New Allenberg', 'Computer Science', 3.17, '2022-12-27');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Melissa', 'Russo', 'robinsonamy@example.com', 'Danielsfurt', 'Music', 1.24, '2022-02-03');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Ralph', 'Jones', 'fharris@example.org', 'Ramostown', 'Psychology', 2.7, '2021-12-13');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Stephen', 'Cordova', 'osmith@example.net', 'South Connieville', 'Mathematics', 0.93, '2024-12-02');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Steven', 'Richardson', 'gking@example.com', 'West Alisonfurt', 'Economics', 1.59, '2022-07-30');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Sean', 'Griffin', 'tdiaz@example.org', 'Estesport', 'Engineering', 3.65, '2024-06-23');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Christopher', 'Collins', 'freemanbryan@example.net', 'Andrewborough', 'Mathematics', 0.53, '2025-08-29');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Alyssa', 'Figueroa', 'umorrison@example.com', 'Port Nathanstad', 'Chemistry', 2.31, '2024-08-26');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Evan', 'Russo', 'fsanders@example.com', 'South Donnaview', 'English Literature', 3.77, '2023-06-03');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Ashley', 'Barton', 'joel40@example.org', 'Port Travisburgh', 'History', 4.2, '2022-06-22');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Amy', 'Johnson', 'omendez@example.org', 'Robertshire', 'English Literature', 0.54, '2024-12-25');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Sara', 'Riggs', 'patrick97@example.net', 'Darrenberg', 'Sociology', 3.45, '2025-06-11');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Juan', 'Burgess', 'michaelpadilla@example.org', 'North Samanthaport', 'Engineering', 0.64, '2022-11-07');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Thomas', 'Reyes', 'syu@example.net', 'West Danielton', 'Chemistry', 3.42, '2024-08-19');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Sarah', 'Sutton', 'dawnboone@example.org', 'New Sarahberg', 'Political Science', 1.97, '2022-01-05');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Daniel', 'Flores', 'jacksonmark@example.org', 'South Andre', 'Psychology', 0.35, '2024-12-28');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Eric', 'Campbell', 'aaron14@example.org', 'East Gregory', 'English Literature', 3.53, '2021-10-01');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Chris', 'Hill', 'millersharon@example.net', 'Greenhaven', 'Computer Science', 0.89, '2022-06-21');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Samuel', 'Melton', 'xzhang@example.net', 'Michaelmouth', 'Mathematics', 1.66, '2024-07-18');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Justin', 'Miller', 'cnewton@example.com', 'Romanfurt', 'Political Science', 3.44, '2023-06-15');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Paige', 'Garcia', 'rayfernando@example.org', 'Alexanderstad', 'Chemistry', 0.05, '2022-01-30');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Amy', 'Owens', 'gmelton@example.org', 'Marcusmouth', 'Art', 1.7, '2025-02-26');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Danny', 'Richardson', 'julie42@example.org', 'Kingbury', 'Political Science', 3.97, '2023-05-30');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('John', 'Decker', 'hillalexandra@example.net', 'Port Mary', 'Psychology', 2.93, '2024-01-30');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Christina', 'Wu', 'melinda97@example.org', 'Justinfort', 'Music', 2.86, '2023-07-24');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Melissa', 'Dickerson', 'lialexandra@example.net', 'West Christopherport', 'Engineering', 1.92, '2023-04-17');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Jason', 'Hayes', 'delgadolarry@example.net', 'Samuelbury', 'Business Administration', 3.55, '2024-03-25');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Ryan', 'Douglas', 'camposcameron@example.com', 'East Emmachester', 'Computer Science', 3.42, '2023-08-15');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Alicia', 'Clark', 'vwarren@example.com', 'New Emily', 'English Literature', 4.27, '2022-01-15');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Sabrina', 'Cline', 'meltonmegan@example.com', 'Faulknerburgh', 'Art', 2.74, '2023-01-21');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Jeremiah', 'Rogers', 'steven02@example.org', 'Port Alexanderchester', 'Sociology', 3.69, '2023-11-17');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Melissa', 'Conner', 'wallacedenise@example.net', 'Lake Johnmouth', 'Music', 3.94, '2022-08-10');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Angela', 'Yu', 'zmartin@example.net', 'Jimmyfort', 'Business Administration', 2.0, '2022-09-17');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('David', 'Walker', 'janice28@example.net', 'Hernandeztown', 'Music', 2.6, '2024-03-27');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Victoria', 'Graham', 'williamsnatasha@example.org', 'Travisfort', 'Chemistry', 3.54, '2022-03-28');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Eric', 'Marshall', 'william56@example.net', 'West Courtneyfort', 'Music', 1.59, '2022-08-28');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Ashley', 'Payne', 'chelseajones@example.org', 'Port Karenburgh', 'Engineering', 1.76, '2025-04-15');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Sarah', 'Patel', 'brittany56@example.com', 'Lake Colleenshire', 'History', 0.93, '2022-08-01');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('James', 'Evans', 'reidbrenda@example.com', 'Shannonhaven', 'Psychology', 1.43, '2024-07-16');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Amanda', 'Prince', 'rebeccacarson@example.org', 'South Sandra', 'Music', 3.89, '2023-09-08');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Ashley', 'Wright', 'ronald24@example.net', 'Hayesland', 'Chemistry', 0.54, '2025-04-28');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Julie', 'Wright', 'christopher89@example.org', 'Lunachester', 'History', 1.65, '2025-01-13');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Bobby', 'Moore', 'hebertvirginia@example.com', 'New Aaron', 'Chemistry', 1.53, '2023-10-16');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Dawn', 'Garcia', 'brian54@example.org', 'Garyborough', 'Computer Science', 1.67, '2024-07-26');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Kristen', 'Rose', 'susanpatterson@example.org', 'Christinestad', 'Mathematics', 1.1, '2024-07-22');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Kathleen', 'Gonzalez', 'colleen07@example.com', 'East Julieburgh', 'Music', 0.72, '2022-10-07');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Andrew', 'Nichols', 'madisonstokes@example.org', 'Haleton', 'Economics', 0.58, '2022-12-28');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Adam', 'Nelson', 'david88@example.com', 'Ruthfurt', 'Biology', 2.25, '2023-04-14');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Matthew', 'Matthews', 'breanna41@example.org', 'Pricetown', 'Business Administration', 0.43, '2024-12-29');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Kathleen', 'Johnson', 'nicholas51@example.com', 'Port Amandashire', 'Psychology', 1.99, '2023-09-09');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Kristen', 'Taylor', 'michelle67@example.org', 'Lake James', 'Engineering', 4.14, '2023-08-01');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Raven', 'Davenport', 'jared64@example.net', 'Andreashire', 'Computer Science', 2.54, '2023-09-12');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Heather', 'Zimmerman', 'morrisjessica@example.org', 'Joshuamouth', 'English Literature', 0.24, '2022-09-16');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Ian', 'Zamora', 'psmith@example.org', 'Waltersmouth', 'Biology', 1.42, '2025-06-04');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('James', 'Henderson', 'pcampos@example.com', 'Port Keith', 'Psychology', 1.96, '2022-12-06');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Ashley', 'Mills', 'fjohnson@example.net', 'Elliston', 'Biology', 2.28, '2022-05-22');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Charles', 'Green', 'fhardy@example.net', 'Mcknightbury', 'Mathematics', 2.97, '2023-01-06');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Janice', 'Downs', 'darlene00@example.com', 'Shellymouth', 'Psychology', 3.48, '2023-06-21');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Steven', 'Conway', 'ogarcia@example.org', 'Rebeccamouth', 'History', 3.07, '2022-05-15');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Peter', 'Mcdaniel', 'lmendez@example.com', 'Joneston', 'Sociology', 2.71, '2022-08-06');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('William', 'Smith', 'shannonjohnson@example.net', 'West Joseph', 'Engineering', 3.54, '2023-11-21');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Kevin', 'Lee', 'melissa04@example.com', 'Tammymouth', 'Economics', 2.36, '2023-04-10');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Deborah', 'Nelson', 'maryfigueroa@example.com', 'New Brian', 'Mathematics', 1.66, '2024-03-21');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Brad', 'Pittman', 'james73@example.com', 'Lake Casey', 'Mathematics', 0.19, '2025-07-26');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Sheila', 'Alvarez', 'gibsonjennifer@example.com', 'Lake Julia', 'Biology', 1.22, '2025-02-20');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Leah', 'Washington', 'terryrogers@example.net', 'South Rachel', 'Mathematics', 3.91, '2024-05-28');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Heather', 'Espinoza', 'benjamincherry@example.net', 'Angelamouth', 'Chemistry', 2.73, '2022-06-01');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Joseph', 'Bailey', 'djones@example.net', 'Myersborough', 'Sociology', 2.45, '2024-07-24');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Sean', 'Carter', 'anthonyroth@example.org', 'Michelechester', 'English Literature', 0.59, '2024-06-20');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Christopher', 'Bailey', 'poolecrystal@example.net', 'North Dalton', 'Political Science', 2.81, '2023-09-23');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('John', 'Peterson', 'judith35@example.com', 'South Robert', 'Economics', 1.47, '2021-11-12');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Ryan', 'Villanueva', 'seth87@example.com', 'West Alexander', 'Mathematics', 2.26, '2024-11-25');
INSERT INTO students (first_name, last_name, email, city, program, gpa, enrolled_date) VALUES ('Benjamin', 'Copeland', 'guzmankeith@example.net', 'Aprilfurt', 'Music', 3.61, '2023-01-16');

