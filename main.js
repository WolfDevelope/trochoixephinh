// Định nghĩa các biến và hàm
const soDong = 3, soCot = 4;
let mangO = [], viTriOTrong = 11, demGio = null, thoiGian = 0, dangChoi = false, soBuoc = 0, lichSu = [], sttVan = 1;

const nut = document.querySelector('button');
const bang = document.querySelector('.grid');
const dongHo = document.querySelector('.text-2xl.font-bold.text-green-700');
const lichSuBody = document.querySelector('tbody');

// Định dạng thời gian
function dinhDangGio(s) {
  let m = String(Math.floor(s/60)).padStart(2, '0');
  let giay = String(s%60).padStart(2, '0');
  return m+':'+giay;
}

// Vẽ bàn cờ
function veBanCo() {
  bang.innerHTML = '';
  for(let i=0;i<12;i++) {
    let val = mangO[i], mau = '', txt = '';
    if(val===0) { mau='bg-black'; txt=''; }
    else {
      txt = val;
      switch(val) {
        case 1: mau='bg-green-100 text-green-500'; break;
        case 2: mau='bg-red-100 text-red-500'; break;
        case 3: mau='bg-blue-100 text-blue-500'; break;
        case 4: mau='bg-purple-100 text-purple-400'; break;
        case 5: mau='bg-yellow-100 text-yellow-400'; break;
        case 6: mau='bg-pink-100 text-pink-400'; break;
        case 7: mau='bg-blue-100 text-blue-400'; break;
        case 8: mau='bg-gray-100 text-gray-400'; break;
        case 9: mau='bg-green-100 text-green-500'; break;
        case 10: mau='bg-yellow-100 text-yellow-400'; break;
        case 11: mau='bg-green-100 text-green-400'; break;
      }
    }
    bang.innerHTML += `<div class="flex items-center justify-center w-24 h-24 font-bold text-2xl rounded ${mau}">${txt}</div>`;
  }
}

// Trộn bàn cờ
function tronBanCo() {
  let arr = [...Array(11).keys()].map(x=>x+1).concat(0);
  let trong = arr.indexOf(0);
  for(let i=0;i<100;i++) {
    let khaNang = [], r = Math.floor(trong/4), c = trong%4;
    if(c>0) khaNang.push(trong-1);
    if(c<3) khaNang.push(trong+1);
    if(r>0) khaNang.push(trong-4);
    if(r<2) khaNang.push(trong+4);
    let doi = khaNang[Math.floor(Math.random()*khaNang.length)];
    [arr[trong], arr[doi]] = [arr[doi], arr[trong]];
    trong = doi;
  }
  return arr;
}

// Bắt đầu trò chơi
function batDau() {
  mangO = tronBanCo();
  viTriOTrong = mangO.indexOf(0);
  veBanCo();
  soBuoc = 0;
  thoiGian = 0;
  dongHo.textContent = dinhDangGio(thoiGian);
  dangChoi = true;
  nut.textContent = 'Kết thúc';
  nut.classList.remove('bg-green-500');
  nut.classList.add('bg-red-500');
  if(demGio) clearInterval(demGio);
  demGio = setInterval(()=>{
    thoiGian++;
    dongHo.textContent = dinhDangGio(thoiGian);
  },1000);
}

// Kết thúc trò chơi
function ketThuc(thang=false) {
  dangChoi = false;
  nut.textContent = thang ? 'Chơi lại' : 'Bắt đầu';
  nut.classList.remove('bg-red-500');
  nut.classList.add('bg-green-500');
  if(demGio) clearInterval(demGio);
  if(thang) {
    lichSu.push({stt: sttVan++, moves: soBuoc, time: dinhDangGio(thoiGian)});
    hienLichSu();
  }
}

// Hiển thị lịch sử
function hienLichSu() {
  lichSuBody.innerHTML = '';
  lichSu.forEach(item => {
    lichSuBody.innerHTML += `<tr><td class="border-b">${item.stt}</td><td class="border-b">${item.moves}</td><td class="border-b">${item.time}</td></tr>`;
  });
}

// Di chuyển ô
function diChuyen(huong, dem=true) {
  if(!dangChoi) return;
  let r = Math.floor(viTriOTrong/4), c = viTriOTrong%4, doi = null;
  if((huong==='left'||huong==='a')&&c>0) doi=viTriOTrong-1;
  if((huong==='right'||huong==='d')&&c<3) doi=viTriOTrong+1;
  if((huong==='up'||huong==='w')&&r>0) doi=viTriOTrong-4;
  if((huong==='down'||huong==='s')&&r<2) doi=viTriOTrong+4;
  if(doi!==null) {
    [mangO[viTriOTrong], mangO[doi]] = [mangO[doi], mangO[viTriOTrong]];
    viTriOTrong = doi;
    veBanCo();
    if(dem) soBuoc++;
    if(daThang()) ketThuc(true);
  }
}

// Kiểm tra thắng
function daThang() {
  for(let i=0;i<11;i++) if(mangO[i]!==i+1) return false;
  return mangO[11]===0;
}

// Sự kiện nút
nut.onclick = ()=>{
  if(!dangChoi) batDau();
  else ketThuc();
};

// Sự kiện bàn phím
document.addEventListener('keydown', e => {
  if(!dangChoi) return;
  switch(e.key.toLowerCase()) {
    case 'arrowleft': case 'a': diChuyen('left'); break;
    case 'arrowright': case 'd': diChuyen('right'); break;
    case 'arrowup': case 'w': diChuyen('up'); break;
    case 'arrowdown': case 's': diChuyen('down'); break;
  }
});

// Khởi tạo
function khoiTao() {
  mangO = [1,2,3,4,5,6,7,8,9,10,11,0];
  viTriOTrong = 11;
  veBanCo();
  dongHo.textContent = '00:00';
  hienLichSu();
}
khoiTao();
