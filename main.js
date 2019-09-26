const board = document.querySelector('.container');
const cellWidth = 40;
const cellHeight = 32;
let positionX = "";
let positionY = "";
let ball = {
  x: 1,
  y: 4
}
const ballV = {
  x: 1,
  y: 1
}
turnY = true;
turnX = true;

const draw = () => {
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

  })

}
draw()
const tick = () => {
  if (ball.x === 9) {
    turnX = !turnX
  } else if (ball.x === 0) {
    turnX = !turnX
  }
  if (turnX) {
    ball.x += ballV.x
  } else if (!turnX) {
    ball.x -= ballV.x
  };
  if (ball.y === 9) {
    turnY = !turnY;
  } else if (ball.y === 0) {
    turnY = !turnY;
  }
  if (turnY) {
    ball.y += ballV.y
  } else if (!turnY) {
    ball.y -= ballV.y
  }
}
setInterval(tick, 500)
setInterval(draw, 500)