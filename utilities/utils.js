//Checks if a string exists and is not empty. Used for parameters.
function isProvided(param) {    
    return param !== undefined && param.length >= 0
}

function isSize(param) {
    return param === "10" || param === "12" || param === "14"
}

function isCrust(param) {
    return param === "Thin" || param === "Regular" || param === "Cheese"
}

function isCheese(param) {
    return param === "Parmesan" || param === "Mozzarella" || param === "Cheddar" || param === "Gouda"
}

function isSauce(param) {
    return param === "Marinara" || param === "Buffalo" || param === "Pesto" || param === "Garlic"
}


module.exports = { isProvided, isSize, isCrust, isCheese, isSauce }