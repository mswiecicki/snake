import { DIRECTIONS } from './constants'

const Tile = (x, y) => ({
  x,
  y,
  next(dir) {
    let {x, y} = this
    if (dir == DIRECTIONS.LEFT) x--
    if (dir == DIRECTIONS.UP) y--
    if (dir == DIRECTIONS.RIGHT) x++
    if (dir == DIRECTIONS.DOWN) y++
    return Tile(x, y)
  },
  isInBoard() {
    const {x, y} = this
    return x >= 0 && y >= 0 && x < 20 && y < 20
  },
  overlaps(tile) {
    return tile.x === this.x && tile.y === this.y
  },
})

export { Tile }
