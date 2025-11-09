import TileGame from "../components/tile-game/TileGame";

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");

  const tileGame = new TileGame(document.querySelector(".tile-game"));
  tileGame.startGame();
});
