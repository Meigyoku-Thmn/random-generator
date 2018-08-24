'use strict';

function GetRandomNumber(min, max) {
   // Buffer storage.
   let array = new Uint32Array(1);
   // Fill buffer.
   window.crypto.getRandomValues(array);
   let len = max - min + 1;
   return array[0] % len + min;
}
// exclusive max
function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min)) + min;
}

var scramble = null;
var secret = null;
function ExtractDigit(num) {
   if (num == 0) return new Uint32Array([0]);
   let rs = [];
   while (num != 0) {
      let remainder = num % 10;
      num = Math.floor(num / 10);
      rs.push(remainder);
   }
   return new Uint32Array(rs);
}
var index = 0;
var numMax = $('#endNumber');
var numMin = $('#startNumber');
var randomNum = 0;
var timer1 = new Timer();
timer1.addEventListener('elapsed', timer1_Tick);
var timer2 = new Timer();
timer2.addEventListener('elapsed', timer2_Tick);
function Start() {
   if (parseInt(numMax[0].value) <= parseInt(numMin[0].value)) {
      displayedNumber.text('');
      return;
   }
   randomNum = GetRandomNumber(parseInt(numMin[0].value), parseInt(numMax[0].value));
   secret = ExtractDigit(randomNum);
   scramble = ExtractDigit(4294967295);
   timer1.Interval = 20;
   timer1.start();
   timer2.Interval = 400;
   timer2.start();
   index = scramble.length - 1;
   displayedNumber.css('color', 'black');
   displayedNumber.text('4294967295');
   SizeLabelFont();
}
// scrambling timer callback
function timer1_Tick() {
   for (let i = index; i >= 0; i--) {
      scramble[i] = getRandomInt(0, 9);
   }
   var stringsArray = scramble.map((item, i) => scramble[scramble.length - 1 - i]);
   displayedNumber.text(stringsArray.join(''));
   SizeLabelFont();
}
// reducing timer callback
function timer2_Tick() {
   if (index < secret.length) {
      scramble[index] = secret[index];
   }
   else
      scramble = scramble.subarray(0, index);
   index--;
   if (index < 0) {
      timer2.stop();
      timer1.stop();
      displayedNumber.css('color', 'red');
      displayedNumber.text(randomNum);
      SizeLabelFont();
   }
}
$('#start').click(Start);