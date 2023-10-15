/*

Variable Calculator:
Install Node/npm X (at home)

separate the equation using the same method
Ask for an equation equal to 0
solve for x using opposites

How would I solve (2x-3)/3=0?
Multiply both sides by 3: 2x-3=0
Subtract 3 from both sides: 2x=3
Divide both sides by 2: x=3/2=1.5

How would I solve ((2-3x)/3)^2+2=0?
Subtract 2 from both sides: ((2-3x)/3)^2=-2
Take the square root of both sides: (2-3x)/3=±i√2
Multiply both sides by 3: 2-3x=±3i√2
Subtract 2 from both sides: -3x=-2±3i√2
Divide both sides by -3: x=(-2±3i√2)/3

(2-3)/3=0
2-3=0

Going by PEMDAS, and then doing the opposite


const precedence = {'^': 4,  '√': 3, 'sin': 3, 'cos': 3, 'tan': 3, 'sinh': 3, 'cosh': 3, 'tanh': 3, 'log': 3, 'ln': 3, '*': 2, '/': 2, '+': 1, '-': 1,};
//put all functions not in emdas between ^ and *
const opposites = {'^': '√',  '√': '^', 'sin': 'arcsin', 'cos': 'arccos', 'tan': 'arctan', 'sinh': 'arcsinh', 'cosh': 'arccosh', 'tanh': 'arctanh', 'log': '10**', 'ln': 'exp', '*': '/', '/': '*', '-': '+', '+': '-',};  
const associative = {'^': 0,  '√': 1, 'sin': 1, 'cos': 1, 'tan': 1, 'sinh': 1, 'cosh': 1, 'tanh': 1, 'log': 1, 'ln': 1, '!': 1, '*': 1, '/': 1, '+': 1, '-': 1,};
let pre = 0;
let pos=0;
let opp;
let solution = 0;

function graph(h) {
	let array = h.match(/([0-9.]+|[+\-*^/()√!]|x|log|ln|sin|cos|tan|sinh|cosh|tanh|π|e)/g);
  let solution = 0;

  console.log("BArray: " + array);
  array = arrayPrep(array);
	console.log("Array: " + array);


Plan:
Ignore anything that is in parentheses until they are both on the outside

goes through the equation, takes note of where the thing with the largest precedence is
Then finds its opposite and does it to the solution


solver(array, array.length)
console.log("Current solution: " + array + "=" + solution);
if (array.length == 1 && array[0].includes('x')) { 
  //should at this point contain only things with x
  if (array[0].length > 1) {
    array = arrayPrep(array[0].match(/([0-9.]+|[+\-*^/()√!]|x|log|ln|sin|cos|tan|sinh|cosh|tanh|π|e)/g));
    if (array.length === 2 && (isNaN(array[0]) ^ isNaN(array[1]))) {
      array = array.join('*');
      solver(array, 1);
    }
    console.log("Array: " + array);
  }
  console.log("Final solution: " + array[0] + "=" + solution);
}

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

function equate(h) {
	let array = h.match(/([0-9.]+|[+\-*^/()√!]|x|log|ln|sin|cos|tan|sinh|cosh|tanh|π|e)/g);

	array = arrayPrep(array);
  console.log("EArray: " + array);

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

	//Now, solve using the RPN

	for (let q = 0; q < output.length; q++) {
		let y = output[q];
		if (isOperator(y)) {
			let num1 = stack.pop();
			if (y === '√') {stack.push(Math.sqrt(num1));} 
			else if (y === 'sin') {stack.push(Math.sin(num1));} 
			else if (y === 'cos') {stack.push(Math.cos(num1));} 
			else if (y === 'tan') {stack.push(Math.tan(num1));} 
			else if (y == 'log') {stack.push(Math.log10(num1));} 
			else if (y == 'ln') {stack.push(Math.log(num1));} 
			else if (y == 'sinh') {stack.push(Math.sinh(num1));} 
			else if (y == 'cosh') {stack.push(Math.cosh(num1));} 
			else if (y == 'tanh') {stack.push(Math.tanh(num1));} 
			else if (y == '!') {stack.push(factorial(num1));} 
			else {
				let num2 = stack.pop();
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
		return "Error";
	} else {
		return stack[0];
	}
}

function floatnumCorrect(array) {
	//constant check time
	if (Math.abs(array[0] - Math.E) < (10 ** -10)) {array[0] = 'e ≈ 2.718281828459045';} 
	else if (Math.abs(array[0] - Math.PI) < (10 ** -10)) {array[0] = 'π ≈ 3.141592653589793';} 
	else if (Math.abs(array[0] - Math.SQRT2) < (10 ** -10)) {array[0] = '√2 ≈ 1.4142135623730951';} 
	else if (Math.abs(array[0] - Math.SQRT1_2) < (10 ** -10)) {array[0] = '√2/2 ≈ 0.7071067811865476';} 
	else if (Math.abs(array[0] - Math.LN2) < (10 ** -10)) {array[0] = 'ln(2) ≈ 0.6931471805599453';} 
	else if (Math.abs(array[0] - Math.LN10) < (10 ** -10)) {array[0] = 'ln(10) ≈ 2.302585092994046';} 
	else if (Math.abs(array[0] - Math.LOG2E) < (10 ** -10)) {array[0] = 'log₂(e) ≈ 1.4426950408889634';} 
	else if (Math.abs(array[0] - Math.LOG10E) < (10 ** -10)) {array[0] = 'log(e) ≈ 0.4342944819032518';} 
	else if (Math.abs(array[0] - Math.sqrt(3)) < (10 ** -10)) {array[0] = '√3 ≈ 1.7320508075688772';} 
	else if (Math.abs(array[0] - (Math.sqrt(3) / 2)) < (10 ** -10)) {array[0] = '√3/2 ≈ 0.8660254037844386';}
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

function arrayPrep(array) {
  for (let l = 0; l < array.length; l++) {
    if (array[l] == 'x') {
      if (isDigit(array[l-2]) && array[l-1] == '*') {
        array[l-2] += 'x';
        array.splice(l-1, 2);
      } else if (isDigit(array[l+2]) && array[l+1] == '*') {
        array[l+2] += 'x';
        array.splice(l, 2);
      }
    } else if (constCheck(array[l]) !== array[l] && isDigit(array[l-1])) {
      //if array[l] is a constant AND the thing before it is a number 
      //(ex: ['2', 'π'] --> ['2', '*', 'π'])
      array.splice(l, 0, '*'); //add a *
      l++; // Skip the inserted '*' to avoid processing it again
    } else if (array[l] === '-' && isDigit(array[l + 1])) {
      //if array[l] is a '-' AND the thing after it is a digit
      if (l === 0 || isOperator(array[l-1])) {
        //if the '-' is the first thing in the array OR the thing before it is an operator
        array[l] += array[l + 1];
        //adds the thing after to the '-' 
        //(ex1: ['-', '2'] --> ['-2', '2'])
        //(ex2: ['3', '*', '-', '2'] --> ['3', '*', '-2', '2'])
        array.splice(l + 1, 1);
        //removes the digit that was combined (ex1: ['-2', '2'] --> ['-2'])
      }
    }
  }
  return array;
}

function solver(array, times) {
for (let i=0; i<times; i++) {
  if (isOperator(array[i]) && precedence[array[i]] > pre) {
    pre = precedence[array[i]];
    pos=i;
    opp = opposites[array[i]];
    if (isDigit(array[i+1])) {
      let eq = equate([solution, opp, array[i+1]].join(''))
      console.log("Equate: " + eq);
      solution = eq
      console.log("solution: " + solution);
      array.splice(pos, 2);
      console.log(array);
      console.log("L: " + typeof solution);
      if (i<2) {
        i=0;
      } else {
        i-=2;
      }
      pre=0;
    }
    console.log("Pos: " + pos + ", Pre: " + pre + ", Thing: " + opp);
  }
}
}

graph("x*2-3");
*/
