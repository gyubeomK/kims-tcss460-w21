function initialTotal() {

    console.log("initial total triggered")

    totalCalculation()


    document.getElementById("subTotal").innerHTML = "Current Total: $20"
}

function totalCalculation() {
    //console.log("total calculation triggered")
    let total = 0

    let sizeInput = document.querySelector('input[name = "size"]:checked').value;
    let sizeCost = sizePrice(sizeInput)
    // console.log("Size Cost: " + sizeCost)
    total += sizeCost

    let crustInput = document.querySelector('input[name = "crust"]:checked').value;
    let crustCost = crustPrice(crustInput)
    // console.log("Crust Cost: " + crustCost)
    total += crustCost

    let cheeseInput = document.querySelector('input[name = "cheese"]:checked').value;
    let cheeseCost = cheesePrice(cheeseInput)
    // console.log("Cheese Cost: " + cheeseCost)
    total += cheeseCost

    let sauceInput = document.querySelector('input[name = "sauce"]:checked').value;
    let sauceCost = saucePrice(sauceInput)
    // console.log("Sauce Cost: " + sauceCost)
    total += sauceCost

    var secIngredientInput = [];
    $("input:checkbox[name=secIng]:checked").each(function(){
        secIngredientInput.push($(this).val());
    });
    total += secIngredientInput.length * 5

    //console.log(secIngredientInput.length)

    var thirdIngredientInput = [];
    $("input:checkbox[name=thirdIng]:checked").each(function(){
        thirdIngredientInput.push($(this).val());
    });
    console.log(thirdIngredientInput.length)
    total += thirdIngredientInput.length * 5
    document.getElementById("subTotal").innerHTML = "Current Total: $" + total

    localStorage.setItem("size", sizeInput);
    localStorage.setItem("crust", crustInput);
    localStorage.setItem("cheese", cheeseInput);
    localStorage.setItem("sauce", sauceInput);
    localStorage.setItem("secIng", secIngredientInput)
    localStorage.setItem("thirdIng", thirdIngredientInput)
    localStorage.setItem("total", total)
}

function sizePrice(sizeInput) {
    if(sizeInput == "10") {
        return 15
    } else if(sizeInput == "12") {
        return 20
    } else {
        return 25
    }
}

function crustPrice(crustInput) {
    if(crustInput == "Thin") {
        return 3
    } else if(crustInput == "Regular") {
        return 0
    } else {
        return 5
    }
}

function cheesePrice(cheeseInput) {
    if(cheeseInput == "Parmesan") {
        return 2
    } else if(cheeseInput == "Mozzarella") {
        return 2
    } else if(cheeseInput == "Cheddar") {
        return 2
    } else {
        return 4
    }

}

function saucePrice(sauceInput) {
    if(sauceInput == "Marinara") {
        return 0
    } else if(sauceInput == "Buffalo") {
        return 0
    } else if(sauceInput == "Pesto") {
        return 2
    } else {
        return 3
    }
}



async function submit_order() {
    console.log("submit_order triggered")

    let size = localStorage.getItem("size")
    let crust = localStorage.getItem("crust")
    let cheese = localStorage.getItem("cheese")
    let sauce = localStorage.getItem("sauce")
    let secIng = localStorage.getItem("secIng")
    let thirdIng = localStorage.getItem("thirdIng")
    let total = localStorage.getItem("total")

    // console.log(typeof size)

    console.log(size + ", " + crust + ", " + cheese + ", " + sauce + ", (" + secIng + "), (" + thirdIng + "), " + total)

    let response = await fetch("/cart", {
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
        location.reload()
    } else {
        alert("HTTP-Error: " + response.status)
    }

}


async function addFavData() {

    console.log("addFavData() Triggered")

    let size = localStorage.getItem("size")
    let crust = localStorage.getItem("crust")
    let cheese = localStorage.getItem("cheese")
    let sauce = localStorage.getItem("sauce")
    let secIng = localStorage.getItem("secIng")
    let thirdIng = localStorage.getItem("thirdIng")
    let total = localStorage.getItem("total")
    console.log(size + ", " + crust + ", " + cheese + ", " + sauce + ", (" + secIng + "), (" + thirdIng + "), " + total)

    let response = await fetch("/favOrder", {
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
        
        alert("You pizza has been successfully added in your fav list! Yay")    




    } else {
        alert("HTTP-Error: " + response.status)
    }

    
    

}

function deleteLocalStorage() {
    console.log("deleteLocalStorage() triggered!")
    localStorage.clear()
}


function getOrderItems() {
    
    console.log("initialLoad() Triggered");
    if (document.cookie.indexOf('authorized') == -1 ) {
        console.log("authorized cookie does not exists"); //not logged-in
        var temp = document.getElementById("navSignInBtn");
        temp.style.display = 'block'
        alert("You need to be signed in to see your favorite and previous orders.")

    } else {
        console.log("authorized cookie does exists"); //logged-in
        //$("#navSignInBtn").remove()
        $("#navUsername").html("Welcome! " + localStorage.getItem("email"))    
        var temp = document.getElementById("navSignOutBtn");
        temp.style.display = 'block'

        getFavOrders()
        getPrevOrders()


    }
}

let favMap = new Map()
let prevMap = new Map()
async function getFavOrders() {

    console.log("restricted getFavOrder() Triggered")
    let response = await fetch("/favOrder",  {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json;charset=utf-8"
        }
    })
    if (response.ok) { 
        let json = await response.json()
        console.log(json)

        for(let i = 0; i < json.orders.length; i++) {
            let resultString = json.orders[i].size + "-" 
                            + json.orders[i].crust + "-" 
                            + json.orders[i].cheese + "-" 
                            + json.orders[i].sauce + "-" 
                            + json.orders[i].secing + "-" 
                            + json.orders[i].thirding + "-" 
                            + json.orders[i].total
            favMap.set(json.orders[i].favpizzaid, resultString)

            let size = "Size: " + json.orders[i].size 
            let crust = "Crust: " + json.orders[i].crust
            let cheese = "Cheese: " + json.orders[i].cheese
            let sauce = "Sauce: " + json.orders[i].sauce
            let toppings = "Toppings: " + json.orders[i].secing
            let sToppings = "Special Toppings: " + json.orders[i].thirding
            
            

            $(".favSpecific").append($("<div class='cart-items'>")
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
            // .append($("<button class='btn btn-danger' onclick='removeCartItem()' type='button' value=" + json.orders[i].cartid + ">REMOVE</button>")))
            .append($("<button class='btn btn-danger' onclick='removeFavItem("+json.orders[i].favpizzaid+")' type='button'>REMOVE</button>"))  
            .append($("<button class='btn btn-addItem' style='margin-left: 5em;' onclick='addfavCartItem("+json.orders[i].favpizzaid+")' type='button'>Add to Cart</button>")))            
        }


    } else {
        alert("No Orders yet stored in your fav list!")
        console.log(response.status)
        let json = await response.json()
        console.log(json)
    }


}

async function addCartItem(itemID) {
    
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

async function getPrevOrders() {
    let response = await fetch("/order",  {
        method: 'GET',
        headers: {
            "Content-Type" : "application/json;charset=utf-8"
        }
    })
    if (response.ok) { 
        let json = await response.json()
        console.log(json)

        for(let i = 0; i < json.orders.length; i++) {
            let resultString = json.orders[i].size + "-" 
            + json.orders[i].crust + "-" 
            + json.orders[i].cheese + "-" 
            + json.orders[i].sauce + "-" 
            + json.orders[i].secing + "-" 
            + json.orders[i].thirding + "-" 
            + json.orders[i].total
            prevMap.set(json.orders[i].orderid, resultString)

            let size = "Size: " + json.orders[i].size 
            let crust = "Crust: " + json.orders[i].crust
            let cheese = "Cheese: " + json.orders[i].cheese
            let sauce = "Sauce: " + json.orders[i].sauce
            let toppings = "Toppings: " + json.orders[i].secing
            let sToppings = "Special Toppings: " + json.orders[i].thirding

            $(".prevSpecific").append($("<div class='cart-items'>")
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
            // .append($("<button class='btn btn-danger' onclick='removeCartItem()' type='button' value=" + json.orders[i].cartid + ">REMOVE</button>")))
            .append($("<button class='btn btn-danger' onclick='removePrevItem("+json.orders[i].orderid+")' type='button'>REMOVE</button>"))            
            .append($("<button class='btn btn-addItem' style='margin-left: 5em;' onclick='addprevCartItem("+json.orders[i].orderid+")' type='button'>Add to Cart</button>")))            
        }
        


    } else {
        alert("HTTP-Error: " + response.status)
        console.log(response.status)
        let json = await response.json()
        console.log(json)
    }
}
async function removeFavItem(favID) {
    console.log("removeFavItem() triggered by -> " + favID)

    let response = await fetch("/favOrder",  {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "favID": favID
        })
    })
    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json()
        console.log(json)
        window.location.href = "./r_order.html";

    } else {
        alert("HTTP-Error: " + response.status)
        console.log(response.status)
        let json = await response.json()
        console.log(json)
    }

}
async function removePrevItem(prevID) {
    console.log("removePrevItem() triggered by -> " + prevID)

    let response = await fetch("/order",  {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "prevID": prevID
        })
    })
    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json()
        console.log(json)
        window.location.href = "./r_order.html";

    } else {
        alert("HTTP-Error: " + response.status)
        console.log(response.status)
        let json = await response.json() 
        console.log(json)
    }

}
async function addfavCartItem(favID) {
    //should remove that item from fav table
    console.log("addfavCartItem(favID) -> " + favID)
    console.log(favMap.get(favID))
    

/*
    let response = await fetch("/cart", {
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
        location.reload()
    } else {
        alert("HTTP-Error: " + response.status)
    }
*/


}

async function addprevCartItem(prevID) {
    //should remove that item from pizzaOrder table
    console.log("addprevCartItem(prevID) -> " + prevID)
    console.log(prevMap.get(prevID))
}