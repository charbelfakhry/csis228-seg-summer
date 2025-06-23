
// always use this format of methods
const sumTwoNumbers = (a, b) => {
    return a + b;
}

function greetUser(name) {
    return `Hello, ${name}!`;
}

const testDataTypes = () => {
    let number = 42;
    number = "This is now a string";
    console.log(number);
}

const concatenateStrings = (str1, str2) => {
    return `${str1} ${str2}`;
}

const fillArrayWithNumbers = (length) => {
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(i);
    }
    return arr;
}

const readArray = (arr) => {
    arr.forEach((item, index) => {
        console.log(`Item at index ${index}: ${item}`);
    });
    
    for(let i = 0; i < arr.length; i++) {
        console.log(`Item at index ${i}: ${arr[i]}`);
    }

    for(let i in arr) {
        console.log(`Item at index ${i}: ${arr[i]}`);
    }

    for(const item of arr) {
        console.log(`Item: ${item}`);
    }

}

console.log(sumTwoNumbers(5, 10));
console.log(greetUser("Alice"));
testDataTypes();
console.log(concatenateStrings("Hello", "World"));
console.log(fillArrayWithNumbers(5));
const myArray = [1, 2, 3, 4, 5];
readArray(fillArrayWithNumbers(5));
