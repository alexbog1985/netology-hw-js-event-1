import "./score-game.css"

export default class ScoreGame {
  constructor() {
    this.element = document.querySelector(".score-container");

    this.score = 0;
    this.maxScore = 5;
    this.miss = 0;
    this.maxMiss = 5;

    this.scoreElement = null;
    this.missElement = null;

  }

  addScoreElement() {
    const scoreGameEl = document.createElement("ul");
    scoreGameEl.classList.add("score-list");
    this.element.appendChild(scoreGameEl);

    this.scoreElement = document.createElement("li");
    this.scoreElement.textContent = "Попаданий: " + this.score;
    scoreGameEl.append(this.scoreElement);

    this.missElement = document.createElement("li");
    this.missElement.textContent = "Промахов: " + this.miss;
    scoreGameEl.append(this.missElement);

  }

  addScore() {
    this.score += 1;
    this.scoreElement.textContent = "Попаданий: " + this.score;
  }

  addMiss() {
    this.miss += 1;
    this.missElement.textContent = "Промахов: " + this.miss;
  }

  getScore() {
    return this.score;
  }

  getMiss() {
    return this.miss;
  }

  isGameOver() {
    return this.miss >= this.maxMiss;
  }

  isWinner() {
    return this.score >= this.maxScore;
  }
}
