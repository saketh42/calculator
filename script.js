const buttons = document.querySelectorAll("button");
const display = document.querySelector(".display");

let currentValue = '';
let previousValue = '';
let operation = '';

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");
        
        if (value === "AC") {
            currentValue = '';
            previousValue = '';
            operation = '';
            display.value = '0';
        } else if (value === "DEL") {
            currentValue = currentValue.slice(0, -1);  
            display.value = currentValue || '0';
        } else if (value === "=") {
            if (previousValue && currentValue && operation) {
                currentValue = operate(previousValue, currentValue, operation);
                display.value = currentValue;
                previousValue = '';
                operation = '';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentValue) {
                if (operation) {
                    // If there's already an operation, perform it
                    currentValue = operate(previousValue, currentValue, operation);
                    display.value = currentValue;
                }
                // Set up for the next operation
                previousValue = currentValue;
                currentValue = '';
                operation = value;
            }
        } else {
            // If there's an operation and currentValue is empty, replace it
            currentValue = (currentValue === '' && previousValue !== '') ? value : currentValue + value;
            display.value = currentValue;
        }
    });
});

function operate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch(op) {
        case '+':
            return (a + b).toString();
        case '-':
            return (a - b).toString();
        case '*':
            return (a * b).toString();
        case '/':
            return b !== 0 ? (a / b).toString() : 'Error';
        default:
            return 'Error';
    }
}
