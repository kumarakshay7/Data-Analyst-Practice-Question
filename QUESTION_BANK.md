# SQL Data Analyst Interview Question Bank

100+ practice questions organized for Data Analyst interviews. Use the interactive `practice.html` for the first detailed practice set, then use this bank for structured revision.

## 1. SQL Basics
1. Select all employees from an employee table.
2. Select employee name and salary only.
3. Find employees with salary greater than 50000.
4. Find employees in the Analytics department.
5. Find employees whose name starts with A.
6. Find employees whose name contains `an`.
7. Find employees with salary between 50000 and 100000.
8. Find employees whose department is NULL.
9. Replace NULL department with `Unknown`.
10. Sort employees by salary from highest to lowest.
11. Return the five highest-paid employees.
12. Count total employees.
13. Find the average salary.
14. Find minimum and maximum salary.
15. Count employees department-wise.
16. Find departments having more than 10 employees.
17. Find the total salary by department.
18. Find the average salary by department.
19. Find the difference between maximum and minimum salary by department.
20. Use CASE to create salary bands: Low, Medium, High.

## 2. Joins
21. Explain and write an INNER JOIN between orders and customers.
22. Find customers who have orders using INNER JOIN.
23. Find customers who have never placed an order using LEFT JOIN.
24. Find products that have never been ordered.
25. Find employees and their department names.
26. Find employees whose manager record is missing.
27. Find employees earning more than their manager using SELF JOIN.
28. Find customers who ordered products from the Electronics category.
29. Find orders with missing product details.
30. Explain INNER JOIN vs LEFT JOIN with row-count examples.
31. Explain FULL OUTER JOIN with a business example.
32. Find records present in table A but not table B.
33. Find common customers between two datasets.
34. Join three tables: orders, customers and products.
35. Identify duplicate rows caused by an incorrect join.

## 3. GROUP BY and HAVING
36. Find total sales by month.
37. Find total sales by customer.
38. Find average order value by customer.
39. Find customers with more than five orders.
40. Find customers whose total spend exceeds 100000.
41. Find the category with the highest sales.
42. Find the month with the highest revenue.
43. Find departments with average salary above company average.
44. Find products sold more than 100 times.
45. Find customers with exactly one order.
46. Find categories having at least three products.
47. Find duplicate customer emails.
48. Find duplicate customer records based on name and date of birth.
49. Explain WHERE vs HAVING.
50. Explain COUNT(*) vs COUNT(column) vs COUNT(DISTINCT column).

## 4. Window Functions
51. Find the highest-paid employee in each department.
52. Find the second-highest salary in each department.
53. Find the third-highest distinct salary.
54. Compare RANK, DENSE_RANK and ROW_NUMBER.
55. Assign row numbers to employees within each department.
56. Find top three customers by revenue in each category.
57. Calculate running sales total by month.
58. Calculate cumulative salary by department.
59. Calculate each employee's percentage of department salary.
60. Calculate each product's percentage of category sales.
61. Find the previous month's sales using LAG.
62. Find the next month's sales using LEAD.
63. Calculate month-over-month sales change.
64. Calculate month-over-month sales percentage change.
65. Find employees whose salary increased compared with the previous salary record.
66. Find employees whose salary never decreased.
67. Find the first order for every customer.
68. Find the latest order for every customer.
69. Find the second order for every customer.
70. Find the gap in days between consecutive orders.

## 5. Date and Time
71. Find orders placed in the last 30 days.
72. Find employees who joined in the last 30 days.
73. Calculate employee tenure in years.
74. Extract year, month and day from a date.
75. Calculate monthly revenue.
76. Calculate weekly revenue.
77. Find users active on consecutive days.
78. Find users active for five consecutive days.
79. Find the longest login streak for every user.
80. Find customers who ordered in two consecutive months.
81. Find customers who ordered in January but not February.
82. Find the first and last order date for every customer.
83. Calculate average days between orders.
84. Find orders placed on weekends.
85. Compare current month sales with the same month last year.

## 6. CTE and Subqueries
86. Find employees earning above company average using a subquery.
87. Find employees earning above department average.
88. Find customers whose spend is above average customer spend.
89. Use a CTE to calculate monthly sales and then rank months.
90. Use a CTE to identify duplicate records.
91. Use EXISTS to find customers with at least one order.
92. Use NOT EXISTS to find customers without orders.
93. Explain CTE vs subquery.
94. Write a correlated subquery to find employees above department average.
95. Use multiple CTEs to calculate a business KPI.

## 7. Advanced Interview Scenarios
96. Find customers who purchased every product in a category.
97. Find the top two customers in every product category.
98. Find products whose sales are above category average.
99. Find the most frequently purchased product.
100. Find customers whose every order value is above 1000.
101. Find customers whose latest order was above their average order value.
102. Find the percentage of customers who placed another order within 30 days.
103. Find monthly customer retention.
104. Find first-time customers by month.
105. Find repeat customers by month.
106. Find revenue contribution from new vs returning customers.
107. Find the longest gap between orders for every customer.
108. Find the month with the largest month-over-month revenue increase.
109. Find the top-selling product in each month.
110. Find products whose rank improved month over month.

## 8. Data Quality
111. Find NULL values in important columns.
112. Find duplicate customer IDs.
113. Find duplicate business keys.
114. Find negative sales values.
115. Find orders with invalid dates.
116. Find orders referencing a product that does not exist.
117. Find customers with invalid email formats.
118. Find records with leading or trailing spaces.
119. Standardize inconsistent category values.
120. Detect unexpected salary outliers using SQL.

## 9. SQL Optimization
121. How would you investigate a slow SQL query?
122. What is an index and when can it help?
123. Why can SELECT * be inefficient?
124. How can filtering early improve performance?
125. When can a JOIN create unexpectedly many rows?
126. How would you read an execution plan?
127. When can a CTE affect performance depending on the database?
128. How would you optimize a query on 500 million rows?
129. What is partitioning and when can it help analytics?
130. Why can functions on indexed columns affect index usage?

## 10. Business Case Questions
131. Sales dropped 15% last quarter. How would you investigate?
132. Two dashboards show different revenue. How would you reconcile them?
133. A client says customer churn increased. What data would you request?
134. Marketing spend increased but sales did not. What would you investigate?
135. Conversion rate dropped suddenly. How would you perform root-cause analysis?
136. Revenue is growing but profit is falling. What dimensions would you analyze?
137. A KPI changed after a pipeline migration. How would you validate it?
138. A stakeholder asks for a dashboard by tomorrow. How would you prioritize?
139. How would you explain a complex SQL result to a non-technical client?
140. How would you validate an important business KPI before presenting it?

## 11. Python / Pandas SQL-Style Questions
141. Remove duplicate rows using Pandas.
142. Handle missing values using Pandas.
143. Merge two DataFrames like a SQL LEFT JOIN.
144. Group a DataFrame by department and calculate average salary.
145. Create a running total in Pandas.
146. Create a lag column in Pandas.
147. Detect outliers using IQR.
148. Convert inconsistent date columns into one standard date format.
149. Compare two DataFrames and find missing records.
150. Build a reusable data-cleaning function.

## Recommended practice order

**1-20 → 21-50 → 51-70 → 71-85 → 86-95 → 96-110 → 111-130 → 131-140 → 141-150**

The first interactive questions should be practiced without looking at the solution. For interview preparation, explain your approach aloud before writing SQL.
