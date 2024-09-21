const repeatString = function (word, runs) {
    if (runs < 0) return "ERROR";
    let string = "";
    for (let i = 0; i < runs; i++) {
      string += word;
    }
    return string;
  };
  


// Do not edit below this line
module.exports = repeatString;
