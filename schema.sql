
DROP DATABASE IF EXISTS rochamazon_db;
CREATE database rochamazon_db;

USE rochamazon_db;

CREATE TABLE products 
(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

SELECT * FROM products;
