define({ "api": [
  {
    "type": "get",
    "url": "/auth",
    "title": "Request to sign a user in the system",
    "name": "GetAuth",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>&quot;username:password&quot; uses Basic Auth</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the name is found and password matches</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Authentication successful!</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JSON Web Token</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing required information&quot;</p>"
          }
        ],
        "404: User Not Found": [
          {
            "group": "404: User Not Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;User not found&quot;</p>"
          }
        ],
        "400: Invalid Credentials": [
          {
            "group": "400: Invalid Credentials",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Credentials did not match&quot;</p>"
          }
        ],
        "400: SQL Error": [
          {
            "group": "400: SQL Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>the reported SQL error details</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/signin.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth",
    "title": "Request to register a user",
    "name": "PostAuth",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first",
            "description": "<p>a users first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last",
            "description": "<p>a users last name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>a users email *required unique</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>a users password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Body-Example:",
          "content": "{\n    \"first\":\"Charles\",\n    \"last\":\"Bryan\",\n    \"email\":\"cfb3@fake.email.coc\",\n    \"password\":\"test12345\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the name is inserted</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>the email of the user inserted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing required information&quot;</p>"
          }
        ],
        "400: Username exists": [
          {
            "group": "400: Username exists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Username exists&quot;</p>"
          }
        ],
        "400: Email exists": [
          {
            "group": "400: Email exists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Email exists&quot;</p>"
          }
        ],
        "400: SQL Error": [
          {
            "group": "400: SQL Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>the reported SQL error details</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/register.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/orders",
    "title": "Request to get all Order entries in the DB",
    "name": "GetOrders",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/orders",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "orders",
            "description": "<p>List of Orders in the database</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404: No Orders Found": [
          {
            "group": "404: No Orders Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;No Orders&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/cart.js",
    "groupTitle": "Orders"
  },
  {
    "type": "get",
    "url": "/favOrders",
    "title": "Request to get all Order entries in the DB",
    "name": "GetOrders",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/orders",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "orders",
            "description": "<p>List of Orders in the database</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404: No Orders Found": [
          {
            "group": "404: No Orders Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;No Orders&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/favOrder.js",
    "groupTitle": "Orders"
  },
  {
    "type": "get",
    "url": "/orders",
    "title": "Request to get all Order entries in the DB",
    "name": "GetOrders",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/orders",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "orders",
            "description": "<p>List of Orders in the database</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404: No Orders Found": [
          {
            "group": "404: No Orders Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;No Orders&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/order.js",
    "groupTitle": "Orders"
  },
  {
    "type": "post",
    "url": "/favOrders",
    "title": "Request to Post all Order entries in the DB",
    "name": "PostOrders",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/orders",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "orders",
            "description": "<p>List of Orders in the database</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Input Error": [
          {
            "group": "400: Input Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Invalid Parameters&quot;</p>"
          }
        ],
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing Parameters&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/cart.js",
    "groupTitle": "Orders"
  },
  {
    "type": "delete",
    "url": "/cart",
    "title": "Request to Delete Distict Entry",
    "name": "PostOrders",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/orders",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "orders",
            "description": "<p>List of Orders in the database</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Input Error": [
          {
            "group": "400: Input Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Invalid Parameters&quot;</p>"
          }
        ],
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing Parameters&quot;</p>"
          }
        ],
        "404: Missing Parameters": [
          {
            "group": "404: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Name not found&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/cart.js",
    "groupTitle": "Orders"
  },
  {
    "type": "post",
    "url": "/favOrders",
    "title": "Request to Post all Order entries in the DB",
    "name": "PostOrders",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/orders",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "orders",
            "description": "<p>List of Orders in the database</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Input Error": [
          {
            "group": "400: Input Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Invalid Parameters&quot;</p>"
          }
        ],
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing Parameters&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/favOrder.js",
    "groupTitle": "Orders"
  },
  {
    "type": "delete",
    "url": "/favOrders",
    "title": "Request to Delete Distict Entry",
    "name": "PostOrders",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/orders",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "orders",
            "description": "<p>List of Orders in the database</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Input Error": [
          {
            "group": "400: Input Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Invalid Parameters&quot;</p>"
          }
        ],
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing Parameters&quot;</p>"
          }
        ],
        "404: Missing Parameters": [
          {
            "group": "404: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Name not found&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/favOrder.js",
    "groupTitle": "Orders"
  },
  {
    "type": "post",
    "url": "/orders",
    "title": "Request to Post all Order entries in the DB",
    "name": "PostOrders",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/orders",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "orders",
            "description": "<p>List of Orders in the database</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Input Error": [
          {
            "group": "400: Input Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Invalid Parameters&quot;</p>"
          }
        ],
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing Parameters&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/order.js",
    "groupTitle": "Orders"
  },
  {
    "type": "delete",
    "url": "/order",
    "title": "Request to Delete Distict Entry",
    "name": "PostOrders",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://uwnetid-tcss460-w21.herokuapp.com/orders",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "orders",
            "description": "<p>List of Orders in the database</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Input Error": [
          {
            "group": "400: Input Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Invalid Parameters&quot;</p>"
          }
        ],
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing Parameters&quot;</p>"
          }
        ],
        "404: Missing Parameters": [
          {
            "group": "404: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Name not found&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/order.js",
    "groupTitle": "Orders"
  }
] });
