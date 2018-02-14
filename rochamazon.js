
var mysql = require("mysql");
var inquirer = require("inquirer")
var pw = require("./password.js")

// crud commands: create(column, name, quantity), read, update, delete
var crud = require("./crud.js")
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
connection.connect(function(err) {
  if (err) throw err;
//  console.log("connected as id " + connection.threadId);
  afterConnection()
  connection.end();
});

function afterConnection(){
  connection.query("SELECT * FROM products", function (err, res) {
  if (err) throw err

//reduce the res #america
//  console.log(res)

let cars = res.filter(x => x.department_name === 'cars')
//console.log(cars)
let clothes = res.filter(x => x.department_name === 'clothes')
let electronics = res.filter(x => x.department_name === 'electronics')
let items = res.map(x => x.product_name)
let prices = res.map(x => x.price)
let everything = res
//console.log(items)

inquirer.prompt([

  {
	type: "list",
	name: "idSelect",
	message: "I need to sell some stuff, what would you like",
	choices: items
  },

]).then(function(inquirerResponse) {
//	console.log("You picked '" + picked + "'")
//	let choice = crud.checkProduct(picked)
	choice.name = inquirerResponse.idSelect

//	console.log(choice)
}).then(function(question) {
	inquirer.prompt([


  {
	type: "list",
	name: "quantity",
	message: "How many would you like?",
	choices: [ '1', '2', '3', '4', '5', '6' , '7', '8', '9' ]
  }
	]).then(function(inquirerResponse){
	choice.amount = inquirerResponse.quantity
	console.log("You wanted " + choice.amount + " of the " + choice.name)	

	let store = everything.find(x => x.product_name === choice.name)
	//function to check quantity
	if (choice.amount > store.stock_quantity) {
		console.log(`Sorry you wanted ${choice.amount} of the ${choice.name} and we only have ${store.stock_quantity}`)
		return
	} else {
		console.log(`Great, your total will be \$${choice.amount * store.price} `)
		let amountLeft = store.stock_quantity - choice.amount
		crud.update(choice.name, amountLeft)
		return
	}		
	//function to update sale
	})})



	return	  
  })

}

