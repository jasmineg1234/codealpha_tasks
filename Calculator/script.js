const currentDisplay =
    document.getElementById("current");

const previousDisplay =
    document.getElementById("previous");

const numberButtons =
    document.querySelectorAll("[data-number]");

const operationButtons =
    document.querySelectorAll("[data-operation]");

const equalsButton =
    document.querySelector("[data-action='equals']");

const clearButton =
    document.querySelector("[data-action='clear']");

const deleteButton =
    document.querySelector("[data-action='delete']");


let currentNumber = "";
let previousNumber = "";
let operation = null;


// Update Display

function updateDisplay() {

    currentDisplay.textContent =
        currentNumber || "0";

    previousDisplay.textContent =
        previousNumber && operation
            ? previousNumber + " " + operation
            : "";
}


// Add Numbers

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        const number = button.dataset.number;

        // Prevent multiple decimal points

        if (number === "." &&
            currentNumber.includes(".")) {

            return;
        }

        currentNumber += number;

        updateDisplay();

    });

});


// Select Operation

operationButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (currentNumber === "") {
            return;
        }

        if (previousNumber !== "") {

            calculate();

        }

        operation =
            button.dataset.operation;

        previousNumber =
            currentNumber;

        currentNumber = "";

        updateDisplay();

    });

});


// Calculate Result

function calculate() {

    const previous =
        parseFloat(previousNumber);

    const current =
        parseFloat(currentNumber);

    if (isNaN(previous) || isNaN(current)) {
        return;
    }


    let result;


    switch (operation) {

        case "+":
            result = previous + current;
            break;

        case "−":
            result = previous - current;
            break;

        case "×":
            result = previous * current;
            break;

        case "÷":

            if (current === 0) {

                currentNumber = "Error";

                previousNumber = "";

                operation = null;

                updateDisplay();

                return;
            }

            result = previous / current;

            break;

        case "%":
            result = previous % current;
            break;

        default:
            return;

    }


    // Remove unnecessary decimal digits

    result =
        Math.round(result * 100000000) /
        100000000;


    currentNumber =
        result.toString();

    previousNumber = "";

    operation = null;

    updateDisplay();

}


// Equals Button

equalsButton.addEventListener("click", () => {

    if (
        currentNumber === "" ||
        previousNumber === "" ||
        operation === null
    ) {
        return;
    }

    calculate();

});


// Clear Button

clearButton.addEventListener("click", () => {

    currentNumber = "";

    previousNumber = "";

    operation = null;

    updateDisplay();

});


// Delete Button

deleteButton.addEventListener("click", () => {

    currentNumber =
        currentNumber.slice(0, -1);

    updateDisplay();

});


// Keyboard Support

document.addEventListener("keydown", event => {

    const key = event.key;


    // Numbers

    if (
        (key >= "0" && key <= "9") ||
        key === "."
    ) {

        const button =
            document.querySelector(
                `[data-number="${key}"]`
            );

        if (button) {
            button.click();
        }

    }


    // Operations

    if (key === "+") {

        document
            .querySelector('[data-operation="+"]')
            .click();

    }


    if (key === "-") {

        document
            .querySelector('[data-operation="−"]')
            .click();

    }


    if (key === "*") {

        document
            .querySelector('[data-operation="×"]')
            .click();

    }


    if (key === "/") {

        event.preventDefault();

        document
            .querySelector('[data-operation="÷"]')
            .click();

    }


    // Enter = Equals

    if (key === "Enter" || key === "=") {

        equalsButton.click();

    }


    // Escape = Clear

    if (key === "Escape") {

        clearButton.click();

    }


    // Backspace = Delete

    if (key === "Backspace") {

        deleteButton.click();

    }

});