# Deloitte-Style SQL Interview Practice

These questions are designed like a live Data Analyst interview: the interviewer gives a table structure and a business requirement, and you explain the logic before writing SQL.

## Q001. Salary History: salary never decreases

**Table:** salary_history(employee_id, effective_date, salary)

### Approach
1. Get the previous salary with LAG.
2. Compare current salary with previous salary.
3. Flag salary decreases.
4. Return employees with zero decreases.

```sql
WITH salary_check AS (
    SELECT
        employee_id,
        effective_date,
        salary,
        LAG(salary) OVER (
            PARTITION BY employee_id
            ORDER BY effective_date
        ) AS previous_salary
    FROM salary_history
)
SELECT employee_id
FROM salary_check
GROUP BY employee_id
HAVING SUM(
    CASE
        WHEN previous_salary IS NOT NULL
             AND salary < previous_salary
        THEN 1
        ELSE 0
    END
) = 0;
```

**Natural explanation:** "I use LAG because I need the previous salary for each employee. Then I check whether the current salary is lower than the previous salary. Employees with no decrease are returned."

## Q002. Five consecutive login days

**Table:** login(userid, logindate)

### Approach
1. Remove duplicate login dates.
2. Add ROW_NUMBER for each user.
3. Subtract the row number from the date to form groups.
4. Find groups with at least 5 dates.

```sql
WITH distinct_login AS (
    SELECT DISTINCT userid, logindate
    FROM login
),
login_group AS (
    SELECT
        userid,
        logindate,
        logindate
        - ROW_NUMBER() OVER (
            PARTITION BY userid
            ORDER BY logindate
        ) * INTERVAL '1 day' AS grp
    FROM distinct_login
)
SELECT userid
FROM login_group
GROUP BY userid, grp
HAVING COUNT(*) >= 5;
```

**Natural explanation:** "I remove duplicates first because two logins on the same day should count as one day. Then I use ROW_NUMBER and date arithmetic so consecutive dates fall into the same group."

## Q003. Customers who purchased every Electronic product

**Tables:**
- orders(customer_id, product_id)
- products(product_id, category)

### Approach
1. Join orders to products.
2. Keep Electronic products.
3. Count distinct electronic products for each customer.
4. Compare that count with the total number of electronic products.

```sql
SELECT o.customer_id
FROM orders o
JOIN products p
    ON o.product_id = p.product_id
WHERE p.category = 'Electronic'
GROUP BY o.customer_id
HAVING COUNT(DISTINCT o.product_id) = (
    SELECT COUNT(DISTINCT product_id)
    FROM products
    WHERE category = 'Electronic'
);
```

**Natural explanation:** "I count the unique electronic products each customer bought and compare it with the total number of electronic products. If the counts are equal, the customer bought every electronic product."

## Q004. Employees earning more than their manager

```sql
SELECT
    e.employee_name,
    e.salary,
    m.employee_name AS manager_name,
    m.salary AS manager_salary
FROM employees e
JOIN employees m
    ON e.manager_id = m.employee_id
WHERE e.salary > m.salary;
```

**Concept:** self join.

## Q005. Third highest salary

```sql
SELECT employee_id, employee_name, salary
FROM (
    SELECT
        employee_id,
        employee_name,
        salary,
        DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk
    FROM employees
) t
WHERE rnk = 3;
```

## Q006. Duplicate customers

```sql
SELECT email, COUNT(*) AS duplicate_count
FROM customers
GROUP BY email
HAVING COUNT(*) > 1;
```

## Q007. Top 2 customers by amount in each category

```sql
SELECT *
FROM (
    SELECT
        category,
        customer_id,
        SUM(order_amount) AS total_amount,
        DENSE_RANK() OVER (
            PARTITION BY category
            ORDER BY SUM(order_amount) DESC
        ) AS rnk
    FROM orders
    GROUP BY category, customer_id
) t
WHERE rnk <= 2;
```

## Q008. Cumulative salary department-wise

```sql
SELECT
    employee_id,
    employee_name,
    department,
    salary,
    joining_date,
    SUM(salary) OVER (
        PARTITION BY department
        ORDER BY joining_date
        ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cumulative_salary
FROM employees
WHERE joining_date >= CURRENT_DATE - INTERVAL '30 days';
```

## Q009. Week-over-week sales

```sql
SELECT
    week,
    sales,
    LAG(sales) OVER (ORDER BY week) AS previous_week_sales,
    sales - LAG(sales) OVER (ORDER BY week) AS sales_change
FROM weekly_sales;
```

## Q010. Customers without orders

```sql
SELECT c.customer_id
FROM customers c
LEFT JOIN orders o
    ON c.customer_id = o.customer_id
WHERE o.customer_id IS NULL;
```
