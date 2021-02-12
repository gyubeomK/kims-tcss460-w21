function checkSignForm(form) {
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
    return isSame;
}

function checkRegForm(form) {
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