-- Noah Hamblen
-- 11/11/22
-- INFO 2635
USE my_guitar_shop;

-- Assignment 13
-- In this assignment, you will create two users and a role. You will grant privileges directly to the first user, but you will grant privileges to the second user by granting privileges to the role and then assigning the user to that role. In addition, you will use MySQL Workbench to connect as the two users, check the privileges for the first user, and check the active roles for the second user.
-- Save the scripts as Assignment13.sql
-- Use MySQL Workbench to connect as the root user.

-- 1. Write and execute a script that creates a user with a username and password of your choosing. This user should be able to connect to MySQL from any computer.
CREATE USER IF NOT EXISTS admin1 IDENTIFIED BY 'password';

-- 2. This user should have SELECT, INSERT, UPDATE, and DELETE privileges for the Customers, Addresses, Orders, and Order_Items tables of the My Guitar Shop database. However, this user should only have SELECT privileges for the Products and Categories tables. Also, this user should not have the right to grant privileges to other users.
GRANT SELECT, INSERT, UPDATE, DELETE
ON my_guitar_shop.Customers
TO admin1;

GRANT SELECT, INSERT, UPDATE, DELETE
ON my_guitar_shop.Addresses
TO admin1;

GRANT SELECT, INSERT, UPDATE, DELETE
ON my_guitar_shop.Orders
TO admin1;

GRANT SELECT, INSERT, UPDATE, DELETE
ON my_guitar_shop.Order_items
TO admin1;

GRANT SELECT
ON my_guitar_shop.Products
TO admin1;

GRANT SELECT
ON my_guitar_shop.Categories
TO admin1;

REVOKE GRANT OPTION 
ON *.* FROM admin1;

-- 3. Check the privileges for the user by using the SHOW GRANTS statement.
SHOW GRANTS FOR admin1;

-- 4. Write and execute a script that revokes the DELETE privilege on the Orders and Order_Items tables from this user.
REVOKE DELETE
ON my_guitar_shop.Orders 
FROM admin1;

REVOKE DELETE
ON my_guitar_shop.Order_Items
FROM admin1;

-- 5. Check the privileges for the user by using the SHOW GRANTS statement.
SHOW GRANTS FOR admin1;
