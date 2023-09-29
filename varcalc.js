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
*/




function graph(h) {
	let array = h.match(/([0-9.]+|[+\-*^/()√!]|x|log|ln|sin|cos|tan|sinh|cosh|tanh|π|e)/g);

  for (let l=0; l<array.length; l++) {if ((constCheck(array[l]) !== array[l] || array[l] === 'x') && isDigit(array[l - 1])) {array.splice(l, 0, '*');}}
	console.log("Array: " + array);

	const precedence = {'^': 4,  '√': 3, 'sin': 3, 'cos': 3, 'tan': 3, 'sinh': 3, 'cosh': 3, 'tanh': 3, 'log': 3, 'ln': 3, '!': 3, '*': 2, '/': 2, '+': 1, '-': 1,};
	//put all functions not in emdas between ^ and *

	const associative = {'^': 0,  '√': 1, 'sin': 1, 'cos': 1, 'tan': 1, 'sinh': 1, 'cosh': 1, 'tanh': 1, 'log': 1, 'ln': 1, '!': 1, '*': 1, '/': 1, '+': 1, '-': 1,};
	
	const opposites = {
	  '^': '√', 
	  '√': '^', 
	  'sin': 'arcsin', 
	  'cos': 'arccos', 
	  'tan': 'arctan', 
	  'sinh': 'arcsinh', 
	  'cosh': 'arccosh', 
	  'tanh': 'arctanh', 
	  'log': '10**', 
	  'ln': 'e**',
	  '!': NaN,
	  '*': '/',
	  '/': '*',
	  '-': '+',
	  '+': '-'
	}

/*
Plan:
goes through the equation, takes note of where the thing with the largest precedence is
Then finds its opposite and does it to the solution
*/

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
console.log(output.length);

let solution = 0;

for (let i=output.length-1; i>=0; i--) {
  console.log("BCurrent Solution #" + i + ": x=" + solution);
  console.log("BCurrent output #" + i + ": " + output);
  switch (output[i]) {
    case '+':
      if (output[i] !== 'x') {
        solution -= parseFloat(output[i-1]);
      }
      break;
    case '-':
      if (output[i] !== 'x') {
        solution += parseFloat(output[i-1]);
      }
      break;
    case '*':
      if (output[i] !== 'x') {
        solution /= parseFloat(output[i-1]);
      }
      break;
    case '/':
      if (output[i] !== 'x') {
        solution *= parseFloat(output[i-1]);
      }
      i++;
      break;
    case '^':
      solution ** (1/parseFloat(output[i-1]));
      break;
    default:
      break;
  }
  output.pop();
  console.log("Current Solution #" + i + ": x=" + solution);
  console.log("Current output #" + i + ": " + output);
}

/*
for (let i=output.length; i>0; i--) {
  switch (output[i]) {
    case '+':
      solution -= parseFloat(output[i-1]);
      break;
    case '-':
      solution += parseFloat(output[i-1]);
      i--;
      break;
    case '*':
      solution /= parseFloat(output[i-1]);
      i--;
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
  console.log("Current Solution: x=" + solution);
}
*/

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

graph("(2x-3)/3");


