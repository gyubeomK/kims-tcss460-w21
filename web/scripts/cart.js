function addFavOrder() {
    console.log("add fav triggered")

    $("#favBtn").click(function(){
        $("#buttonAlert").addClass('show') //Shows Bootstrap alert
    })

    $("#btn").click(function(){
        console.log("Size from cart: " + localStorage.getItem("size"));
    })
    

}

