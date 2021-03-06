//express is the framework we're going to use to handle requests
const express = require('express')

const router = express.Router()
 
const pool = require('../utilities/exports').pool

const isProvided = require('../utilities/exports').helpers.isProvided
const isSizeValid = require('../utilities/exports').helpers.isSize
const isCrustValid = require('../utilities/exports').helpers.isCrust
const isCheeseValid = require('../utilities/exports').helpers.isCheese
const isSauceValid = require('../utilities/exports').helpers.isSauce

//Import necessary code from signin.js-----------------------------------------------------------------
const getHash = require('../utilities/exports').getHash

//Pull in the JWT module along with out a secret key
const jwt = require('jsonwebtoken')
const config = {
    secret: process.env.JSON_WEB_TOKEN
}
//-----------------------------------------------------------------------------------------------------





/**
 * @apiDefine JSONError
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 */ 

/**
 * @api {get} /order Request to get all Order entries in the DB
 * @apiName GetOrder
 * @apiGroup Order
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://kims-tcss460-w21.herokuapp.com/orders
 * 
 * @apiSuccess {Object[]} orders List of Orders in the database
 * 
 * @apiError (404: No Orders Found) {String} message "No Orders"
 * @apiError (400: JSON Error) {String} message "malformed JSON in parameters"
 * @apiError (403: JSON Error) {String} message "Token is not valid" when a JWT is provided but it is expired or otherwise not valid
 * @apiError (401: JSON Error) {String} message "Auth token is not supplied" when a JWT is not provided or it is provided in an incorrect format
 * 
 * @apiUse JSONError
 */ 
router.get("/", (request, response) => {

    const theQuery = 
        `SELECT OrderID, Size, Crust, Cheese, Sauce, SecIng, ThirdIng, Total 
         FROM PizzaOrder
         WHERE MemberID=$1`
    let values = [request.decoded.memberid]    
    pool.query(theQuery, values)
        .then(result => {
            if (result.rowCount > 0) {




                    response.send({
                        
                        orders: result.rows,
                        

                        message: "/orders GET successful!"
                    })                    

                



            } else {
                response.status(404).send({
                    message: "No Orders"
                })
            }
        })
        .catch(err => {
            //log the error
            // console.log(err.details)
            response.status(400).send({
                message: err.detail
            })
        })
})

/**
 * @api {post} /order Request to Post all Order entries in the DB
 * @apiName PostOrder
 * @apiGroup Order
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://kims-tcss460-w21.herokuapp.com/order
 * 
 * @apiSuccess {Object[]} orders List of Orders in the database
 * 
 * @apiError (400: Input Error) {String} message "Invalid Parameters"
 * @apiError (400: Missing Parameters) {String} message "Missing Parameters"
 
 * 
 * @apiUse JSONError
 */ 
router.post('/', (request, response) => {


    const memberid = request.decoded.memberid
    const size = request.body.size
    const crust = request.body.crust
    const cheese = request.body.cheese
    const sauce = request.body.sauce
    const secIng = request.body.secIng
    const thirdIng = request.body.thirdIng
    const total = request.body.total
    // console.log("size: " + size)

    const theQuery = 
        "INSERT INTO PizzaOrder(MemberID, Size, Crust, Cheese, Sauce, SecIng, ThirdIng, Total) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"
    let values = [memberid, size, crust, cheese, sauce, secIng, thirdIng, total]

    console.log("Here is the JSON")
    console.log("request.body.size: " + request.body.size)
    console.log(values)
    // console.log(request.body)

    if(isProvided(size) && isProvided(crust) && isProvided(cheese) && isProvided(sauce) && (total > 0)) {
    
        if(isSizeValid(size) && isCrustValid(crust) && isCheeseValid(cheese) && isSauceValid(sauce)) {
            pool.query(theQuery, values).then(result => {
                response.status(201).send({
                    success: true,
                    message: "Order Finished"
                })
            })
            .catch(err => {
                console.log(err)
                response.status(400).send({
                    message: err.detail
                })
            })
        } else {
            response.status(400).send({
                message: "Invalid Parameters"
            })
        }
    } else {
        response.status(400).send({
            message: "Missing Parameters"
        })
    }
})


/**
 * @api {delete} /order Request to Delete Distict Entry
 * @apiName DeleteOrder
 * @apiGroup Orders
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://kims-tcss460-w21.herokuapp.com/orders
 * 
 * @apiSuccess {Object[]} orders List of Orders in the database
 * 
 * @apiError (400: Input Error) {String} message "Invalid Parameters"
 * @apiError (400: Missing Parameters) {String} message "Missing Parameters"
 * @apiError (404: Missing Parameters) {String} message "Name not found"
 * 
 * @apiUse JSONError
 */ 

router.delete("/", (request, response) => { 
    console.log("request.body.prevID " + request.body.prevID)
    if (request.body.prevID != null) {
        const theQuery = `DELETE FROM PizzaOrder WHERE OrderID = $1 RETURNING *`    
        const values = [request.body.prevID]

        pool.query(theQuery, values)
            .then(result => {
                if (result.rowCount == 1) {
                    response.send({
                        success: true,
                        message: "Deleted: " + result.rows[0].name
                    })
                } else {
                    response.status(404).send({
                        message: "Name not found"
                    })
                }
            })
            .catch(err => {
                //log the error
                // console.log(err)
                response.status(400).send({
                    message: err.detail
                })
            }) 
    } else {
        response.status(400).send({
            message: "Missing required information"
        })
    }     
})

module.exports = router