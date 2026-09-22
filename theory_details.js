(function(){
  const details = {
    Q030: {
      title:'INNER JOIN vs LEFT JOIN',
      html:`<p><b>INNER JOIN:</b> returns only rows that have a matching key in both tables.</p><p><b>LEFT JOIN:</b> returns every row from the left table. If there is no match on the right, the right-side columns become <code>NULL</code>.</p><p><b>Example:</b> If Customers has 4 customers and Orders has orders for only 3 of them, an INNER JOIN can return 3 customer rows, while a LEFT JOIN keeps all 4 customers.</p><p><b>Interview point:</b> The row count depends on the relationship. If one customer has multiple orders, even a single customer can produce multiple joined rows.</p><p><b>Easy way to remember:</b> INNER = matching records only. LEFT = keep everything from the left table.</p>`
    },
    Q031: {
      title:'FULL OUTER JOIN',
      html:`<p>A <b>FULL OUTER JOIN</b> keeps all matching rows plus unmatched rows from both tables.</p><p>Suppose Table A contains IDs <b>1, 2, 3</b> and Table B contains <b>2, 3, 4</b>. The result contains <b>1, 2, 3, 4</b>. IDs 2 and 3 match, while 1 exists only in A and 4 exists only in B.</p><p>For unmatched rows, columns from the other table are <code>NULL</code>.</p><p><b>Business example:</b> Compare a company customer master with a CRM export and find customers missing from either system.</p><p><b>Important:</b> Some SQL engines support FULL OUTER JOIN directly, while SQLite traditionally requires a UNION-based workaround.</p>`
    },
    Q036: {
      title:'INNER, LEFT and FULL OUTER JOIN row sets',
      html:`<p>For A = <b>{1,2,3}</b> and B = <b>{2,3,4}</b>, assuming we join on the value:</p><ul><li><b>INNER JOIN:</b> only common values → 2, 3.</li><li><b>LEFT JOIN:</b> every value from A → 1, 2, 3. For value 1, B-side columns are NULL.</li><li><b>FULL OUTER JOIN:</b> every value from both sides → 1, 2, 3, 4.</li></ul><p>The key interview idea is not just memorizing the names. Ask: <b>which side's unmatched rows must be preserved?</b></p>`
    },
    Q037: {
      title:'FULL OUTER JOIN workaround in SQLite',
      html:`<p>SQLite does not provide the same native FULL OUTER JOIN syntax available in some other SQL databases.</p><p>A common workaround is to combine two LEFT JOIN queries with <code>UNION</code>: one keeps all rows from A, and the second keeps unmatched rows from B.</p><p>The pattern is conceptually:</p><pre>SELECT ... FROM A LEFT JOIN B ON A.id = B.id
UNION
SELECT ... FROM B LEFT JOIN A ON A.id = B.id
WHERE A.id IS NULL;</pre><p>The second query adds only B rows that were not already matched. This is useful when practicing joins in the browser-based SQLite runner.</p>`
    },
    Q051: {
      title:'WHERE vs HAVING',
      html:`<p><b>WHERE</b> filters individual rows <b>before</b> grouping and aggregation.</p><p><b>HAVING</b> filters groups <b>after</b> <code>GROUP BY</code> and is commonly used with aggregate functions such as COUNT, SUM and AVG.</p><p><b>Example:</b> <code>WHERE salary &gt; 50000</code> removes low-salary rows before grouping. <code>HAVING COUNT(*) &gt; 5</code> keeps only departments that have more than five employees.</p><p><b>Execution idea:</b> FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.</p><p><b>Interview tip:</b> If the condition is about a row, think WHERE. If the condition is about an aggregated group, think HAVING.</p>`
    },
    Q052: {
      title:'COUNT(*) vs COUNT(column) vs COUNT(DISTINCT column)',
      html:`<p><b>COUNT(*)</b> counts rows. It counts a row even when individual columns contain NULL.</p><p><b>COUNT(column)</b> counts only non-NULL values in that column.</p><p><b>COUNT(DISTINCT column)</b> counts unique non-NULL values.</p><p><b>Example:</b> If customer IDs are 101, 101, 102 and NULL, then COUNT(*) = 4, COUNT(customer_id) = 3, and COUNT(DISTINCT customer_id) = 2.</p><p><b>Interview tip:</b> Use COUNT(DISTINCT customer_id) when the business question asks for unique customers, not total transactions.</p>`
    },
    Q057: {
      title:'RANK vs DENSE_RANK vs ROW_NUMBER',
      html:`<p>All three are window functions, but ties are handled differently.</p><ul><li><b>ROW_NUMBER:</b> gives every row a unique number. Ties do not receive the same number.</li><li><b>RANK:</b> tied rows receive the same rank, and the next rank has a gap.</li><li><b>DENSE_RANK:</b> tied rows receive the same rank, but there are no gaps.</li></ul><p><b>Example salaries:</b> 100, 100, 90. ROW_NUMBER can be 1,2,3. RANK is 1,1,3. DENSE_RANK is 1,1,2.</p><p><b>Which one?</b> Use ROW_NUMBER when you need exactly one ordered row, RANK when gaps after ties are meaningful, and DENSE_RANK when you want distinct ranking positions.</p>`
    },
    Q100: {
      title:'CTE vs subquery',
      html:`<p>A <b>CTE (Common Table Expression)</b> is a named temporary result defined with <code>WITH</code>. A <b>subquery</b> is a query nested directly inside another query.</p><p><b>CTE example:</b></p><pre>WITH customer_sales AS (
  SELECT customer_id, SUM(amount) AS total_sales
  FROM orders
  GROUP BY customer_id
)
SELECT * FROM customer_sales;</pre><p>A CTE is often easier to read when the analysis has multiple logical steps. A subquery can be convenient for a small one-step calculation.</p><p><b>Performance:</b> Do not assume a CTE is always faster or slower. The database optimizer and whether the CTE is materialized or inlined can matter.</p>`
    },
    Q102: {
      title:'Using multiple CTEs for a business KPI',
      html:`<p>Multiple CTEs are useful when a KPI needs several logical steps. Instead of writing one very large query, create one named step for each part of the calculation.</p><p><b>Typical structure:</b> first CTE prepares orders, second CTE aggregates customers, third CTE calculates the KPI, and the final SELECT formats the result.</p><p>This makes the query easier to read, test and debug because you can inspect each step separately.</p><p><b>Interview example:</b> For revenue per active customer, first calculate revenue by customer, then identify active customers, then divide total revenue by the number of active customers.</p><p><b>Interview tip:</b> Explain what each CTE represents rather than simply saying you used a CTE.</p>`
    },
    Q131: {
      title:'Investigating a slow SQL query',
      html:`<p>Start by understanding <b>what became slow</b> and compare the current query with a previously fast version.</p><ol><li>Read the <b>execution plan</b>.</li><li>Check table sizes and how many rows each step processes.</li><li>Look for expensive joins, full table scans, large sorts and aggregations.</li><li>Check filters and whether useful indexes or partitions can be used.</li><li>Check for accidental many-to-many joins that multiply rows.</li><li>Measure each change instead of assuming an optimization helped.</li></ol><p><b>Interview answer:</b> "I would first inspect the execution plan and identify the highest-cost operation, then optimize that measured bottleneck and validate the improvement."</p>`
    },
    Q132: {
      title:'Indexes',
      html:`<p>An <b>index</b> is a data structure that helps the database locate rows without scanning the entire table.</p><p>Indexes can help columns commonly used in <b>WHERE filters, JOIN conditions and ORDER BY</b> operations, especially when the filter is selective.</p><p><b>Trade-off:</b> indexes use storage and can make INSERT, UPDATE and DELETE operations more expensive because the index must also be maintained.</p><p><b>Example:</b> If a large customer table is frequently searched by customer_id, an index on customer_id can make those lookups much faster.</p><p>Always verify the benefit with the execution plan and real workload.</p>`
    },
    Q133: {
      title:'Why SELECT * can be inefficient',
      html:`<p><code>SELECT *</code> returns every column, even when the analysis needs only two or three.</p><p>Unnecessary columns can increase <b>I/O, memory usage, network traffic and result-processing time</b>. Wide rows can be especially expensive on large tables.</p><p>It can also make downstream code fragile because adding a new column changes the result shape.</p><p><b>Better practice:</b> explicitly select the columns required for the business question.</p><p><b>Interview example:</b> Instead of selecting every customer field to calculate revenue, select only customer_id and the columns needed for the calculation.</p>`
    },
    Q134: {
      title:'Filtering early for performance',
      html:`<p>Filtering early can reduce the number of rows that later joins, sorts and aggregations have to process.</p><p>For example, if a fact table contains 500 million rows but the report needs only the current year, applying the date filter early can greatly reduce the working dataset.</p><p>However, the optimizer may rearrange operations itself, so do not assume the written order alone determines performance.</p><p><b>Interview tip:</b> Say that you reduce data as early as practical, then confirm the actual behavior using the execution plan.</p>`
    },
    Q135: {
      title:'Unexpected row multiplication after a JOIN',
      html:`<p>A JOIN can create more rows than expected when the join key is not unique on one or both sides.</p><p><b>Example:</b> One customer has 3 orders. Joining the customer row to orders produces 3 rows for that customer. If another table also has multiple matching rows, the result can multiply again.</p><p>This often happens with <b>one-to-many or many-to-many relationships</b>.</p><p><b>How to investigate:</b> check uniqueness of join keys, compare row counts before and after the join, and confirm the intended grain of the result.</p>`
    },
    Q136: {
      title:'Reading an execution plan',
      html:`<p>An execution plan shows how the database intends to execute a query.</p><p>Look for operations such as <b>table scans, index scans, joins, sorts and aggregations</b>. Pay attention to estimated versus actual rows and the relative cost of operations.</p><p>A large mismatch between estimated and actual rows can indicate poor statistics or assumptions that lead to a bad plan.</p><p><b>Interview approach:</b> identify the expensive operation first, understand why it processes so much data, make one change, then compare the new plan and runtime.</p>`
    },
    Q137: {
      title:'CTE performance and database behavior',
      html:`<p>A CTE improves query organization, but its performance behavior depends on the SQL database and version.</p><p>Some databases can <b>inline</b> a CTE into the surrounding query, while others may <b>materialize</b> it. Materialization means an intermediate result may be stored and reused, which can help or hurt depending on the workload.</p><p>Therefore, do not say "CTEs are always faster" or "CTEs are always slower."</p><p><b>Best practice:</b> write readable SQL first, then inspect the execution plan when performance matters.</p>`
    },
    Q138: {
      title:'Optimizing a query on 500 million rows',
      html:`<p>For a very large table, start with the business grain and reduce unnecessary work.</p><ol><li>Filter by selective conditions, especially partition keys such as date.</li><li>Select only required columns.</li><li>Check indexes, partitioning and clustering options supported by the database.</li><li>Verify join keys and avoid accidental row multiplication.</li><li>Aggregate at the correct grain.</li><li>Inspect the execution plan and measure runtime before and after changes.</li></ol><p><b>Interview answer:</b> "I would first profile the query and execution plan, identify the biggest data-processing bottleneck, reduce the amount of data processed, and then measure the improvement."</p>`
    },
    Q139: {
      title:'Partitioning for analytics',
      html:`<p><b>Partitioning</b> divides a large table into smaller physical or logical partitions, often using a column such as date.</p><p>For example, a sales table can be partitioned by month or year. A query for January may then need to read only the relevant partition instead of the entire table. This is commonly called <b>partition pruning</b>.</p><p>Partitioning is most useful when queries regularly filter on the partition key and the database supports efficient pruning.</p><p><b>Important:</b> Partitioning is not automatically a replacement for indexes. The right design depends on the database and workload.</p>`
    },
    Q140: {
      title:'Functions on indexed columns',
      html:`<p>Applying a function directly to an indexed column can make it harder for a database to use a normal index efficiently, depending on the optimizer and database.</p><p>For example, a predicate such as <code>WHERE YEAR(order_date)=2026</code> may prevent a simple index on order_date from being used as effectively as a range predicate such as <code>order_date &gt;= '2026-01-01' AND order_date &lt; '2027-01-01'</code>.</p><p>The exact behavior is database-specific, so confirm with the execution plan.</p>`
    },
    Q141: {
      title:'Denormalization',
      html:`<p><b>Denormalization</b> intentionally stores some repeated, combined or derived data to make reads simpler or faster.</p><p>In a normalized design, customer, product and order information may live in separate tables. A reporting model might combine commonly used attributes into a wider table to reduce repeated joins.</p><p><b>Benefit:</b> simpler and sometimes faster analytical queries.</p><p><b>Cost:</b> more storage and a greater risk of inconsistent duplicated values if the data is not maintained correctly.</p>`
    },
    Q142: {
      title:'When denormalization can help analytics',
      html:`<p>Denormalization can help when the workload is <b>read-heavy</b> and the same joins are repeatedly required for reporting or dashboards.</p><p>A prepared analytical table can reduce query complexity and response time because common joins and transformations have already been performed.</p><p><b>Example:</b> A dashboard queried thousands of times per day may use a curated reporting table containing customer, product and sales attributes together.</p><p>The decision should be based on measured workload, freshness requirements and maintenance cost.</p>`
    },
    Q143: {
      title:'Trade-offs of denormalization',
      html:`<p>Denormalization is a trade-off between <b>read simplicity/performance</b> and <b>data duplication/maintenance</b>.</p><p><b>Advantages:</b> fewer joins, simpler reporting queries, potentially faster dashboard performance.</p><p><b>Disadvantages:</b> more storage, more complex updates, possible inconsistency between duplicated values, and more ETL/ELT maintenance.</p><p><b>Interview answer:</b> "I would denormalize when the read-performance or reporting benefit justifies the additional storage and data-maintenance complexity."</p>`
    },
    Q144: {
      title:'Sales dropped 15% last quarter',
      html:`<p>Start by confirming that the 15% decline is real and that the KPI definition and date range have not changed.</p><p>Then break sales down by <b>product, geography, channel, customer segment, price and volume</b>. Compare each segment with the previous quarter.</p><p>Next separate the effect of <b>volume and price</b>. Check stock-outs, cancellations, refunds, promotions, seasonality and major customer losses.</p><p><b>Interview answer:</b> "I would segment the decline to identify where the change is concentrated, then investigate the operational or commercial driver of that segment."</p>`
    },
    Q145: {
      title:'Two dashboards show different revenue',
      html:`<p>Do not immediately assume one dashboard is wrong. First compare the <b>KPI definition</b>.</p><ol><li>Check source tables and refresh time.</li><li>Compare date ranges and time zones.</li><li>Check filters and excluded statuses.</li><li>Check joins for duplicate rows.</li><li>Check refunds, cancellations, discounts and currency conversion.</li><li>Compare the aggregation grain.</li></ol><p>Run both calculations on the same small sample and identify the first transformation where the numbers diverge.</p>`
    },
    Q146: {
      title:'Investigating increased customer churn',
      html:`<p>First define exactly what <b>churn</b> means, such as no purchase for 90 days.</p><p>Then compare churn by <b>cohort, product, geography, acquisition channel, customer segment and time period</b>.</p><p>Check whether the increase is caused by actual customer behavior or a data/tracking change. Look at last activity, order frequency, support issues, pricing changes and product availability where relevant.</p><p><b>Interview tip:</b> Always validate the churn definition and denominator before interpreting the percentage.</p>`
    },
    Q147: {
      title:'Marketing spend increased but sales did not',
      html:`<p>Break marketing spend and sales down by <b>channel, campaign, geography, product and time</b>.</p><p>Check whether the extra spend produced impressions, clicks, leads and conversions. Review conversion rates, customer quality, pricing, promotions and the timing between marketing activity and sales.</p><p>Also check attribution. Sales may be influenced by several channels, so last-click reporting may not show the full relationship.</p><p><b>Interview answer:</b> "I would identify which channels received the additional spend and whether the expected downstream funnel metrics improved."</p>`
    },
    Q148: {
      title:'Conversion rate dropped suddenly',
      html:`<p>First check whether the drop is a <b>real business change or a tracking issue</b>.</p><p>Validate event counts and the conversion formula. Then segment conversion by <b>device, browser, channel, geography, product and funnel step</b>.</p><p>If one funnel step shows a sudden break, investigate the corresponding application or tracking change.</p><p>Also compare the same hour/day pattern with historical data to separate normal seasonality from an unusual event.</p>`
    },
    Q149: {
      title:'Revenue is growing but profit is falling',
      html:`<p>Revenue and profit measure different things, so analyze the costs behind the revenue growth.</p><p>Break the change down by <b>product mix, customer mix, price, discounts, volume, COGS, shipping, refunds and operating costs</b>.</p><p>A company can sell more low-margin products and increase revenue while reducing total profit.</p><p><b>Interview answer:</b> "I would bridge revenue to profit and identify which cost or mix component explains the margin decline."</p>`
    },
    Q150: {
      title:'KPI changed after a pipeline migration',
      html:`<p>Run the old and new pipeline logic against the <b>same historical input data</b>.</p><p>Compare row counts, duplicates, nulls, totals and KPI values at every transformation stage. Find the first stage where the old and new outputs diverge.</p><p>Common causes include changed joins, filters, date/time-zone logic, data types, deduplication rules or missing records.</p><p><b>Best practice:</b> keep a reconciliation table showing old value, new value and variance for important KPIs.</p>`
    },
    Q151: {
      title:'Stakeholder needs a dashboard by tomorrow',
      html:`<p>Start by clarifying the <b>business decision</b> the dashboard must support.</p><p>Agree on the minimum required KPIs, definitions, filters and data source. Deliver a small validated version first rather than trying to build every possible chart.</p><p>Document assumptions and known limitations, then add lower-priority features after the core dashboard is trusted.</p><p><b>Interview answer:</b> "I would prioritize the decision-critical metrics, validate the numbers early, and communicate what is included in the first version."</p>`
    },
    Q152: {
      title:'Explaining a complex SQL result to a non-technical client',
      html:`<p>Start with the <b>business question</b>, not the SQL syntax.</p><p>Explain the result in plain language: what happened, by how much, which segment drove it, and why it matters.</p><p>Use one simple example or chart if needed. Only explain joins, CTEs or window functions if the client specifically wants to understand the technical method.</p><p><b>Example:</b> Instead of saying "I used a window function with LAG," say "Sales were 12% lower than the previous week, mainly because the Electronics category declined."</p>`
    },
    Q153: {
      title:'Validating an important business KPI',
      html:`<p>Before presenting a KPI, validate both the <b>data</b> and the <b>business definition</b>.</p><ol><li>Check source freshness and completeness.</li><li>Check duplicates and nulls.</li><li>Validate joins and filters.</li><li>Check date and time-zone logic.</li><li>Reconcile totals with a trusted source.</li><li>Manually verify a few records.</li></ol><p>Also document the formula, numerator, denominator, exclusions and reporting period so another analyst can reproduce it.</p>`
    },
    Q154: {
      title:'Two teams report different numbers for the same KPI',
      html:`<p>First compare the <b>definition</b> of the KPI. Teams often use different filters or denominators even when they use the same name.</p><p>Compare source systems, date ranges, time zones, status filters, joins, exclusions, currency conversion and aggregation grain.</p><p>Build a small reconciliation query that calculates both definitions side by side. Once the business definition is agreed, document one standard KPI definition for future reporting.</p>`
    },
    Q155: {
      title:'Handling missing values, outliers and inconsistent dates',
      html:`<p>Start with <b>data profiling</b> rather than immediately deleting records.</p><p>For missing values, quantify the missingness and decide whether to impute, leave NULL, use a default category or exclude the record based on the business meaning.</p><p>For outliers, investigate whether they are genuine business events, data-entry errors or system issues. Use a documented rule such as IQR or z-score when appropriate.</p><p>For inconsistent dates, standardize the format and time zone, validate impossible dates, and preserve the original value when auditability matters.</p><p><b>Final step:</b> validate the cleaned dataset against row counts, totals and business rules before analysis.</p>`
    }
  };

  function applyDetails(){
    const title=document.getElementById('title');
    if(!title)return;
    const m=title.textContent.match(/Q(\d{3})/);
    if(!m)return;
    const key='Q'+m[1], item=details[key];
    if(!item)return;
    const answer=document.querySelector('#page .answer');
    if(!answer || answer.dataset.detailed==='1')return;
    answer.innerHTML=item.html;
    answer.dataset.detailed='1';
  }

  const observer=new MutationObserver(()=>applyDetails());
  observer.observe(document.getElementById('page')||document.body,{childList:true,subtree:true});
  setTimeout(applyDetails,50);
})();