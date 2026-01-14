// Question Banks
const vocabQuestions = [
  {
    q: "Happy means:",
    options: ["Sad", "Joyful", "Angry", "Tired"],
    answer: 1
  },
  {
    q: "Big means:",
    options: ["Small", "Tiny", "Large", "Short"],
    answer: 2
  },
  {
    q: "Fast means:",
    options: ["Slow", "Quick", "Late", "Weak"],
    answer: 1
  }
];

const grammarQuestions = [
  {
    q: "She ___ a teacher.",
    options: ["are", "is", "am", "be"],
    answer: 1
  },
  {
    q: "They ___ football.",
    options: ["plays", "play", "playing", "played"],
    answer: 1
  },
  {
    q: "I ___ a student.",
    options: ["are", "is", "am", "be"],
    answer: 2
  }
];

// Shared state
let currentIndex = 0;
let score = 0;
let questions = [];
let answered = false;

// Detect page
const params = new URLSearchParams(window.location.search);
const type = params.get("type");

// QUIZ PAGE LOGIC
if (document.getElementById("questionText")) {
  questions = type === "grammar" ? grammarQuestions : vocabQuestions;
  document.getElementById("quizTitle").innerText =
    type === "grammar" ? "Grammar Test" : "Vocabulary Test";

  loadQuestion();
}

function loadQuestion() {
  answered = false;
  document.getElementById("nextBtn").classList.add("hidden");

  const q = questions[currentIndex];
  document.getElementById("questionText").innerText = q.q;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, index) => {
    const div = document.createElement("div");
    div.className = "option";
    div.innerText = opt;
    div.onclick = () => selectAnswer(div, index);
    optionsDiv.appendChild(div);
  });
}

function selectAnswer(element, index) {
  if (answered) return;
  answered = true;

  const correctIndex = questions[currentIndex].answer;
  const options = document.querySelectorAll(".option");

  options.forEach((opt, i) => {
    if (i === correctIndex) opt.classList.add("correct");
    if (i === index && i !== correctIndex) opt.classList.add("wrong");
  });

  if (index === correctIndex) score++;

  document.getElementById("nextBtn").classList.remove("hidden");
}

document.getElementById("nextBtn")?.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    loadQuestion();
  } else {
    window.location.href = `result.html?score=${score}&total=${questions.length}`;
  }
});

// RESULT PAGE LOGIC
if (document.getElementById("scoreText")) {
  const scoreParam = params.get("score");
  const totalParam = params.get("total");
  const percent = Math.round((scoreParam / totalParam) * 100);

  document.getElementById("scoreText").innerText =
    `Score: ${scoreParam} / ${totalParam}`;

  document.getElementById("percentageText").innerText =
    `Accuracy: ${percent}%`;

  document.getElementById("messageText").innerText =
    percent >= 70 ? "Good start 👍" : "Keep practicing 💪";
}