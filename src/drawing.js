import { COLORS, TILE_SIZE } from './constants'

const CANVAS = document.getElementById("gameboard")
const CTX = CANVAS.getContext("2d")

function drawTile(x, y, color) {
  const x_coords = x * TILE_SIZE
  const y_coords = y * TILE_SIZE
  CTX.fillStyle = color
  CTX.fillRect(x_coords + 1, y_coords + 1, TILE_SIZE - 2, TILE_SIZE -2)
}

function drawDot(x, y, color) {
  const x_coords = x * TILE_SIZE
  const y_coords = y * TILE_SIZE
  const x_middle = x_coords + (TILE_SIZE / 2)
  const y_middle = y_coords + (TILE_SIZE / 2)
  const radius = (TILE_SIZE / 2) - 2
  CTX.fillStyle = color
  CTX.beginPath()
  CTX.arc(x_middle, y_middle, radius, 0, 2 * Math.PI)
  CTX.fill()
}

function clearBoard() {
  CTX.clearRect(0, 0, 400, 400)
}

function drawBoard() {
  for (let x=0; x < 20; x++) {
    for (let y=0; y < 20; y++) {
      drawTile(x, y, COLORS.BACKGROUND)
    }
  }
}

function drawApple(apple) {
  const x = apple.x * TILE_SIZE
  const y = apple.y * TILE_SIZE

  const relativeMoveTo = (a, b) => CTX.moveTo(x + a, y + b)
  const relativeLineTo = (a, b) => CTX.lineTo(x + a, y + b)
  CTX.fillStyle = COLORS.APPLE
  CTX.beginPath()
  relativeMoveTo(1, 5)
  relativeLineTo(1, 10)
  relativeLineTo(2, 11)
  relativeLineTo(2, 13)
  relativeLineTo(3, 14)
  relativeLineTo(3, 15)
  relativeLineTo(5, 16)

  relativeLineTo(5, 17)
  relativeLineTo(14, 17)
  relativeLineTo(16, 15)
  relativeLineTo(16, 12)
  relativeLineTo(17, 11)
  relativeLineTo(17, 5)
  relativeLineTo(16, 3)
  relativeLineTo(13, 3)
  relativeLineTo(12, 4)
  relativeLineTo(11, 4)
  relativeLineTo(9, 6)
  relativeLineTo(8, 5)
  relativeLineTo(8, 4)
  relativeLineTo(7, 4)
  relativeLineTo(6, 3)
  relativeLineTo(3, 3)
  relativeLineTo(1, 5)
  CTX.fill()
  CTX.fillStyle = "#000000"
  CTX.beginPath()
  relativeMoveTo(9, 6)
  relativeLineTo(9, 2)
  relativeLineTo(10, 1)
  relativeLineTo(12, 1)
  relativeLineTo(12, 2)
  relativeLineTo(9, 5)
  CTX.fill()
}

const drawSnake = snake =>
  snake.map(segment => drawDot(segment.x, segment.y, COLORS.SNAKE))

function drawFrame(state) {
  clearBoard()
  drawBoard()
  drawApple(state.apple)
  drawSnake(state.snake)
}

export { drawFrame }
