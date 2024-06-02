-- Noah Hamblen
-- 10/21/22
-- INFO 2635
USE my_guitar_shop;

-- Download the attached document and follow the directions.  Submit Assignment 7 Assignment 1 here.
-- Complete the scripts (queries) below and save them in one file and name it Assignment9.sql
-- Each of the scripts that you create in the following exercises should use the same general structure as the script presented in figure 13-1 in the book.

-- 1. Write a script that creates and calls a stored procedure named test. This stored procedure should declare a variable and set it to the count of all products in the Products table. If the 
-- count is greater than or equal to 7, the stored procedure should display a message that says, “The number of products is greater than or equal to 7”. Otherwise, it should say, “The number of products is less than 7”
DELIMITER //
CREATE PROCEDURE test_1()
BEGIN

-- declares
DECLARE count_products INT;

-- statement
SELECT COUNT(product_id) INTO count_products FROM Products;

-- if else string message
IF count_products >= 7 THEN
SELECT ("The number of products is greater than or equal to 7") AS count_products;
ELSE
SELECT ("The number of products is less than 7") AS count_products;
END IF;

END//
DELIMITER ;

CALL test_1();

-- 2. Write a script that creates and calls a stored procedure named test. 
-- This stored procedure should use two variables to store (1) the count of all of the products in the Products table and (2) the average list price for those products.
-- If the product count is greater than or equal to 7, the stored procedure should display a result set that displays the values of both variables. Otherwise, the procedure should display a result set that displays a message that says, “The number of products is less than 7”.
DELIMITER //
CREATE PROCEDURE test_2()
BEGIN

-- declares
DECLARE count_products INT;
DECLARE average_list_price DOUBLE;


-- statement
SELECT COUNT(product_id) INTO count_products FROM Products;
SELECT AVG(list_price) INTO average_list_price FROM Products;

-- if else string message
IF count_products >= 7 THEN
SELECT (count_products) AS count_products , (average_list_price) AS average_list_price;
ELSE
SELECT ("The number of products is less than 7") AS count_products;
END IF;

END//
DELIMITER ;

CALL test_2();

-- 3. Write a script that creates and calls a stored procedure named test. This procedure should calculate the common factors of the numbers 10 and 20. 
-- To find a common factor, you can use the modulo operator (%) to check whether a number that’s less than 10 can be evenly divided into both numbers. 
-- Then, this procedure should display a string that includes the common factors like this: Common factors of 10 and 20: 1 2 5
DELIMITER //
CREATE PROCEDURE test_3()
BEGIN

-- declares
DECLARE num10 INT;
DECLARE num20 INT;
DECLARE count INT;
DECLARE result VARCHAR(255);

SET num10 = 10;
SET num20 = 20;
SET result = "Common factors of 10 and 20: ";
SET count = 1;

-- statement
WHILE (count <= num10 / 2) DO
IF (num10 % count = 0 AND num20 % count = 0) THEN
SET result = CONCAT(result, count, " ");
END IF;
SET count = count + 1;
END WHILE;

SELECT result AS common_factor;

END//
DELIMITER ;

CALL test_3();

-- 4. Write a script that creates and calls a stored procedure named test. 
-- This stored procedure should create a cursor for a result set that consists of the product_name and list_price columns for each product with a list price that’s greater than $700. 
-- The rows in this result set should be sorted in descending sequence by list price. Then, the procedure should display a string variable that includes the product_name and list price for each product so it looks something like this: "Gibson SG","2517.00"|"Gibson Les Paul","1199.00"|
-- Here, each value is enclosed in double quotes ("), each column is separated by a comma (,) and each row is separated by a pipe character (|).
DELIMITER //
CREATE PROCEDURE test_4()
BEGIN

-- declares
DECLARE product_name_variable VARCHAR(50);
DECLARE list_price_variable DECIMAL(9,2);
DECLARE row_not_found TINYINT DEFAULT FALSE;
DECLARE var VARCHAR(255) DEFAULT"";

DECLARE product_cursor CURSOR FOR
SELECT product_name, list_price FROM Products WHERE list_price > 700
ORDER BY list_price DESC;

DECLARE CONTINUE HANDLER FOR NOT FOUND
SET row_not_found = TRUE;

OPEN product_cursor;

FETCH  product_cursor INTO product_name_variable, list_price_variable;
WHILE row_not_found = FALSE DO
SET var = CONCAT(var, '"', product_name_variable, '","', list_price_variable, '"|');
FETCH product_cursor INTO product_name_variable, list_price_variable;
END WHILE;

SELECT var AS MESSAGE;

END//
DELIMITER ;

CALL test_4();

-- 5. Write a script that creates and calls a stored procedure named test. This procedure should attempt to insert a new category named “Guitars” into the Categories table. 
-- If the insert is successful, the procedure should display this message: 1 row was inserted.
-- If the update is unsuccessful, the procedure should display this message: Row was not inserted - duplicate entry.
DELIMITER //
CREATE PROCEDURE test_5()
BEGIN

-- declares
DECLARE insert_duplicate TINYINT DEFAULT FALSE;

DECLARE CONTINUE HANDLER FOR 1062
SET insert_duplicate = TRUE;

INSERT INTO categories (category_id, category_name)
VALUES (DEFAULT, "Guitars");

IF insert_duplicate = TRUE THEN
SELECT "Row was not inserted - duplicate entry." AS message;
ELSE
SELECT "1 row was inserted" AS message;
END IF;

END//
DELIMITER ;

CALL test_5;
