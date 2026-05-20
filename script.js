/* This JavaScript controls the FlowState audio player, including play/pause, volume, progress, time display, clickable progress bar, and Focus Mode. 
I used the following YouTube videos to help develop my code for this section: 
https://www.youtube.com/watch?v=QTHRWGn_sJw "Build a Music Player | Vanilla JavaScript" 
https://www.youtube.com/watch?v=JtrFzoL1joI "How To Make A Music Player Using HTML CSS And JavaScript"
From these videos, I mainly looked at sections for the JavaScript, as I was already familiar with HTML and CSS from the previous assignment. 
In this section, I also used ChatGPT a couple times when troubleshooting errors */

const audio = document.getElementById("audio-player");
const playButton = document.getElementById("play-pause-btn");
const playIcon = document.getElementById("play-icon");
const playText = document.getElementById("play-text");
const progressBar = document.querySelector(".progress-bar");
const progressFill = document.getElementById("progress-bar-fill");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume-slider");
const focusButton = document.getElementById("focus-mode-btn"); 
const loopButton = document.getElementById("loop-btn"); 

/* This sets the starting volume so the audio does not begin too loudly. */
audio.volume = 0.7;

/* This lets the user play and pause the audio. */
playButton.onclick = function () {
    if (audio.paused) {
        audio.play();
        playText.textContent = "Pause";
        playIcon.src = "media/icons/pause.png";
    } else {
        audio.pause();
        playText.textContent = "Play";
        playIcon.src = "media/icons/play.png";
    }
};

/* This changes the audio volume when the user moves the volume slider. */
volume.oninput = function () {
    audio.volume = volume.value;
};

/* This converts the time into seconds to display either side of the player. */
function makeTime(seconds) {
    if (isNaN(seconds)) {
        return "0:00";
    }

    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);

    if (sec < 10) {
        sec = "0" + sec;
    }

    return min + ":" + sec;
}

/* This updates the full duration once the audio file has loaded properly. */
audio.onloadedmetadata = function () {
    duration.textContent = makeTime(audio.duration);
};

/* This updates the progress bar and current time while the audio is playing. */
audio.ontimeupdate = function () {
    let progress = (audio.currentTime / audio.duration) * 100;

    if (isNaN(progress)) {
        progress = 0;
    }

    progressFill.style.width = progress + "%";
    currentTime.textContent = makeTime(audio.currentTime);
};

/* This lets the user click the progress bar to jump to a different part of the song. */
progressBar.onclick = function (event) {
    let barWidth = progressBar.clientWidth;
    let clickPosition = event.offsetX;

    if (!isNaN(audio.duration)) { /* had a few issues with one of the time areas displaying as the text "Nan:Nan" */
        audio.currentTime = (clickPosition / barWidth) * audio.duration;
    }
};

/* This resets the play button when the audio finishes. */
audio.onended = function () {
    playButton.textContent = "Play";
    progressFill.style.width = "0%";
};

/* Custom Focus Mode feature, which creates a more immersive and distraction-free study environment. */
focusButton.onclick = function () {
    document.body.classList.toggle("focus-mode");

    if (document.body.classList.contains("focus-mode")) {
        focusButton.textContent = "Exit Focus Mode";
    } else {
        focusButton.textContent = "Enter Focus Mode";
    }
}; 

/* Allows users to turn looping on and off. */
loopButton.onclick = function () {
    audio.loop = !audio.loop;

    if (audio.loop) { 
        loopButton.classList.add("loop-active");
    } else { 
        loopButton.classList.remove("loop-active");
    }
};