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
 * @api {get} /orders Request to get all Order entries in the DB
 * @apiName GetOrders
 * @apiGroup Orders
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/orders
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
// router.get("/", (request, response) => {
//     // const theQuery = 
//     //     `SELECT My_Size, My_Color, Option1, Option2, Option3 
//     //      FROM Orders`

//     const theQuery = 
//         `SELECT My_Size, My_Color, Option1, Option2, Option3 
//          FROM Orders
//          WHERE MemberID=$1`
//     let values = [request.decoded.memberid]

//     // const theQuery = 
//     //     `SELECT * 
//     //      FROM Orders`

//     pool.query(theQuery, values)
//         .then(result => {
//             if (result.rowCount > 0) {


//                 //JWT into JSON token---------------------------------------------------------------------
//                 // let salt = result.rows[0].salt
//                 // //Retrieve our copy of the password
//                 // let ourSaltedHash = result.rows[0].password 
    
//                 // //Combined their password with our salt, then hash
//                 // let theirSaltedHash = getHash(request.auth.password, salt)
    
//                 // //Did our salted hash match their salted hash?
//                 // if (ourSaltedHash === theirSaltedHash ) {
//                 //     //credentials match. get a new JWT
//                 //     let token = jwt.sign(
//                 //         {
//                 //             "email": request.auth.email,
//                 //             "memberid": result.rows[0].memberid
//                 //         },
//                 //         config.secret,
//                 //         { 
//                 //             expiresIn: '14 days' // expires in 14 days
//                 //         }
//                 //     )
//                 //     response.cookie('access_token', 'Bearer ' + token,
//                 //         {
//                 //             expires: new Date(Date.now() + 14 * 24 * 60 * 60000),
//                 //             httpOnly: true
                            
//                 //         })
//                 //     //use this cookie client side to know if a user is signed in    
//                 //     response.cookie('authorized', true,
//                 //         {
//                 //             expires: new Date(Date.now() + 14 * 24 * 60 * 60000),
//                 //             //note this cookie is NOT httpOnly                   
//                 //             httpOnly: false     
//                 //         })
    
//                     //package and send the results
//                     // response.json({
//                     //     success: true,
//                     //     message: 'Authentication successful!',
//                     //     token: token
//                     // })

//                     // response.json({
//                     //     success: true,
//                     //     message: "Get /orders successful!",
//                     //     orders: result.rows,
//                     //     token: token
//                     // })

//                     response.send({
                        
//                         orders: result.rows,
//                         // JWT: request.headers.cookie,

//                         message: "/orders GET successful!"
//                     })                    

                    
//                 // } else {
//                 //     //credentials dod not match
//                 //     response.status(400).send({
//                 //         message: 'Credentials did not match' 
//                 //     })
//                 // }
//                 //----------------------------------------------------------------------------------------
                



//             } else {
//                 response.status(404).send({
//                     message: "No Orders"
//                 })
//             }
//         })
//         .catch(err => {
//             //log the error
//             // console.log(err.details)
//             response.status(400).send({
//                 message: err.detail
//             })
//         })
// })

/**
 * @api {post} /favOrders Request to Post all Order entries in the DB
 * @apiName PostOrders
 * @apiGroup Orders
 *
 * @apiHeader {String} authorization Valid JSON Web Token JWT 
 * 
 * @apiParamExample {json} Request-Query-Example:
 *     https://uwnetid-tcss460-w21.herokuapp.com/orders
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
        "INSERT INTO Cart(MemberID, Size, Crust, Cheese, Sauce, SecIng, ThirdIng, Total) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"
    let values = [memberid, size, crust, cheese, sauce, secIng, thirdIng, total]

    console.log("Here is the JSON")
    console.log("request.body.size: " + request.body.size)
    console.log(values)
    // console.log(request.body)

    // if(isProvided(size) && isProvided(crust) && isProvided(cheese) && isProvided(sauce) ) {
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


router.get("/", (request, response) => {
    const theQuery = 
        `SELECT CartID, Size, Crust, Cheese, Sauce, SecIng, ThirdIng, Total, PizzaType
        FROM Cart
        WHERE MemberID=$1`
    let values = [request.decoded.memberid]

    pool.query(theQuery, values)
        .then(result => {
            if (result.rowCount > 0) {
                    response.send({
                        
                        orders: result.rows,
                        

                        message: "/cart GET successful!"
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

router.delete("/", (request, response) => { 
    console.log("request.body.cartID" + request.body.cartID)
    if (request.body.cartID != null) {
        
        const theQuery = `DELETE FROM Cart WHERE CartID = $1 RETURNING *`    
        const values = [request.body.cartID]

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