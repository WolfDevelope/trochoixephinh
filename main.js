
const boardSize = { rows: 3, cols: 4 };
let board = [];
let emptyIndex = 11;
let timer = null;
let time = 0;
let isPlaying = false;
let moveCount = 0;
let history = [];
let gameNumber = 1;

const btn = document.querySelector('button');
const boardDiv = document.querySelector('.grid');
const clock = document.querySelector('.text-2xl.font-bold.text-green-700');
const tbody = document.querySelector('tbody');

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, '0');
  const s = String(sec % 60).padStart(2, '0');
  return `${m}:${s}`;
}

function drawBoard() {
  boardDiv.innerHTML = '';
  for (let i = 0; i < 12; i++) {
    let val = board[i];
    let color = '';
    let text = '';
    if (val === 0) {
      color = 'bg-black';
      text = '';
    } else {
      text = val;
      switch (val) {
        case 1: color = 'bg-green-100 text-green-500'; break;
        case 2: color = 'bg-red-100 text-red-500'; break;
        case 3: color = 'bg-blue-100 text-blue-500'; break;
        case 4: color = 'bg-purple-100 text-purple-400'; break;
        case 5: color = 'bg-yellow-100 text-yellow-400'; break;
        case 6: color = 'bg-pink-100 text-pink-400'; break;
        case 7: color = 'bg-blue-100 text-blue-400'; break;
        case 8: color = 'bg-gray-100 text-gray-400'; break;
        case 9: color = 'bg-green-100 text-green-500'; break;
        case 10: color = 'bg-yellow-100 text-yellow-400'; break;
        case 11: color = 'bg-green-100 text-green-400'; break;
      }
    }
    boardDiv.innerHTML += `<div class="flex items-center justify-center w-24 h-24 font-bold text-2xl rounded ${color}">${text}</div>`;
  }
}

// Sinh board ngẫu nhiên
function randomBoard() {
  let arr = [...Array(11).keys()].map(x=>x+1).concat(0);
  // Xáo trộn 100 lần
  let empty = arr.indexOf(0);
  for (let t = 0; t < 100; t++) {
    let possible = [];
    let r = Math.floor(empty / 4), c = empty % 4;
    if (c > 0) possible.push(empty - 1); // trái
    if (c < 3) possible.push(empty + 1); // phải
    if (r > 0) possible.push(empty - 4); // lên
    if (r < 2) possible.push(empty + 4); // xuống
    const swapWith = possible[Math.floor(Math.random() * possible.length)];
    [arr[empty], arr[swapWith]] = [arr[swapWith], arr[empty]];
    empty = swapWith;
  }
  return arr;
}

function startGame() {
  board = randomBoard();
  emptyIndex = board.indexOf(0);
  drawBoard();
  moveCount = 0;
  time = 0;
  clock.textContent = formatTime(time);
  isPlaying = true;
  btn.textContent = 'Kết thúc';
  btn.classList.remove('bg-green-500');
  btn.classList.add('bg-red-500');
  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    time++;
    clock.textContent = formatTime(time);
  }, 1000);
}

function stopGame(win = false) {
  isPlaying = false;
  btn.textContent = win ? 'Chơi lại' : 'Bắt đầu';
  btn.classList.remove('bg-red-500');
  btn.classList.add('bg-green-500');
  if (timer) clearInterval(timer);
  if (win) {
    setTimeout(() => alert('YOU WIN!'), 200);
    // Lưu lịch sử
    history.push({
      stt: gameNumber++,
      moves: moveCount,
      time: formatTime(time)
    });
    renderHistory();
  }
}

function renderHistory() {
  tbody.innerHTML = '';
  history.forEach(item => {
    tbody.innerHTML += `<tr><td class="border-b">${item.stt}</td><td class="border-b">${item.moves}</td><td class="border-b">${item.time}</td></tr>`;
  });
}
//Điều hướng
function move(dir, countStep = true) {
  if (!isPlaying) return;
  const r = Math.floor(emptyIndex / 4);
  const c = emptyIndex % 4;
  let swapWith = null;
  if ((dir === 'left' || dir === 'a') && c > 0) swapWith = emptyIndex - 1; // sang trái
  if ((dir === 'right' || dir === 'd') && c < 3) swapWith = emptyIndex + 1; // sang phải
  if ((dir === 'up' || dir === 'w') && r > 0) swapWith = emptyIndex - 4; // lên trên
  if ((dir === 'down' || dir === 's') && r < 2) swapWith = emptyIndex + 4; // xuống dưới
  if (swapWith !== null) {
    [board[emptyIndex], board[swapWith]] = [board[swapWith], board[emptyIndex]];
    emptyIndex = swapWith;
    drawBoard();
    if (countStep) moveCount++;
    if (isWin()) {
      stopGame(true);
    }
  }
}

function isWin() {
  for (let i = 0; i < 11; i++) {
    if (board[i] !== i+1) return false;
  }
  return board[11] === 0;   
}

//Bắt đầu/Kết thúc/Chơi lại
btn.onclick = () => {
  if (!isPlaying) {
    startGame();
  } else {
    stopGame();
  }
};

//Bàn phím
document.addEventListener('keydown', (e) => {
  if (!isPlaying) return;
  switch(e.key.toLowerCase()) {
    case 'arrowleft': case 'a': move('left'); break;
    case 'arrowright': case 'd': move('right'); break;
    case 'arrowup': case 'w': move('up'); break;
    case 'arrowdown': case 's': move('down'); break;
  }
});

//Khởi tạo ban đầu
function init() {
  board = [1,2,3,4,5,6,7,8,9,10,11,0];
  emptyIndex = 11;
  drawBoard();
  clock.textContent = '00:00';
  renderHistory();
}
init();
