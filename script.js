/* =====================================
   SECRET GIFT 💝
   MAIN SCRIPT
===================================== */


/* =====================================
   SCREEN SYSTEM
===================================== */

const screens =
  document.querySelectorAll(".screen");

function showScreen(id) {

  screens.forEach(screen => {
    screen.classList.remove("active");
  });

  const next =
    document.getElementById(id);

  if (next) {
    next.classList.add("active");
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =====================================
   FLOATING HEARTS
===================================== */

const heartsContainer =
  document.getElementById("hearts");

function createFloatingHeart() {

  if (!heartsContainer) return;

  const heart =
    document.createElement("div");

  heart.className =
    "floating-heart";

  const symbols = [
    "❤️",
    "💕",
    "💗",
    "💖",
    "💘"
  ];

  heart.textContent =
    symbols[
      Math.floor(
        Math.random() *
        symbols.length
      )
    ];

  heart.style.left =
    Math.random() * 100 + "%";

  heart.style.fontSize =
    14 + Math.random() * 22 + "px";

  const duration =
    5 + Math.random() * 6;

  heart.style.animationDuration =
    duration + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, duration * 1000);
}

setInterval(
  createFloatingHeart,
  500
);


/* =====================================
   LOGIN
   KIRISH KODI: 0716
===================================== */

const ENTRY_CODE = "0716";

const entryCode =
  document.getElementById("entryCode");

const loginBtn =
  document.getElementById("loginBtn");

const loginMessage =
  document.getElementById("loginMessage");

const codeDots =
  document.querySelectorAll(
    ".codeDots span"
  );


if (entryCode) {

  entryCode.addEventListener(
    "input",
    () => {

      const value =
        entryCode.value;

      codeDots.forEach(
        (dot, index) => {

          if (index < value.length) {

            dot.style.background =
              "#ff82c4";

            dot.style.boxShadow =
              "0 0 10px #ff82c4";

          } else {

            dot.style.background =
              "rgba(255,255,255,0.25)";

            dot.style.boxShadow =
              "none";
          }

        }
      );

    }
  );

}


function checkEntryCode() {

  const entered =
    entryCode.value.trim();

  if (entered === ENTRY_CODE) {

    loginMessage.textContent =
      "Kod to‘g‘ri! ❤️";

    loginMessage.style.color =
      "#ff9bd2";

    loginBtn.disabled = true;

    setTimeout(() => {

      loginBtn.disabled = false;

      entryCode.value = "";

      codeDots.forEach(dot => {

        dot.style.background =
          "rgba(255,255,255,0.25)";

        dot.style.boxShadow =
          "none";

      });

      showScreen("startScreen");

    }, 700);

  } else {

    loginMessage.textContent =
      "Kod noto‘g‘ri 😄 Qayta urinib ko‘r!";

    loginMessage.style.color =
      "#ff9a9a";

    entryCode.value = "";

    codeDots.forEach(dot => {

      dot.style.background =
        "rgba(255,255,255,0.25)";

      dot.style.boxShadow =
        "none";

    });

    entryCode.animate(
      [
        { transform: "translateX(0)" },
        { transform: "translateX(-8px)" },
        { transform: "translateX(8px)" },
        { transform: "translateX(-5px)" },
        { transform: "translateX(0)" }
      ],
      {
        duration: 300
      }
    );

  }

}


loginBtn.addEventListener(
  "click",
  checkEntryCode
);


entryCode.addEventListener(
  "keydown",
  event => {

    if (event.key === "Enter") {
      checkEntryCode();
    }

  }
);


/* =====================================
   START
===================================== */

const startBtn =
  document.getElementById("startBtn");

startBtn.addEventListener(
  "click",
  () => {

    showScreen(
      "questionScreen"
    );

  }
);


/* =====================================
   LEVEL 1
   QUESTION
===================================== */

let score = 0;

const answerButtons =
  document.querySelectorAll(
    "#answers .answer"
  );

const message =
  document.getElementById("message");


answerButtons.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        if (
          button.classList.contains(
            "correct"
          )
        ) {

          score++;

          document.getElementById(
            "score"
          ).textContent =
            "❤️ " + score;

          message.textContent =
            "To‘g‘ri! 😍";

          message.style.color =
            "#ff9bd2";

          setTimeout(
            () => {

              showScreen(
                "puzzleScreen"
              );

              createPuzzle();

            },
            900
          );

        } else {

          message.textContent =
            "Ushlab ko‘rchi! 😂 Tugma qochadi!";

          message.style.color =
            "#ffb5dc";

          runAway(button);

        }

      }
    );

  }
);


/* =====================================
   RUN AWAY BUTTON
===================================== */

function runAway(button) {

  button.style.position =
    "fixed";

  button.style.zIndex =
    "9999";

  const width =
    button.offsetWidth || 180;

  const height =
    button.offsetHeight || 55;

  const maxX =
    Math.max(
      10,
      window.innerWidth -
      width -
      10
    );

  const maxY =
    Math.max(
      10,
      window.innerHeight -
      height -
      10
    );

  const x =
    10 +
    Math.random() *
    Math.max(1, maxX - 10);

  const y =
    10 +
    Math.random() *
    Math.max(1, maxY - 10);

  button.style.left =
    x + "px";

  button.style.top =
    y + "px";

  button.style.transform =
    "rotate(" +
    (Math.random() * 30 - 15) +
    "deg)";

  setTimeout(() => {

    button.style.position = "";
    button.style.left = "";
    button.style.top = "";
    button.style.zIndex = "";
    button.style.transform = "";

  }, 1200);

}


/* =====================================
   LEVEL 2
   PUZZLE
===================================== */

const puzzle =
  document.getElementById("puzzle");

const puzzleBtn =
  document.getElementById(
    "puzzleBtn"
  );

let puzzlePieces = [];

let selectedPiece = null;


/*
   Puzzle uchun photo1 ishlatiladi.
   Rasm:
   photos/photo1.jpg
*/

function createPuzzle() {

  puzzle.innerHTML = "";

  selectedPiece = null;

  puzzlePieces = [];

  for (
    let position = 0;
    position < 9;
    position++
  ) {

    const piece =
      document.createElement(
        "button"
      );

    piece.className =
      "puzzle-piece";

    piece.dataset.position =
      position;

    const row =
      Math.floor(
        position / 3
      );

    const col =
      position % 3;

    piece.style.backgroundImage =
      "url('photos/photo1.jpg')";

    piece.style.backgroundPosition =
      `${col * 50}% ${row * 50}%`;

    piece.addEventListener(
      "click",
      () => {

        selectPuzzlePiece(
          piece
        );

      }
    );

    puzzlePieces.push(piece);

    puzzle.appendChild(piece);

  }


  /*
     Aralashtirish
  */

  let positions =
    [...Array(9).keys()];

  do {

    positions.sort(
      () =>
        Math.random() - 0.5
    );

  } while (
    positions.every(
      (value, index) =>
        value === index
    )
  );


  puzzlePieces.forEach(
    (piece, index) => {

      piece.dataset.position =
        positions[index];

    }
  );

  updatePuzzle();

}


function selectPuzzlePiece(piece) {

  if (
    selectedPiece === null
  ) {

    selectedPiece = piece;

    piece.style.outline =
      "3px solid #ff8ac7";

    piece.style.transform =
      "scale(1.05)";

    return;

  }


  if (
    selectedPiece === piece
  ) {

    piece.style.outline = "";

    piece.style.transform = "";

    selectedPiece = null;

    return;

  }


  const first =
    selectedPiece.dataset.position;

  const second =
    piece.dataset.position;

  selectedPiece.dataset.position =
    second;

  piece.dataset.position =
    first;

  selectedPiece.style.outline = "";

  selectedPiece.style.transform = "";

  piece.style.outline = "";

  piece.style.transform = "";

  selectedPiece = null;

  updatePuzzle();

}


function updatePuzzle() {

  puzzlePieces.forEach(
    piece => {

      const position =
        Number(
          piece.dataset.position
        );

      const row =
        Math.floor(
          position / 3
        );

      const col =
        position % 3;

      piece.style.backgroundPosition =
        `${col * 50}% ${row * 50}%`;

    }
  );

}


puzzleBtn.addEventListener(
  "click",
  () => {

    const correct =
      puzzlePieces.every(
        (piece, index) =>
          Number(
            piece.dataset.position
          ) === index
      );


    if (correct) {

      puzzleBtn.textContent =
        "To‘g‘ri! ❤️";

      setTimeout(() => {

        showScreen(
          "heartScreen"
        );

        startHeartGame();

        puzzleBtn.textContent =
          "Tayyor ✅";

      }, 700);

    } else {

      puzzleBtn.textContent =
        "Hali tayyor emas 🧩";

      setTimeout(() => {

        puzzleBtn.textContent =
          "Tayyor ✅";

      }, 1000);

    }

  }
);


/* =====================================
   LEVEL 3
   COLLECT 10 HEARTS
===================================== */

const heartGame =
  document.getElementById(
    "heartGame"
  );

const heartCount =
  document.getElementById(
    "heartCount"
  );

let collectedHearts = 0;


function startHeartGame() {

  heartGame.innerHTML = "";

  collectedHearts = 0;

  heartCount.textContent =
    "❤️ 0 / 10";

  createHeart();

}


function createHeart() {

  if (
    collectedHearts >= 10
  ) {

    setTimeout(() => {

      showScreen(
        "targetScreen"
      );

      startTargetGame();

    }, 500);

    return;

  }


  const heart =
    document.createElement(
      "button"
    );

  heart.className =
    "game-heart";

  heart.textContent =
    "❤️";


  const maxX =
    Math.max(
      5,
      heartGame.clientWidth - 50
    );

  const maxY =
    Math.max(
      5,
      heartGame.clientHeight - 50
    );


  heart.style.left =
    Math.random() * maxX + "px";

  heart.style.top =
    Math.random() * maxY + "px";


  heart.addEventListener(
    "click",
    () => {

      collectedHearts++;

      heartCount.textContent =
        `❤️ ${collectedHearts} / 10`;

      heart.remove();

      createHeart();

    }
  );


  heartGame.appendChild(
    heart
  );

}


/* =====================================
   LEVEL 4
   MOVING HEART
===================================== */

const target =
  document.getElementById(
    "target"
  );

const targetArea =
  document.getElementById(
    "targetArea"
  );

const targetScore =
  document.getElementById(
    "targetScore"
  );

let targetHits = 0;


function startTargetGame() {

  targetHits = 0;

  targetScore.textContent =
    "0 / 5";

  moveTarget();

}


function moveTarget() {

  const maxX =
    Math.max(
      5,
      targetArea.clientWidth - 65
    );

  const maxY =
    Math.max(
      5,
      targetArea.clientHeight - 65
    );

  target.style.left =
    Math.random() * maxX + "px";

  target.style.top =
    Math.random() * maxY + "px";

}


target.addEventListener(
  "click",
  () => {

    targetHits++;

    targetScore.textContent =
      `${targetHits} / 5`;


    if (
      targetHits >= 5
    ) {

      target.style.pointerEvents =
        "none";

      setTimeout(() => {

        target.style.pointerEvents =
          "auto";

        showScreen(
          "codeScreen"
        );

      }, 500);

    } else {

      moveTarget();

    }

  }
);


/* =====================================
   LEVEL 5
   SECRET CODE = 0716
===================================== */

const SECRET_CODE =
  "0716";

const codeInput =
  document.getElementById(
    "codeInput"
  );

const codeBtn =
  document.getElementById(
    "codeBtn"
  );

const codeMessage =
  document.getElementById(
    "codeMessage"
  );


function checkSecretCode() {

  const entered =
    codeInput.value.trim();


  if (
    entered === SECRET_CODE
  ) {

    codeMessage.textContent =
      "Kod to‘g‘ri! 🔓❤️";

    codeMessage.style.color =
      "#ff9bd2";


    codeBtn.disabled = true;


    setTimeout(() => {

      codeBtn.disabled = false;

      codeInput.value = "";

      showScreen(
        "photoScreen"
      );

      showPhoto(1);

    }, 900);


  } else {

    codeMessage.textContent =
      "Kod noto‘g‘ri 😄 Qayta urinib ko‘r!";

    codeMessage.style.color =
      "#ff9a9a";

    codeInput.value = "";

  }

}


codeBtn.addEventListener(
  "click",
  checkSecretCode
);


codeInput.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Enter"
    ) {

      checkSecretCode();

    }

  }
);


/* =====================================
   LEVEL 6
   PHOTOS
===================================== */

let currentPhoto = 1;

const photo =
  document.getElementById(
    "photo1"
  );

const photoBtn =
  document.getElementById(
    "photoBtn"
  );


function showPhoto(number) {

  currentPhoto = number;

  photo.classList.remove(
    "image-error"
  );

  photo.src =
    `photos/photo${number}.jpg`;

  photo.alt =
    `Secret photo ${number}`;


  if (
    number >= 5
  ) {

    photoBtn.textContent =
      "Keyingi bosqich 💗";

  } else {

    photoBtn.textContent =
      "Keyingi rasm 💗";

  }

}


photo.addEventListener(
  "error",
  () => {

    photo.classList.add(
      "image-error"
    );

    photo.alt =
      "Rasm topilmadi";

  }
);


photoBtn.addEventListener(
  "click",
  () => {

    if (
      currentPhoto < 5
    ) {

      showPhoto(
        currentPhoto + 1
      );

    } else {

      showScreen(
        "finalQuestionScreen"
      );

    }

  }
);


/* =====================================
   LEVEL 7
   FINAL QUESTION
===================================== */

const finalCorrect =
  document.querySelector(
    ".finalCorrect"
  );

const finalWrongs =
  document.querySelectorAll(
    ".finalWrong"
  );

const finalMessage =
  document.getElementById(
    "finalMessage"
  );


finalWrongs.forEach(
  button => {

    button.addEventListener(
      "click",
      () => {

        finalMessage.textContent =
          "Bu tugma ham qochadi 😂❤️";

        finalMessage.style.color =
          "#ffb5dc";

        runAway(button);

      }
    );

  }
);


finalCorrect.addEventListener(
  "click",
  () => {

    finalMessage.textContent =
      "To‘g‘ri javob! ❤️";

    finalMessage.style.color =
      "#ff9bd2";


    setTimeout(() => {

      showScreen(
        "finalScreen"
      );

    }, 1000);

  }
);


/* =====================================
   FINAL GIFT
===================================== */

const openGiftBtn =
  document.getElementById(
    "openGiftBtn"
  );


openGiftBtn.addEventListener(
  "click",
  () => {

    showScreen(
      "galleryScreen"
    );

    startFinalHearts();

  }
);


/* =====================================
   FINAL HEART EFFECT
===================================== */

function startFinalHearts() {

  for (
    let i = 0;
    i < 30;
    i++
  ) {

    setTimeout(
      () => {

        createFloatingHeart();

      },
      i * 120
    );

  }

}


/* =====================================
   GALLERY IMAGE ERROR
===================================== */

document
  .querySelectorAll(
    ".gallery img"
  )
  .forEach(
    img => {

      img.addEventListener(
        "error",
        () => {

          img.classList.add(
            "image-error"
          );

          img.alt =
            "Rasm topilmadi";

        }
      );

    }
  );


/* =====================================
   TOUCH SUPPORT
===================================== */

document.addEventListener(
  "touchstart",
  () => {},
  {
    passive: true
  }
);


/* =====================================
   START WITH LOGIN
===================================== */

showScreen(
  "loginScreen"
);