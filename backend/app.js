//hold the express app
const express = require('express');
const User = require('./models/user');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
require('dotenv/config');

app.use(bodyParser.json()); //makes sure we can work with the response

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database");
    })
    .catch(() => {
        console.log("Connection failed");
    });


//makes sure we can work with the response

app.use((req, res, next) => {
    /*
  Who has the access to the server :
 1. * - all
 2.  <origin> - Specifies an origin. Only a single origin can be specified.
  Access-Control-Allow-Origin: https://developer.mozilla.org
 3.  null - Specifies the origin "null" - null should not be used

  */
    res.setHeader("Access-Control-Allow-Origin", "*");

    /*
    to ​indicate which HTTP headers can be used during the actual request.

    */

    res.setHeader(
        "Access-Control-Allow-Headers",
        "*"
    );

    /*
    let the server know which HTTP method will be used when the actual request is made.
    */
    res.setHeader(
        "Access-Control-Allow-Methods",
        "*"
    );
    next();
});





//checking if userName and password are the same as in our mongodb. sending result.
app.post('/login', (req, res, next) => {
    const userName = req.body.userName;
    const userPassword = req.body.userPassword;

    User.findOne({ userName: userName, userPassword: userPassword }, function(err, existingUser) {
        if (existingUser == null) {
            res.send({ result: "fail" });
        } else {
            let payload = { subject: existingUser._id }
            let token = jwt.sign(payload, 'secretKey')
            res.send({ token });
        }
    })
})

// func to create a new user in to our mongodb
app.post('/register', (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const userName = req.body.userName;
    const userPassword = req.body.userPassword;

    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.userName = userName;
    user.userPassword = userPassword;


    User.findOne({ userName: userName }, function(err, existingUser) {
        if (existingUser == null) {
            user.save((err, result) => {
                if (err) {
                    console.log("there is an error in adding user to database");
                    res.send({ result: "fail" });
                } else {
                    console.log("user created!");
                    res.send({ result: "success" });
                }
            })
        } else {
            res.send({ result: "fail. username exists" });

        }
    })
})


// func to show all users an port 3000/login

app.get('/', async(req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err })
    }
});



module.exports = app;