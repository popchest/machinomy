"use strict";

var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var machinomy = require("./index");
var web3 = machinomy.web3;

var ADDRESS = "0xC4F4CF50dA56b511968e4f72e54780afC16404f9"; // Actually "Account 2" on Mac machine

web3.personal.unlockAccount(ADDRESS, "G6cKyE8pBvMPhuo", 1000);

var paywall = new machinomy.Paywall(ADDRESS);

app.use(bodyParser.json());
app.use(paywall.middleware());

app.get("/resource", paywall.guard(1000, function (req, res) {
    res.send("Hello, world!");
}));

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});