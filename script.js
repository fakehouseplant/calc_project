class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear(); //sets default values using clear method
  }

  clear() {
    //sets default values
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return; //stops function if '.' already exists in the div with currentOperand class
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    //this doesn't work need to fix
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDisplay)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]"); //selects all the number buttons
const operationButtons = document.querySelectorAll("[data-operation]"); //selects all the operation buttons
const equalsButton = document.querySelector("[data-equals]"); //selects the equals button
const deleteButton = document.querySelector("[data-delete]"); //selects the delete button
const allClearButton = document.querySelector("[data-all-clear]"); //selects the all clear button
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]" //selects the previous operand div
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]" //selects the current operand div
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
); //instantiates calculator object

numberButtons.forEach((button) => {
  //adds click event to each number button
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText); //on click passes the inner text of the button (the number) as an argument into the appendNumber method in the calculator object
    calculator.updateDisplay(); //calls the update display method in calculator object
  });
});

operationButtons.forEach((button) => {
  //adds click event to each operation button
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText); //on click passes the inner text of the button (the operation) as an argument into the choose operation method in the calculator object
    calculator.updateDisplay(); //calls the update display method in calculator object
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
