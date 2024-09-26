const removeFromArray = function(array, remove1, remove2) {
    var i = 0;
    while (i < array.length) {
        if (array [i] === remove1) {
            array.splice(i, 1);
        }
        else {
            ++i
        }
    }
    return array
};



/*const index = array.indexOf(remove1);
if (index > -1) {
    array.splice(index, 1);
}
return array*/

// Do not edit below this line
module.exports = removeFromArray;
