/*

  This solution is pretty messy.
  
*/

let currentTotal = 0;
let calculation = [];

const calculationsText = document.querySelector('.js-calculations-text');

document.querySelectorAll('.number').forEach((numberButton) => {
  if (numberButton.classList.contains('operator-equals-button') || numberButton.classList.contains('clear-button')) 
    return;

  numberButton.addEventListener('click', () => {
    let value = numberButton.innerHTML;
    addToCalculation(value);
  });
});

document.querySelector('.operator-equals-button').addEventListener('click', () => {
  processCalculation();
}); 

document.querySelector('.clear-button').addEventListener('click', () => {
  clearCalculator();
}); 

// Very messy, but it works... Don't like the odd looking nesting.
function addToCalculation(value) {
  // Checks if the value is a number (not operator), if period is passed for floating points, and checks if the previous array value is an operator.
  let isNumber = (Number.isFinite(Number(value)) || value === '.') && (Number.isFinite(Number(calculation[calculation.length - 1]))|| calculation[calculation.length - 1] === '.');

  if (isNumber && calculation.length > 0) { // Combining sequences of numbers together
    calculation[calculation.length - 1] += value;
  } else if (calculation.length === 0 && !Number.isNaN(Number(value))) { // If we want to do new calculation post calculation
    clearCalculator();
    calculation.push(value);
  } else {
    if (Number.isNaN(Number(value))) {
      if (currentTotal !== 0 && calculation.length === 0) {
        calculation.push(currentTotal);
        currentTotal = 0; // Need to reset so we don't take calc into account.
      }
      else if ( Number.isNaN(Number(calculation[calculation.length - 1])) && value !== '.') {
        // If we press two operators in a row, we replace the previous one with the most recent.
        calculation.pop();
      } 
    }

    calculation.push(value);
  }

  updateCalculationsText();
  console.log(calculation);
}

// Pattern => NUMBER - OPERATOR - NUMBER
// Make sure to find a pemdas solutions such as looking for * || / first.
function processCalculation() {
  // First pass will be for Mult-Div
  arrayPass("*", "/");

  // Second pass will be for Add-Sub
  arrayPass("+", "-");

  let showResult = true;
  updateCalculationsText(showResult);

  calculation = [];
}

function arrayPass(operator1, operator2) {
  for (let i = 0; i < calculation.length - 1; i++) {
    let currentValue = calculation[i];

    if (currentValue === operator1 || currentValue === operator2) {
      if (i === 0) {
        determineCalculation(currentValue, i, currentTotal);
      } else {
        determineCalculation(currentValue, i);
      }

      i = -1;
    }
  }
}

function determineCalculation(value, index, passedFirstValue = Infinity) {
  let firstValue = Number(calculation[index - 1]);
  let secondValue = Number(calculation[index + 1]);

  if (passedFirstValue !== Infinity) {
    firstValue = Number(passedFirstValue);
    currentTotal = 0;
  }

  let stepCalc = 0;

  switch(value) {
    case '*':
      stepCalc = firstValue * secondValue;
      break;
    case '/':
      stepCalc = firstValue / secondValue;
      break;
    case '+':
      stepCalc = firstValue + secondValue;
      break;
    case '-':
      stepCalc = firstValue - secondValue;
      break;
  }

  currentTotal = 0;
  currentTotal += stepCalc;

  filterAfterCalculation(index, stepCalc);
}

function clearCalculator() {
  currentTotal = 0;
  calculation = [];
  updateCalculationsText(true);
}

// Will return new calculation array with the operator and two values removed
function filterAfterCalculation(operatorIndex, stepCalc) {
  const newArr = [];

  for(let i = 0; i < calculation.length; i++) {
    if (i === operatorIndex - 1) {
      newArr.push(stepCalc);
      i += 2;
      continue;
    }

    newArr.push(calculation[i]);
  }

  calculation = newArr;
}

function updateCalculationsText(showResult = false) {
  let textToDisplay = '';

  if (!showResult)
    textToDisplay = calculation.toString().replaceAll(',', ' ');
  else
    textToDisplay = currentTotal.toString();

  calculationsText.innerHTML = textToDisplay;
}