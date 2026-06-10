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
  counterEls.message.textContent = `${days} days later, Alhamdulillah I still feel lucky that 27 May 2025 brought you into my life.`;
}

updateLoveCounter();
setInterval(updateLoveCounter, 1000);

const typingTitle = document.querySelector(".typing-title");
if (typingTitle) {
  const titleText = typingTitle.dataset.text || typingTitle.textContent;
  typingTitle.textContent = "";
  typingTitle.classList.add("typing-ready");

  [...titleText].forEach((letter, index) => {
    setTimeout(() => {
      typingTitle.textContent += letter;
      if (index === [...titleText].length - 1) {
        setTimeout(() => typingTitle.classList.remove("typing-ready"), 1200);
      }
    }, 70 * index);
  });
}

document.querySelectorAll(".reason-card").forEach((card) => {
  const original = card.innerHTML;
  card.addEventListener("click", () => {
    const revealed = card.classList.toggle("revealed");
    if (revealed) {
      card.textContent = card.dataset.note;
    } else {
      card.innerHTML = original;
    }
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
    question: "Who misses the other one first?",
    options: [
      "Arshad, obviously",
      "Firdous, secretly",
      "Both, but acting normal",
    ],
    answer: 2,
    note: "Correct. Both miss each other, but both try to act cool.",
    wrongNote: "Nice try, but the real answer is both. ARFI cannot stay normal without each other.",
  },
  {
    question: "If I say 'I am not angry', what does it usually mean?",
    options: [
      "Everything is totally fine",
      "Danger level: extra cute",
      "Bring love, sorry, and attention",
    ],
    answer: 2,
    note: "Exactly. The solution is love, attention, and a little extra pampering.",
    wrongNote: "Wrong but cute. In ARFI language, this means bring love, sorry, and attention.",
  },
  {
    question: "What is my favorite notification?",
    options: [
      "Battery low",
      "Your message",
      "Random app update",
    ],
    answer: 1,
    note: "Correct. Your message can fix my mood faster than anything.",
    wrongNote: "Nope. My favorite notification is always your message.",
  },
  {
    question: "Who should win every cute argument?",
    options: [
      "Firdous",
      "Firdous again",
      "Arshad, only in dreams",
    ],
    answer: 0,
    note: "Correct. Firdous wins, Arshad smiles, peace restored.",
    wrongNote: "Incorrect. In this relationship court, Firdous wins every cute argument.",
  },
  {
    question: "What is our relationship status?",
    options: [
      "Cute trouble",
      "Permanent ARFI package",
      "Loading...",
    ],
    answer: 1,
    note: "Correct. Permanent ARFI package, no cancellation allowed, Inshallah.",
    wrongNote: "Wrong answer. We are the permanent ARFI package, lifetime validity.",
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
    note: "Correct. Husband and wife by heart, Inshallah forever.",
    wrongNote: "No no, you are my wife forever, Inshallah.",
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

  quizResult.textContent = `Final score: ${quizScore}/${quizQuestions.length}. But honestly, Mashallah you already win my heart every day.`;
  quizNextButton.disabled = true;
});

renderQuizQuestion();

const brideSignature = document.getElementById("brideSignature");
const signCertificateButton = document.getElementById("signCertificateButton");
const certificateResult = document.getElementById("certificateResult");
const certificateBrideName = document.getElementById("certificateBrideName");
const certificateBrideInfo = document.getElementById("certificateBrideInfo");
const signedBrideName = document.getElementById("signedBrideName");
const signatureError = document.getElementById("signatureError");

signCertificateButton.addEventListener("click", () => {
  const name = brideSignature.value.trim();

  if (!name) {
    certificateResult.classList.remove("show");
    brideSignature.classList.add("invalid");
    signatureError.textContent = "Signature required, meri jaan. Type your name first to become officially married with Arshad.";
    brideSignature.focus();
    return;
  }

  brideSignature.classList.remove("invalid");
  signatureError.textContent = "";
  certificateBrideName.textContent = name;
  certificateBrideInfo.textContent = name;
  signedBrideName.textContent = name;
  certificateResult.classList.remove("show");
  void certificateResult.offsetWidth;
  certificateResult.classList.add("show");
  signCertificateButton.textContent = "Signed forever";
});

brideSignature.addEventListener("input", () => {
  if (brideSignature.value.trim()) {
    brideSignature.classList.remove("invalid");
    signatureError.textContent = "";
  }
});

const surpriseButton = document.getElementById("surpriseButton");
const surpriseMessage = document.getElementById("surpriseMessage");

surpriseButton.addEventListener("click", () => {
  const isOpen = surpriseMessage.classList.toggle("show");
  surpriseButton.textContent = isOpen ? "Close message" : "Reveal message";
  surpriseButton.setAttribute("aria-expanded", isOpen.toString());
});
