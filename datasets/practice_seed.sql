PRAGMA foreign_keys = OFF;

DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS monthly_sales;
DROP TABLE IF EXISTS logins;
DROP TABLE IF EXISTS salary_history;
DROP TABLE IF EXISTS users;

CREATE TABLE departments (
  department_id INTEGER PRIMARY KEY,
  department_name TEXT
);

INSERT INTO departments VALUES
(1,'Analytics'),(2,'Sales'),(3,'Finance'),(4,'HR');

CREATE TABLE employees (
  employee_id INTEGER PRIMARY KEY,
  employee_name TEXT,
  salary REAL,
  department_id INTEGER,
  manager_id INTEGER,
  join_date TEXT,
  date_of_birth TEXT
);

INSERT INTO employees VALUES
(101,'Akshay',85000,1,NULL,'2023-01-10','1998-04-12'),
(102,'Anita',72000,1,101,'2024-02-15','1997-08-21'),
(103,'Rahul',65000,2,106,'2022-06-01','1996-03-10'),
(104,'Aman',52000,2,106,'2025-01-05','1999-11-02'),
(105,'Priya',91000,3,108,'2021-09-20','1995-05-18'),
(106,'Vikas',78000,2,NULL,'2020-04-11','1993-12-01'),
(107,'Neha',60000,4,109,'2024-07-08','1998-10-25'),
(108,'Rohit',99000,3,NULL,'2019-03-14','1992-06-30'),
(109,'Arjun',70000,4,NULL,'2020-11-19','1994-01-16'),
(110,'Anand',48000,NULL,101,'2025-03-01','2000-02-20');

CREATE TABLE customers (
  customer_id INTEGER PRIMARY KEY,
  customer_name TEXT,
  email TEXT,
  date_of_birth TEXT,
  signup_date TEXT
);

INSERT INTO customers VALUES
(201,'Amit','amit@example.com','1990-01-10','2024-01-05'),
(202,'Anu','anu@example.com','1992-05-12','2024-02-10'),
(203,'Rahul','rahul@example.com','1989-08-22','2024-03-15'),
(204,'Priya','priya@example.com','1991-11-30','2024-04-20'),
(205,'Neha','neha@example.com','1993-03-18','2024-05-01'),
(206,'Ravi','ravi@example.com','1988-07-07','2024-06-12'),
(207,'Kiran','kiran@example.com','1994-09-09','2024-07-03'),
(208,'Aman','aman@example.com','1995-12-11','2024-08-18');

CREATE TABLE products (
  product_id TEXT PRIMARY KEY,
  product_name TEXT,
  category TEXT,
  price REAL
);

INSERT INTO products VALUES
('P101','Laptop','Electronics',70000),
('P102','Phone','Electronics',45000),
('P103','Headphones','Electronics',5000),
('P104','Monitor','Electronics',18000),
('P105','Keyboard','Electronics',2500),
('P201','Chair','Furniture',9000),
('P202','Desk','Furniture',15000),
('P203','Lamp','Furniture',3000),
('P301','Notebook','Stationery',500),
('P302','Pen','Stationery',100);

CREATE TABLE orders (
  order_id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  product_id TEXT,
  order_date TEXT,
  amount REAL,
  category TEXT
);

INSERT INTO orders VALUES
(1,201,'P101','2024-01-10',70000,'Electronics'),
(2,201,'P102','2024-02-12',45000,'Electronics'),
(3,202,'P103','2024-02-15',5000,'Electronics'),
(4,202,'P201','2024-03-01',9000,'Furniture'),
(5,203,'P104','2024-03-12',18000,'Electronics'),
(6,203,'P105','2024-04-10',2500,'Electronics'),
(7,204,'P201','2024-04-18',9000,'Furniture'),
(8,204,'P202','2024-05-20',15000,'Furniture'),
(9,205,'P101','2024-06-05',70000,'Electronics'),
(10,205,'P103','2024-07-05',5000,'Electronics'),
(11,206,'P301','2024-07-15',500,'Stationery'),
(12,206,'P302','2024-08-15',100,'Stationery'),
(13,207,'P102','2024-08-20',45000,'Electronics'),
(14,207,'P104','2024-09-20',18000,'Electronics'),
(15,208,'P203','2024-09-25',3000,'Furniture'),
(16,201,'P104','2024-10-10',18000,'Electronics'),
(17,202,'P102','2024-10-15',45000,'Electronics'),
(18,203,'P101','2024-11-11',70000,'Electronics'),
(19,205,'P105','2024-11-20',2500,'Electronics'),
(20,207,'P103','2024-12-01',5000,'Electronics');

CREATE TABLE sales (
  sale_id INTEGER PRIMARY KEY,
  customer_id INTEGER,
  product_id TEXT,
  sale_date TEXT,
  amount REAL
);

INSERT INTO sales VALUES
(1,201,'P101','2024-01-10',70000),(2,201,'P102','2024-02-12',45000),
(3,202,'P103','2024-02-15',5000),(4,202,'P201','2024-03-01',9000),
(5,203,'P104','2024-03-12',18000),(6,203,'P105','2024-04-10',2500),
(7,204,'P201','2024-04-18',9000),(8,204,'P202','2024-05-20',15000),
(9,205,'P101','2024-06-05',70000),(10,205,'P103','2024-07-05',5000),
(11,206,'P301','2024-07-15',500),(12,206,'P302','2024-08-15',100),
(13,207,'P102','2024-08-20',45000),(14,207,'P104','2024-09-20',18000),
(15,208,'P203','2024-09-25',3000),(16,201,'P104','2024-10-10',18000),
(17,202,'P102','2024-10-15',45000),(18,203,'P101','2024-11-11',70000),
(19,205,'P105','2024-11-20',2500),(20,207,'P103','2024-12-01',5000);

CREATE TABLE monthly_sales (
  month TEXT PRIMARY KEY,
  sales REAL
);

INSERT INTO monthly_sales VALUES
('2024-01',70000),('2024-02',50000),('2024-03',27000),('2024-04',11500),
('2024-05',15000),('2024-06',70000),('2024-07',5500),('2024-08',45100),
('2024-09',21000),('2024-10',63000),('2024-11',72500),('2024-12',5000);

CREATE TABLE logins (
  user_id INTEGER,
  login_date TEXT
);

INSERT INTO logins VALUES
(301,'2024-01-01'),(301,'2024-01-02'),(301,'2024-01-03'),(301,'2024-01-04'),(301,'2024-01-05'),
(302,'2024-02-01'),(302,'2024-02-03'),(302,'2024-02-04'),(302,'2024-02-05'),
(303,'2024-03-10'),(303,'2024-03-11'),(303,'2024-03-12'),(303,'2024-03-13'),(303,'2024-03-14'),(303,'2024-03-15');

CREATE TABLE users (user_id INTEGER PRIMARY KEY, user_name TEXT);
INSERT INTO users VALUES (301,'User A'),(302,'User B'),(303,'User C');

CREATE TABLE salary_history (
  employee_id INTEGER,
  effective_date TEXT,
  salary REAL
);

INSERT INTO salary_history VALUES
(101,'2022-01-01',60000),(101,'2023-01-01',72000),(101,'2024-01-01',85000),
(102,'2022-01-01',60000),(102,'2023-01-01',68000),(102,'2024-01-01',72000),
(103,'2022-01-01',55000),(103,'2023-01-01',70000),(103,'2024-01-01',65000),
(104,'2023-01-01',45000),(104,'2024-01-01',52000);

CREATE VIEW employee_details AS
SELECT e.*, d.department_name
FROM employees e LEFT JOIN departments d ON e.department_id=d.department_id;
