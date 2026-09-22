DROP TABLE IF EXISTS salary_history;

CREATE TABLE salary_history (
    employee_id INT,
    effective_date DATE,
    salary NUMERIC(12,2)
);

INSERT INTO salary_history VALUES
(101, '2022-01-01', 50000),
(101, '2023-01-01', 55000),
(101, '2024-01-01', 60000),
(102, '2022-01-01', 50000),
(102, '2023-01-01', 60000),
(102, '2024-01-01', 55000),
(103, '2022-01-01', 45000),
(103, '2023-01-01', 45000),
(103, '2024-01-01', 50000);
