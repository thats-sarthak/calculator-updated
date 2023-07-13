const input = document.getElementById("inputbox");
const buttons = document.querySelectorAll("button");

let string = "";
let lastInputIsOperator = false;

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        handleButtonClick(e.target.innerHTML);
    });
});

document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (isNumeric(key) || isOperator(key)) {
        handleButtonClick(key);
    } else if (key === '=' || key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        deleteLastCharacter();
    }
});

// function handleButtonClick(value) {
//     if (isNumeric(value)) {
//         string += value;
//         input.value = string;
//         lastInputIsOperator = false;
//     } else if (isOperator(value)) {
//         if (lastInputIsOperator || !string || !isNumeric(string[string.length - 1])) {
//             // If the last input was an operator, the string is empty, or the last character is not numeric, don't add another operator
//             return;
//         }
//         string += value;
//         input.value = string;
//         lastInputIsOperator = true;
//     } else if (value === '=') {
//         calculateResult();
//     } else if (value === 'AC') {
//         clearInput();
//     } else if (value === 'DEL') {
//         deleteLastCharacter();
//     }
// }



function handleButtonClick(value) {
    if (isNumeric(value)) {
        string += value;
        input.value = string;
        lastInputIsOperator = false;
    } else if (isOperator(value)) {
        if (lastInputIsOperator || !string || !isNumeric(string[string.length - 1])) {
            // If the last input was an operator, the string is empty, or the last character is not numeric, don't add another operator
            return;
        }
        string += value;
        input.value = string;
        lastInputIsOperator = true;
    } else if (value === '=') {
        calculateResult();
    } else if (value === 'AC') {
        clearInput();
    } else if (value === 'DEL') {
        deleteLastCharacter();
    }
}


function calculateResult() {
    try {
        string = eval(string);
        input.value = string;
    } catch (error) {
        string = 'error';
        input.value = string;
    }   
}

function clearInput() {
    string = "";
    input.value = string;
}

function deleteLastCharacter() {
    string = string.substring(0, string.length - 1);
    input.value = string;
}

function isNumeric(value) {
    return /^\d+$/.test(value);
}

function isOperator(value) {
    return ['+', '-', '*', '/', '%'].includes(value);
}