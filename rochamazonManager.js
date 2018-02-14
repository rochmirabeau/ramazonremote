var crud = require('./crud.js')
var mysql = require('mysql')
var inquirer = require('inquirer')

var pw = require("./password.js")

// crud commands: create(column, name, quantity), read, update, delete
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: pw,
  database: "rochamazon_db"
});
let choice = {}
let actions = [
	'View Products',
	'View Low Inventory',
	'Add Inventory',
	'Add New Product'
]
connection.connect(function(err) {
  if (err) throw err;
//  console.log("connected as id " + connection.threadId);
  afterConnection()
//  connection.end();
});

function afterConnection(){
  connection.query("SELECT * FROM products", function (err, res) {
  if (err) throw err

//reduce the res #america
//  console.log(res)

let low = res.filter(x => x.stock_quantity < 5)
//console.log(cars)
let items = res.map(x => x.product_name)
let everything = res
//console.log(items)


inquirer.prompt([

  {
	type: "list",
	name: "action",
	message: "Hey manager, what would you like to do",
	choices: actions
  },

]).then(function(inquirerResponse) {
	console.log("You picked '" + inquirerResponse.action + "'")
//	let choice = crud.checkProduct(picked)
	choice.action = inquirerResponse.action

//	console.log(choice)
}).then(function(question) {
switch (choice.action){

	case 'View Products':
		console.log(everything)
	break;

	case 'View Low Inventory':
		console.log(low)
	break;

	case 'Add Inventory':
		//ask which item

		inquirer.prompt([

			{
				type: "list",
				name: "whichItem",
				message: "Which item would you like to change",
				choices: items
			},

		])
		.then(function(inquirerResponse) {
			choice.addItemChoice = inquirerResponse.whichItem
			console.log(choice.addItemChoice)

			//ask how many

			inquirer.prompt([
			{
				type: "list",
				name: "howMany",
				message: "How many should I add?",
				choices: ['1','2','3','4','5','6','7','8','9']
			},

		])
		.then(function(inquirerResponse) {
			choice.howMany = inquirerResponse.howMany
			//update database
			crud.update(choice.addItemChoice, choice.howMany)	
			console.log(`Ok! I added ${choice.howMany} to ${choice.addItemChoice}, thank you`)
		})
		})

	break;

	case 'Add New Product':
		//ask product name
		console.log("Add New Product")
		inquirer.prompt([
			{
				type: "input",
				name: "product_name",
				message: "What is the name of the product?"
		
		}],)
		.then(function(inquirerResponse) {
			choice.product_name = inquirerResponse.product_name
			console.log(choice.product_name)
		
		//ask product dept

		inquirer.prompt([
			{
				type: "input",
				name: "department_name",
				message: "What department should I put it in?" 
		
		}],)
		.then(function(inquirerResponse) {
			choice.department_name = inquirerResponse.department_name
			console.log(choice.department_name)
		
		//ask product product price
		
		inquirer.prompt([
			{
				type: "input",
				name: "price",
				message: "How much does it cost?"
		
		}],)
		.then(function(inquirerResponse) {
			choice.price = inquirerResponse.price
			console.log(choice.price)
		
		//ask how many to add
		
		inquirer.prompt([
			{
				type: "input",
				name: "stock_quantity",
				message: "How many should I add?"
		
		}],)
		.then(function(inquirerResponse) {
			choice.stock_quantity = inquirerResponse.stock_quantity
			console.log(choice.stock_quantity)
		// INSERT INTO products (product_name, department_name, price, stock_quantity) 
		// VALUES (choice.product_name, choice.department_name, choice.price, choice.stock_quantity)
		let result = [
		 	choice.product_name,
			choice.department_name,
			parseFloat( choice.price ),
			parseInt( choice.stock_quantity ) 
		]
	//	console.log(result)

		//insert into database
		// INSERT INTO products (product_name, department_name, price, stock_quantity) 
		// VALUES (choice.product_name, choice.department_name, choice.price, choice.stock_quantity)
		let sqlStr = 'INSERT INTO products (product_name, department_name, price, stock_quantity)'
		sqlStr += 'VALUES (?, ?, ?, ?)'  
		var addItem = connection.query(sqlStr, result, (error, results) => {
			if (error) throw error;
			console.log(`Ok adding ${choice.stock_quantity} ${choice.product_name} to the inventory under ${choice.department_name}, each costing $${choice.price}` )
			})
		})
		})
		})
		})

	break;

}
})




	return	  
  })

}

