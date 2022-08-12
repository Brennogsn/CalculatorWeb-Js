const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
        
    }

    // add number for calculate 
    addNumber(number) {

        // check if current operation already has a dot
        if (number === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        
        this.currentOperation = number;
        this.updateScreen();
    }

    // calculation process
    processOperation(operation) {

        // check whether an operation exchange
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            if (this.currentOperationText !== "") {
                this.changeOperation(operation);
            }
            return;
        }


        //get the previous and current value 
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "x":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous)
                break;   
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "C":
                this.processClearOperator();
                break; 
            case "=":
                this.processEqualOperator();
                this.currentOperationText.innerHTML = this.previousOperationText.innerHTML.split(' ')[0];
                this.previousOperationText.innerHTML = "";
                break;
            case ".":
                this.processEqualOperator();
                this.currentOperationText.innerHTML = this.previousOperationText.innerHTML.split(' ')[0];
                this.previousOperationText.innerHTML = "";
                break;            
            default:
                return;
        }
    }

    // update of screen of calculate
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null
    ) {

        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // check if value zero, if it is just add current value
            if(previous === 0) {
                operationValue = current
            }

            // add current value to previous 

            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    // change the math operation
    changeOperation(operation) {
        const mathOperations = ["x", "/", "-", "+"]

        if(!mathOperations.includes(operation)) {
            return
        }
        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // delete All
    processClearOperator() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // result
    processEqualOperator() {
        const operation = previousOperationText.innerText.split(" ")[1];
        

        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            calc.addNumber(value)

        } else {
            calc.processOperation(value);
        }
    });
});

