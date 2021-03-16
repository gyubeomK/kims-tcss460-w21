const isProvided = require('./utilities/exports').helpers.isProvided

/*
 * Express is the framework we're going to use to handle routing of HTTP Requests.
 * https://expressjs.com/ - a quick check in package.json shows Express 4.x
 */
const express = require('express')
//Create a new instance of express
const app = express()

/*
 * This project includes a user made module called middleware. It includes helpful
 * middleware functions. 
 */
let middleware = require('./middleware')

/*
 * This (3rd party) middleware function parses the HTTP Request Body into JSON. 
 * When the body exists but does not parse, an error is passed on to the next
 * function. 
 */
app.use(require("body-parser").json())

/*
 * This middleware function parses any HTTP Request cookies into JSON
 */
app.use(require('cookie-parser')())

/*
 * This middleware function will respond to improperly formed JSON in found in 
 * an HTTP Request BODY.
 */
app.use(middleware.jsonError)

/*
 * A simple Node.js endpoint that responds with HTML.
 */
app.use('/node', require('./routes/hello.js'))

app.use('/auth', require('./routes/signin.js'))

app.use('/auth', require('./routes/register.js'))

app.use("/api", express.static('apidoc'))

app.use('/demosql', require('./routes/demosql.js'))

app.use('/', require('./routes/demo_eps.js'))

app.use('/reverse', require('./routes/lab4.js'))

app.use('/order', middleware.checkTokenCookies, require('./routes/order.js'))

app.use('/favOrder', middleware.checkTokenCookies, require('./routes/favOrder.js'))

app.use('/cart', middleware.checkTokenCookies, require('./routes/cart.js'))


/*
 * When clients connect to the base URL, hosts html and other static files found 
 * in the web directory.
 */
app.use("/", express.static('web'))

/*
 * When clients connect to the base URL, hosts html and other static files found 
 * in the web directory.
 */
app.use("/r", middleware.checkTokenCookies, express.static('web_restricted'))

/*
 * Serve the API documentation generated by apidoc as HTML. 
 * https://apidocjs.com/
 */
app.use("/api", express.static('apidoc'))

app.use("/files", express.static('routes'))

/* 
* Heroku will assign a port you can use via the 'PORT' environment variable
* To access an environment variable, use process.env.<ENV>
* If there isn't an environment variable, process.env.PORT will be null (or undefined)
* If a value is 'falsy', i.e. null or undefined, javascript will evaluate the rest of the 'or'
* In this case, we assign the port to be 5000 if the PORT variable isn't set
* You can consider 'let port = process.env.PORT || 5000' to be equivalent to:
* let port; = process.env.PORT;
* if(port == null) {port = 5000} 
*/ 
app.listen(process.env.PORT || 5000, () => {
    console.log("Server up and running on port: " + (process.env.PORT || 5000));
});