//GLOBAL FIELDS
let totalList = []
let sizeList = []
let crustList = []
let cheeseList = []
let sauceList = []
let secIngList = []
let thirdIngList = []
let cartIDList = []

window.onload = function() {
    console.log("Triggered on reload()")
    
    
    totalList = []
    sizeList = []
    crustList = []
    cheeseList = []
    sauceList = []
    secIngList = []
    thirdIngList = []
    cartIDList = []

    getCartItem()
}

async function getCartItem() {
    console.log("getCartItem() triggered")
    if(document.cookie.indexOf('authorized') == -1 ) {
        alert("You need to be signed in to use cart feature")
        //$("#cartPanel").remove()
                
        
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
            
            let runningTotal = 0;
            for(let i = 0; i < json.orders.length; i++) {
                totalList.push(json.orders[i].total)
                sizeList.push(json.orders[i].size)
                crustList.push(json.orders[i].crust)
                cheeseList.push(json.orders[i].cheese)
                sauceList.push(json.orders[i].sauce)
                secIngList.push(json.orders[i].secing)
                thirdIngList.push(json.orders[i].thirding)
                cartIDList.push(json.orders[i].cartid)
                runningTotal += json.orders[i].total
                
                
                let size = "Size: " + json.orders[i].size 
                let crust = "Crust: " + json.orders[i].crust
                let cheese = "Cheese: " + json.orders[i].cheese
                let sauce = "Sauce: " + json.orders[i].sauce
                let toppings = "Toppings: " + json.orders[i].secing
                let sToppings = "Special Toppings: " + json.orders[i].thirding


                $(".cartSpecific").append($("<div class='cart-items'>")
                                            .append($("<span class='cart-item-title'>").text("Pizza " + (i + 1) + ":"))
                                            .append($("<ol>")
                                            .append($("<li style='font-size:14px'>").text(size))
                                            .append($("<li style='font-size:14px'>").text(crust))
                                            .append($("<li style='font-size:14px'>").text(cheese))
                                            .append($("<li style='font-size:14px'>").text(sauce))
                                            .append($("<li style='font-size:14px'>").text(toppings))
                                            .append($("<li style='font-size:14px'>").text(sToppings)))
                                            .append($("<span class='cart-price cart-column' style='margin-left: 11em;display: inline-grid;' id='price'>$" + json.orders[i].total + "</span>"))
                                            //.append($("<input class='cart-quantity-input' type='number' value='1' style='margin-left: 2em;'>"))
                                            //.append($("<button class='btn btn-danger' data-toggle='modal' data-target='#myCartModal' onclick='editCartItem("+json.orders[i].cartid+")' type='button'>Edit Item</button>"))
                                            .append($("<button class='btn btn-addItem' data-toggle='modal' data-target='#myCartModal' onclick='setCartID("+json.orders[i].cartid+")' type='button'>Edit Item</button>"))
                                            .append($("<button class='btn btn-danger' onclick='removeCartItem("+json.orders[i].cartid+")' type='button'>REMOVE</button>")))
                                            
                


                
                
            }
            $("#totalPrice").text("$" + runningTotal)


        } else {
            // alert("HTTP-Error: " + response.status)
            //alert("No items have been added in the cart yet.")
            
            //console.log(response.status)
            //let json = await response.json()
            //console.log(json)
            $(".cartSpecific").append($("<h3 style='text-align: center;'>No items have been added in the cart yet.</h3>"))

        }                
    }
}

function setCartID(cartID) {
    localStorage.setItem("targetCartID", cartID);
}

function editCartItem() {
    console.log("editCartItem() triggered" )
    




    
    let total = 0

    let sizeInput = document.querySelector('input[name = "sizeCart"]:checked').value;
    let sizeCost = sizePrice(sizeInput)
     console.log("Size Cost: " + sizeCost)
    total += sizeCost

    let crustInput = document.querySelector('input[name = "crustCart"]:checked').value;
    let crustCost = crustPrice(crustInput)
     console.log("Crust Cost: " + crustCost)
    total += crustCost



    let cheeseInput = document.querySelector('input[name = "cheeseCart"]:checked').value;
    let cheeseCost = cheesePrice(cheeseInput)
    console.log("Cheese Cost: " + cheeseCost)
    total += cheeseCost

    let sauceInput = document.querySelector('input[name = "sauceCart"]:checked').value;
    let sauceCost = saucePrice(sauceInput)
    console.log("Sauce Cost: " + sauceCost)
    total += sauceCost

    var secIngredientInput = [];
    $("input:checkbox[name=secIngCart]:checked").each(function(){
        secIngredientInput.push($(this).val());
    });
    total += secIngredientInput.length * 5

    console.log(secIngredientInput)

    var thirdIngredientInput = [];
    $("input:checkbox[name=thirdIngCart]:checked").each(function(){
        thirdIngredientInput.push($(this).val());
    });
    console.log(thirdIngredientInput)
    total += thirdIngredientInput.length * 5
    document.getElementById("subTotal").innerHTML = "Current Total: $" + total

    localStorage.setItem("size", sizeInput);
    localStorage.setItem("crust", crustInput);
    localStorage.setItem("cheese", cheeseInput);
    localStorage.setItem("sauce", sauceInput);
    localStorage.setItem("secIng", secIngredientInput)
    localStorage.setItem("thirdIng", thirdIngredientInput)
    localStorage.setItem("total", total)
    //2. delete old Item
    //3. Add new item 

}
function editAndAddToCart() {
    addEdittedItem()
    removeCartItem(localStorage.getItem("targetCartID"))
}



async function addEdittedItem() {
    let memberID = localStorage.getItem("targetCartID")
    let size = localStorage.getItem("size")
    let crust = localStorage.getItem("crust")
    let cheese = localStorage.getItem("cheese")
    let sauce = localStorage.getItem("sauce")
    let secIng = localStorage.getItem("secIng")
    let thirdIng = localStorage.getItem("thirdIng")
    let total = localStorage.getItem("total")

    // console.log(typeof size)

    console.log(memberID + ", " + size + ", " + crust + ", " + cheese + ", " + sauce + ", (" + secIng + "), (" + thirdIng + "), " + total)

    let response = await fetch("/cart", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "memberid": memberID,
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
        //window.location.href = "./r_cart.html";
    } else {
        alert("HTTP-Error: " + response.status)
    }
    
}


function orderSubmit() {
    
    for(let i = 0; i < sizeList.length; i++) {
        let size = sizeList[i]
        let crust = crustList[i]
        let cheese = cheeseList[i]
        let sauce = sauceList[i]
        let secIng = secIngList[i]
        let thirdIng = thirdIngList[i]
        let total = totalList[i]
        addPizzaOrder(size, crust, cheese, sauce, secIng, thirdIng, total)
        removeCartItem(cartIDList[i])
    }

    
    
}

async function addPizzaOrder(size, crust, cheese, sauce, secIng, thirdIng, total) {
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
        
        alert("Order Submitted!")
        

        


    } else {
        alert("HTTP-Error: " + response.status)
    }        
}


async function removeCartItem(cartID) {
    console.log("removeCartItem() triggered by -> " + cartID)

    let response = await fetch("/cart",  {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "cartID": cartID
        })
    })
    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json()
        console.log(json)
        window.location.href = "./r_cart.html";

    } else {
        alert("HTTP-Error: " + response.status)
        console.log(response.status)
        let json = await response.json()
        console.log(json)
    }

    
    
}

