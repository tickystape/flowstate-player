/* This JavaScript controls the FlowState audio player. It includes play/pause, volume control, progress updates, readable time display, and the custom Focus Mode feature. */

const audio = document.getElementById("audio-player");
const playButton = document.getElementById("play-pause-btn");
const progressFill = document.getElementById("progress-bar-fill");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume-slider");
const focusButton = document.getElementById("focus-mode-btn");

/* This sets the starting volume so the audio does not begin too loudly. */
audio.volume = 0.7;

/* This lets the user play and pause the audio with one button. */
playButton.onclick = function () {
    if (audio.paused) { 
        audio.play(); 
        playButton.textContent = "Pause"; 
    } else { 
        audio.pause(); 
        playButton.textContent = "Play";
    }
};

/* This changes the audio volume when the user moves the volume slider. */
volume.oninput = function () { 
    audio.volume = volume.value;
};

/* This converts seconds into a readable minute and second format, and stops the NaN:NaN problem before the audio fully loads. */
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

/* This is my custom Focus Mode feature, which makes the player feel more immersive and distraction-free for study sessions. */
focusButton.onclick = function () { 
    document.body.classList.toggle("focus-mode");

    if (document.body.classList.contains("focus-mode")) { 
        focusButton.textContent = "Exit Focus Mode";
    } else { 
        focusButton.textContent = "Enter Focus Mode";
    } 
};