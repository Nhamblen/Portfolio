CREATE DATABASE `grubhub`;

CREATE TABLE `Orders` (
  `Orders_number` INT,
  `Orders_timestamp` TIMESTAMP,
  `Orders_status` CHAR(255),
  PRIMARY KEY (`Orders_number`)
);

CREATE TABLE `Restaurant` (
  `Restaurant_number` INT,
  `Restaurant_name` CHAR(255),
  `Restaurant_address` CHAR(255),
  `Restaurant_phone` CHAR(255),
  `Restaurant_paymentid` INT,
  `Restaurant_cuisine` CHAR(255),
  `Orders_number` INT,
  PRIMARY KEY (`Restaurant_number`),
  FOREIGN KEY (`Orders_number`) REFERENCES `Orders`(`Orders_number`)
);

CREATE TABLE `Driver` (
  `Driver_number` INT,
  `Driver_status` CHAR(255),
  `Driver_phone` CHAR(255),
  `Driver_name` CHAR(255),
  `Driver_licenseplate` CHAR(255),
  `Driver_licensenumber` CHAR(255),
  `Driver_paymentid` INT,
  `Orders_number` INT,
  PRIMARY KEY (`Driver_number`),
  FOREIGN KEY (`Orders_number`) REFERENCES `Orders`(`Orders_number`)
);

CREATE TABLE `Customer` (
  `Customer_number` INT,
  `Customer_name` CHAR(255),
  `Customer_address` CHAR(255),
  `Customer_phone` CHAR(255),
  `Customer_paymentid` INT,
  `Orders_number` INT,
  PRIMARY KEY (`Customer_number`),
  FOREIGN KEY (`Orders_number`) REFERENCES `Orders`(`Orders_number`)
);


INSERT INTO `Orders` (`Orders_number`, `Orders_timestamp`, `Orders_status`)
VALUES
    ('1', timestamp '2020-09-30 06:44:00', 'out'),
    ('2', timestamp '2020-09-30 10:44:00', 'placed'),
    ('3', timestamp '2020-09-30 10:54:00', 'fulfilled'),
    ('4', timestamp '2020-09-30 10:46:00', 'placed'),
    ('5', timestamp '2020-09-30 11:44:00', 'cancelled');

INSERT INTO `Customer` (`Customer_number`, `Customer_name`, `Customer_address`, `Customer_phone`, `Customer_paymentid`)
VALUES
    ('1', 'April Ludgate', '123 S 55 Ave, Omaha, NE 68132', '402-553-4397', '23456'),
    ('2', 'April Ludgate', '123 S 55 Ave, Omaha, NE 68132', '402-553-4397', '23456'),
    ('3', 'Leslie Knope', '4387 Waffles Drive, Pawnee, IN, 46011', '234-432-5437', '98754'),
    ('4', 'Ron Swanson', '987 Bacon Avenue, Pawnee, IN 46011', '456-987-3265', '234789'),
    ('5', 'Andy Dwyer', '2468 The Pit, Pawnee, IN 46011', ' ', '12390');

INSERT INTO `Restaurant` (`Restaurant_number`, `Restaurant_name`, `Restaurant_address`, `Restaurant_phone`, `Restaurant_cuisine`, `Restaurant_paymentid`)
VALUES 
    ('1', 'Paunch Burger', '6872 Lard Lane, Pawnee, IN 46011', '678-893-1568', 'Fast food', '4826'),
    ('2', 'Paunch Burger', '6872 Lard Lane, Pawnee, IN 46011', '678-893-1568', 'Fast food', '4826'),
    ('3', 'JJs Diner', '23428 Main St. Pawnee, IN 46011', '456-987-3185', 'Breakfast', '78623'),
    ('4', 'Mulligans', '6876 Classy Rd., Indianapolis, IN 46077', '786-235-4862', 'Steakhouse', '48623'),
    ('5', 'JJs Diner', '23428 Main St. Pawnee, IN 46011', '456-987-3185', 'Breakfast', '78623');

INSERT INTO `Driver` (`Driver_number`, `Driver_name`, `Driver_phone`, `Driver_licenseplate`, `Driver_licensenumber`, `Driver_paymentid`, `Driver_status`)
VALUES 
    ('1', 'Henry Roth', '286-937-2250', 'IUC989', 'C04790049', '444862', 'active'),
    ('2', 'Charity Osborne', '815-605-0336', 'REW222', 'D89973937', '959227', 'active'),
    ('3', 'Fritz Macias', '943-893-6193', 'XUA177', 'U06119817', '718371', 'active'),
    ('4', 'Brenden Hill', '513-284-9064', 'IOL455', 'X22173227', '334452', 'active'),
    ('5', 'Henry Roth', '286-937-2250', 'IUC989', 'C04790049', '444862', 'active'),
    ('6', 'Leah Peters', '909-477-8843', 'AJA879', 'V44276914', '603268', 'inactive');