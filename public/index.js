const gameList = document.querySelector("#game-list");
const gameName = document.querySelector('#game-name')
const randomGameName = document.querySelector('#randomGame')
const randomGameButton = document.querySelector('#random-suggestion')
const isCrossPlay = document.querySelector('#isCrossPlay')

function getAllGames() {
  gameList.innerHTML = "";
  axios.get("http://localhost:4656/game-list").then((res) => {
    res.data.forEach((game) => {
      const p = document.createElement("p");
      p.textContent = game.game_name;
      gameList.appendChild(p);
    });
  });
}

function getCrossPlayGames() {
  gameList.innerHTML = "";
  axios.get("http://localhost:4656/crossPlayGames").then((res) => {
    res.data.forEach((game) => {
      const p = document.createElement("p");
      p.textContent = game.game_name;
      gameList.appendChild(p);
    });
  });
}


const gameSelect = document.querySelector("#games");
gameSelect.addEventListener("change", function () {
    if (gameSelect.value === "cross") {
        getCrossPlayGames();
    } else{
        getAllGames()
    }
});

function handleSubmit(e) {
    e.preventDefault()
    console.log(gameName.value)
    console.log(isCrossPlay.checked)
    if (gameName.value < 1) {
        alert ('You must enter a game name')
        return
    }

    let body = {
        game_name: gameName.value, 
        cross: isCrossPlay.checked,
    }


    axios.post('http://localhost:4656/game-list', body)
    .then((res) => {
        alert(res.data) 
        getAllGames()
    })
};

function randomGame() {
    randomGameName.innerHTML = "";
    axios.get("http://localhost:4656/random-game").then((res) => {
      res.data.forEach((game) => {
        const p = document.createElement("p");
        p.textContent = game.game_name;
        randomGameName.appendChild(p);
      });
    });
  }


getAllGames();
form.addEventListener('submit', handleSubmit)
randomGameButton.addEventListener('click', randomGame)