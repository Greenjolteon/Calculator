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
	let inputValue = input.value;
	let array = [];
	let paroi = 1;
	//separate the numbers and operators
	for (let i = 0; i < inputValue.length; i++) {
		if (isDigit(inputValue[i])) {
			if (isDigit(inputValue[i - 1]) || inputValue[i - 1] === '.') {
				array[array.length - 1] = array[array.length - 1].concat(inputValue[i]);
			} else {
				array.push(inputValue[i]);
			}
		} 
		else if (inputValue[i] === 'e') {
		  array.push((Math.E).toString());
		}
		else if (inputValue[i] === 'π') {
		  array.push((Math.PI).toString());
		}
		else if (inputValue[i] === 'l') { // i = 3
		  if (inputValue[i + 1] === 'o' && inputValue[i + 2] === 'g') {
		      if (isDigit(inputValue[i + 3])) {
		      array[i] = 'l' + 'o' + 'g';
		      array[i] = array[i].concat(inputValue[i+3]);
		      array.splice(i-1, 1, '*');
		      i+=3;
		      }
		      else {
		      array[i] = 'l';
		      array[i+1] = 'o';
		      array[i+2] = 'g';
		      array[i] = array[i].concat(array[i+1]);
		      array[i] = array[i].concat(array[i+2]);
		      array.splice(i+1, 2);
		      array.splice(i-1, 1, '*');
		      i += 2;
		      }
		    }
		  else if (inputValue[i + 1] === 'n') {
		    array[i] = 'l';
		    array[i+1] = 'n';
		    array[i] = array[i].concat(array[i+1]);
		    array.splice(i+1, 1);
		    array.splice(i-1, 1, '*');
		    i++;
		  }
		  paroi = 0;
		  }
        else {
			array.push(inputValue[i]);
		}

		if ((inputValue[i + 1] === '(') && (paroi === 1)) {
			array.push('*');
		}
	}
	
	console.log("Beginning 1: " + array);
	//connecting numbers with decimals
	for (let i = 0; i < array.length; i++) {
	  if (array[i].includes('.') && array[i] !== (Math.E).toString() && array[i] !== (Math.PI).toString()) {
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
		let nArray = array.slice(psPos, pfPos+1)
		let emdasResult = emdas(nArray, pfPos);
		array.splice(psPos - 1, numToRemove, ...emdasResult);
		console.log("After P splice: " + array);
	}
	
	//solve other functions
	for (let l = 0; l < array.length; l++) {
    //solve natural logs
    if (array[l] === 'ln') {
      array[l] = Math.log(parseFloat(array[l + 1]));
      array.splice(l + 1, 1);
    }
    else if (array[l].includes('log')) {
      if (array[l] === 'log') {
        array[l] = Math.log10(parseFloat(array[l + 1]));
        array.splice(l + 1, 1);
      }
      else {
        let base = array[l].slice(3);
        console.log(base, parseFloat(array[l+1]));
        array[l] = ((Math.log(parseFloat(array[l + 1]))) / (Math.log(base)));
        array.splice(l + 1, 1);
      }
    }
  }
	console.log("After function solves: " + array);

	// EMDAS
	array = emdas(array, array.length);
	if (array.length !== 1) {
	  array[0] = "Error"
	}
	console.log(array[0]);
	output.value = array[0];
}

function emdas(earray, endPosition) {
	//E
	console.log("First earray: " + earray);
	for (let j = 0; j <= endPosition; j++) {
		if ((earray.length === 1) || !(earray.includes('^'))) {
		  break;
		}
		else if (earray[j] === '^') {
			let num1 = parseFloat(earray[j - 1]);
			let num2 = parseFloat(earray[j + 1]);
			earray[j - 1] = (Math.pow(num1, num2)).toString();
			earray.splice(j, 2);
		}
		console.log("E run #" + j + ": " + earray);
	}
	console.log("After E earray: " + earray);
	//MD
	for (let j = 0; j <= endPosition; j++) {
		if ((earray.length === 1) || (!(earray.includes('*')) && !(earray.includes('/')))) {
		  break;
		}
		else if ((earray[j] === '*') || (earray[j] === '/')) {
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
		if ((earray.length === 1) || (!(earray.includes('+')) && !(earray.includes('-')))) {
		  break;
		}
		else if ((earray[j] === '+') || (earray[j] === '-')) {
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
	return ((Number(character) >= 0) && (Number(character) <= 9))
}

function isAlpha(str) {
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    return (!(charCode >= 65 && charCode <= 90) && !(charCode >= 97 && charCode <= 122))
  }
}
