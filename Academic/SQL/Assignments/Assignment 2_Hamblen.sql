 USE my_guitar_shop;
-- 1. Write a SELECT statement that returns four columns from the Products table: product_code, product_name, list price, and discount_percent. Then, run this statement to make sure it works correctly.
SELECT product_code, product_name, list_price, discount_percent FROM Products;

-- 2. Add an ORDER BY clause to the above statement that sorts the result set by list price in descending sequence. Then, run this statement again to make sure it works correctly. This is a good way to build and test a statement, one clause at a time.
SELECT product_code, product_name, list_price, discount_percent FROM Products 
ORDER BY product_code, product_name, list_price, discount_percent DESC;

-- 3. Write a SELECT statement that returns these columns from the Products table:
-- product_name               The product_name column
-- list_price                      The list_price column
-- date_added                   The date_added column
-- Return only the rows with a list price that’s greater than 500 and less than 2000.
-- Sort the result set by the date_added column in descending sequence.
SELECT product_name, list_price, date_added FROM Products WHERE list_price BETWEEN 500 AND 2000
ORDER BY date_added DESC;
 

-- 4. Write a SELECT statement that returns these column names and data from the Products table:
-- product_name               The product_name column
-- list_price                      The list_price column
-- discount_percent           The discount_percent column
-- discount_amount           A column that’s calculated from the previous two columns
-- discount_price              A column that’s calculated from the previous three columns
-- Round the discount_amount and discount_price columns to 2 decimal places.
-- Sort the result set by the discount_price column in descending sequence.
-- Use the LIMIT clause so the result set contains only the first 5 rows.
SELECT product_name, list_price, discount_percent FROM Products
ORDER BY discount_price DESC
LIMIT 5;

SELECT product_name, list_price, discount_percent, discount_amount, discount_price FROM Products;
ROUND(list_price, discount_percent, 2) AS discount_amount, ROUND(list_price, discount_percent, discsount_amount, 2) AS discount_price
-- 5. Write a SELECT statement that returns these columns from the Orders table:
-- order_id                        The order_id column
-- order_date                    The order_date column
-- ship_date                      The ship_date column
-- Return only the rows where the ship_date column contains a null value.
 SELECT order_id, order_date, ship_date FROM Products WHERE ship_date IS NULL;
