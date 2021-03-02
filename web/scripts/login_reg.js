function checkSignForm(form) {
    console.log("checkSignForm triggered!")

    
    var isSame = false;
    var email = $("#emailSign").val();
    var password = $("#pwdSign").val();
    console.log(email);
    console.log(password);
    if (password==="") {
        alert("Please Type Password!");
        isSame = false;
    } else {
        isSame = true;
    }

    if(isSame) {
        sign_in(email, password)
    }
    

    return isSame;
}

async function sign_in() {

    let encoded = window.btoa($("#uname").val() + ':' + $("#pwd").val())

    console.log($("#uname").val() + ':' + $("#pwd").val())
    console.log(encoded)

    let response = await fetch("/auth",  {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + encoded
        }
    })
    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json()
        console.log(json)

        if (json.success) {
            
            console.log(document.cookie)
        }
    } else {
        alert("HTTP-Error: " + response.status)
        console.log(response.status)
        let json = await response.json()
        console.log(json)
    }
}


function checkRegForm(form) {
    console.log("checkRegForm triggered!")

    var isSame = false;
    var pwd = $("#pwdReg").val();
    var cnfpwd = $("#cnfpwd").val();

    if (pwd===cnfpwd) {
        alert("Registered! Welcome to Kim's Pizzeria!");
        isSame = true;
    } else {
        alert("Confirm Password Does not Match With Your Password!");
        isSame = false;
    }

    if(isSame===false) {
        $("#cnfpwd").css(
            {
                "background-color": "red",
            }
        )
    }
    return isSame;
}