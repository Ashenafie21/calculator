class Calculator {
  constructor(previousOprandTextElement, currentOprandTextElement) {
    this.previousOprandTextElement = previousOprandTextElement;
    this.currentOprandTextElement = currentOprandTextElement;
    this.clear();
  }
  clear() {
    this.currentOprand = "";
    this.previousOprand = "";
    this.opration = undefined;
  }
  delete() {
    this.currentOprand = this.currentOprand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOprand.includes(".")) return;
    this.currentOprand = this.currentOprand.toString() + number.toString();
  }
  chooseOpration(opration) {
    if (this.currentOprand === "") return;
    if (this.previousOprand !== "") {
      this.compute();
    }
    this.opration = opration;
    this.previousOprand = this.currentOprand;
    this.currentOprand = "";
  }
  compute() {
    let computation;
    let prev = parseFloat(this.previousOprand);
    let current = parseFloat(this.currentOprand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.opration) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "÷":
        computation = prev / current;
        break;
      case "*":
        computation = prev * current;
        break;
      default:
        return;
    }
    this.currentOprand = computation;
    this.opration = undefined;
    this.previousOprand = "";
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let intergerDisplay;
    if (isNaN(integerDigits)) {
      intergerDisplay = "";
    } else {
      intergerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${intergerDisplay}.${decimalDigits}`;
    } else {
      return intergerDisplay;
    }
  }

  updateDisplay() {
    this.currentOprandTextElement.innerText = this.getDisplayNumber(
      this.currentOprand);
    if (this.opration != null) {
      this.previousOprandTextElement.innerText = `${this.getDisplayNumber(this.previousOprand)} ${this.opration}`;
    } else{
      this.previousOprandTextElement.innerText=""
    }

  }
}
const numberButtons = document.querySelectorAll("[data-number]");
const oprationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals");
const deleteButton = document.querySelector("[data-delete");
const allClearButton = document.querySelector("[data-all-clear");
const previousOprandTextElement = document.querySelector(
  "[data-privous-operand ]"
);
const currentOprandTextElement = document.querySelector(
  "[data-current-operand]"
);

const calculator = new Calculator(
  previousOprandTextElement,
  currentOprandTextElement
);
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
oprationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOpration(button.innerText);
    calculator.updateDisplay();
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
