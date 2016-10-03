-- create database Bamazon;
USE Bamazon;
DROP TABLE Products;

CREATE TABLE Products(
  id INT NOT NULL AUTO_INCREMENT,
  ProductName VARCHAR(45) NOT NULL,
  DepartmentName VARCHAR(45) NOT NULL,
  Price DECIMAL(10, 2) NOT NULL, 
  StockQuantity INT(10) NULL,
  PRIMARY KEY (`id`)
);

 INSERT INTO `Products` (`ProductName`, `DepartmentName`, `Price`, `StockQuantity`) 
 VALUES ('Apple strudel', 'Bakery & Desserts', '2.50', '100'), 
 ('Cherry pie',  'Bakery & Desserts', '3.10', '120'), 
 ('Gâteau Basque',  'Bakery & Desserts', '3.25', '100'),
 ('HP Pavilion',  'Electronics', '369.99', '40'), 
 ('LCD Monitor',  'Electronics', '129.99', '75'),
 ('Wi-Fi Extenders',  'Electronics', '59.99', '80'), 
 ('Laser Printer',  'Electronics', '459.98', '50'),
 ('Laptop Desk',  'Furniture', '99.99', '30'), 
 ('Office Chair',  'Furniture', '139.99', '45'); 



SELECT * FROM Products;

