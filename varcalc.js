/*
Variable Calculator:
Install Node/npm X (at home)

separate the equation using the same method
Ask for an equation equal to 0
solve for x using opposites
*/

function graph() {
    let input = document.form.input;
	let array = input.value.match(/([0-9.]+|[+\-*^/()√!]|x|log|ln|sin|cos|tan|sinh|cosh|tanh|π|e)/g);
    console.log(array + "= 0");
}
