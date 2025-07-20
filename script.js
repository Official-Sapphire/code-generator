const wordList = "the quick brown fox jumps over the lazy dog again fast slow keyboard types speed accuracy test monkey type website react tailwind javascript coding development programming sprint rapid thunder lightning bolt text input racing focus practice skill wpm word minute timer display challenge real retry refresh".split(" ");

let words = [];
let currentIndex = 0;
let correct = 0;
let incorrect = 0;
let startTime = null;
let endTime = null;

const wordBox = document.getElementById("word-box");
const input = document.getElementById("input");
const result = document.getElementById("result");

function generateWords(count = 50) {
  return Array.from({ length: count }, () => wordList[Math.floor(Math.random() * wordList.length)]);
}

function renderWords() {
  wordBox.innerHTML = "";
  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.textContent = word;
    span.classList.add("word");
    if (i === currentIndex) span.classList.add("current");
    else if (i < currentIndex) span.classList.add(word === typedHistory[i] ? "correct" : "incorrect");
    wordBox.appendChild(span);
  });
}

let typedHistory = [];

input.addEventListener("input", (e) => {
  if (!startTime) startTime = Date.now();

  if (e.target.value.endsWith(" ")) {
    const typed = e.target.value.trim();
    const target = words[currentIndex];
    if (typed === target) correct++;
    else incorrect++;
    typedHistory[currentIndex] = typed;

    currentIndex++;
    e.target.value = "";

    if (currentIndex >= words.length) {
      endTime = Date.now();
      showResults();
      input.disabled = true;
    }

    renderWords();
  }
});

function showResults() {
  const timeMinutes = (endTime - startTime) / 60000;
  const wpm = Math.round(correct / timeMinutes);
  const accuracy = ((correct / (correct + incorrect)) * 100).toFixed(1);
  result.innerHTML = `WPM: <strong>${wpm}</strong><br>Accuracy: <strong>${accuracy}%</strong>`;
}

function restart() {
  words = generateWords();
  currentIndex = 0;
  correct = 0;
  incorrect = 0;
  startTime = null;
  endTime = null;
  typedHistory = [];
  input.value = "";
  input.disabled = false;
  input.focus();
  result.innerHTML = "";
  renderWords();
}

// Initialize
restart();
