const sumAll = function(add1, add2) {

    // Total variable to store the final value
    let total = 0;  

    try {

        // Check for non-numbers
        if (typeof add1 !== 'number' || typeof add2 !== 'number') {
            throw new Error;
        }

        // Check for negative numbers
        if (add1 < 0 || add2 < 0) {
            throw new Error;
        }

        // Check for non-integers
        if (!Number.isInteger(add1) || !Number.isInteger(add2)) {
            throw new Error;
        }

        // Always loop through the smaller to larger number and add them to the total
        for (let i = Math.min(add1, add2); i <= Math.max(add1, add2); i++) {
            total += i;
        }
    }
    catch (Error) {
        return "ERROR";
    }
    return total;
};

// Do not edit below this line
module.exports = sumAll;
