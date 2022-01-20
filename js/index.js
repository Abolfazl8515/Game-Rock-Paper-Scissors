const userImages = document.querySelectorAll(".user-Images");
const computerImages = document.querySelectorAll(".computer-Images");

const gameLogic = (userImg, computerImg) => {
  const backDropFinishGame = document.getElementById("backdrop-Finish-Game");
  const modalFinishGame = document.getElementById("modal-Finish-Game");
  const winner = document.getElementById("winner");
  let userScore = document.getElementById("user-Score");
  let computerScore = document.getElementById("computer-Score");
  if (userImg.id !== computerImg.id) {
    if (userImg.id == 0 && computerImg.id == 4) {
      userScore.innerHTML = Number(userScore.innerHTML) + 1;
    } else if (userImg.id == 1 && computerImg.id == 5) {
      userScore.innerHTML = Number(userScore.innerHTML) + 1;
    } else if (userImg.id == 2 && computerImg.id == 3) {
      userScore.innerHTML = Number(userScore.innerHTML) + 1;
    } else if (userImg.id == 0 && computerImg.id == 5) {
      computerScore.innerHTML = Number(computerScore.innerHTML) + 1;
    } else if (userImg.id == 1 && computerImg.id == 3) {
      computerScore.innerHTML = Number(computerScore.innerHTML) + 1;
    } else if (userImg.id == 2 && computerImg.id == 4) {
      computerScore.innerHTML = Number(computerScore.innerHTML) + 1;
    }
  }

  if (userScore.innerHTML == 2) {
    backDropFinishGame.classList.remove("hidden");
    modalFinishGame.classList.remove("hidden");
    winner.innerHTML = "user is win";
  } else if (computerScore.innerHTML == 2) {
    backDropFinishGame.classList.remove("hidden");
    modalFinishGame.classList.remove("hidden");
    winner.innerHTML = "computer is win";
  }

  document.getElementById("start-Game").addEventListener("click", () => {
    backDropFinishGame.classList.add("hidden");
    modalFinishGame.classList.add("hidden");
    userScore.innerHTML = 0;
    computerScore.innerHTML = 0;
  });
};

const hiddenSelect = (i) => {
  for (const userImage of userImages) {
    if (userImage.src !== i.src) {
      userImage.classList.add("hidden");
    }
  }
};

const showSelect = () => {
  for (const userImage of userImages) {
    userImage.classList.remove("hidden");
  }
};

const mainFunctionProgram = () => {
  for (const userImage of userImages) {
    userImage.addEventListener("click", () => {
      const randomComputerCheose = Math.floor((Math.random() * 10) / 4);
      hiddenSelect(userImage);
      computerImages[randomComputerCheose].classList.remove("hidden");
      gameLogic(userImage, computerImages[randomComputerCheose]);
      setTimeout(() => {
        showSelect();
        for (const computer of computerImages) {
          computer.classList.add("hidden");
        }
      }, 2000);
    });
  }
};

const createNewGame = document.querySelector(".icon-create-New-Game");
let saveGameId = 1;
let ScoreSaveId = 1;

const removeSaveGame = (id) => {
  const removItem = document.getElementById(id);
  removItem.remove();
  saveGameId--;
};

createNewGame.addEventListener("click", () => {
  let userScore = document.getElementById("user-Score");
  let computerScore = document.getElementById("computer-Score");
  document.getElementById("backdrop-Ask-Save").classList.remove("hidden");
  document.getElementById("modal-Ask-Save").classList.remove("hidden");

  document.getElementById("No").addEventListener("click", () => {
    userScore.innerHTML = 0;
    computerScore.innerHTML = 0;
    document.getElementById("backdrop-Ask-Save").classList.add("hidden");
    document.getElementById("modal-Ask-Save").classList.add("hidden");
    return;
  });
});

document.getElementById("Yes").addEventListener("click", () => {
  let userScore = document.getElementById("user-Score");
  let computerScore = document.getElementById("computer-Score");
  let savedGames = document.querySelector(".modal-Save-Games .modal-content");
  savedGames.innerHTML += `
  <div class="saved-Game" id="${saveGameId}">
    <h2 class="title-save">saved game ${saveGameId}</h2>
    <h2 class="user-Score">User Score ${userScore.innerHTML}</h2>
    <h2 class="Computer-Score">Computer Score ${computerScore.innerHTML}</h2>
    <button onclick="removeSaveGame(${saveGameId})">Delete</button>
  </div>
  `;

  document.getElementById("backdrop-Ask-Save").classList.add("hidden");
  document.getElementById("modal-Ask-Save").classList.add("hidden");
  userScore.innerHTML = 0;
  computerScore.innerHTML = 0;
  saveGameId++;
});

document.getElementById("backdrop-Save-Games").addEventListener("click", () => {
  document.getElementById("backdrop-Save-Games").classList.add("hidden");
  document.getElementById("modal-Save-Games").classList.add("hidden");
});

const saveGamesModal = document.querySelector(".icon-Saved-Games");

saveGamesModal.addEventListener("click", () => {
  document.getElementById("backdrop-Save-Games").classList.toggle("hidden");
  document.getElementById("modal-Save-Games").classList.toggle("hidden");
});

const saveGame = document.getElementById("btn-save");

saveGame.addEventListener("click", () => {
  let userScore = document.getElementById("user-Score");
  let computerScore = document.getElementById("computer-Score");
  let savedGames = document.querySelector(".modal-Save-Games .modal-content");
  const massage = document.querySelector(".massage");
  savedGames.innerHTML += `
  <div class="saved-Game" id="${saveGameId}">
    <h2 class="title-save">saved game ${saveGameId}</h2>
    <h2 class="user-Score">User Score <span id="userId_${ScoreSaveId}">${userScore.innerHTML}</span></h2>
    <h2 class="Computer-Score">Computer Score <span id="computerId_${ScoreSaveId}">${computerScore.innerHTML}</span></h2>
    <button onclick="removeSaveGame(${saveGameId})">Delete</button>
  </div>
  `;
  ScoreSaveId++;
  saveGameId++;
  massage.classList.remove("hidden");
  setTimeout(() => {
    massage.classList.add("hidden");
  }, 2000);
});

mainFunctionProgram();
