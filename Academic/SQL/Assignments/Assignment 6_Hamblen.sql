-- Noah Hamblen
-- 10/10/22
-- INFO 2635
USE my_guitar_shop;

-- Assignment 7
-- Create and run queries for the questions below.  Save the queries in one file and name it Assignment7.sql.

-- 1.	Write a SELECT statement that returns the same result set as this SELECT statement, but don’t use a join. Instead, use a subquery in a WHERE clause that uses the IN keyword.
--  SELECT DISTINCT category_name
--  FROM categories c JOIN products p
--  ON c.category_id = p.category_id
--  ORDER BY category_name
SELECT DISTINCT C.category_name FROM Categories AS C
WHERE C.category_id IN (SELECT Products.category_id FROM Products)
ORDER BY category_name;

-- 2.	Write a SELECT statement that answers this question: Which products have a list price that’s greater than the average list price for all products?
-- 	Return the product_name and list_price columns for each product.
-- 	Sort the result set by the list_price column in descending sequence.
SELECT * FROM Products
WHERE list_price > (SELECT AVG(list_price) FROM Products)
ORDER BY list_price DESC;

-- 3.	Write a SELECT statement that returns the category_name column from the Categories table.
-- 	Return one row for each category that has never been assigned to any product in the Products table. 
--  To do that, use a subquery introduced with the NOT EXISTS operator.
SELECT category_name FROM Categories AS C
WHERE NOT EXISTS (SELECT * FROM Products AS P WHERE P.category_id = C.category_id);

-- 4.	 Write a SELECT statement that returns three columns: email_address, order_id, and the order total for each customer. 
--  To do this, you can group the result set by the email_address and order_id columns. 
--  In addition, you must calculate the order total from the columns in the Order_Items table.
--  NOTE:  You do can use a GROUP BY and do not need to use a subquery for this query.	
SELECT C.email_address, OI.order_id, SUM(OI.item_price * OI.quantity) AS order_total FROM Order_Items AS OI
INNER JOIN Orders AS O ON O.order_id = OI.order_id
INNER JOIN Customers AS C ON C.customer_id = O.customer_id
GROUP BY C.email_address, O.order_id;

-- 5.	Use a correlated subquery to return one row per customer, representing the customer’s oldest order (the one with the earliest date). 
-- 	Each row should include these three columns: email_address, order_id, and order_date..  
-- 	Sort the result set by the order_date and order_id columns.
SELECT C.email_address, O.order_id, MIN(O.order_date) FROM Orders AS O
INNER JOIN Customers AS C ON C.customer_id = O.customer_id
WHERE C.email_address IN (SELECT DISTINCT C.email_address FROM Customers)
GROUP BY C.email_address
ORDER BY MIN(O.order_date), O.order_id;

-- 6.	Write a SELECT statement that returns these columns from the Products table:
-- 	The list_price column
-- 	A column that uses the FORMAT function to return the list_price column with 1 digit to the right of the decimal point
-- 	A column that uses the CONVERT function to return the list_price column as an integer
-- 	A column that uses the CAST function to return the list_price column as an integer
SELECT P.list_price, FORMAT(P.list_price, 1), CONVERT(P.list_price, UNSIGNED INT), CAST(P.list_price AS UNSIGNED INT) FROM Products AS P;

-- 7.	Write a SELECT statement that returns these columns from the Products table:
-- 	The date_added column
-- 	A column that uses the CAST function to return the date_added column with its date only (year, month, and day)
-- 	A column that uses the CAST function to return the date_added column with just the year and the month
-- 	A column that uses the CAST function to return the date_added column with its full time only (hour, minutes, and seconds)
SELECT P.date_added, CAST(P.date_added AS DATE), CAST(P.date_added AS CHAR(7)), CAST(P.date_added AS TIME) FROM Products AS P;
