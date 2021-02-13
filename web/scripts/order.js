function initialTotal() {
    console.log("initial total triggered")
    document.getElementById("subTotal").innerHTML = "Current Total: $20"
}

function totalCalculation() {
    //console.log("total calculation triggered")
    let total = 0

    let sizeInput = document.querySelector('input[name = "size"]:checked').value;
    let sizeCost = sizePrice(sizeInput)
    console.log("Size Cost: " + sizeCost)
    total += sizeCost

    let crustInput = document.querySelector('input[name = "crust"]:checked').value;
    let crustCost = crustPrice(crustInput)
    console.log("Crust Cost: " + crustCost)
    total += crustCost

    let cheeseInput = document.querySelector('input[name = "cheese"]:checked').value;
    let cheeseCost = cheesePrice(cheeseInput)
    console.log("Cheese Cost: " + cheeseCost)
    total += cheeseCost

    let sauceInput = document.querySelector('input[name = "sauce"]:checked').value;
    let sauceCost = saucePrice(sauceInput)
    console.log("Sauce Cost: " + sauceCost)
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


function order() {
    console.log("order triggered")

    let sizeInput = document.querySelector('input[name = "size"]:checked').value;
    //console.log(sizeInput)

    let crustInput = document.querySelector('input[name = "crust"]:checked').value;
    //console.log(crustInput)

    let cheeseInput = document.querySelector('input[name = "cheese"]:checked').value;
    //console.log(cheeseInput)

    let sauceInput = document.querySelector('input[name = "sauce"]:checked').value;
    //console.log(sauceInput)


    var secIngredientInput = [];
    $("input:checkbox[name=secIng]:checked").each(function(){
        secIngredientInput.push($(this).val());
    });
    //console.log(secIngredientInput.toString())

    // for(i = 0; i < secIngredientInput.length; i++) {
    //     console.log(secIngredientInput[i]);
    // }

    var thirdIngredientInput = [];
    $("input:checkbox[name=thirdIng]:checked").each(function(){
        thirdIngredientInput.push($(this).val());
    });

    for(i = 0; i < thirdIngredientInput.length; i++) {
        console.log(thirdIngredientInput[i]);
    }
    // getContent()

    // 인풋 전부 다 정리 후, sql 데타 베이스에 넣기



}



//dealing with async function
// async function getContent() {
    
//     let endPoint = "http://localhost:5000/order"; //need to be changed later


//     console.log("end point URL: " + endPoint);
//     let response = await fetch(endPoint,  {
//         method: 'GET',
//         // headers: {
//         //     'Content-Type': 'application/json;charset=utf-8'
//         // }//,
//         // body: JSON.stringify({'phrase':palinInput,
//         //                       'strict':strictInput})
//     })
//     if (response.ok) { // if HTTP-status is 200-299
//         // get the response body (the method explained below)
//         let json = await response.json()
        
//         console.log(json.isPalindrome)

//         //here use if/else to change the color of the input box
//         if(json.isPalindrome) {
//             $("#palinInput").css("color", "white")
//             $("#palinInput").css("background-color", "green")
//         } else {
//             $("#palinInput").css("color", "white")
//             $("#palinInput").css("background-color", "red")
//         }

        
//     } else {
//         alert("HTTP-Error: " + response.status)
//     }
// }