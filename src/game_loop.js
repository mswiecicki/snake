import { createValidApple } from './apple'
import { DIRECTIONS } from './constants'
import { drawFrame } from './drawing'
import { handleInput } from './input'
import { canMove, getNextTile, handleMove } from './movement'
import { saveHiScore, setScore } from './score'
import { Tile } from './tile'

function endGame(state) {
  state.done = true
  saveHiScore(state.score)
}

function tick(state) {
  const nextTile = getNextTile(state.snake, state.next_dir)
  state.current_dir = state.next_dir
  canMove(nextTile, state) ? handleMove(nextTile, state) : endGame(state)
}

function gameLoop(state) {
  const frameStart = Date.now()
  tick(state)
  drawFrame(state)
  const frameDuration = Date.now() - frameStart
  const frameRemainder = 1000 / state.speed - frameDuration
  state.done ? start() : window.setTimeout(() => gameLoop(state), frameRemainder)
}

function start() {
  const snake = [Tile(6,10), Tile(5,10), Tile(4,10)]
  const GAME_STATE = {
    score: 0,
    apple: createValidApple(snake),
    snake,
    current_dir: DIRECTIONS.RIGHT,
    next_dir: DIRECTIONS.RIGHT,
    speed: 5,
    done: false,
  }

  window.addEventListener('keydown', handleInput(GAME_STATE))
  setScore(GAME_STATE.score)
  gameLoop(GAME_STATE)
}

export { start }
