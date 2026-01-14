// Question Banks
const vocabQuestions = [
  {
    q: "Abundant means:",
    options: ["Scarce", "Plenty", "Rare", "Limited"],
    answer: 1
  },
  {
    q: "Benevolent means:",
    options: ["Kind", "Cruel", "Selfish", "Angry"],
    answer: 0
  },
  {
    q: "Candid means:",
    options: ["Honest", "Rude", "Silent", "Careless"],
    answer: 0
  },
  {
    q: "Diligent means:",
    options: ["Lazy", "Hard-working", "Careless", "Slow"],
    answer: 1
  },
  {
    q: "Eloquent means:",
    options: ["Fluent", "Silent", "Confused", "Angry"],
    answer: 0
  },
  {
    q: "Fragile means:",
    options: ["Strong", "Delicate", "Heavy", "Hard"],
    answer: 1
  },
  {
    q: "Hostile means:",
    options: ["Friendly", "Angry", "Aggressive", "Polite"],
    answer: 2
  },
  {
    q: "Inevitable means:",
    options: ["Avoidable", "Certain", "Optional", "Unlikely"],
    answer: 1
  },
  {
    q: "Jeopardy means:",
    options: ["Safety", "Danger", "Success", "Profit"],
    answer: 1
  },
  {
    q: "Keen means:",
    options: ["Dull", "Interested", "Weak", "Slow"],
    answer: 1
  },
  {
    q: "Lethargic means:",
    options: ["Energetic", "Sleepy", "Active", "Fast"],
    answer: 1
  },
  {
    q: "Magnanimous means:",
    options: ["Generous", "Greedy", "Cruel", "Selfish"],
    answer: 0
  },
  {
    q: "Notorious means:",
    options: ["Famous for good", "Well-known", "Famous for bad", "Unknown"],
    answer: 2
  },
  {
    q: "Obsolete means:",
    options: ["Modern", "Outdated", "Useful", "New"],
    answer: 1
  },
  {
    q: "Prudent means:",
    options: ["Careless", "Wise", "Foolish", "Hasty"],
    answer: 1
  },
  {
    q: "Reluctant means:",
    options: ["Willing", "Eager", "Unwilling", "Happy"],
    answer: 2
  },
  {
    q: "Skeptical means:",
    options: ["Believing", "Doubtful", "Trusting", "Certain"],
    answer: 1
  },
  {
    q: "Tremendous means:",
    options: ["Small", "Huge", "Weak", "Little"],
    answer: 1
  },
  {
    q: "Vague means:",
    options: ["Clear", "Unclear", "Sharp", "Exact"],
    answer: 1
  },
  {
    q: "Zealous means:",
    options: ["Lazy", "Indifferent", "Enthusiastic", "Weak"],
    answer: 2
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
