const words = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew"];
let currentWord = '';
let currentIndex = 0;
let correctWordsCount = 0; // Изменено на правильное количество слов
let mistakesInWord = 0;
let timerInterval;
let seconds = 0;

const wordElement = document.querySelector('.word');
const correctCountElement = document.querySelector('.correct-count');
const wrongCountElement = document.querySelector('.wrong-count');
const mistakesElement = document.querySelector('.word-mistakes');
const timerElement = document.getElementById('timer');

// Функция для запуска таймера
function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        timerElement.textContent = `${ minutes }: ${ secs }`;
    }, 1000);
}

// Функция для сброса игры
function resetGame() {
    currentIndex = 0;
    mistakesInWord = 0;
    mistakesElement.textContent = mistakesInWord;
    setNewWord();
}

// Функция для установки нового слова
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

// Функция для обработки нажатий клавиш
function handleKeyPress(event) {
    const keyPressed = event.key.toLowerCase();
    const currentChar = currentWord[currentIndex];

    if (keyPressed === currentChar) {
        // Правильный ввод
        const spans = wordElement.querySelectorAll('span');
        spans[currentIndex].classList.add('c'); // Окрасить в зеленый
        currentIndex++;

        // Если все символы введены правильно
        if (currentIndex === currentWord.length) {
            correctWordsCount++; // Увеличиваем количество правильно введенных слов
            correctCountElement.textContent = correctWordsCount; // Обновляем отображение
            resetGame(); // Устанавливаем новое слово

            if (correctWordsCount === 5) {
                alert("Вы выиграли!");
                resetGame();
            }
        }

    } else {
        // Неправильный ввод
        mistakesInWord++;
        mistakesElement.textContent = mistakesInWord;
        const spans = wordElement.querySelectorAll('span');
        spans[currentIndex].classList.add('w'); // Окрасить в красный
        // Текущий символ остается для повторного ввода
    }
}

// Запуск игры при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    resetGame();
    startTimer();
    document.addEventListener('keydown', _.throttle(handleKeyPress, 100));
});