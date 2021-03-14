//GLOBAL
function initialLoad() {
    
    //-----Put this into else()
    
    
    
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


}

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

async function sign_in(email, password) {
    console.log("sign_in triggered")

    // let encoded = window.btoa($("#uname").val() + ':' + $("#pwd").val())
    let encoded = window.btoa(email + ':' + password)

    // console.log($("#uname").val() + ':' + $("#pwd").val())
    console.log(encoded)

    let response = await fetch("/auth",  {
        method: "GET",
        headers: {
            "Authorization": "Basic " + encoded
        }
    })

    console.log("Response: " + response.ok) 

    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json()
        console.log(json)

        if (json.success) {
            
            console.log(json.token)
            console.log(document.cookie)
            
            localStorage.setItem("email", email);
            
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


    //getting all the inputs
    var firstName = $("#firstName").val();
    var lastName = $("#lastName").val();
    var email = $("#emailReg").val();
    var pwd = $("#pwdReg").val();
    var cnfpwd = $("#cnfpwd").val();


    console.log("firstName: " + firstName)
    console.log("lastName: " + lastName)
    console.log("emailReg: " + email)
    console.log("pwd: " + pwd)
    console.log("cnfpwd: " + cnfpwd)


    if (pwd===cnfpwd) {
        //initiaite register http requst
        register(firstName, lastName, email, pwd)

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

async function register(first, last, email, pwd) {
    console.log("register triggered")

    let response = await fetch("/auth", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            "first": first,
            "last": last,
            "email": email,
            "password": pwd
        })
    })
    
    if(response.ok) {
        let json = await response.json()
        location.reload()
    } else {
        alert("HTTP-Error: " + response.status)
    }
   

}
async function signOut() {
    console.log("signOut() triggered")
}