const loveStart = new Date("2025-05-27T00:00:00");
const dayMs = 24 * 60 * 60 * 1000;

const counterEls = {
  daysTogether: document.getElementById("daysTogether"),
  loveDays: document.getElementById("loveDays"),
  loveHours: document.getElementById("loveHours"),
  loveMinutes: document.getElementById("loveMinutes"),
  loveSeconds: document.getElementById("loveSeconds"),
  message: document.getElementById("loveCounterMessage"),
};

function updateLoveCounter() {
  const now = new Date();
  const diff = Math.max(0, now - loveStart);
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  counterEls.daysTogether.textContent = days.toString();
  counterEls.loveDays.textContent = days.toString();
  counterEls.loveHours.textContent = hours.toString().padStart(2, "0");
  counterEls.loveMinutes.textContent = minutes.toString().padStart(2, "0");
  counterEls.loveSeconds.textContent = seconds.toString().padStart(2, "0");
  counterEls.message.textContent = `${days} days later, I still feel lucky that 27 May 2025 brought you into my life.`;
}

updateLoveCounter();
setInterval(updateLoveCounter, 1000);

document.querySelectorAll(".reason-card").forEach((card) => {
  const original = card.textContent;
  card.addEventListener("click", () => {
    const revealed = card.classList.toggle("revealed");
    card.textContent = revealed ? card.dataset.note : original;
  });
});

const specialSong = document.getElementById("specialSong");
const songPlayButton = document.getElementById("songPlayButton");
const musicToggle = document.getElementById("musicToggle");
const songStatus = document.getElementById("songStatus");
const record = document.querySelector(".record");

songPlayButton.addEventListener("click", async () => {
  if (!musicToggle.checked) {
    songStatus.textContent = "Turn on background music first, then press play.";
    return;
  }

  try {
    if (specialSong.paused) {
      await specialSong.play();
      songPlayButton.textContent = "Pause song";
      songStatus.textContent = "Playing our special song.";
      record.classList.add("playing");
    } else {
      specialSong.pause();
      songPlayButton.textContent = "Play song";
      songStatus.textContent = "Paused, but the feeling is still playing.";
      record.classList.remove("playing");
    }
  } catch {
    songStatus.textContent = "The song could not start yet. Refresh once and press play again.";
  }
});

musicToggle.addEventListener("change", () => {
  if (!musicToggle.checked) {
    specialSong.pause();
    songPlayButton.textContent = "Play song";
    songStatus.textContent = "Background music is off.";
    record.classList.remove("playing");
  } else {
    songStatus.textContent = "Background music is on. Press play when you are ready.";
  }
});

specialSong.addEventListener("error", () => {
  songStatus.textContent = "Song file not found yet. Make sure assets/special-song.mpeg is present.";
});

const quizQuestions = [
  {
    question: "What makes our daily talking feel special?",
    options: [
      "We can talk about tiny things and still enjoy it",
      "Only serious talks matter",
      "We need perfect topics every time",
    ],
    answer: 0,
    note: "Exactly. Our little everyday talks are part of our magic.",
  },
  {
    question: "What is the sweetest thing about our communication?",
    options: [
      "We try to understand each other",
      "We ignore small feelings",
      "We only talk when everything is perfect",
    ],
    answer: 0,
    note: "Yes. Feeling understood by you is one of my favorite feelings.",
  },
  {
    question: "What kind of vibe do we have together?",
    options: [
      "Soft, funny, caring, and real",
      "Cold and formal",
      "Only random and confusing",
    ],
    answer: 0,
    note: "That is us. Soft, silly, deep, and beautiful in our own way.",
  },
  {
    question: "What makes me happy when we talk?",
    options: [
      "Your attention and the way you reply",
      "Short dry replies only",
      "Not sharing feelings",
    ],
    answer: 0,
    note: "Your attention makes even normal messages feel special.",
  },
  {
    question: "What do I want us to keep doing?",
    options: [
      "Talking honestly and choosing each other",
      "Hiding feelings",
      "Letting silence become distance",
    ],
    answer: 0,
    note: "Always. Honest hearts, soft words, and choosing us.",
  },
  {
    question: "Who loves more?",
    options: ["Arshad", "Firdous"],
    answer: 0,
    note: "Correct. Arshad loves more, with his whole heart.",
    wrongNote: "Arshad loves more till now, but from today it is equal love from both.",
  },
  {
    question: "Do you love me?",
    options: ["Yes", "No"],
    answer: null,
    note: "You do not have an option here, you have to love me anyway.",
    anyAnswer: true,
  },
  {
    question: "What are we?",
    options: ["Friends", "Unknown", "Husband-Wife"],
    answer: 2,
    note: "Correct. Husband and wife by heart, forever.",
    wrongNote: "No no, you are my wife forever.",
  },
];

let quizIndex = 0;
let quizScore = 0;
let answered = false;

const quizProgress = document.getElementById("quizProgress");
const quizScoreEl = document.getElementById("quizScore");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizResult = document.getElementById("quizResult");
const quizNextButton = document.getElementById("quizNextButton");

function renderQuizQuestion() {
  const current = quizQuestions[quizIndex];
  answered = false;
  quizProgress.textContent = `Question ${quizIndex + 1} of ${quizQuestions.length}`;
  quizScoreEl.textContent = `${quizScore} ${quizScore === 1 ? "heart" : "hearts"}`;
  quizQuestion.textContent = current.question;
  quizResult.textContent = "";
  quizNextButton.textContent = quizIndex === quizQuestions.length - 1 ? "See result" : "Next question";

  quizOptions.innerHTML = "";
  current.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = option;
    button.dataset.index = index.toString();
    button.addEventListener("click", () => answerQuiz(index, button));
    quizOptions.appendChild(button);
  });
}

function answerQuiz(selectedIndex, selectedButton) {
  if (answered) return;
  answered = true;

  const current = quizQuestions[quizIndex];
  const isCorrect = current.anyAnswer || selectedIndex === current.answer;
  if (isCorrect) quizScore += 1;

  [...quizOptions.children].forEach((button, index) => {
    button.disabled = true;
    if (current.anyAnswer || index === current.answer) button.classList.add("correct");
  });

  if (!isCorrect) selectedButton.classList.add("wrong");
  quizResult.textContent = isCorrect
    ? current.note
    : current.wrongNote || `Cute answer, but my heart says: ${current.options[current.answer]}.`;
  quizScoreEl.textContent = `${quizScore} ${quizScore === 1 ? "heart" : "hearts"}`;
}

quizNextButton.addEventListener("click", () => {
  if (!answered) {
    quizResult.textContent = "Choose one answer first, my love.";
    return;
  }

  if (quizIndex < quizQuestions.length - 1) {
    quizIndex += 1;
    renderQuizQuestion();
    return;
  }

  quizResult.textContent = `Final score: ${quizScore}/${quizQuestions.length}. But honestly, you already win my heart every day.`;
  quizNextButton.disabled = true;
});

renderQuizQuestion();

document.getElementById("surpriseButton").addEventListener("click", () => {
  document.getElementById("surpriseMessage").classList.add("show");
});
