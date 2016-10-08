var prompt = require('prompt');
var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
     host: 'localhost',
     port: 3306,
     user: 'root',
     password: '',
     database: "Bamazon"
});

connection.connect(function(err) {
     if (err) throw err;
     console.log("connected as id " + connection.threadId);
});

function showInventory() {
     connection.query('SELECT * FROM products', function(err, inventory) {
     if (err) throw err;
     console.log("Bamazon's Inventory");
     for(var i = 0; i < inventory.length; i++) {
          console.log("Item ID: " + inventory[i].id 
                    + " | Product: " + inventory[i].ProductName
                    + " | Department: " + inventory[i].DepartmentName 
                    + " | Department Id: " + inventory[i].DepartmentId
                    + " | Price: " +  inventory[i].Price.toFixed(2) 
                    + " | Quantity: " + inventory[i].StockQuantity);
          } 
     }); 
}

function userPrompt() {
     inquirer.prompt([
     	{
     		type: "list",
     		message: "What would you like to do? Please select from the options below:",
     		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
     		name: "selection"
     	}

          ]).then(function (user) {
               switch(user.selection) {
                    case "View Products for Sale":
                         showInventory();
                    break;

                    case "View Low Inventory":
                         connection.query('SELECT * FROM products WHERE StockQuantity < 5', function(err, inventory) {
                         if (err) throw err;
                         
                         //console.log(inventory.length);
                         if (inventory.length > 0){
                              console.log("Bamazon's Low Inventory");
                              for(var i = 0; i < inventory.length; i++) {
                                        console.log("Item ID: " + inventory[i].id 
                                                  + " | Product: " + inventory[i].ProductName 
                                                  + " | Price: " +  inventory[i].Price 
                                                  + " | Quantity: " + inventory[i].StockQuantity);
                                   }
                         } 
                         else
                         {
                              console.log('Inventory is not low! We have more than 5 items in each department :)');
                         }
                    }); 
                    break;

                    case "Add to Inventory":
                         inquirer.prompt([
                         	{
                         		type: "input",
                         		message: "What is the id of the item you would like to add?",
                         		name: "itemId"
                         	},
                              {
                         		type: "input",
                         		message: "How many items should we add to the inventory?",
                         		name: "amount"
                         	}

                              ]).then(function (request) {
                                   connection.query('SELECT * FROM products WHERE id=' + 
                                                       request.itemId, function(err, selectedItem) {
                                   	if (err) throw err;

                                        console.log("You have added " + request.amount + " " 
                                                       + selectedItem[0].ProductName + " to the inventory.");
                                        connection.query('UPDATE products SET StockQuantity=? WHERE id=?', 
                                                            [selectedItem[0].StockQuantity 
                                                            + Number(request.amount), request.itemId],
                                        function(err, inventory) {
                                        	if (err) throw err;
                                             showInventory();
                                        });  
                                   });
                              }); 
                    break;

                    case "Add New Product":
                    inquirer.prompt([
                         {
                              type: "input",
                              message: "What name of the product you would like to add?",
                              name: "ProductName"
                         },
                         {
                              type: "input",
                              message: "What is the department name?",
                              name: "DepartmentName"
                         },
                         {
                              type: "input",
                              message: "What is the department ID?",
                              name: "DepartmentId"
                         },
                         {
                              type: "input",
                              message: "What is the price of the item you would like to add to the inventory?",
                              name: "Price"
                         },
                         {
                              type: "input",
                              message: "How many items should be added to the inventory?",
                              name: "StockQuantity"
                         }
                    ]).then(function (newItem) {
                         connection.query("INSERT INTO products (ProductName, DepartmentName, DepartmentId, Price, StockQuantity) VALUES (?,?,?,?,?)",
                                             [newItem.ProductName, newItem.DepartmentName, newItem.DepartmentId, newItem.Price, newItem.StockQuantity],
                         function(err, inventory) {
                              if (err) throw err;
                              console.log(newItem.ProductName  + " have been added to the inventory.");
                              showInventory();
                         });  

                    }); 
                    break;
               }  // switch
     });  
}

userPrompt();



