-- Noah Hamblen
-- 9/28/22
-- INFO 2635
USE my_guitar_shop;

-- Create the queries for questions 1 -7.   Save the file as Assignment5.sql.
-- Number 8 restores the my_guitar_shop database.

-- 1. Write an INSERT statement that adds this row to the Categories table:
-- category_name:             Strings
-- Code the INSERT statement so MySQL automatically generates the category_id column.
INSERT INTO Categories (category_name)
VALUES ('Strings');

-- 2. Write an UPDATE statement that modifies the row you just added to the Categories table. This statement should change the product_name column to “Horns”, and it should use the category_id column to identify the row.
UPDATE Products SET product_name = 'Horns' WHERE category_id = 5;

-- 3. Write a DELETE statement that deletes the row you added to the Categories table in exercise 1. This statement should use the category_id column to identify the row.
DELETE FROM Categories WHERE category_id = 5;

-- 4. Write an INSERT statement that adds this row to the Products table:
-- product_id:                   The next automatically generated ID
-- category_id:                  4
-- product_code:               dgx_640
-- product_name:              Yamaha DGX 640 88-Key Digital Piano
-- description:                   Long description to come.
-- list_price:                     799.99
-- discount_percent:          0
-- date_added:                  Today’s date/time.
-- Use a column list for this statement.  Hint: INSERT INTO products ()
INSERT INTO Products (category_id, product_code, product_name, description, list_price, discount_percent, date_added)
VALUES ('4', 'dgx_640', 'Yamaha DGX 640 88-Key Digital Piano', 'Long description to come.', '799.99', '0', DATETIME);

-- 5. Write an UPDATE statement that modifies the product you added in exercise 4. This statement should change the discount_percent column from 0% to 35%.
UPDATE Products SET discount_percent = 35 WHERE category_id = 4;

-- 6. Write a DELETE statement that deletes the Keyboards category. When you execute this statement, it will produce an error since the category has related rows in the Products table. To fix that, precede the DELETE statement with another DELETE statement that deletes all products in this category. (Remember that to code two or more statements in a script, you must end each statement with a semicolon.)
DELETE FROM Categories WHERE category_id = 4;

-- 7. Write an UPDATE statement that modifies the Customers table. Change the password column to “reset” for every customer in the table. If you get an error due to safe-update mode, you can add a LIMIT clause to update the first 100 rows of the table. (This should update all rows in the table.)
UPDATE Customers SET password = DEFAULT;

-- Open the script named create_my_guitar_shop.sql that’s in the mgs_ex_starts directory. Then, run this script. That should restore the data that’s in the database