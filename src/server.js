const express = require("express");
var router = express.Router();

const app = express();
var assert = require("assert");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var cors = require('cors');
app.use(cors());
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mydb';

app.post('/login', (req, res) => {
    console.log(req.body);
    var cust = req.body.user;       // user id  obtained from the UI
    var pass = req.body.password;    // password obtained from the UI
    var query = { custId: cust.toString() };

    MongoClient.connect(url, function (err, db) {
        var dbo = db.db("mydb");       // Connect to database with user details
        dbo.collection("customer").find(query).toArray(function (err, result) {//Query to get  password from db 
            if (result.length == 0 || err || pass != result[0].password) {
                res.send({
                    status: "FAILURE"
                })      // send failure status if  authentication fails
            }
            else {
                res.send({
                    status: "SUCCESS"
                })     // send success status if valid details are entered
            }
            console.log(result);
        });
    })
});

app.post('/home/prepaid', (req, res) => {
    let customer = req.body.user;    // get customer Id from UI
    var query = { custId: customer.toString() };
    MongoClient.connect(url, function (err, db) {    // connect to db with customer details
        var dbo = db.db("mydb");
        dbo.collection("prepaid").find(query).toArray(function (err, result) {    //search for prepaid details of the customer
            if (result.length == 0 || err) {
                res.send({
                    status: "0"    //prepaid details are null
                })
            }
            else {
                res.send({    // pass prepaid details to the UI
                    status: "1",    
                    customerID: result[0].custId,
                    balance: result[0].balance,
                    Today_view: {
                        "calls": result[0].Today_view.calls, "sms": result[0].Today_view.sms,
                        "data": result[0].Today_view.data
                    },
                    Monthly_view: {
                        "calls": result[0].Monthly_view.calls, "sms": result[0].Monthly_view.sms,
                        "data": result[0].Monthly_view.data
                    }
                })
            }
            console.log(result);
        });
    })
});

app.post('/home/postpaid', (req, res) => {
    let customer = req.body.user;

    var query = { custId: customer.toString() };
    MongoClient.connect(url, function (err, db) {
        var dbo = db.db("mydb");
        dbo.collection("postpaid").find(query).toArray(function (err, result) {
            if (result.length == 0 || err) {
                res.send({
                    status: "0"
                })
            }
            else {
                res.send({
                    status: "1",
                    customerID: result[0].custId,
                    bill: result[0].bill,
                    Today_view: { "calls": result[0].Today_view.calls, "sms": result[0].Today_view.sms, "data": result[0].Today_view.data },
                    Monthly_view: { "calls": result[0].Monthly_view.calls, "sms": result[0].Monthly_view.sms, "data": result[0].Monthly_view.data }
                })
            }
            console.log(result);

        });
    })
});

app.post('/home/landline', (req, res) => {
    let customer = req.body.user;

    var query = { custId: customer.toString() };
    MongoClient.connect(url, function (err, db) {
        var dbo = db.db("mydb");
        dbo.collection("landline").find(query).toArray(function (err, result) {
            if (result.length == 0 || err) {
                res.send({
                    status: "0"
                })
            }
            else {
                res.send({
                    status: "1",
                    customerID: result[0].custId,
                    bill: result[0].bill,
                    Today_view: { "calls": result[0].Today_view.calls },
                    Monthly_view: { "calls": result[0].Monthly_view.calls }
                })
            }
            console.log(result);

        });
    })
});

app.post('/home/internet', (req, res) => {
    let customer = req.body.user;
    var query = { custId: customer.toString() };
    MongoClient.connect(url, function (err, db) {
        var dbo = db.db("mydb");
        dbo.collection("internet").find(query).toArray(function (err, result) {
            if (result.length == 0 || err) {
                res.send({
                    status: "0"
                })
            }
            else {
                res.send({
                    status: "1",
                    customerID: result[0].custId,
                    bill: result[0].bill,
                    Today_view: { "data": result[0].Today_view.data },
                    Monthly_view: { "data": result[0].Monthly_view.data }
                })
            }
            console.log(result);
        });
    })
});

app.listen(8010);