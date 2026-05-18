/* This JavaScript adds the main interactivity for the custom audio player, including playback controls, volume adjustment, progress updates, and the custom Focus Mode feature. */

const audio = document.getElementById("audio-player");
const playButton = document.getElementById("play-pause-btn");
const progressFill = document.getElementById("progress-bar-fill");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume-slider");
const focusButton = document.getElementById("focus-mode-btn");


/* This lets the user play and pause the audio while also updating the button text depending on the current playback state. */

playButton.onclick = function () {

    if (audio.paused) {

        audio.play();

        playButton.textContent = "Pause";

    } else {

        audio.pause();

        playButton.textContent = "Play";
    }
};


/* This updates the audio volume when the user moves the custom volume slider. */

volume.oninput = function () {

    audio.volume = volume.value;
};


/* This converts the audio time into a readable minute and second format for the playback timer. */

function makeTime(seconds) {

    let min = Math.floor(seconds / 60);

    let sec = Math.floor(seconds % 60);

    if (sec < 10) {

        sec = "0" + sec;
    }

    return min + ":" + sec;
}


/* This updates the progress bar and playback time while the audio is playing. */

audio.ontimeupdate = function () {

    let progress = (audio.currentTime / audio.duration) * 100;

    progressFill.style.width = progress + "%";

    currentTime.textContent = makeTime(audio.currentTime);

    duration.textContent = makeTime(audio.duration);
};


/* This is my custom Focus Mode feature which creates a more immersive and distraction-free study environment. */

focusButton.onclick = function () {

    document.body.classList.toggle("focus-mode");

    if (document.body.classList.contains("focus-mode")) {

        focusButton.textContent = "Exit Focus Mode";

    } else {

        focusButton.textContent = "Enter Focus Mode";
    }
};