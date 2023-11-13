// audio object that stores the audio file
const audio = new Audio("audio/Soft-Background-for-Interview.webm");

// button object that references the image with id "play-pause-button"
const button = document.getElementById("play-pause-button");

// objects to reference seek bar and timing elements
const trackTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const seekBar = document.getElementById("seek-bar");

// Store whether the user is currently dragging the seek bar
let seeking = false;

// When the play button is clicked, play or pause audio according to state
button.onclick = function () {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
};

// Every time audio plays, replace button image to pause.svg
audio.onplay = function () {
  button.src = "images/pause.svg";
};

// Every time audio pauses, replace button image to play.svg
audio.onpause = function () {
  button.src = "images/play.svg";
};

// As soon as we have the audio duration loaded, set the totalTime and seekBar
audio.onloadedmetadata = function () {
  // Make sure trackTime is set to zero
  trackTime.innerHTML = formatTime(0);
  // Set totalTime to display the exact audio duration properly formatted
  totalTime.innerHTML = formatTime(audio.duration);
  // Set the seekBar max to the rounded down audio duration - as seekbar values do not understand decimals
  seekBar.max = Math.floor(audio.duration);
  // Make sure seekBar value is set to zero
  seekBar.value = 0;
};

// Every time the audio time updates, change the trackTime and seekBar to display currentTime
audio.ontimeupdate = function (){
  trackTime.innerHTML = formatTime(audio.currentTime);

  // Only update seekbar when user is not dragging seek bar knob
  if (!seeking) {
      seekBar.value = Math.floor(audio.currentTime);
  }
};

// On seekBar input (i.e. when user clicks on the seek bar knob), set seeking to true
seekBar.oninput = function () {
  seeking = true;
};

// On seekBar change (i.e., when the user releases the knob to set a new point in the track), update audio player and set seeking to false
seekBar.onchange = function () {
  
  // Update the audio current time to match the seekBar value that the user has set
  audio.currentTime = seekBar.value;
  
  // If the audio is not currently playing, play it
  if (!audio.paused) {
    audio.play();
  }

  // Set seeking to false
  seeking = false;
};

/**
 * This formatTime function will format time from seconds to a human readable time.
 * This funciton has been given to you and you don't need to understand how it works.
 * @param {number} secs
 * @returns {string} a string with hours:minutes:seconds OR minutes:seconds if we're at the hour 00.
 */
function formatTime(secs) {
  let hours = Math.floor(secs / 3600);
  let minutes = Math.floor((secs - hours * 3600) / 60);
  let seconds = Math.floor(secs - hours * 3600 - minutes * 60);
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
