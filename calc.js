/*
To-do:
*/

function numapp(item) {
	let input = document.form.input;
	input.value += item;
}

function reset() {
	let input = document.form.input;
	input.value = "";
	console.clear();
}

document.addEventListener('keydown', function(event) {
	if (event.key === 'Enter') {
		equate()
	}
});

function equate() {
	let input = document.form.input;
	let output = document.form.output;
	let inputValue = input.value; // Retrieve the input value
	let array = [];
	//separate the numbers and operators
	for (let i = 0; i < inputValue.length; i++) {
		if (isDigit(inputValue[i])) {
			if (isDigit(inputValue[i - 1]) || inputValue[i - 1] === '.') {
				array[array.length - 1] = array[array.length - 1].concat(inputValue[i]);
			} else {
				array.push(inputValue[i]);
			}
		} else {
			array.push(inputValue[i]);
		};

		if (inputValue[i + 1] === '(') {
			array.push('*');
		}
	}
	//connecting numbers with decimals
	for (let i = 0; i < array.length; i++) {
		if (array[i].includes('.')) {
			array[i - 1] = array[i - 1].concat(array[i]);
			array.splice(i, 1);
		}
	}

	console.log("Beginning 2: " + array);
	// P
	let psFound = 0;
	let pfFound = 0;
	let psPos = -1;
	let pfPos = -1;
	for (let j = 0; j < array.length; j++) {
		if (array[j] === '(') {
			psPos = j + 1;
			psFound = 1;
		}
		if (array[j] === ')') {
			pfPos = j - 1;
			pfFound = 1;
		}
	}

	if (psFound && pfFound) {
		let numToRemove = pfPos - psPos + 3;
		let nArray = array.slice(psPos, pfPos + 1)
		let emdasResult = emdas(nArray, pfPos);
		array.splice(psPos - 1, numToRemove, ...emdasResult);
		console.log("After P splice: " + array);
	}

	// EMDAS
	array = emdas(array, array.length);
	console.log(array[0]);
	output.value = array[0];
}

function emdas(earray, endPosition) {
	//E
	console.log("First earray: " + earray);
	for (let j = 0; j <= endPosition; j++) {
		if (earray[j] === '^') {
			let num1 = Number(earray[j - 1]);
			let num2 = Number(earray[j + 1]);
			earray[j - 1] = (Math.pow(num1, num2)).toString();
			earray.splice(j, 2);
		}
		console.log("E run #" + j + ": " + earray);
	}
	console.log("After E earray: " + earray);
	//MD
	for (let j = 0; j <= endPosition; j++) {
		if ((earray[j] === '*') || (earray[j] === '/')) {
			let num1 = Number(earray[j - 1]);
			let num2 = Number(earray[j + 1]);
			if (earray[j] === '*') {
				earray[j - 1] = (num1 * num2).toString();
			}
			if (earray[j] === '/') {
				earray[j - 1] = (num1 / num2).toString();
			}
			earray.splice(j, 2);
			j--;
		}
		console.log("MD run #" + j + ": " + earray);
	}
	console.log("After MD earray: " + earray);
	//AS
	for (let j = 0; j <= endPosition; j++) {
		if ((earray[j] === '+') || (earray[j] === '-')) {
			let num1 = Number(earray[j - 1]);
			let num2 = Number(earray[j + 1]);
			if (earray[j] === '+') {
				earray[j - 1] = (num1 + num2).toString();
			}
			if (earray[j] === '-') {
				earray[j - 1] = (num1 - num2).toString();
			}
			earray.splice(j, 2);
			j--;
		}
		console.log("AS run #" + j + ": " + earray);
	}
	console.log("After AS earray: " + earray);
	return earray;
}

function isDigit(character) {
	if ((Number(character) >= 0) && (Number(character) <= 9)) {
		return true;
	} else {
		return false;
	}
}
