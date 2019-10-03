const start = document.querySelector('.start');
const board = document.querySelector('.board');
const cellWidth = 20;
const cellHeight = 20;
const cellNumberColumns = 30;
const cellNumberRows = 20;
let positionX = "";
let positionY = "";
let ball = {
  x: '',
  y: ''
}
const ballV = {
  x: 1,
  y: 1
}
turnY = true;
turnX = true;
const paddlePlayer1 = {
  x: 0,
  y: [3, 4, 5, 6, 7]
}
const paddlePlayer2 = {
  x: cellNumberColumns - 1,
  y: [4, 5, 6, 7, 8]
}
let tick = "";
let indexTick = "";
let indexDraw = "";
let indexBallMove = "";
const time = 200;

let numberWinOne = 0;
let numberWinTwo = 0;
const spanWinOne = document.
querySelector('.winOne');
const spanWinTwo = document.
querySelector('.winTwo');

board.style.width = cellNumberColumns * cellWidth + 'px';
board.style.height = cellNumberRows * cellHeight + 'px';



const ballMove = () => {
  if (turnY) {
    ball.y += ballV.y
  } else if (!turnY) {
    ball.y -= ballV.y
  }
  if (turnX) {
    ball.x += ballV.x
  } else if (!turnX) {
    ball.x -= ballV.x
  };
}


const draw = () => {
  if (cellNumberColumns > ball.x > -1) {
    for (let x = 0; x < cellNumberColumns; x++) {

      for (let y = 0; y < cellNumberRows; y++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.left = cellWidth * x + 'px';
        cell.style.top = cellHeight * y + 'px';
        cell.dataset.key = x + "-" + y;
        board.appendChild(cell);
      }
    }
    document.querySelectorAll('.cell').forEach((cell) => {
      position = cell.dataset.key.split('-');
      positionX = position[0];
      positionY = position[1];

      if (positionX === ball.x.toString() && positionY === ball.y.toString()) {
        cell.classList.toggle('ball');

      };

      [...paddlePlayer1.y].forEach((item) => {
        if (item.toString() === positionY && paddlePlayer1.x.toString() === positionX) {
          cell.classList.toggle('paddle')

        }
      });
      [...paddlePlayer2.y].forEach((item) => {
        if (item.toString() === positionY && paddlePlayer2.x.toString() === positionX) {
          cell.classList.toggle('paddle')

        }
      })

    })
    tick = () => {
      [...paddlePlayer1.y].forEach((item) => {
        if (item === ball.y && paddlePlayer1.x + 1 === ball.x) {
          turnX = !turnX;
        }
      });
      [...paddlePlayer2.y].forEach((item) => {
        if (item === ball.y && paddlePlayer2.x - 1 === ball.x) {
          turnX = !turnX;
        }
      })


      if (ball.y === cellNumberRows - 1) {
        turnY = !turnY;
      } else if (ball.y === 0) {
        turnY = !turnY;
      }
    }

  }

  if (ball.x < paddlePlayer1.x - 1) {
    numberWinTwo++;
    spanWinTwo.textContent = numberWinTwo;
    alert('wygrał gracz 2');
    clearInterval(indexBallMove);
    clearInterval(indexDraw);
    clearInterval(indexTick);

  } else if (ball.x > cellNumberColumns) {
    numberWinOne++;
    spanWinOne.textContent = numberWinOne;
    alert('wygrał gracz numer 1');
    clearInterval(indexBallMove);
    clearInterval(indexDraw);
    clearInterval(indexTick);

  }
}



const startInterval = () => {
  indexTick = setInterval(tick, time);
  indexDraw = setInterval(draw, time);
  indexBallMove = setInterval(ballMove, time);
  ball = {
    x: Math.floor(cellNumberColumns / 2),
    y: Math.floor(cellNumberRows / 2)
  }
}



const move = (e) => {
  // 87 - "w"
  // 83 - "s"
  // 38 - "strzalka w gore"
  // 40 - "strzalka w dol"
  if (e.keyCode === 83) {
    if (paddlePlayer1.y[4] === cellNumberRows - 1) return;
    let yFirstPaddlePlayer = paddlePlayer1.y.shift();
    yFirstPaddlePlayer += paddlePlayer1.y.length + 1;
    paddlePlayer1.y.push(yFirstPaddlePlayer)


  }
  if (e.keyCode === 87) {
    if (paddlePlayer1.y[0] === 0) return;
    let yLastPaddlePlayer = paddlePlayer1.y.pop();
    yLastPaddlePlayer -= paddlePlayer1.y.length + 1;
    paddlePlayer1.y.unshift(yLastPaddlePlayer)

  }
  if (e.keyCode === 38) {
    if (paddlePlayer2.y[0] === 0) return;
    let yLastPaddlePlayer = paddlePlayer2.y.pop();
    yLastPaddlePlayer -= paddlePlayer2.y.length + 1;
    paddlePlayer2.y.unshift(yLastPaddlePlayer)
  }

  if (e.keyCode === 40) {
    if (paddlePlayer2.y[4] === cellNumberRows - 1) return;
    let yFirstPaddlePlayer = paddlePlayer2.y.shift();
    yFirstPaddlePlayer += paddlePlayer2.y.length + 1;
    paddlePlayer2.y.push(yFirstPaddlePlayer)
  }

  draw()
}


draw()
window.addEventListener('keydown', move)
start.addEventListener('click', startInterval)