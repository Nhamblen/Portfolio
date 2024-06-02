-- Noah Hamblen
-- 9/28/22
-- INFO 2635
USE my_guitar_shop;

-- 1. Write a SELECT statement that returns these columns:
-- The count of the number of orders in the Orders table
-- The sum of the tax amount columns in the Orders table
SELECT COUNT(order_id) AS 'Number of orders', SUM(tax_amount) AS 'Sum of the taxes' FROM Orders;

-- 2. Write a SELECT statement that returns one row for each category that has products with these columns:
-- The category_name column from the Categories table
-- The count of the products in the Products table
-- The list price of the most expensive product in the Products table
-- Sort the result set so the category with the most products appears first.
SELECT C.category_name, COUNT(P.product_id), MAX(P.list_price) FROM Products AS P
INNER JOIN Categories AS C ON P.category_id = C.category_id
GROUP BY P.category_id
ORDER BY P.category_id ASC;

-- 3. Write a SELECT statement that returns one row for each customer that has orders with these columns:
-- The email address column from the Customers table
-- The sum of the item price in the Order_Items table multiplied by the quantity in the Order_Items table
-- The sum of the discount amount column in the Order_Items table multiplied by the quantity in the Order_Items table
-- Sort the result set in descending sequence by the item price total for each customer.
SELECT C.email_address, SUM(OI.item_price * OI.quantity) AS "Total", SUM(OI.discount_amount * OI.quantity) AS "Discount" FROM Order_Items AS OI
INNER JOIN Orders AS O ON O.order_id = OI.order_id 
INNER JOIN Customers AS C ON C.customer_id = O.customer_id
GROUP BY C.customer_id
ORDER BY Total DESC;

-- 4. Write a SELECT statement that returns one row for each customer that has orders with these columns:
-- The email_address column from the Customers table
-- A count of the number of orders
-- The total amount for each order (Hint: First, subtract the discount amount from the price. Then, multiply by the quantity.)
-- Return only those rows where the customer has more than 1 order.
-- Sort the result set in descending sequence by the sum of the line item amounts.
SELECT C.email_address, COUNT(O.order_id) AS "NumberOrders", SUM(OI.item_price - OI.discount_amount * OI.quantity) AS "TotalAmount" FROM Customers AS C
INNER JOIN Orders AS O ON O.customer_id = C.customer_id
INNER JOIN Order_Items AS OI ON O.order_id = OI.order_id
GROUP BY C.customer_id
ORDER BY TotalAmount DESC;

-- 5. Modify the solution to exercise 4 so it only counts and totals line items that have an item_price value that’s greater than 400.
SELECT C.email_address, COUNT(O.order_id) AS "NumberOrders", SUM(OI.item_price - OI.discount_amount * OI.quantity) AS "TotalAmount" FROM Customers AS C
INNER JOIN Orders AS O ON O.customer_id = C.customer_id
INNER JOIN Order_Items AS OI ON O.order_id = OI.order_id WHERE item_price > 400
GROUP BY C.customer_id
ORDER BY TotalAmount DESC;

-- 6. Write a SELECT statement that answers this question: What is the total amount ordered for each product? Return these columns:
-- The product_name column from the Products table
-- The total amount for each product in the Order_Items table (Hint: You can calculate the total amount by subtracting the discount amount from the item price and then multiplying it by the quantity)
-- Use the WITH ROLLUP operator to include a row that gives the grand total.
-- Note: Once you add the WITH ROLLUP operator, you may need to use MySQL Workbench’s Execute SQL Script button instead of its Execute Current Statement button to execute this statement.
SELECT P.product_name, SUM(OI.item_price - OI.discount_amount * OI.quantity) AS "Total_Amount", SUM(OI.product_id) AS "Amount_Ordered" FROM Products AS P
INNER JOIN Order_Items AS OI ON OI.product_id = P.product_id
GROUP BY OI.product_id WITH ROLLUP;

-- 7. Write a SELECT statement that answers this question: Which customers have ordered more than one product? Return these columns:
-- The email_address column from the Customers table
-- The count of distinct products from the customer’s orders
-- Sort the result set in ascending sequence by the email_address column.
SELECT C.email_address, SUM(OI.quantity) AS "Amount_Ordered" FROM Customers AS C
INNER JOIN Orders AS O ON O.customer_id = C.customer_id
INNER JOIN Order_Items AS OI ON O.order_id = OI.order_id
GROUP BY C.email_address
ORDER BY C.email_address ASC;

-- 8. Write a SELECT statement that answers this question: What is the total quantity purchased for each product within each category? Return these columns:
-- The category_name column from the category table
-- The product_name column from the products table
-- The total quantity purchased for each product with orders in the Order_Items table
-- Use the WITH ROLLUP operator to include rows that give a summary for each category name as well as a row that gives the grand total.
-- Use the IF and GROUPING functions to replace null values in the category_name and product_name columns with literal values if they’re for summary rows.
SELECT IF (GROUPING(C.category_name) = 1, 'Category', C.category_name) AS 'Category Name', 
IF (GROUPING(P.product_name) = 1, 'Product', P.product_name) AS 'Product Name', 
IF (GROUPING (OI.quantity) = 1, 'Quantity', OI.quantity)AS 'Total Quantity',
SUM(OI.quantity) AS 'Grand Total'
FROM Categories AS C
INNER JOIN Products AS P ON P.category_id = C.category_id
INNER JOIN Order_Items AS OI ON OI.product_id = P.product_id
GROUP BY C.category_name, P.product_name, OI.quantity WITH ROLLUP;
