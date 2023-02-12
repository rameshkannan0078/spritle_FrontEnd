// function Evaluation(inputsValue) {
//     let numbers = [];
//     let operators = [];
//     let presentedOperators = "+-/*";
//     for (let index = 0; index < inputsValue.length; index++) {
//         const element = inputsValue[index];
//         if (presentedOperators.includes(element)) {
//             operators.push(element);
//         } else {
//             numbers.push(parseInt(element))
//         }
//     }
//     while (operators.length > 0) {
//         let operator = operators.pop();
//         let secondOperand = numbers.pop();
//         let firstOperand = numbers.pop();

//         switch (operator) {
//             case '+':
//                 numbers.push(firstOperand + secondOperand);
//                 break;
//             case '-':
//                 numbers.push(firstOperand - secondOperand);
//                 break;
//             case '*':
//                 numbers.push(firstOperand * secondOperand);
//                 break;
//             case '/':
//                 if (secondOperand === 0) {
//                     return 0;
//                 } else {
//                     numbers.push(firstOperand / secondOperand);
//                 }
//                 break;
//         }
//     }

//     return numbers[0];
// }


// console.log(Evaluation("2+3/4-9"));
