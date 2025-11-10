import "./score-game.css"

export default class ScoreGame {
  constructor() {
    this.element = document.querySelector(".score-container");

    this.score = 0;
    this.maxScore = 5;
    this.miss = 0;
    this.maxMiss = 5;
  }

  addScoreElement() {
    const scoreGameEl = document.createElement("ul");
    scoreGameEl.classList.add("score-list");
    this.element.appendChild(scoreGameEl);

    const scoreElement = document.createElement("li");
    scoreElement.textContent = "Попаданий: " + this.score;
    scoreGameEl.append(scoreElement);

    const missElement = document.createElement("li");
    missElement.textContent = "Промахов: " + this.miss;
    scoreGameEl.append(missElement);

  }

  addScore() {
    this.score += 1;
  }

  addMiss() {
    this.miss += 1;
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
