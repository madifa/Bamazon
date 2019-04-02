DROP DATABASE IF EXISTS customer_db;
CREATE database customer_db;

use customer_db;

-- syntax
CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NULL,
    department_name VARCHAR(255) NULL,
    price DECIMAL(6,2) NULL,
    stock_quanity INT NULL,
    PRIMARY KEY (item_id)
)


