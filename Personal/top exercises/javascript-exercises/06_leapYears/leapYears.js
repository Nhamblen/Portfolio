const leapYears = function(year) {
    // Checks if the year is divisible by 4, 400, or not divisible by 100 (leap years)
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        return true;
    }
    else {
        return false;
    }
};

// Do not edit below this line
module.exports = leapYears;
