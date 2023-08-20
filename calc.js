// Click on number
// Number displays in area
// User can't type in the area

function numapp(item) {
    let input = document.form.input;
    input.value += item;
    }

function reset() {
    let input = document.form.input;
    input.value = "";
}

function equate() {
    let input = document.form.input;
    let output = document.form.output;
    let inputValue = input.value; // Retrieve the input value
    let array = [];
    //separate the numbers and operators
    for (let i = 0; i < inputValue.length; i++) {
        if (isDigit(inputValue[i])) {
            if (isDigit(inputValue[i - 1]) && i !== 0) {
                array[array.length - 1] = array[array.length - 1].concat(inputValue[i]);
            } 
            else {
                array.push(inputValue[i]);
            }
        } 
        else {
            array.push(inputValue[i]);
        };
    }
    //MD
    for (let j = 0; j < array.length; j++) {
        if ((array[j] === '*') || (array[j] === '/')) {
            let num1 = Number(array[j - 1]);
            let num2 = Number(array[j + 1]);
            if (array[j] === '*') {
                array[j - 1] = (num1 * num2).toString();
            }
            if (array[j] === '/') {
                array[j - 1] = (num1 / num2).toString();
            }
            array.splice(j, 2);
            j--;
        }
    }
    //AS
    for (let j = 0; j < array.length; j++) {
        if ((array[j] === '+') || (array[j] === '-')) {
            let num1 = Number(array[j - 1]);
            let num2 = Number(array[j + 1]);
            if (array[j] === '+') {
                array[j - 1] = (num1 + num2).toString();
            }
            if (array[j] === '-') {
                array[j - 1] = (num1 - num2).toString();
            }
            array.splice(j, 2);
            j--;
        }
    }
    output.value = array[0];
}

//checks if a character inputted is a digit, so that it knows when a number starts and ends
//without this, the equate() function can't separate the numbers from the operators
function isDigit(character) {
    if ((Number(character) >= 0) && (Number(character) <= 9)) {
        return true;
    } else {
        return false;
    }
  }

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        equate()
    }
});
