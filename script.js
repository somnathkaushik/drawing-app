const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEL = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');
const eraserEl = document.getElementById('eraser');
const toolSelect = document.getElementById('tool');

const ctx = canvas.getContext('2d');
let size = 1;
let isPressed = false;
let color = colorEl.value;
let x;
let y;
let isEraser = false;
let tool = toolSelect.value;  // Default tool

colorEl.value = 'black';

canvas.addEventListener('mousedown', (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

document.addEventListener('mouseup', () => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;

    if (isEraser) {
      erase(x2, y2);
    } else {
      draw(x, y, x2, y2);
    }

    x = x2;
    y = y2;
  }
});

toolSelect.addEventListener('change', (e) => {
  tool = e.target.value;
  isEraser = false;
});

function draw(x1, y1, x2, y2) {
  switch (tool) {
    case 'pencil1':
      drawPencil(x1, y1, x2, y2, 1);
      break;
    case 'pencil2':
      drawPencil(x1, y1, x2, y2, 2);
      break;
    case 'pencil3':
      drawPencil(x1, y1, x2, y2, 3);
      break;
    case 'pencil4':
      drawPencil(x1, y1, x2, y2, 4);
      break;
    case 'brush1':
      drawBrush(x1, y1, x2, y2, 1);
      break;
    case 'brush2':
      drawBrush(x1, y1, x2, y2, 2);
      break;
    case 'brush3':
      drawBrush(x1, y1, x2, y2, 3);
      break;
    case 'brush4':
      drawBrush(x1, y1, x2, y2, 4);
      break;
    case 'brush5':
      drawBrush(x1, y1, x2, y2, 5);
      break;
    case 'thickBrush':
      drawThickBrush(x1, y1, x2, y2);
      break;
  }
}

function drawPencil(x1, y1, x2, y2, multiplier) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * multiplier;
  ctx.stroke();
}

function drawBrush(x1, y1, x2, y2, multiplier) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * (multiplier + 2);
  ctx.stroke();
}

function drawThickBrush(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 6;
  ctx.stroke();
}

function erase(x, y) {
  ctx.clearRect(x - size, y - size, size * 2, size * 2);
}

function updateSizeOnScreen() {
  sizeEL.innerText = size;
}

increaseBtn.addEventListener('click', () => {
  size += 1;
  if (size > 50) {
    size = 50;
  }
  updateSizeOnScreen();
});

decreaseBtn.addEventListener('click', () => {
  size -= 1;
  if (size < 1) {
    size = 1;
  }
  updateSizeOnScreen();
});

colorEl.addEventListener('change', (e) => {
  color = e.target.value;
  isEraser = false;
});

eraserEl.addEventListener('click', () => {
  isEraser = true;
  tool = 'eraser';
});

clearEl.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
