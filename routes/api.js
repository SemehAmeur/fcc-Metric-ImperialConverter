'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  //app.route('/api/convert').get(function (req, res) {
  app.route("/api/convert").get((req, res)=>{
    let input = req.query.input;
    //console.log(req.query)
    let inputNumber = convertHandler.getNum(input);
    let inputUnit = convertHandler.getUnit(input);
    //console.log(input)
    //console.log("test", inputNumber, inputUnit)
    //res.json("test", inputNumber)
    //console.log(inputNumber)
    if (inputNumber === "invalid number"){
      //res.setHeader('Content-Type', 'text/plain');
      if(inputUnit === "invalid unit") res.json("invalid number and unit");
      res.json("invalid number")
    }
    if(inputUnit === "invalid unit") {
      //res.setHeader('Content-Type', 'text/plain');
      res.json("invalid unit")
      //console.log("****test*******" , res.text)
    }
    //console.log({inputNumber, inputUnit})
    let initNum = inputNumber;
    let initUnit = inputUnit;
    let returnNumber = convertHandler.convert({initNum, initUnit});
    let returnUnit = convertHandler.getReturnUnit(inputUnit);
    let theMessage = convertHandler.getString(inputNumber, inputUnit, returnNumber, returnUnit);
    res.json({initNum: inputNumber, initUnit:inputUnit, returnNum: returnNumber, returnUnit:returnUnit, string: theMessage}) 
    /*if (!inputNumber && !inputUnit) res.send("invalid number and unit");
    else if (!inputNumber) res.send('invalid number');
    else if (!inputUnit) res.send("invalid unit");
    else{
      let returnNumber = convertHandler.convert(inputNumber, inputUnit);
      let returnUnit = convertHandler.getReturnUnit(inputUnit);
      let theMessage = convertHandler.getString(inputNumber, inputUnit, returnNumber, returnUnit);
      res.json({initNum: inputNumber, initUnit:inputUnit, returnNum: returnNumber, returnUnit:returnUnit, string: theMessage})
    }*/
  });
  /*app.route("/api/convert").get((req, res)=>{
    console.log(req.query.input)
  })*/
  //console.log("--------1", res.body)

};
