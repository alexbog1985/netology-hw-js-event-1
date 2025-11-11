import ScoreGame from "../score-game/ScoreGame.js";

export default class TileGame {
  constructor(element) {
    this.element = element;
    this.lastActiveTile = null;
    this.scoreGame = new ScoreGame();

    this.element.addEventListener("click", this.onTileClick.bind(this));
  }

  init() {
    this.addTile();
    this.scoreGame.addScoreElement();

    this.startGame();
  }

  addTile() {
    for (let i = 1; i <= 16; i++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      this.element.appendChild(tile);
    }
  }

  clearTiles() {
    const tiles = this.element.querySelectorAll(".tile");
    tiles.forEach((tile) => {
      tile.classList.remove("tile-active");
    });
  }

  addGoblin() {
    const tiles = Array.from(this.element.querySelectorAll(".tile"));
    const availableTiles = this.lastActiveTile
      ? tiles.filter(tile => tile !== this.lastActiveTile)
      : tiles;

    if (availableTiles.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableTiles.length);
    const newActiveTile = availableTiles[randomIndex];

    this.clearTiles();
    newActiveTile.classList.add("tile-active");

    this.lastActiveTile = newActiveTile;
  }

  onTileClick(e) {
    if (e.target.classList.contains("tile-active")) {
      this.scoreGame.addScore();
      this.checkEndGame();
      this.restartGame();
    }
  }

  startGame() {
    this.addGoblin();
    this.goblinInterval = setInterval(() => {
      this.addGoblin();
      this.scoreGame.addMiss();
      this.checkEndGame();
    }, 1000);
  }

  stopGame() {
    if (this.goblinInterval) {
      this.clearTiles();
      clearInterval(this.goblinInterval);
      this.goblinInterval = null;
    }
  }

  restartGame() {
    if (this.goblinInterval) {
      this.clearTiles();
      clearInterval(this.goblinInterval);
      this.startGame();
    }
  }

  checkEndGame() {
    if (this.scoreGame.isWinner()) {
      this.endGame("win");
    } else if (this.scoreGame.isGameOver()) {
      this.endGame("lose");
    }
  }

  endGame(result) {
    this.stopGame();
    alert(result === "win" ? "Вы выиграли!" : "Вы проиграли!");
    this.scoreGame.reset();
    this.startGame();
  }
}
