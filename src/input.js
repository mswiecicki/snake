import { KEY_TO_DIRECTION } from './constants'

function directionChangeValid(oldDir, newDir) {
  return (oldDir + 3) % 4 == newDir || (oldDir + 1) % 4 == newDir
}

const handleInput = state =>
  ({keyCode}) => {
    const newDir = KEY_TO_DIRECTION[keyCode]
    if (directionChangeValid(state.current_dir, newDir)) {
      state.next_dir = newDir
    }
  }

export { handleInput }
