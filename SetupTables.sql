DROP TABLE IF EXISTS Members CASCADE;
CREATE TABLE Members (MemberID SERIAL PRIMARY KEY,
                      FirstName VARCHAR(255) NOT NULL,
		              LastName VARCHAR(255) NOT NULL,
                    --   Username VARCHAR(255) NOT NULL UNIQUE,
                      Email VARCHAR(255) NOT NULL UNIQUE,
                      Password VARCHAR(255) NOT NULL,
                      SALT VARCHAR(255),
                      Verification INT DEFAULT 0
);


DROP TABLE IF EXISTS Demo;
CREATE TABLE Demo (DemoID SERIAL PRIMARY KEY,
                        Name VARCHAR(255) NOT NULL UNIQUE,
                        Message VARCHAR(255)
);

DROP TABLE IF EXISTS PizzaOrder;
CREATE TABLE PizzaOrder (OrderID SERIAL PRIMARY KEY,
                    -- PizzaName VARCHAR(255) NOT NULL,
                    Size VARCHAR(255) NOT NULL,
                    Crust VARCHAR(255) NOT NULL,
                    Cheese VARCHAR(255) NOT NULL,
                    Sauce VARCHAR(255) NOT NULL,
                    SecIng VARCHAR(255) NOT NULL,
                    ThirdIng VARCHAR(255) NOT NULL,
                    Total INT
);

DROP TABLE IF EXISTS FavPizza;
CREATE TABLE FavPizza (FavPizzaID SERIAL PRIMARY KEY,
                    -- PizzaName VARCHAR(255) NOT NULL,
                    Size VARCHAR(255) NOT NULL,
                    Crust VARCHAR(255) NOT NULL,
                    Cheese VARCHAR(255) NOT NULL,
                    Sauce VARCHAR(255) NOT NULL,
                    SecIng VARCHAR(255) NOT NULL,
                    ThirdIng VARCHAR(255) NOT NULL,
                    Total INT
);

DROP TABLE IF EXISTS Cart;
CREATE TABLE Cart (CartID SERIAL PRIMARY KEY,
                    -- PizzaName VARCHAR(255) NOT NULL,
                    Size VARCHAR(255) NOT NULL,
                    Crust VARCHAR(255) NOT NULL,
                    Cheese VARCHAR(255) NOT NULL,
                    Sauce VARCHAR(255) NOT NULL,
                    SecIng VARCHAR(255) NOT NULL,
                    ThirdIng VARCHAR(255) NOT NULL,
                    Total INT
);