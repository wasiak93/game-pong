const board = document.querySelector('.container');
const cellWidth = 40;
const cellHeight = 32;
let positionX = "";
let positionY = "";
let ball = {
  x: 3,
  y: 4
}
const ballV = {
  x: 1,
  y: 1
}
turnY = true;
turnX = true;
const paddlePlayer1 = {
  x: 0,
  y: [3, 4, 5]
}
const paddlePlayer2 = {
  x: 9,
  y: [4, 5, 6]
}
let tick = "";

const ballMove = () => {
  // if (ball.x < paddlePlayer1.x - 1) {
  //   alert('wygrał gracz 1')
  // } else if (ball.x > 9) {
  //   alert('wygrał gracz numer 2')
  // }
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
  if (10 > ball.x > -1) {
    for (let x = 0; x < 10; x++) {

      for (let y = 0; y < 10; y++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.left = cellWidth * x + 'px';
        cell.style.top = cellHeight * y + 'px';
        cell.dataset.key = x + "-" + y;
        board.appendChild(cell);
      }
    }
    document.querySelectorAll('.cell').forEach((cell) => {
      positionX = cell.dataset.key.slice(0, 1);
      positionY = cell.dataset.key.slice(2, 3);

      if (positionX === ball.x.toString() && positionY === ball.y.toString()) {
        cell.classList.toggle('active');

      };

      Array.from(paddlePlayer1.y).forEach((item) => {
        if (item.toString() === positionY && paddlePlayer1.x.toString() === positionX) {
          cell.classList.toggle('active')

        }
      })
      Array.from(paddlePlayer2.y).forEach((item) => {
        if (item.toString() === positionY && paddlePlayer2.x.toString() === positionX) {
          cell.classList.toggle('active')

        }
      })

    })
    tick = () => {
      Array.from(paddlePlayer1.y).forEach((item) => {
        if (item === ball.y && paddlePlayer1.x + 1 === ball.x) {
          turnX = !turnX;
        }
      })
      Array.from(paddlePlayer2.y).forEach((item) => {
        if (item === ball.y && paddlePlayer2.x - 1 === ball.x) {
          turnX = !turnX;
        }
      })


      if (ball.y === 8) {
        turnY = !turnY;
      } else if (ball.y === 0) {
        turnY = !turnY;
      }
    }

  }

  if (ball.x < paddlePlayer1.x - 1) {
    alert('wygrał gracz 2');
    clearInterval(indexBallMove);
    clearInterval(indexDraw);
    clearInterval(indexTick);
  } else if (ball.x > 10) {
    alert('wygrał gracz numer 1');
    clearInterval(indexBallMove);
    clearInterval(indexDraw);
    clearInterval(indexTick);
  }
}

draw()

const indexTick = setInterval(tick, 500);
const indexDraw = setInterval(draw, 500);
const indexBallMove = setInterval(ballMove, 500);




const move = (e) => {
  // 87 - "w"
  // 83 - "s"
  // 38 - "strzalka w gore"
  // 40 - "strzalka w dol"
  if (e.keyCode === 83) {
    if (paddlePlayer1.y[2] === 9) return;
    let yFirstPaddlePlayer = paddlePlayer1.y.shift();
    yFirstPaddlePlayer += 3;
    paddlePlayer1.y.push(yFirstPaddlePlayer)


  }
  if (e.keyCode === 87) {
    if (paddlePlayer1.y[0] === 0) return;
    let yLastPaddlePlayer = paddlePlayer1.y.pop();
    yLastPaddlePlayer -= 3;
    paddlePlayer1.y.unshift(yLastPaddlePlayer)

  }
  if (e.keyCode === 38) {
    if (paddlePlayer2.y[0] === 0) return;
    let yLastPaddlePlayer = paddlePlayer2.y.pop();
    yLastPaddlePlayer -= 3;
    paddlePlayer2.y.unshift(yLastPaddlePlayer)
  }

  if (e.keyCode === 40) {
    if (paddlePlayer2.y[2] === 9) return;
    let yFirstPaddlePlayer = paddlePlayer2.y.shift();
    yFirstPaddlePlayer += 3;
    paddlePlayer2.y.push(yFirstPaddlePlayer)
  }

  draw()
}



window.addEventListener('keydown', move)