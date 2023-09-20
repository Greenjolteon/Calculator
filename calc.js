//Add thing where and int next to parentheses add a multiplication sign in between
//Example: 999(e) returns error
//Also ass thing similar to the fractions, such as if the solution is √7, return √7, not 2.6457513111

function numapp(item) {document.form.input.value += item;}

function reset() {let input = document.form.input.value = "";}

document.addEventListener("keydown", (function(e) {"Enter" === e.key && equate()}));

function equate() {
	let input = document.form.input;
	let out = document.form.output;
	let array = input.value.match(/([0-9.]+|[+\-*^/()√!]|log|ln|sin|cos|tan|sinh|cosh|tanh|π|e)/g);

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
		if (isDigit(x)) {
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

	//Now, solve using the RPN

	for (let q = 0; q < output.length; q++) {
		let y = output[q];
		if (isOperator(y)) {
			let num1 = stack.pop();
			if (y === '√') {
				stack.push(Math.sqrt(num1));
			} else if (y === 'sin') {
				stack.push(Math.sin(num1));
			} else if (y === 'cos') {
				stack.push(Math.cos(num1));
			} else if (y === 'tan') {
				stack.push(Math.tan(num1));
			} else if (y == 'log') {
				stack.push(Math.log10(num1));
			} else if (y == 'ln') {
				stack.push(Math.log(num1));
			} else if (y == 'sinh') {
				stack.push(Math.sinh(num1));
			} else if (y == 'cosh') {
				stack.push(Math.cosh(num1));
			} else if (y == 'tanh') {
				stack.push(Math.tanh(num1));
			} else if (y == '!') {
				stack.push(factorial(num1));
			} else {
				const num2 = stack.pop();
				switch (y) {
					case '+':
						stack.push(num2 + num1);
						break;
					case '-':
						stack.push(num2 - num1);
						break;
					case '*':
						stack.push(num2 * num1);
						break;
					case '/':
						stack.push(num2 / num1);
						break;
					case '^':
						stack.push(num2 ** num1);
						break;
				}
			}
		} else {
			stack.push(parseFloat(y));
		}
		console.log("token: " + y);
		console.log("stack: [" + stack + "]");
	}

	floatnumCorrect(stack);

	if (stack.length > 1) {
		out.value = "Error";
	} else {
		out.value = stack[0];
	}
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

function constCheck(t) {
	if (t == 'e') {
		return Math.E;
	} else if (t == 'π') {
		return Math.PI;
	}
	return t;
}

function concatenate(array, thing, times) {
	for (let c = 0; c < times; c++) {
		array[thing - 1] = array[thing - 1].concat(array[thing]);
		array.splice(thing, 1);
	}
}

function factorial(num) {
	if (num === 0 || num === 1)
	  return 1;
	for (var i = num - 1; i >= 1; i--) {
	  num *= i;
	}
	return num;
  }

function floatnumCorrect(array) {
	//constant check time
	if (Math.abs(array[0] - Math.E) < (10 ** -10)) {
		array[0] = 'e ≈ 2.718281828459045';
	} else if (Math.abs(array[0] - Math.PI) < (10 ** -10)) {
		array[0] = 'π ≈ 3.141592653589793';
	} else if (Math.abs(array[0] - Math.SQRT2) < (10 ** -10)) {
		array[0] = '√2 ≈ 1.4142135623730951';
	} else if (Math.abs(array[0] - Math.SQRT1_2) < (10 ** -10)) {
		array[0] = '√2/2 ≈ 0.7071067811865476';
	} else if (Math.abs(array[0] - Math.LN2) < (10 ** -10)) {
		array[0] = 'ln(2) ≈ 0.6931471805599453';
	} else if (Math.abs(array[0] - Math.LN10) < (10 ** -10)) {
		array[0] = 'ln(10) ≈ 2.302585092994046';
	} else if (Math.abs(array[0] - Math.LOG2E) < (10 ** -10)) {
		array[0] = 'log₂(e) ≈ 1.4426950408889634';
	} else if (Math.abs(array[0] - Math.LOG10E) < (10 ** -10)) {
		array[0] = 'log(e) ≈ 0.4342944819032518';
	} else if (Math.abs(array[0] - Math.sqrt(3)) < (10 ** -10)) {
		array[0] = '√3 ≈ 1.7320508075688772';
	} else if (Math.abs(array[0] - (Math.sqrt(3) / 2)) < (10 ** -10)) {
		array[0] = '√3/2 ≈ 0.8660254037844386';
	}
	//other constants can be put here
	else {
		for (let q = 2; q < 500; q++) {
			if (Math.abs(array[0] - (1 / q)) < (10 ** -10)) {
				array[0] = '1/' + q + ' ≈ ' + 1 / q;
				return 0;
			}
			for (let p = 2; p < q; p++) {
				if (Math.abs(parseFloat(array[0]) - (p / q)) < (10 ** -10)) {
					array[0] = p + '/' + q + ' ≈ ' + p / q;
					return 0;
				}
			}
		}
	}
	if (array.length !== 1) { //error unless there is only one thing in the array
		array[0] = "Error"
	} else if (Math.abs(parseFloat(array[0])) > (10 ** 10)) { //if the answer is more than 10^10 away from 0, it is set to Infinity
		array[0] = ("Infinity").toString();
	} else if (Math.abs((Math.ceil(Math.abs(parseFloat(array[0])))) - (Math.abs(parseFloat(array[0])))) < (10 ** -10)) { //if the answer is less than 10^10 lower than an int, it is rounded up
		array[0] = Math.ceil(parseFloat(array[0]));
	} else if (Math.abs((Math.floor(Math.abs(parseFloat(array[0])))) - (Math.abs(parseFloat(array[0])))) < (10 ** -10)) { //if the answer is less than 10^10 higher than an int, it is rounded down
		array[0] = Math.floor(parseFloat(array[0]));
	}
}
