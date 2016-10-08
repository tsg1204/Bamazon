CREATE DATABASE Bamazon;

USE Bamazon;

-- DROP TABLE Products;

CREATE TABLE Products(
  id INT NOT NULL AUTO_INCREMENT,
  ProductName VARCHAR(100) NOT NULL,
  DepartmentName VARCHAR(100) NOT NULL,
  DepartmentId INT(10) NOT NULL,
  Price DECIMAL(10, 2) NOT NULL, 
  StockQuantity INT(10) NULL,
  PRIMARY KEY (`id`)
);

 INSERT INTO `Products` (`ProductName`, `DepartmentName`, `DepartmentId`, `Price`, `StockQuantity`) 
 VALUES ('Apple strudel', 'Bakery & Desserts', '1', '2.50', '100'), 
 ('Cherry pie',  'Bakery & Desserts', '1', '3.10', '120'), 
 ('Gâteau Basque',  'Bakery & Desserts', '1', '3.25', '100'),
 ('HP Pavilion',  'Electronics', '2', '369.99', '40'), 
 ('LCD Monitor',  'Electronics', '2', '129.99', '75'),
 ('Wi-Fi Extenders',  'Electronics', '2', '59.99', '80'), 
 ('Laser Printer',  'Electronics', '2', '459.98', '50'),
 ('Laptop Desk',  'Furniture', '3', '99.99', '30'), 
 ('Office Chair',  'Furniture', '3', '139.99', '45');


CREATE TABLE Departments(
  id INT NOT NULL AUTO_INCREMENT,
  DepartmentName VARCHAR(100) NOT NULL,
  OverHeadCosts DECIMAL(10, 2) NULL, 
  TotalSales DECIMAL(10, 2) NULL,
  PRIMARY KEY (`id`)
);

 INSERT INTO `Departments` (`DepartmentName`, `OverHeadCosts`, `TotalSales`) 
 VALUES ('Bakery & Desserts', '500.0', '0'), 
 ('Electronics', '2000.00', '0'), 
 ('Furniture', '5000.00', '0'); 

SELECT * FROM Products;

SELECT * FROM Departments;

