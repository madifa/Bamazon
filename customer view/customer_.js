var mysql = require("mysql")

var inquirer = require("inquirer")

var newQuantity = "";

var OrderAmount = "";

var userPurchaseid = "";

var connection = mysql.createConnection({
    host: "localhost",

    port: 3030,

    user: "root",

    password: "root",
    database: "customer_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    Start();
});

function Start() {

    inquirer.prompt([
        {
            type: "input",
            name: "purchase",
            message: "What would you like to purchase?"
        },
        //validate: ["product_name", "department_name", "price",]


        {
            type: "input",
            name: "Quantity",
            message: "How many would you like to buy?"
        }

    ])

        .then(function (userPurchase) {
            connection.query("SELECT * FROM `products` WHERE `item_id` = ?", [userPurchase.purchase],
                function (err, res) {
                    if (err) throw err;
                    userPurchaseid = userPurchase.purchase

                    
                    if (res[0].stock_quanity >= userPurchase.Quantity) {

                        newQuantity = parseInt(res[0].stock_quanity) - parseInt(userPurchase.Quantity);
                        

                        OrderAmount = parseFloat(res[0].price) * parseFloat(userPurchase.Quantity);

                        OrderAmount = OrderAmount.toFixed(2);

                        connection.query('UPDATE products SET stock_quanity = ? WHERE item_id = ?  ', [newQuantity, userPurchaseid],
                        function (err, res) {
                            //if (err) throw err;
                            

                            console.log("you owe", OrderAmount)
                            

                        });


                    } else {
                        console.log("We dont have that many in stock")
                        
                    }

                    
                    

                }

            )

        })


}
