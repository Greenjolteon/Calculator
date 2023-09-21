/*
Variable Calculator:
Install Node/npm X (at home)

separate the equation using the same method
Ask for an equation equal to 0
solve for x using opposites
*/

function graph() {
    let input = document.form2.input2;
	let array = input.value.match(/([0-9.]+|[+\-*^/()√!]|x|log|ln|sin|cos|tan|sinh|cosh|tanh|π|e)/g);
    console.log(array + "= 0");

    for (let l=0; l<array.length; l++) {if ((constCheck(array[l]) !== array[l]) && isDigit(array[l - 1])) {array.splice(l, 0, '*');}}
	console.log("Array: " + array);

	const precedence = {'^': 4,  '√': 3, 'sin': 3, 'cos': 3, 'tan': 3, 'sinh': 3, 'cosh': 3, 'tanh': 3, 'log': 3, 'ln': 3, '!': 3, '*': 2, '/': 2, '+': 1, '-': 1,};
	//put all functions not in emdas between ^ and *

	const associative = {'^': 0,  '√': 1, 'sin': 1, 'cos': 1, 'tan': 1, 'sinh': 1, 'cosh': 1, 'tanh': 1, 'log': 1, 'ln': 1, '!': 1, '*': 1, '/': 1, '+': 1, '-': 1,};

	//change from normal equation to RPN

	let output = [];
	let stack = [];

	for (let j = 0; j < array.length; j++) {
		let x = array[j];
		if (isDigit(x) || x == 'x') {
			output.push(constCheck(x));
		} else if (x == '(') {
			stack.push(x);
		} else if (isOperator(x)) {
			while ((isOperator(stack[stack.length - 1])) && (stack.length > 0) &&
				(associative[x] === 1 && precedence[x] <= precedence[stack[stack.length - 1]]) ||
				(associative[x] === 0 && precedence[x] < precedence[stack[stack.length - 1]])) {
				output.push(stack.pop());
			}
			stack.push(x);
		} else if (x == ')') {
			while (stack[stack.length - 1] !== '(') {
				output.push(stack.pop());
			}
			stack.pop();
		}
	}
	while (stack.length > 0) {
		output.push(stack.pop());
	}

console.log("Final Output in RPN: " + output);

let solution = 0;

for (let i=0; i<output.length; i++) {
  switch (output[i]) {
    case '+':
      solution -= parseFloat(output[i-1]);
      break;
    case '-':
      solution += parseFloat(output[i-1]);
      break;
    case '*':
      solution /= parseFloat(output[i-1]);
      break;
    case '/':
      solution *= parseFloat(output[i-1]);
      break;
    case '^':
      solution ** (1/parseFloat(output[i-1]));
      break;
    default:
      break;
  }
}

console.log("Solution: x=" + solution);
}

function constCheck(t) {
	if (t == 'e') {
		return Math.E;
	} else if (t == 'π') {
		return Math.PI;
	} 
	return t;
}

function isDigit(num) {
	return (!isNaN(constCheck(num)) && isFinite(constCheck(num)))
}

function isOperator(op) {
	return (
		op == '+' ||
		op == '-' ||
		op == '*' ||
		op == '/' ||
		op == '^' ||
		op == '√' ||
		op == 'sin' ||
		op == 'cos' ||
		op == 'tan' ||
		op == 'sinh' ||
		op == 'cosh' ||
		op == 'tanh' ||
		op == 'log' ||
		op == 'ln' ||
		op == '!'
	)
}
