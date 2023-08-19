// Click on number
// Number displays in area
// User can't type in the area

function numapp(item) {
    let input = document.form.output;
    input.value += item;
    }

function reset() {
    let input = document.form.output;
    input.value = "";
}

function equate() {
    let input = document.form.output;
    let inputValue = input.value;
    let result = eval(inputValue);
    input.value = result;
}