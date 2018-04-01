import { COLORS, TILE_SIZE } from './constants'

const CANVAS = document.getElementById("gameboard")
const CTX = CANVAS.getContext("2d")

function drawTile(x, y, color) {
  const x_coords = x * TILE_SIZE
  const y_coords = y * TILE_SIZE
  CTX.fillStyle = color
  CTX.fillRect(x_coords + 1, y_coords + 1, TILE_SIZE - 2, TILE_SIZE -2)
}

function clearBoard() {
  CTX.clearRect(0, 0, 400, 400)
}

const drawApple = apple => drawTile(apple.x, apple.y, COLORS.APPLE)

const drawSnake = snake =>
  snake.map(segment => drawTile(segment.x, segment.y, COLORS.SNAKE))

function drawFrame(state) {
  clearBoard()
  drawApple(state.apple)
  drawSnake(state.snake)
}

export { drawFrame }
