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

    // window.location.reload

    // window.location.href = window.location.href;
 
    



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
        

    } else {
        console.log("authorized cookie does exists"); //logged-in
        //$("#navSignInBtn").remove()
        $("#navUsername").html("Welcome! " + localStorage.getItem("email"))    
        var temp = document.getElementById("navSignOutBtn");
        temp.style.display = 'block'



    }

    if(document.cookie.indexOf('authorized') == -1 ) {
        alert("You need to be signed in to see your favorite and previous orders.")
    } else {
        getFavOrders()
        getPrevOrders()
    }
    
}
async function getFavOrders() {

    let response = await fetch("/favOrder",  {
        method: 'GET',
        // headers: {
        //     "Content-Type" : "application/json;charset=utf-8"
        // }
    })
    if (response.ok) { 
        let json = await response.json()
        console.log(json)
        


    } else {
        alert("HTTP-Error: " + response.status)
        console.log(response.status)
        let json = await response.json()
        console.log(json)
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
        


    } else {
        alert("HTTP-Error: " + response.status)
        console.log(response.status)
        let json = await response.json()
        console.log(json)
    }
}