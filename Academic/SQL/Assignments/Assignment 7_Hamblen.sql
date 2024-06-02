-- Noah Hamblen
-- 10/15/22
-- INFO 2635
USE my_guitar_shop;

-- Using MySQL, answer the questions below by creating the appropriate queries.  Save all the queries in one file and name it Assignment8.sql.  


-- 1. Write a SELECT statement that returns these columns from the Products table:
-- The list_price column
-- The discount_percent column
-- A column named discount_amount that uses the previous two columns to calculate the discount amount and uses the ROUND function to round the result so it has 2 decimal digits
SELECT list_price, discount_percent, ROUND(discount_percent / 100 * list_price, 2) AS discount_amount FROM Products;

-- 2. Write a SELECT statement that returns these columns from the Orders table:
-- The order_date column
-- A column that uses the DATE_FORMAT function to return the four-digit year that’s stored in the order_date column
-- A column that uses the DATE_FORMAT function to return the order_date column in this format: Mon-DD-YYYY. In other words, use abbreviated months and separate each date component with dashes.
-- A column that uses the DATE_FORMAT function to return the order_date column with only the hours and minutes on a 12-hour clock with an am/pm indicator
-- A column that uses the DATE_FORMAT function to return the order_date column in this format: MM/DD/YY HH:SS. In other words, use two-digit months, days, and years and separate them by slashes. Use 2-digit hours and minutes on a 24-hour clock. And use leading zeros for all date/time components.
SELECT order_date, DATE_FORMAT(order_date, "%Y") AS year, DATE_FORMAT(order_date, "%b-%d-%Y") AS format1, DATE_FORMAT(order_date, "%h:%i %p") AS format2, DATE_FORMAT(order_date, "%m/%d/%y %H:%I") AS format3 FROM Orders;

-- 3. Write a SELECT statement that returns these columns from the Orders table:
-- The order_id column
-- The order_date column
-- A column named approx_ship_date that’s calculated by adding 2 days to the order_date column
-- The ship_date column if it doesn’t contain a null value
-- A column named days_to_ship that shows the number of days between the order date and the ship date.
SELECT order_id, order_date, DATE_ADD(order_date, INTERVAL 2 DAY) AS approx_ship_date, ship_date, DATEDIFF(ship_date, order_date) AS days_to_ship FROM Orders WHERE ship_date IS NOT NULL;

-- 4. Write a SELECT statement that uses the ranking functions to rank products by the total quantity sold. Return these columns:
-- The product_name column from the Products table
-- A column named total_quantity that shows the sum of the quantity for each product in the Order_Items table
-- A column named rank that uses the RANK function to rank the total quantity in descending sequence
-- A column named dense_rank that uses the DENSE_RANK function to rank the total quantity in descending sequence
SELECT P.product_name, SUM(quantity) AS total_quantity, RANK() OVER (ORDER BY SUM(quantity) DESC) AS "rank", DENSE_RANK() OVER (ORDER BY SUM(quantity) DESC) AS "dense_rank" FROM Products AS P
INNER JOIN Order_Items AS OI ON OI.product_id = P.product_id
GROUP BY P.product_id;

-- 5. Write a SELECT statement that uses the analytic functions to get the highest and lowest sales by product within each category. Return these columns:
-- The category_name column from the Categories table
-- The product_name column from the Products table
-- A column named total_sales that shows the sum of the sales for each product with sales in the Order_Items table
-- A column named highest_sales that uses the FIRST_VALUE function to show the name of the product with the highest sales within each category
-- A column named lowest_sales that uses the LAST_VALUE function to show the name of the product with the lowest sales within each category.
SELECT DISTINCT C.category_name, P.product_name, SUM(OI.item_price * OI.quantity) AS total_sales, FIRST_VALUE (OI.item_price) OVER (ORDER BY OI.item_price) AS highest_sales, LAST_VALUE (OI.item_price) OVER (ORDER BY OI.item_price) AS lowest_sales FROM Order_Items AS OI
INNER JOIN Products AS P ON P.product_id = OI.product_id
INNER JOIN Categories AS C ON C.category_id = P.category_id
GROUP BY OI.product_id;

-- 6. Create a view named customer_addresses that shows the shipping and billing addresses for each customer.
-- This view should return these columns from the Customers table: customer_id, email_address, last_name and first_name.
-- This view should return these columns from the Addresses table: bill_line1, bill_line2, bill_city, bill_state, bill_zip, ship_line1, ship_line2, ship_city, ship_state, and ship_zip.
CREATE VIEW customer_addresses AS
SELECT C.customer_id, C.email_address, C.last_name, C.first_name FROM Customers AS C
UNION SELECT A.bill_line1, A.bill_line2, A.bill_city, A.bill_state, A.bill_zip, A.ship_line1, A.ship_line2, A.ship_city, A.ship_state, A.ship_zip FROM Addresses AS A;

-- 7. Write a SELECT statement that returns these columns from the customer_addresses view that you created in exercise 6: customer_id, last_name, first_name, bill_line1. The rows in the result should be sorted by the last_name and then first_name columns.
SELECT C.customer_id, C.last_name, C.first_name, A.bill_line1 FROM customer_addresses AS A
ORDER BY C.last_name, C.first_name;

-- 8. Write an UPDATE statement that updates the Customers table using the customer_addresses view you created in exercise 6. Set the first line of the shipping address to “1990 Westwood Blvd.” for the customer with an ID of 8.
UPDATE customer_addresses 
SET ship_line = '1990 Westwood Blvd.'
WHERE customer_id = 8;

-- 9. Create a view named order_item_products that returns columns from the Orders, Order_Items, and Products tables.
-- This view should return these columns from the Orders table: order_id, order_date, tax_amount, and ship_date.
-- This view should return the product_name column from the Products table.
-- This view should return these columns from the Order_Items table: item_price, discount_amount, final_price (the discount amount subtracted from the item price), quantity, and item_total (the calculated total for the item).
CREATE VIEW order_item_products AS
SELECT O.order_id, O.order_date, O.tax_amount, O.ship_date, P.product_name, OI.item_price, OI.discount_amount, (OI.item_price - OI.discount_amount) AS final_price, OI.quantity, (OI.item_price - OI.discount_amount * OI.quantity) AS item_total FROM Orders AS O 
INNER JOIN Order_Items AS OI ON OI.order_id = O.order_id
INNER JOIN Products AS P ON P.product_id = OI.product_id;

-- 10. Create a view named product_summary that uses the view you created in exercise 9. This view should return summary information about each product.
-- Each row should include product_name, order_count (the number of times the product has been ordered) and order_total (the total sales for the product).
CREATE VIEW product_summary AS
SELECT product_name, SUM(quantity) AS order_count, SUM(final_price * quantity) AS order_total FROM order_item_products
GROUP BY product_name;

-- 11. Write a SELECT statement that uses the view that you created in exercise 10 to get total sales for the five best selling products. Sort the result set by the order_total column in descending sequence.
SELECT product_name, order_total AS best_selling FROM product_summary
GROUP BY product_name
ORDER BY order_total DESC
LIMIT 5;
