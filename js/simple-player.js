const audio = new Audio("audio/Soft-Background-for-Interview.webm");
const button = document.getElementById("play-pause-button");
const trackTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const seekBar = document.getElementById("seek-bar");
let seeking = false;
button.onclick = function () {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
};
audio.oncanplaythrough = () => {
    button.disabled = false;
    seekBar.disabled = false;
};
audio.onplay = function () {
    button.src = "images/pause.svg";
};
audio.onpause = function () {
    button.src = "images/play.svg";
};
audio.onended = function () {
    button.src = "images/play.svg";
    trackTime.innerHTML = formatTime(0);
    seekBar.value = 0;
};
audio.onloadedmetadata = function () {
    trackTime.innerHTML = formatTime(0);
    totalTime.innerHTML = formatTime(audio.duration);
    seekBar.max = Math.floor(audio.duration);
    seekBar.value = 0;
};
audio.ontimeupdate = function (){
    trackTime.innerHTML = formatTime(audio.currentTime);
    if (!seeking) {
        seekBar.value = Math.floor(audio.currentTime);
    }
};
seekBar.oninput = function () {
    seeking = true;
};
seekBar.onchange = function() {
    audio.currentTime = seekBar.value;
    if (!audio.paused) {
        audio.play();
    }
    seeking = false;
};

function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}