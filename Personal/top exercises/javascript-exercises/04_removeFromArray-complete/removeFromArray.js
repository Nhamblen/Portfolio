const removeFromArray = function(array, ...remove) {
     // array = original array to manipulate
 
     // Use filter to create a new array that excludes the values passed in with remove
     return array.filter(item => !remove.includes(item));
};


// Do not edit below this line
module.exports = removeFromArray;
