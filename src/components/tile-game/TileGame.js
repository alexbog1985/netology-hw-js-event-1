import ScoreGame from "../score-game/ScoreGame.js";

export default class TileGame {
  constructor(element) {
    this.element = element;
    this.scoreGame = new ScoreGame();

    this.element.addEventListener('click', this.onTileClick.bind(this));
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
    const inactiveTiles = tiles.filter(
      (tile) => !tile.classList.contains("tile-active"),
    );

    const currentActiveTile = tiles.find((tile) =>
      tile.classList.contains("tile-active"),
    );
    const currentIndexInAllTiles = currentActiveTile
      ? inactiveTiles.indexOf(currentActiveTile)
      : -1;

    let randomIndex, newIndexInAllTiles, newActiveTile

    do {
      randomIndex = Math.floor(Math.random() * inactiveTiles.length);
      newActiveTile = inactiveTiles[randomIndex];
      newIndexInAllTiles = tiles.indexOf(newActiveTile);
    } while (newIndexInAllTiles === currentIndexInAllTiles);

    this.clearTiles();
    inactiveTiles[randomIndex].classList.add("tile-active");
  }

  onTileClick(e) {
    if (e.target.classList.contains("tile-active")) {
      this.scoreGame.addScore();
      this.restartGame();
    } else {
      this.scoreGame.addMiss();
    }
  }

  startGame() {
    this.addGoblin();
    this.goblinInterval = setInterval(() => {
      this.addGoblin();
      this.scoreGame.addMiss();
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
    this.stopGame();
    this.startGame();
  }
}
