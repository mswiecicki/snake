import { flatten } from './utils'
import { createValidApple } from './apple'
import { setScore } from './score'

const checkCollision = (tileOrTilesA, tileB) =>
  flatten([tileOrTilesA])
    .reduce((flag, tileA) => (flag || tileA.overlaps(tileB)), false)

const getNextTile = (snake, direction) => snake[0].next(direction)

function moveSnake(nextTile, state) {
  state.snake.unshift(nextTile)
  state.snake.pop()
}

function eatApple(nextTile, state) {
  state.snake.unshift(nextTile)
  state.score++
  state.speed += 0.2
  setScore(state.score)
  state.apple = createValidApple(state.snake)
}

const handleMove = (nextTile, state) =>
  checkCollision(nextTile, state.apple) ?
    eatApple(nextTile, state) : moveSnake(nextTile, state)

const canMove = (nextTile, state) =>
  nextTile.isInBoard() && !checkCollision(state.snake, nextTile)

export {
  canMove,
  checkCollision,
  getNextTile,
  handleMove,
}
