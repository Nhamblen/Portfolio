USE my_guitar_shop;
-- 1. Write a SELECT statement that joins the Categories table to the Products table and returns these
-- columns: category_name, product_name, list_price.
-- Sort the result set by the category_name column and then by the product_name column in ascending
-- sequence.
SELECT Categories.category_name, product_name, list_price FROM Products
INNER JOIN Categories ON Categories.category_id = Products.category_id
ORDER BY category_name ASC, product_name ASC;

-- 2. Write a SELECT statement that joins the Customers table to the Addresses table and returns these
-- columns: first_name, last_name, line1, city, state, zip_code
SELECT first_name, last_name, Addresses.line1, Addresses.city, Addresses.state, Addresses.zip_code FROM Customers
INNER JOIN Addresses ON Addresses.customer_id = Customers.customer_id;

-- 3. Write a SELECT statement that joins the Customers, Orders, Order_Items, and Products tables. This
-- statement should return these columns: last_name, first_name, order_date, product_name, item_price,
-- discount_amount, and quantity.
-- Use aliases for the tables.
-- Sort the final result set by the last_name, order_date, and product_name columns.
SELECT last_name, first_name, O.order_date, P.product_name, OI.item_price, OI.discount_amount, OI.quantity FROM Customers AS C
INNER JOIN Orders AS O ON O.customer_id = C.customer_id
INNER JOIN Order_Items AS OI ON OI.order_id = O.order_id
INNER JOIN Products AS P ON P.product_id = OI.product_id
ORDER BY last_name, order_date, product_name;

-- 4. Write a SELECT statement that returns these two columns:
-- category_name The category_name column from the Categories table
-- product_id The product_id column from the Products table
-- Return one row for each category that has never been used. Hint: Use an outer join and only return
-- rows where the product_id column contains a null value.
SELECT category_name, Products.product_id FROM Categories
FULL OUTER JOIN Products ON Categories.category_id = Products.category_id WHERE product_id IS NULL;

-- 5. Use the UNION operator to generate a result set consisting of three columns from the Orders table:
-- ship_status	
-- A calculated column that contains a value of SHIPPED or NOT SHIPPED 
-- order_id	 The order_id column
-- order_date	The order_date column
-- If the order has a value in the ship_date column, the ship_status column should contain a value of
-- SHIPPED. Otherwise, it should contain a value of NOT SHIPPED.
-- Sort the final result set by the order_date column.
ALTER TABLE Orders ADD ship_status VARCHAR(255); 
UPDATE Orders SET ship_status = ('NOT SHIPPED') WHERE ship_date IS NULL;
UPDATE Orders SET ship_status = ('SHIPPED') WHERE ship_date IS NOT NULL;
SELECT ship_status, order_id, order_date FROM Orders
ORDER BY order_date;
