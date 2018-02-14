
var mysql = require("mysql");
var pw = require("./password.js")

//connect database

 var connection = mysql.createConnection({
 	host: "localhost",
 	port: 3306,
 
 	// Your username
 	user: "root",
 
 	// Your password
 	password: pw,
 	database: "rochamazon_db"
 });
// 
 connection.connect(function(err) {
 	if (err) throw err;
 	//  console.log("connected as id " + connection.threadId);
 	afterConnection()
 });


//roch crud functions
 function afterConnection() {
 	console.log("connected")
//
	 //connection.end()
 }

//works!
var checkProduct = function (name){
//	console.log(name)
	this.name = name
	var item = []
	console.log("Hi Roch " + this.name)
	connection.query('SELECT * FROM `products` WHERE `product_name` = "' + this.name + '"', function(error, results, field){
	if (error) throw error
//	console.log(field)
	setItem(results[0])
	
		
	//return product
		
	}, setItem)
	function setItem(err, stuff) {
		if (err) throw err
		item = stuff
	}
		console.log(item)
		return item 
	}


//checkProduct('bmw 318ti')

// curry (vailable) then (requested)
function isAvailable(available){
	this.available = available
	return function (requested){
		if (requested > this.available) {
			console.log("Too Many Requested!")
			return false
		}
		else {
			console.log("We've got it!")
			return true
		}
	}
}

//isAvailable(3)

//Move these to main 
// var isRequested = isAvailable(3) 
// isRequested(5)

//selling curry (item) then (quantity), works
function sellProduct(item){
	this.item = item
	return function(quantity) {
		console.log("Thanks for buying " + quantity + "\n Your total is " + quantity * item)
	}
}

//sellProduct(3)(19.29)


//update database curry (item) then (quantity)
function updateQuantity(item, quantity) {
	let query = connection.query('UPDATE products SET ? WHERE ?', 
		[
			{stock_quantity: quantity},
			{ product_name: item }

		], function (err, res) {
		if (err) throw err
//		console.log(res.affectedRows)
		}
	)
//	console.log(query.sql)
}

//updateQuantity('bmw 318ti', 4)
module.exports = {
	checkProduct: checkProduct,
	update: updateQuantity,
	isAvailable: isAvailable,
	sell: sellProduct
}
