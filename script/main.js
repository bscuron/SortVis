let canvas;

// target frame rate
let RATE = 60;

// numbers to be sorted
let numbers = [];

// the amount of numbers to be sorted
let numberAmount = 50;

// inclusive number range
let numberMin = 1;
let numberMax = 1000;

// queue to visualize the sorting
let queue = [];

function setup(){
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas');
    numbers = resetNumbers(numberAmount, numberMin, numberMax);
    insertionSort(numbers);
}

function draw(){
    frameRate(RATE);
    background(0);
    drawNumbers();
    visualize(); 
}

function visualize(){
    while(queue.length > 0){
        let i = queue.shift();
        let j = queue.shift();

        [numbers[j], numbers[i]] = [numbers[i], numbers[j]];

        push();
        let dx = width / numbers.length;
        let y = map(numbers[i], numberMin, numberMax, 0, height);

        fill(0, 60, 0);
        rect(j * dx, height, dx, -y);

        break;
    }
}

function drawNumbers(){
    let dx = width / numbers.length;

    for(let i = 0; i < numbers.length; i++){
        push();
        let y = map(numbers[i], numberMin, numberMax, 0, height);

        fill(0, 255, 0);
        rect(i * dx, height, dx, -y);
        pop();
    }
}

// returns a new array of randomly arranged numbers between min - max (inclusive)
function resetNumbers(n, min, max){
    queue = [];
    let arr = [];

    for(let i = 0; i < n; i++){
        let rand = Math.floor(Math.random() * (max - min + 1) + min);
        arr.push(rand);
    }

    return arr;
}

function insertionSort(arr){
    // clear the queue
    queue = []

    let newArr = [...arr];

    for(let i = 0; i < newArr.length; i++){
        let j = i;

        while(j > 0 && newArr[j - 1] > newArr[j]){
            // swap
            [newArr[j - 1], newArr[j]] = [newArr[j], newArr[j - 1]];

            // add to the queue for rendering
            queue.push(j - 1);
            queue.push(j);

            j--;
        }
    }

    return newArr;
}

function updateNumbers(){
    let newNumber = parseInt(document.getElementById('numberAmount').value);

    // check if valid number
    if(newNumber > 0){
        numbers = resetNumbers(newNumber, numberMin, numberMax);
        insertionSort(numbers);
    }

}
