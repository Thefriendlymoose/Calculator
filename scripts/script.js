//VARIABLES
let chosenNumber = 0;
let previousNumber;
let total;

let decimalUsed = 0;

const numbers = document.querySelectorAll(".number-button");
const operators = document.querySelectorAll(".non-number-button");
const entry = document.getElementById("entry");
const entryHist = document.getElementById("entry-history");

console.log(numbers);

//INIT
entry.value = chosenNumber;


//EVENTLISTENERS
numbers.forEach((button) => {
    button.addEventListener("click", (event) => {
        if(event.target.value === "."){
            decimalUsed++;
        }

        if(decimalUsed === 1){
            chosenNumber += event.target.value;
            entry.value += event.target.value;
            decimalUsed++;
        } else if(!(event.target.value === ".")){
            if(chosenNumber === 0){
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
        if(event.target.value === "plus"){
            entryHist.value += `${chosenNumber} + `;
            previousNumber = chosenNumber;
            chosenNumber = 0;
        } else if(event.target.value === "minus"){
            entryHist.value += `${chosenNumber} - `;
            previousNumber = chosenNumber;
            chosenNumber = 0;
        } else if(event.target.value === "multi"){
            entryHist.value += `${chosenNumber} x `;
            previousNumber = chosenNumber;
            chosenNumber = 0;
        }else if(event.target.value === "divide"){
            entryHist.value += `${chosenNumber} / `;
            previousNumber = chosenNumber;
            chosenNumber = 0;
        }
    });
});

// FUNCTIONS

function operator(operator, a, b){
    if(operator === "plus"){
        return add(a, b);
    } else if(operator === "minus"){
        return subtract(a, b);
    } else if(operator === "multi"){
        return multiply(a, b);
    } else if(operator === "divide"){
        return divide(a, b);
    }
}

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}