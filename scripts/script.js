Number.prototype.countDecimals = function () {
    if(Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0; 
}

//VARIABLES
let chosenNumber = 0;
let previousNumber;
let total;
let currentOperator;
let previousOperator;



const numbers = document.querySelectorAll(".number-button");
const operators = document.querySelectorAll(".operator");
const entry = document.getElementById("entry");
const entryHist = document.getElementById("entry-history");
const negateButton = document.getElementById("negate");
const clearButton = document.getElementById("clear");
const backButton = document.getElementById("back")
const sqrtButton = document.getElementById("sqr");


//INIT
entry.value = chosenNumber;


//EVENTLISTENERS
numbers.forEach((button) => {
    button.addEventListener("click", (event) => {
        if(String(chosenNumber).indexOf(".") < 0 && event.target.value === "."){
            console.log("wrong");
            if(chosenNumber === undefined || chosenNumber === 0 || chosenNumber === "0"){
                chosenNumber = 0;
                chosenNumber += event.target.value;
                entry.value += event.target.value;
            } else{
                chosenNumber += event.target.value;
                entry.value += event.target.value;
            }
        } else if(!(event.target.value === ".")) {
            if(chosenNumber === 0 || chosenNumber === "0" || chosenNumber === undefined){
                chosenNumber = event.target.value;
                entry.value = event.target.value;
            } else{
                chosenNumber += event.target.value;
                entry.value += event.target.value;
            }
        }

    });
});

operators.forEach((button) =>{
    button.addEventListener("click", (event) => {
        if(entryHist.value.indexOf("=") > 0 && event.target.value === "="){
            //chosenNumber = 0;
            entryHist.value = `${total} ${previousOperator} ${previousNumber} ${currentOperator}`
            total = operation(currentOperator, total, previousNumber);
            entry.value = total;
            
        } else if(entryHist.value.indexOf("=") > 0 && event.target.value !== "="){
            currentOperator = event.target.value;
            previousOperator = currentOperator;
            entryHist.value = `${total} ${event.target.value} `;
            previousNumber = total;
        } else if(chosenNumber === undefined){
            currentOperator = event.target.value;
            entryHist.value = entryHist.value.slice(0, -2);
            entryHist.value += `${currentOperator} `
        }
        
        else{
            if(previousNumber !== undefined & currentOperator !== undefined){
                if(total !== undefined){
                    total = operation(currentOperator, total, chosenNumber);
                    previousNumber = chosenNumber;
                    entryHist.value += `${chosenNumber} ${event.target.value} `;
                    chosenNumber = undefined;
                    entry.value = total;
                    previousOperator = currentOperator;
                    currentOperator = event.target.value;
                } else{
                    total = operation(currentOperator, previousNumber, chosenNumber);
                    previousNumber = chosenNumber;
                    entryHist.value += `${chosenNumber} ${event.target.value} `;
                    chosenNumber = undefined;
                    entry.value = total;
                    previousOperator = currentOperator;
                    currentOperator = event.target.value;
                }

            } else if(event.target.value !== "=" && chosenNumber !== undefined){
                currentOperator = event.target.value;
                previousOperator = currentOperator;
                entryHist.value += `${chosenNumber} ${event.target.value} `;
                previousNumber = chosenNumber;
                chosenNumber = undefined;
            }
        }

        if(entryHist.value.indexOf("/ 0") > 0){
            clear(true);
        }

        
    });
});

negateButton.addEventListener("click", () => {
    negate();
})

clearButton.addEventListener("click", () => {
    clear();
});

backButton.addEventListener("click", () => {
    back();
});

sqrtButton.addEventListener("click", () =>{
    squareroot();
});

// FUNCTIONS

function operation(operator, a, b){
    if((a !== undefined) && (b !== undefined)){
        if(operator === "+"){
            return add(a, b);
        } else if(operator === "-"){
            return subtract(a, b);
        } else if(operator === "x"){
            return multiply(a, b);
        } else if(operator === "/"){
            return divide(a, b);
        } else if(operator === "="){
            return operation(previousOperator, a, b);
        }
    } 
}

function add(a, b){
    let sum = Number(a) + Number(b);
    if(sum.countDecimals() >= 4){
        sum = sum.toFixed(3);
    }
    return sum;
}

function subtract(a, b){
    let sum = Number(a) - Number(b);
    if(sum.countDecimals() >= 4){
        sum = sum.toFixed(3);
    }
    return sum;
}

function multiply(a, b){
    let sum = Number(a) * Number(b);
    if(sum.countDecimals() >= 4){
        sum = sum.toFixed(3);
    }
    return sum;
}

function divide(a, b){
    let sum = Number(a) / Number(b);
    if(sum.countDecimals() >= 4){
        sum = sum.toFixed(3);
    }
    return sum;
}


function squareroot(){
    if(chosenNumber !== undefined){
        chosenNumber = Math.sqrt(chosenNumber);
        if(chosenNumber.countDecimals() >= 4){
            chosenNumber = chosenNumber.toFixed(3);
        }
        entry.value = chosenNumber;
    } else{
        total = Math.sqrt(total);
        if(total.countDecimals() >= 4){
            total = total.toFixed(3);
        }
        entry.value = total;
    }
}

function negate(){
    if(chosenNumber !== undefined){
        if(Number(chosenNumber) > 0){
            chosenNumber = -Math.abs(chosenNumber);
            entry.value = chosenNumber;
        } else{
            chosenNumber = Math.abs(chosenNumber);
            entry.value = chosenNumber;
        }
    } else if(total === undefined && chosenNumber === undefined){
        if(Number(previousNumber) > 0){
            chosenNumber = -Math.abs(previousNumber);
            entry.value = chosenNumber;
        } else{
            chosenNumber = Math.abs(previousNumber);
            entry.value = chosenNumber;
        }
    } else{
        if(Number(total) > 0){
            total = -Math.abs(total);
            entry.value = total;
        } else{
            total = Math.abs(total);
            entry.value = total;
        }
    }

}


function clear(infinity){
    if(infinity){
        chosenNumber = 0;
        previousNumber = undefined;
        total = undefined;
        currentOperator = undefined;
        previousOperator = undefined;
        entryHist.value = "";
        entry.value = "cannot divide";
    } else{
        chosenNumber = 0;
        previousNumber = undefined;
        total = undefined;
        currentOperator = undefined;
        previousOperator = undefined;
        entryHist.value = "";
        entry.value = 0;
    }

}

function back(){
    if(typeof(chosenNumber) !== undefined && chosenNumber != "0"){
        if(chosenNumber.length === 1){
            chosenNumber = 0;
        } else{
            chosenNumber = chosenNumber.slice(0, -1);
        }
        entry.value = chosenNumber;
    }
    
}