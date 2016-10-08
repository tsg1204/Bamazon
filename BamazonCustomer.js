var prompt = require('prompt');
var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "", //Your password
    database: "Bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
})

function showInventory() {
     connection.query('SELECT * FROM products', function(err, inventory) {
     	if (err) throw err;
               console.log("Bamazon's Inventory");
               for(var i = 0; i < inventory.length; i++) {
          			console.log("Item ID: " + inventory[i].id 
                   + " | Product: " + inventory[i].ProductName
          				 + " | Department: " + inventory[i].DepartmentName 
          				 + " | Price: " +  inventory[i].Price.toFixed(2) 
          				 + " | Quantity: " + inventory[i].StockQuantity);
          }

          inquirer.prompt([
          	{
          		type: "input",
          		message: "What is the id of the item you would like to buy?",
          		name: "id"
          	},

            {
          		type: "input",
          		message: "How many would you like to buy?",
          		name: "quantity"
          	}

          ]).then(function (order) {
                    var quantity = order.quantity;

                    var itemId = order.id;
                    var totSales = 0;
                    connection.query('SELECT * FROM products WHERE id=' + itemId, 
                      function(err, selectedItem) {
                    	 if (err) throw err;
                       if (selectedItem[0].StockQuantity - quantity >= 0) {
                            console.log("Bamazon's Inventory has enough of that item " + selectedItem[0].ProductName);
                            console.log("Quantity in Stock: " + selectedItem[0].StockQuantity + " Order Quantity: " + quantity);
                            console.log("You will be charged " + (order.quantity * selectedItem[0].Price.toFixed(2)) +  " dollars.  Thank you for shopping at Bamazon.");
                            //  update the item from inventory
                            connection.query('UPDATE products SET StockQuantity=? WHERE id=?', 
                                              [selectedItem[0].StockQuantity - quantity, itemId],
                            function(err, inventory) {
                            	if (err) throw err;
                                 showInventory();
                            }); 

                            totSales = quantity * selectedItem[0].Price;
                            connection.query('UPDATE departments INNER JOIN products AS a '
                                              + 'ON departments.id = a.departmentid '
                                              + 'SET departments.totalsales = (departments.totalsales + ?) '
                                              + 'WHERE  a.id = ?', 
                                                [ totSales, itemId],
                                    function(err, inventory) {
                                      if (err) throw err;
                                    }); 
                       }
                       else {
                            console.log("Insufficient quantity. Bamazon only has " + selectedItem[0].StockQuantity 
                            				      + " " + selectedItem[0].ProductName + " in stock at this moment. Please order less if you wish.");
                            showInventory();
                       }
                    });

          });
     });
  }

showInventory();



