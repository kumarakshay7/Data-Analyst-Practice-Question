# SQL Data Analyst Interview Question Bank

This question bank contains the SQL topics discussed for Data Analyst interview preparation. Company names are intentionally generic so the material can be reused for any Data Analyst interview.

## Interactive Practice Set

The interactive `practice.html` contains the detailed hands-on questions. Each runnable question includes:

- Interviewer question
- What is being asked?
- Table structure
- Sample data
- Simple explanation
- Two hints
- SQL editor
- Run SQL
- Check Answer
- Show Correct Query
- Expected output checking
- Simple explanation
- Interview explanation
- Follow-up question
- Difficulty

The current interactive set covers the core scenarios discussed in our interview preparation: salary history with `LAG`, five consecutive login days, customers who purchased every Electronic product, employees earning more than their manager, third-highest salary, duplicate records, top two customers per category, cumulative salary, week-over-week sales, customers without orders, `WHERE` vs `HAVING`, ranking functions, `LEAD`/`LAG`, CTE vs subquery, SQL optimization, denormalization, join row-count scenarios, and third-highest salary without window functions.

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
36. Given A = {1,2,3} and B = {2,3,4}, determine INNER, LEFT and FULL OUTER JOIN row sets.
37. Explain why SQLite needs a workaround for FULL OUTER JOIN in the interactive browser runner.

## 3. GROUP BY, WHERE and HAVING

38. Find total sales by month.
39. Find total sales by customer.
40. Find average order value by customer.
41. Find customers with more than five orders.
42. Find customers whose total spend exceeds 100000.
43. Find the category with the highest sales.
44. Find the month with the highest revenue.
45. Find departments with average salary above company average.
46. Find products sold more than 100 times.
47. Find customers with exactly one order.
48. Find categories having at least three products.
49. Find duplicate customer emails.
50. Find duplicate customer records based on name and date of birth.
51. Explain WHERE vs HAVING.
52. Explain COUNT(*) vs COUNT(column) vs COUNT(DISTINCT column).
53. Find departments whose average salary is greater than company average salary.

## 4. Window Functions

54. Find the highest-paid employee in each department.
55. Find the second-highest salary in each department.
56. Find the third-highest distinct salary.
57. Compare RANK, DENSE_RANK and ROW_NUMBER.
58. Assign row numbers to employees within each department.
59. Find top three customers by revenue in each category.
60. Calculate running sales total by month.
61. Calculate cumulative salary by department.
62. Calculate each employee's percentage of department salary.
63. Calculate each product's percentage of category sales.
64. Find the previous month's sales using LAG.
65. Find the next month's sales using LEAD.
66. Calculate month-over-month sales change.
67. Calculate month-over-month sales percentage change.
68. Find employees whose salary increased compared with the previous salary record.
69. Find employees whose salary never decreased using salary history and LAG.
70. Find the first order for every customer.
71. Find the latest order for every customer.
72. Find the second order for every customer.
73. Find the gap in days between consecutive orders.
74. Find top two customers in each product category.
75. Calculate cumulative salary department-wise for employees who joined in the last 30 days.
76. Compare weekly sales with the previous week using LAG.
77. Show previous and next weekly sales using LAG and LEAD.

## 5. Date and Time / Consecutive Activity

78. Find orders placed in the last 30 days.
79. Find employees who joined in the last 30 days.
80. Calculate employee tenure in years.
81. Extract year, month and day from a date.
82. Calculate monthly revenue.
83. Calculate weekly revenue.
84. Find users active on consecutive days.
85. Find users active for five consecutive days.
86. Find the longest login streak for every user.
87. Find customers who ordered in two consecutive months.
88. Find customers who ordered in January but not February.
89. Find the first and last order date for every customer.
90. Calculate average days between orders.
91. Find orders placed on weekends.
92. Compare current month sales with the same month last year.

## 6. CTE and Subqueries

93. Find employees earning above company average using a subquery.
94. Find employees earning above department average.
95. Find customers whose spend is above average customer spend.
96. Use a CTE to calculate monthly sales and then rank months.
97. Use a CTE to identify duplicate records.
98. Use EXISTS to find customers with at least one order.
99. Use NOT EXISTS to find customers without orders.
100. Explain CTE vs subquery.
101. Write a correlated subquery to find employees above department average.
102. Use multiple CTEs to calculate a business KPI.
103. Find the third-highest salary without window functions.

## 7. Advanced Interview Scenarios

104. Find customers who purchased every product in a category.
105. Find the top two customers in every product category.
106. Find products whose sales are above category average.
107. Find the most frequently purchased product.
108. Find customers whose every order value is above 1000.
109. Find customers whose latest order was above their average order value.
110. Find the percentage of customers who placed another order within 30 days.
111. Find monthly customer retention.
112. Find first-time customers by month.
113. Find repeat customers by month.
114. Find revenue contribution from new vs returning customers.
115. Find the longest gap between orders for every customer.
116. Find the month with the largest month-over-month revenue increase.
117. Find the top-selling product in each month.
118. Find products whose rank improved month over month.

## 8. Data Quality

119. Find NULL values in important columns.
120. Find duplicate customer IDs.
121. Find duplicate business keys.
122. Find negative sales values.
123. Find orders with invalid dates.
124. Find orders referencing a product that does not exist.
125. Find customers with invalid email formats.
126. Find records with leading or trailing spaces.
127. Standardize inconsistent category values.
128. Detect unexpected salary outliers using SQL.
129. Find duplicate customer records using GROUP BY and HAVING.
130. Validate that a KPI does not double-count records after a JOIN.

## 9. SQL Optimization and Data Modeling

131. How would you investigate a slow SQL query?
132. What is an index and when can it help?
133. Why can SELECT * be inefficient?
134. How can filtering early improve performance?
135. When can a JOIN create unexpectedly many rows?
136. How would you read an execution plan?
137. When can a CTE affect performance depending on the database?
138. How would you optimize a query on 500 million rows?
139. What is partitioning and when can it help analytics?
140. Why can functions on indexed columns affect index usage?
141. What is denormalization?
142. When can denormalization help an analytics workload?
143. What are the trade-offs of denormalization?

## 10. Business Case SQL and Data Analysis Scenarios

144. Sales dropped 15% last quarter. How would you investigate?
145. Two dashboards show different revenue. How would you reconcile them?
146. A client says customer churn increased. What data would you request?
147. Marketing spend increased but sales did not. What would you investigate?
148. Conversion rate dropped suddenly. How would you perform root-cause analysis?
149. Revenue is growing but profit is falling. What dimensions would you analyze?
150. A KPI changed after a pipeline migration. How would you validate it?
151. A stakeholder asks for a dashboard by tomorrow. How would you prioritize?
152. How would you explain a complex SQL result to a non-technical client?
153. How would you validate an important business KPI before presenting it?
154. Two teams report different numbers for the same KPI. How would you identify the correct number?
155. A large dataset contains missing values, outliers and inconsistent date formats. How would you handle it before analysis?

## 11. Python / Pandas SQL-Style Questions

156. Remove duplicate rows using Pandas.
157. Handle missing values using Pandas.
158. Merge two DataFrames like a SQL LEFT JOIN.
159. Group a DataFrame by department and calculate average salary.
160. Create a running total in Pandas.
161. Create a lag column in Pandas.
162. Detect outliers using IQR.
163. Convert inconsistent date columns into one standard date format.
164. Compare two DataFrames and find missing records.
165. Build a reusable data-cleaning function.

## 12. Interview Communication Questions

166. Walk through a recent analytics project: business problem, dataset, approach and impact.
167. Why did you choose the tools and methods used in the project?
168. What challenges did you face while cleaning or analyzing data?
169. Describe a difficult analysis completed under a tight deadline.
170. What was the biggest lesson from that analysis?
171. How would you explain your SQL approach to a client in simple language?
172. How would you validate your analysis before presenting it?

## Recommended practice order

**Core SQL → Joins → GROUP BY/HAVING → Window Functions → Date/Streak Problems → CTE/Subqueries → Advanced Scenarios → Data Quality → Optimization → Business Cases → Python/Pandas → Interview Communication**

Practice the interactive questions first without looking at the solution. Say your approach aloud before writing SQL, then use **Run SQL** repeatedly while editing your query, and finally use **Check Answer**.