var table = require('console.table');
var prompt = require('prompt');
var inquirer = require('inquirer');
var mysql = require('mysql');
var values = [
			    ['DepartmentID', 0],
			    ['Department Name', ''],
			    ['Over Head Costs', 0],
			    ['ProductSales', 0],
			    ['TotalProfit', 0]
			]
var totalProfit = 0;
var totSales;

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

function showDepartments() {
    connection.query('SELECT * FROM departments', function(err, departments) {
    if (err) throw err;
    console.log("Bamazon's Departments");
   for(var i = 0; i < departments.length; i++) {
      if (departments[i].TotalSales > 0) {
        totSales = departments[i].TotalSales.toFixed(2);
      }
      else
          totSales = 0.00;
      if (departments[i].TotalSales > 0) {
        totalProfit = (departments[i].TotalSales - departments[i].OverHeadCosts).toFixed(2);
      }
      else
          totalProfit = 0.00;
      console.log("DepartmentID: " + departments[i].id 
         + " | Department Name: " + departments[i].DepartmentName
         + " | Over Head Costs: " + departments[i].OverHeadCosts
         + " | ProductSales: " +  totSales 
         + " | TotalProfit: " + totalProfit);
      }
    //couldn't make console.table to work!!!
    // for(var i = 0; i < departments.length; i++) {
    // 	totalProfit = departments[i].TotalSales - departments[i].OverHeadCosts;
    //  	values[0][i] = departments[i].id;
    //  	values[0][i] = departments[i].DepartmentName;
    //  	values[0][i] = departments[i].OverHeadCosts;
    //  	values[0][i] = departments[i].TotalSales;
    //  	values[0][i] = totalProfit;
    // 	} 
    }); 
    //for(var i = 0; i < departments.length; i++) {
    //	console.table(values[0], values.slice(i));
	//}
}

function userPrompt() {
     inquirer.prompt([
     	{
     		type: "list",
     		message: "What would you like to do? Please select from the options below:",
     		choices: ["View Product Sales by Department", "Create New Department"],
     		name: "selection"
     	}

          ]).then(function (user) {
               switch(user.selection) {
                    case "View Product Sales by Department":
                        showDepartments();
                    break;

                    case "Create New Department":
                    inquirer.prompt([
                         {
                              type: "input",
                              message: "What name of the department you would like to add?",
                              name: "Department"
                         },
                         {
                              type: "input",
                              message: "What is the over head cost?",
                              name: "Cost"
                         }
                    ]).then(function (newItem) {
                        //console.log(newItem.Department);
                         connection.query("INSERT INTO departments (DepartmentName, OverHeadCosts, TotalSales) VALUES (?,?,?)",
                         					[newItem.Department, newItem.Cost, 0],
                         function(err, departments) {
                              if (err) throw err;
                              console.log(newItem.Department + " have been added to the departments list.");
                              showDepartments();
                         });  

                    }); 
                    break;
               }  // switch
     });  
}

userPrompt();

