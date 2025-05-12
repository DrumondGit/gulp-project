// script1.js
function greet(name) {
    console.log('Hello, ' + name + '!');
}

function sum(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

let x = 5;
let y = 10;
let z = sum(x, y);

console.log('Sum: ' + z);
console.log('Multiplication: ' + multiply(x, y));

for (let i = 0; i < 1000; i++) {
    console.log('Iteration number: ' + i);
}
