//GLOBAL FIELDS
let totalList = []
let sizeList = []
let crustList = []
let cheeseList = []
let sauceList = []
let secIngList = []
let thirdIngList = []

window.onload = function() {
    console.log("Triggered on reload()")
    getCartItem()
}

async function getCartItem() {
    console.log("getCartItem() triggered")
    if(document.cookie.indexOf('authorized') ==  -1) {
        alert("You need to sign in to use cart feature")
        window.location.href = "./homepage.html";
        
                
        
    } else {
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
                totalList.push(json.orders[i].total)
                sizeList.push(json.orders[i].size)
                crustList.push(json.orders[i].crust)
                cheeseList.push(json.orders[i].cheese)
                sauceList.push(json.orders[i].sauce)
                secIngList.push(json.orders[i].secing)
                thirdIngList.push(json.orders[i].thirding)
                
                
                let size = "Size: " + json.orders[i].size 
                let crust = "Crust: " + json.orders[i].crust
                let cheese = "Cheese: " + json.orders[i].cheese
                let sauce = "Sauce: " + json.orders[i].sauce
                let toppings = "Toppings: " + json.orders[i].secing
                let sToppings = "Special Toppings: " + json.orders[i].thirding
                

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
}
async function orderSubmit() {
    console.log("orderSubmit() triggered")




    for(let i = 0; i < sizeList.length; i++) {
        let size = sizeList[i]
        let crust = crustList[i]
        let cheese = cheeseList[i]
        let sauce = sauceList[i]
        let secIng = secIngList[i]
        let thirdIng = thirdIngList[i]
        let total = totalList[i]

        let response = await fetch("/order", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "size": size,
                "crust": crust,
                "cheese": cheese,
                "sauce": sauce,
                "secIng": secIng,
                "thirdIng": thirdIng,
                "total": total
            })
        })
    
        if(response.ok) {
            let json = await response.json()
            
            
    
    
    
    
        } else {
            alert("HTTP-Error: " + response.status)
        }        
    }

    
    
}