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

    

    // 인풋 전부 다 정리 후, sql 데타 베이스에 넣기
    
}

//dealing with async function
async function getContent(endPoint) {
    console.log("end point URL: " + endPoint);
    let response = await fetch(endPoint);
    if(response.ok) {
        console.log("Response Ok");
        
        let json = await response.json();
        console.log("json message:" + json.message);
        $("#reverseInput").val(json.message);

        //Store
        localStorage.setItem("revOutput", json.message);
        sessionStorage.setItem("revOutput", json.message);
    } else {
        alert("HTTP-Error:" + response.status);
    }
}