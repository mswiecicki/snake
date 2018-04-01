const $SCORE = document.getElementById("score")
const $BEST = document.getElementById("hiscore")

const retrieveHiScore = () =>
  (window.localStorage.getItem('snake_hiscore') || 0)

function setScore(score) {
  $SCORE.textContent = score
  $BEST.textContent = retrieveHiScore()
}

const saveHiScore = score =>
  window.localStorage.setItem('snake_hiscore', Math.max(retrieveHiScore(), score))

export {
  saveHiScore,
  setScore
}
