//getting all elements
const hrEle = document.getElementById("hr");
const minEle = document.getElementById("min");
const secEle = document.getElementById("sec");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

//setting initial value to variables
let timer = false;
let hour = 0;
let minute = 0;
let second = 0;

//event listener added to start button
startBtn.addEventListener("click", function () {
  //starting the watch
  timer = true;
  startWatch();
});

//event listener added to stop button
stopBtn.addEventListener("click", function () {
  timer = false; //setting timer = false to stop the watch
});

//event listener added to restart button
resetBtn.addEventListener("click", function () {
  //reseting every variable
  timer = false;
  hour = 0;
  minute = 0;
  second = 0;
  //setting innerhtml of hour, minutes, seconds to 00
  hrEle.innerHTML = "00";
  minEle.innerHTML = "00";
  secEle.innerHTML = "00";
});

// function that starts the timer and changes value of hr, min, seconds
function startWatch() {
  if (timer) {
    second++;

    //increase minute value if seconds reachs 60
    if (second == 60) {
      minute++;
      second = 0;
    }

    //increase hour value if minutes reachs 60
    if (minute == 60) {
      hour++;
      minute = 0;
      second = 0;
    }

    //append "0" to values if less than 10
    let hrString = hour < 10 ? "0" + hour : hour;
    let minString = minute < 10 ? "0" + minute : minute;
    let secString = second < 10 ? "0" + second : second;

    //setting innerhtml of hour, minutes, seconds
    hrEle.innerHTML = hrString;
    minEle.innerHTML = minString;
    secEle.innerHTML = secString;

    //setting timeout for calling function every 1 sec
    setTimeout(startWatch, 1000);
  }
}
