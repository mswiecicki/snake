import { checkCollision } from './movement'
import { Tile } from './tile'

const randomInBoard = () => Math.floor(Math.random() * 20)

const generateApple = () => Tile( randomInBoard(), randomInBoard() )

const isAppleValid = (snake, apple) => !checkCollision(snake, apple)

function createValidApple(snake) {
  const apple = generateApple()
  return isAppleValid(snake, apple) ? apple : createValidApple(snake)
}

export { createValidApple }
