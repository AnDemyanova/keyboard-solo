const words = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew"];
let currentWord = '';
let currentIndex = 0;
let correctWordsCount = 0;
let incorrectWordsCount = 0;
let mistakesInWord = 0;
let timerInterval;
let seconds = 0;

const wordElement = document.querySelector('.word');
const correctCountElement = document.querySelector('.correct-count');
const wrongCountElement = document.querySelector('.wrong-count');
const mistakesElement = document.querySelector('.word-mistakes');
const timerElement = document.getElementById('timer');


function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        timerElement.textContent = `${minutes}:${secs}`;
    }, 1000);
}


function resetGame() {
    currentIndex = 0;
    mistakesInWord = 0;
    mistakesElement.textContent = mistakesInWord;
    setNewWord();
}


function setNewWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    wordElement.innerHTML = '';
    currentWord.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('symbol');
        wordElement.appendChild(span);
    });
    currentIndex = 0;
}


function handleKeyPress(event) {
    const keyPressed = event.key.toLowerCase();
    const currentChar = currentWord[currentIndex];

    if (keyPressed === currentChar) {

        const spans = wordElement.querySelectorAll('span');
        spans[currentIndex].classList.add('c');
        currentIndex++;


        if (currentIndex === currentWord.length) {
            correctWordsCount++;
            correctCountElement.textContent = correctWordsCount;
            resetGame();
            if (correctWordsCount === 5) {
                alert("Вы выиграли!");
                resetGame();
            }
        }

    } else {

        mistakesInWord++;
        mistakesElement.textContent = mistakesInWord;
        const spans = wordElement.querySelectorAll('span');
        spans[currentIndex].classList.add('w');



        if (currentIndex === currentWord.length - 1) {
            incorrectWordsCount++;
            wrongCountElement.textContent = incorrectWordsCount;
            resetGame();
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    resetGame();
    startTimer();
    document.addEventListener('keydown', _.throttle(handleKeyPress, 100));
});