let phraseDisplayed = document.getElementById("phraseDisplay");
let phraseInput = document.getElementById("phraseInput");
let correctWords = document.getElementById("correctWords");
let timer = document.getElementById("timer");
let gameTime = 0, time = 60;
let currDisplWord = "", currInputWord = "", currCountWords = 0;
let qhraseNo = 0;
let phrases = ["The sun was setting over the horizon, casting a warm glow over the fields.",
    "The farmer sat on his porch sipping his tea and watching the world go by.",
    "Suddenly, he heard a rustling in the bushes.",
    "He got up to investigate and found a small bird lying on the ground.",
    "It was injured and couldn't fly. The farmer took the bird inside and tended to its wounds.",
    "He nursed it back to health and released it back into the wild.",
    "From that day on, the bird would visit him every evening at sunset, singing a beautiful melody."];

function updateText() {
    phraseDisplayed.textContent = null;
    let currPhraseDis = phrases[qhraseNo].split('');
    for (let i = 0; i < currPhraseDis.length; ++i) {
        const span = document.createElement('span');
        span.innerText = currPhraseDis[i];
        phraseDisplayed.appendChild(span);
    }
    if (qhraseNo < phrases.length - 1) {
        ++qhraseNo;
    } else {
        qhraseNo = 0;
    }
}

function incrementCorrectWords() {
    ++currCountWords;
    correctWords.innerText = `${currCountWords} correct words`;
}

function checkCorrWords(currSpan, nextSpan, letterInput) {
    if (currSpan.match(/[a-zA-Z]/)) {
        currDisplWord += currSpan;
        currInputWord += letterInput;
        if (!nextSpan.match(/[a-zA-Z]/) && currDisplWord === currInputWord) {
            incrementCorrectWords();
            currDisplWord = "";
            currInputWord = "";
        }
    } else {
        currDisplWord = "";
        currInputWord = "";
    }
}

function processText() {
    let currInputArray = phraseInput.value.split('');
    let textSpanArray = phraseDisplayed.querySelectorAll('span');
    for (let i = 0; i < textSpanArray.length; ++i) {
        if (currInputArray[i] == null) {
            textSpanArray[i].classList.remove('correctChar');
            textSpanArray[i].classList.remove('incorrectChar');
        } else if (currInputArray[i] === textSpanArray[i].innerText) {
            textSpanArray[i].classList.add('correctChar');
            textSpanArray[i].classList.remove('incorrectChar');
        } else {
            textSpanArray[i].classList.add('incorrectChar');
            textSpanArray[i].classList.remove('correctChar');
        }
    }
    let letterInput = currInputArray[currInputArray.length - 1];
    let currSpan = textSpanArray[currInputArray.length - 1].innerText;
    let nextSpan;
    if (currInputArray.length < textSpanArray.length) {
        nextSpan = textSpanArray[currInputArray.length].innerText;
    } else {
        nextSpan = " ";
        updateText();
        phraseInput.value = "";
    }
    checkCorrWords(currSpan, nextSpan, letterInput);
}

function updateTime() {
    --time;
    timer.innerHTML = `${time} sec`;
    if (time === 0) {
        gameOver();
    }
}

function gameOver() {
    clearInterval(gameTime);
    phraseInput.disabled = true;
    correctWords.style.color = "red";
    timer.style.color = "red";
    timer.innerText = "Game over";
}

function startGame() {
    gameTime = setInterval(function () {
        updateTime();
    }, 1000);
    document.getElementById("start").disabled = true;
    document.getElementById("reload").disabled = false;
    updateText();
}

function reload() {
    location.reload();
}