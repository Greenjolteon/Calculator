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

	const precedence = {'^': 4,  '√': 3, 'sin': 3, 'cos': 3, 'tan': 3, 'sinh': 3, 'cosh': 3, 'tanh': 3, 'log': 3, 'ln': 3, '*': 2, '/': 2, '+': 1, '-': 1,};
	//put all functions not in emdas between ^ and *

	const associative = {'^': 0,  '√': 1, 'sin': 1, 'cos': 1, 'tan': 1, 'sinh': 1, 'cosh': 1, 'tanh': 1, 'log': 1, 'ln': 1, '*': 1, '/': 1, '+': 1, '-': 1,};
	
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
	  'ln': 'exp',
	  '*': '/',
	  '/': '*',
	  '-': '+',
	  '+': '-'
	}

/*
Plan:
Ignore anything that is in parentheses until they are both on the outside

goes through the equation, takes note of where the thing with the largest precedence is
Then finds its opposite and does it to the solution
*/
let nArray;

if (array.includes('(') && array.includes(')')) {
  let lP = array.indexOf('(');
  let rP = array.indexOf(')');
  nArray = array.splice(0, rP+1);
  nArray.shift();
  nArray.pop();
  console.log("New array: " + nArray);
  console.log("Old array: " + array + "\nArray length: " + array.length);
}

let pre = 0;
let pos = 0;
let thing;

for (let i=0; i<=array.length; i++) {
  if (isOperator(array[i]) && (precedence[array[i]]) > pre) {
    pre = precedence[array[i]];
    thing = array[i];
    pos = i;
  }
}
console.log("Pos: " + pos + ", Pre: " + pre + ", Thing: " + thing);

let solution = 0;

for (let j=0; j<array.length; j++) {
  if (isOperator(array[j])) {
      array[j] = opposites[array[j]];
      console.log("Old array: " + array + "\nArray length: " + array.length);
  }
}
array.unshift('0');
solution = equate(array.join(''));

console.log("Solution: " + nArray.join('') + "=" + solution);

pre = 0;
pos = 0;
thing;

for (let i=0; i<=nArray.length; i++) {
  if (isOperator(nArray[i]) && (precedence[nArray[i]]) > pre) {
    pre = precedence[nArray[i]];
    thing = nArray[i];
    pos = i;
  }
}
console.log("Pos: " + pos + ", Pre: " + pre + ", Thing: " + thing);
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

//equate function

graph("(2x-3)-3+7");

