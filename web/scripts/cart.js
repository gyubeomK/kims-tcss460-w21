window.onload = function() {
    console.log("Triggered on reload()")

    getCartItem()

}

async function getCartItem() {
    console.log("getCartItem() triggered")


    let response = await fetch("/cart",  {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json;charset=utf-8"
        }
    })
    if (response.ok) { 
        let json = await response.json()
        console.log(json)
        
        for(let i = 0; i < json.orders.length; i++) {
            // let output = "Price: " + json.orders[i].total
            //             + ", Size: " + json.orders[i].size 
            //             + ", Crust: " + json.orders[i].crust
            //             + ", Cheese: " + json.orders[i].cheese
            //             + ", Sauce: " + json.orders[i].sauce
            //             + ", Toppings: " + json.orders[i].secing
            //             + ", Special Toppings: " + json.orders[i].thirding

            
            let size = "Size: " + json.orders[i].size 
            let crust = "Crust: " + json.orders[i].crust
            let cheese = "Cheese: " + json.orders[i].cheese
            let sauce = "Sauce: " + json.orders[i].sauce
            let toppings = "Toppings: " + json.orders[i].secing
            let sToppings = "Special Toppings: " + json.orders[i].thirding


            
            // $("#cartSpecific").append($("<li style='font-size:20px'>").text(output))
            // $("#cartSpecific").append($("<li style='font-size:14px'>").text(price))
            

            $("#cartSpecific").append($("<li style='font-size:14px'>").text(size))
            $("#cartSpecific").append($("<li style='font-size:14px'>").text(crust))
            $("#cartSpecific").append($("<li style='font-size:14px'>").text(cheese))
            $("#cartSpecific").append($("<li style='font-size:14px'>").text(sauce))
            $("#cartSpecific").append($("<li style='font-size:14px'>").text(toppings))
            $("#cartSpecific").append($("<li style='font-size:14px'>").text(sToppings))

            document.getElementById("price").innerHTML = "$" + json.orders[i].total
            document.getElementById("totalPrice").innerHTML = "$" + json.orders[i].total
            

            
            
            
        }
        


    } else {
        alert("HTTP-Error: " + response.status)
        console.log(response.status)
        let json = await response.json()
        console.log(json)
    }                

}



// function addFavOrder() {
//     console.log("add fav triggered")

//     $("#favBtn").click(function(){
//         $("#buttonAlert").addClass('show') //Shows Bootstrap alert
//     })

//     $("#btn").click(function(){
//         console.log("Size from cart: " + localStorage.getItem("size"));
//     })
    

// }