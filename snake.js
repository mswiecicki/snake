/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_loop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


Object(_game_loop__WEBPACK_IMPORTED_MODULE_0__["start"])()


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "start", function() { return start; });
/* harmony import */ var _apple__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _drawing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _movement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3);
/* harmony import */ var _score__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5);
/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6);








function endGame(state) {
  state.done = true
  Object(_score__WEBPACK_IMPORTED_MODULE_5__["saveHiScore"])(state.score)
}

function tick(state) {
  const nextTile = Object(_movement__WEBPACK_IMPORTED_MODULE_4__["getNextTile"])(state.snake, state.next_dir)
  state.current_dir = state.next_dir
  Object(_movement__WEBPACK_IMPORTED_MODULE_4__["canMove"])(nextTile, state) ? Object(_movement__WEBPACK_IMPORTED_MODULE_4__["handleMove"])(nextTile, state) : endGame(state)
}

function gameLoop(state) {
  const frameStart = Date.now()
  tick(state)
  Object(_drawing__WEBPACK_IMPORTED_MODULE_2__["drawFrame"])(state)
  const frameDuration = Date.now() - frameStart
  const frameRemainder = 1000 / state.speed - frameDuration
  state.done ? start() : window.setTimeout(() => gameLoop(state), frameRemainder)
}

function start() {
  const snake = [Object(_tile__WEBPACK_IMPORTED_MODULE_6__["Tile"])(6,10), Object(_tile__WEBPACK_IMPORTED_MODULE_6__["Tile"])(5,10), Object(_tile__WEBPACK_IMPORTED_MODULE_6__["Tile"])(4,10)]
  const GAME_STATE = {
    score: 0,
    apple: Object(_apple__WEBPACK_IMPORTED_MODULE_0__["createValidApple"])(snake),
    snake,
    current_dir: _constants__WEBPACK_IMPORTED_MODULE_1__["DIRECTIONS"].RIGHT,
    next_dir: _constants__WEBPACK_IMPORTED_MODULE_1__["DIRECTIONS"].RIGHT,
    speed: 5,
    done: false,
  }

  window.addEventListener('keydown', Object(_input__WEBPACK_IMPORTED_MODULE_3__["handleInput"])(GAME_STATE))
  Object(_score__WEBPACK_IMPORTED_MODULE_5__["setScore"])(GAME_STATE.score)
  gameLoop(GAME_STATE)
}




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createValidApple", function() { return createValidApple; });
/* harmony import */ var _movement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _tile__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);



const randomInBoard = () => Math.floor(Math.random() * 20)

const generateApple = () => Object(_tile__WEBPACK_IMPORTED_MODULE_1__["Tile"])( randomInBoard(), randomInBoard() )

const isAppleValid = (snake, apple) => !Object(_movement__WEBPACK_IMPORTED_MODULE_0__["checkCollision"])(snake, apple)

function createValidApple(snake) {
  const apple = generateApple()
  return isAppleValid(snake, apple) ? apple : createValidApple(snake)
}




/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canMove", function() { return canMove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkCollision", function() { return checkCollision; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNextTile", function() { return getNextTile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleMove", function() { return handleMove; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _apple__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _score__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);




const checkCollision = (tileOrTilesA, tileB) =>
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["flatten"])([tileOrTilesA])
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
  Object(_score__WEBPACK_IMPORTED_MODULE_2__["setScore"])(state.score)
  state.apple = Object(_apple__WEBPACK_IMPORTED_MODULE_1__["createValidApple"])(state.snake)
}

const handleMove = (nextTile, state) =>
  checkCollision(nextTile, state.apple) ?
    eatApple(nextTile, state) : moveSnake(nextTile, state)

const canMove = (nextTile, state) =>
  nextTile.isInBoard() && !checkCollision(state.snake, nextTile)




/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flatten", function() { return flatten; });
const flatten = array =>
  array.reduce((flattened, elem) => {
    if (Array.isArray(elem))
      return elem.reduce((flattened, subelem) => [...flattened, subelem], flattened)
    else
      return [...flattened, elem]
  }, [])




/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveHiScore", function() { return saveHiScore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setScore", function() { return setScore; });
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




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tile", function() { return Tile; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


const Tile = (x, y) => ({
  x,
  y,
  next(dir) {
    let {x, y} = this
    if (dir == _constants__WEBPACK_IMPORTED_MODULE_0__["DIRECTIONS"].LEFT) x--
    if (dir == _constants__WEBPACK_IMPORTED_MODULE_0__["DIRECTIONS"].UP) y--
    if (dir == _constants__WEBPACK_IMPORTED_MODULE_0__["DIRECTIONS"].RIGHT) x++
    if (dir == _constants__WEBPACK_IMPORTED_MODULE_0__["DIRECTIONS"].DOWN) y++
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




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COLORS", function() { return COLORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIRECTIONS", function() { return DIRECTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEY_TO_DIRECTION", function() { return KEY_TO_DIRECTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEYS", function() { return KEYS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TILE_SIZE", function() { return TILE_SIZE; });
const TILE_SIZE = 20

const COLORS = {
  SNAKE: "#000000",
  APPLE: "#ff0000",
  BACKGROUND: "#eee8dd"
}

const KEYS = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
}

const DIRECTIONS = {
  LEFT:   0,
  UP:     1,
  RIGHT:  2,
  DOWN:   3,
}

const KEY_TO_DIRECTION = {
  [KEYS.LEFT]:  DIRECTIONS.LEFT,
  [KEYS.UP]:    DIRECTIONS.UP,
  [KEYS.RIGHT]: DIRECTIONS.RIGHT,
  [KEYS.DOWN]:  DIRECTIONS.DOWN,
}




/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "drawFrame", function() { return drawFrame; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


const CANVAS = document.getElementById("gameboard")
const CTX = CANVAS.getContext("2d")

function drawTile(x, y, color) {
  const x_coords = x * _constants__WEBPACK_IMPORTED_MODULE_0__["TILE_SIZE"]
  const y_coords = y * _constants__WEBPACK_IMPORTED_MODULE_0__["TILE_SIZE"]
  CTX.fillStyle = color
  CTX.fillRect(x_coords + 1, y_coords + 1, _constants__WEBPACK_IMPORTED_MODULE_0__["TILE_SIZE"] - 2, _constants__WEBPACK_IMPORTED_MODULE_0__["TILE_SIZE"] -2)
}

function drawDot(x, y, color) {
  const x_coords = x * _constants__WEBPACK_IMPORTED_MODULE_0__["TILE_SIZE"]
  const y_coords = y * _constants__WEBPACK_IMPORTED_MODULE_0__["TILE_SIZE"]
  const x_middle = x_coords + (_constants__WEBPACK_IMPORTED_MODULE_0__["TILE_SIZE"] / 2)
  const y_middle = y_coords + (_constants__WEBPACK_IMPORTED_MODULE_0__["TILE_SIZE"] / 2)
  const radius = (_constants__WEBPACK_IMPORTED_MODULE_0__["TILE_SIZE"] / 2) - 2
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
      drawTile(x, y, _constants__WEBPACK_IMPORTED_MODULE_0__["COLORS"].BACKGROUND)
    }
  }
}

function drawApple(apple) {
  const x = apple.x * _constants__WEBPACK_IMPORTED_MODULE_0__["TILE_SIZE"]
  const y = apple.y * _constants__WEBPACK_IMPORTED_MODULE_0__["TILE_SIZE"]

  const relativeMoveTo = (a, b) => CTX.moveTo(x + a, y + b)
  const relativeLineTo = (a, b) => CTX.lineTo(x + a, y + b)
  CTX.fillStyle = _constants__WEBPACK_IMPORTED_MODULE_0__["COLORS"].APPLE
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
  snake.map(segment => drawDot(segment.x, segment.y, _constants__WEBPACK_IMPORTED_MODULE_0__["COLORS"].SNAKE))

function drawFrame(state) {
  clearBoard()
  drawBoard()
  drawApple(state.apple)
  drawSnake(state.snake)
}




/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleInput", function() { return handleInput; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);


function directionChangeValid(oldDir, newDir) {
  return (oldDir + 3) % 4 == newDir || (oldDir + 1) % 4 == newDir
}

const handleInput = state =>
  ({keyCode}) => {
    const newDir = _constants__WEBPACK_IMPORTED_MODULE_0__["KEY_TO_DIRECTION"][keyCode]
    if (directionChangeValid(state.current_dir, newDir)) {
      state.next_dir = newDir
    }
  }




/***/ })
/******/ ]);