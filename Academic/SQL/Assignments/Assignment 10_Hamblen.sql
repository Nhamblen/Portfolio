-- Noah Hamblen
-- 11/1/22
-- INFO 2635
USE my_guitar_shop;

-- 1. Write a script that creates and calls a stored procedure named insert_category. First, code a statement that creates a procedure that adds a new row to the Categories table. To do that, this procedure should have one parameter for the category name.
-- Code at least two CALL statements that test this procedure. (Note that this table doesn’t allow duplicate category names.)
DROP PROCEDURE IF EXISTS insert_category;
DELIMITER //
CREATE PROCEDURE insert_category
(
category_id_var INT, 
category_name_var VARCHAR(20)
)
BEGIN

DECLARE message VARCHAR(255);
DECLARE message2 VARCHAR(255);
DECLARE message3 VARCHAR(255);
DECLARE is_error TINYINT DEFAULT FALSE;
DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
SET is_error = TRUE;

START TRANSACTION;

UPDATE categories
SET category_id = category_id_var
WHERE category_name = category_name_var;

INSERT INTO categories
VALUES (category_id, category_name_var);

IF is_error = FALSE THEN
COMMIT;
SET message = 'Transaction was committed.';
ELSE
ROLLBACK;
SET message = 'Transaction was not committed. Rolling back.';
END IF;

SET message2 = (category_id_var);
SET message3 = (category_name_var);
SELECT message, message2 AS category_id, message3 AS category_name;

END //
DELIMITER ;

-- this test will pass
CALL insert_category(5, "Pianos");
-- this test will fail
CALL insert_category(6, "Drums");

-- 2. Write a script that creates and calls a stored function named discount_price that calculates the discount price of an item in the Order_Items table (discount amount subtracted from item price). To do that, this function should accept one parameter for the item ID, and it should return the value of the discount price for that item.
DROP FUNCTION IF EXISTS discount_price;
DELIMITER //
CREATE FUNCTION discount_price(
item_id_var FLOAT
)
RETURNS FLOAT
DETERMINISTIC READS SQL DATA
BEGIN

DECLARE discount_price_var FLOAT;

SELECT (o.item_price - o.discount_amount)
INTO discount_price_var FROM order_items o
WHERE item_id = item_id_var;
RETURN discount_price_var;

END //
DELIMITER ;

-- this test will pass
SELECT DISCOUNT_PRICE(item_id) AS discount_price FROM order_items WHERE item_id = 3;

-- 3. Write a script that creates and calls a stored function named item_total that calculates the total amount of an item in the Order_Items table (discount price multiplied by quantity). To do that, this function should accept one parameter for the item ID, it should use the discount_price function that you created in exercise 2, and it should return the value of the total for that item.
DROP FUNCTION IF EXISTS item_total;
DELIMITER //
CREATE FUNCTION item_total(
item_id_var FLOAT
)
RETURNS FLOAT
DETERMINISTIC READS SQL DATA
BEGIN

DECLARE item_price_var FLOAT;

SELECT discount_price(item_id) * o.quantity
INTO item_price_var FROM order_items o
WHERE item_id = item_id_var;
RETURN item_price_var;

END //
DELIMITER ;

-- this test will pass
SELECT item_id, discount_price(item_id) AS discount_price, item_total(item_id) AS item_total FROM order_items WHERE item_id = 5;

-- 4. Create a trigger named products_before_update that checks the new value for the discount_percent column of the Products table. This trigger should raise an appropriate error if the discount percent is greater than 100 or less than 0.
-- If the new discount percent is between 0 and 1, this trigger should modify the new discount percent by multiplying it by 100. That way, a discount percent of .2 becomes 20.
-- Test this trigger with an appropriate UPDATE statement.
DROP TRIGGER IF EXISTS products_before_update;
DELIMITER //
CREATE TRIGGER products_before_update
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN

IF NEW.discount_percent > 100 THEN
SIGNAL SQLSTATE 'HY000'
SET MESSAGE_TEXT = 'the discount percent cannot be greater than 100';

ELSEIF NEW.discount_percent < 0 THEN
SIGNAL SQLSTATE 'HY000'
set message_text = 'the discount percent cannot be less than 0';

ELSEIF NEW.discount_percent < 1 THEN
SET NEW.discount_percent = (NEW.discount_percent * 100);
END IF;

END //
DELIMITER ;

-- this test will pass
UPDATE Products
SET discount_percent = .5
WHERE product_id = 3;

-- this test will fail
UPDATE Products
SET discount_percent = -50
WHERE product_id = 3;

-- this test will fail
UPDATE Products
SET discount_percent = 120
WHERE product_id = 3;

-- 5. Create a table named Products_Audit. This table should have all columns of the Products table, except the description column. Also, it should have an audit_id column for its primary key, and the date_added column should be changed to date_updated.
CREATE TABLE products_audit(
audit_id           INT            PRIMARY KEY   AUTO_INCREMENT,
product_id         INT            NOT NULL,
category_id        INT            NOT NULL,
product_code       VARCHAR(10)    NOT NULL      UNIQUE,
product_name       VARCHAR(255)   NOT NULL,
list_price         DECIMAL(10,2)  NOT NULL,
discount_percent   DECIMAL(10,2)  NOT NULL      DEFAULT 0.00,
date_updated       DATETIME                     DEFAULT NULL,
FOREIGN KEY (category_id)
REFERENCES categories (category_id));

-- 6. Create a trigger named products_after_update. This trigger should insert the old data about the product into the Products_Audit table after the row is updated. Then, test this trigger with an appropriate UPDATE statement.
DROP TRIGGER IF EXISTS products_after_update;
DELIMITER //
CREATE TRIGGER products_after_update
BEFORE UPDATE ON products
FOR EACH ROW
BEGIN

INSERT INTO products_audit (product_id, category_id, product_code, product_name, list_price, discount_percent, date_updated)
VALUES (OLD.product_id, OLD.category_id, OLD.product_code, OLD.product_name, OLD.list_price, OLD.discount_percent, OLD.date_added);

END //
DELIMITER ;

UPDATE products
SET product_name = 'Nice Bike'
WHERE product_id = 1;

SELECT * FROM products_audit

-- 7. Check whether the event scheduler is turned on. If it isn’t, code a statement that turns it on.
SHOW VARIABLES LIKE 'event_scheduler';

-- 8. Create an event that deletes any rows in the Products_Audit table that are older than 1 week. (You created the Products_Audit table in exercise 3.) MySQL should run this event every day. To make sure that this event has been created, code a SHOW EVENTS statement that views this event.
-- Once you’re sure this event is working correctly, code a DROP EVENT statement that drops the event.

DROP EVENT IF EXISTS clear_olderthan_1week
DELIMITER //
CREATE EVENT clear_olderthan_1week
ON SCHEDULE EVERY 1 DAY
STARTS NOW() + INTERVAL 1 DAY
DO BEGIN

DELETE FROM products_audit
WHERE date_updated < NOW() - INTERVAL 1 WEEK;

END //
DELIMITER ;

SHOW EVENTS;
