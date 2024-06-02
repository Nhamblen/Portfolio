-- Noah Hamblen
-- 10/29/22
-- INFO 2635
USE my_guitar_shop;

DROP PROCEDURE IF EXISTS test;

-- test if the rows were inserted
SELECT * FROM orders;
SELECT * FROM order_items;

-- Assignment 10
-- Create the following procedure and submit your script as Assignment10.sql.

-- 1.	Write a script that creates and calls a stored procedure named test. This procedure should include these statements coded as a transaction:
-- INSERT INTO orders VALUES
-- (DEFAULT, 3, NOW(), '10.00', '0.00', NULL, 4, 
-- 'American Express', '378282246310005', '04/2016', 4);

-- SELECT LAST_INSERT_ID()
-- INTO order_id;

-- INSERT INTO order_items VALUES
-- (DEFAULT, order_id, 6, '415.00', '161.85', 1);

-- INSERT INTO order_items VALUES
-- (DEFAULT, order_id, 1, '699.00', '209.70', 1);
-- Here, the LAST_INSERT_ID function is used to get the order ID value that’s automatically generated when the first INSERT statement inserts an order.
-- If these statements execute successfully, commit the changes. Otherwise, roll back the changes.   Run SELECT * queries to determine if the records were insterted in the orders table and order_items table.
DELIMITER //
CREATE PROCEDURE test()
BEGIN

DECLARE order_id TINYINT;
DECLARE message VARCHAR(255);
DECLARE is_error TINYINT DEFAULT FALSE;
DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
SET is_error = TRUE;

START TRANSACTION;

INSERT INTO orders
VALUES (DEFAULT, 3, NOW(), '10.00', '0.00', NULL, 4, 'American Express', '378282246310005', '04/2016', 4);

SELECT LAST_INSERT_ID() INTO order_id;

INSERT INTO order_items 
VALUES (DEFAULT, order_id, 6, '415.00', '161.85', 1);

INSERT INTO order_items 
VALUES (DEFAULT, order_id, 1, '699.00', '209.70', 1);

IF is_error = FALSE THEN
COMMIT;
SET message = 'Transaction was committed.';
ELSE
ROLLBACK;
SET message = 'Transaction was not committed. Rolling back.';
END IF;

SET message = CONCAT(message, ' order_id:', order_id);
SELECT message;

END //
DELIMITER ;

CALL test();