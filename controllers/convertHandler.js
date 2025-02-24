function ConvertHandler() {
  /*this.getNum = function(input) {
      let regex = /[a-z]/i;
      let fractionRegex = /[/]/g;
      let result;
      
      let index=input.indexOf(input.match(regex));
      
      if(index==0){result=1}
      else{
        result = input.split("",index).join('');
        
        let fractionChecker = fractionRegex.test(result);
        if(fractionChecker===true){
          let doubleFractionMatch = result.match(fractionRegex);
          if(doubleFractionMatch.length!==1){
          result = undefined;
          }
          else{
            result=eval(result);        
           }
      }else{
          result=eval(result);
           }
      }
      return result;
    };*/
  /*
  this.getNum = function (inputArg) {
    let input = inputArg ? inputArg.trim() : '';
    if (input) {
      if (input.includes('/')) {
        let fractions = input.replace(/[a-z]/gi, '').split('/');
        if (fractions.length == 2) {
          return eval(
            (parseFloat(fractions[0]) / parseFloat(fractions[1])).toFixed(5)
          );
        }
      } else {
        let numMatch = input.match(/[\d\.]+/);
        return numMatch ? eval(numMatch[0]) : 1;
      }
    }

    return undefined;
  };*/

  
  
  this.getNum = function(input) {
    //console.log("test1")
    let number = (input.match(/[.\d\/]+/g) || ["1"])[0]
    let listNumbers = number.split("/");
    //console.log(listNumbers)
    //let notMoreThanOneDiv = true;
    if (listNumbers.length >= 3) listNumbers = false;
    if (!listNumbers) return undefined;
    // division
    let number1 = listNumbers[0];
    let number2 = listNumbers[1] || "1";
    
    if (isNaN(number1) || isNaN(number2)) return undefined;
    
    try{
      return parseFloat(number1) / parseFloat(number2);
    }
    catch (error){
      return undefined;
    }
      
    /*let result = parseFloat(number1) / parseFloat(number2);
    
    
    return result;*/
  };
  
  this.getUnit = function(input) {
    let unit = (input.match(/[a-zA-Z]+/g))[0].toLowerCase();
    
    switch (unit){
      case "km":
        return "km";
      case "gal":
        return "gal";
      case "lbs":
        return "lbs";
      case "mi":
        return "mi";
      case "l":
        return "L";
      case "kg":
        return "kg";
      default:
        return undefined;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    switch(initUnit){
      case "km":
        return "mi";
      case "mi":
        return "km";
      case "gal":
        return "L";
      case "L":
        return "gal";
      case "kg":
        return 'lbs'
      case "lbs":
        return "kg";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function(unit) {
    switch(unit){
      case "km":
        return "kilometers";
      case "mi":
        return "miles";
      case "gal":
        return "gallons";
      case "lbs":
        return "pounds";
      case "kg": 
        return "kilograms";
      case "L":
        return "liters";
      default:
        return "don't know";
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch(initUnit){
      case "km":
        result =  initNum / miToKm;
        break;
      case "mi":
        result =  initNum * miToKm;
        break;
      case "gal":
        result =  initNum * galToL;
        break;
      case "lbs":
        result =  initNum * lbsToKg;
        break;
      case "kg": 
        result =  initNum / lbsToKg;
        break;
      case "L":
        result =  initNum / galToL;
        break;
      default:
        result =  undefined;
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = initNum + " " + this.spellOutUnit(initUnit) + " converts to " + returnNum + " " + this.spellOutUnit(returnUnit);
    
    
    return result;
  };
  
}

module.exports = ConvertHandler;
