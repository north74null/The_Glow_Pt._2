window.addEventListener(
    "keydown",
    function (event) {
        if ([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
            event.preventDefault();
        }
    },
    false
);
volumeSlider = document.getElementById("volumeSlider")
let songArray = [
    "audio/01. I Want Wind to Blow.mp3",
    "audio/02. The Glow Pt. 2.mp3",
    "audio/03. The Moon.mp3",
    "audio/04. Headless Horseman.mp3",
    "audio/05. My Roots Are Strong and Deep.mp3",
    "audio/06. Instrumental.mp3",
    "audio/07. The Mansion.mp3",
    "audio/08. (Something).mp3",
    "audio/09. (Something).mp3",
    "audio/10. I'll Not Contain You.mp3",
    "audio/11. The Gleam Pt. 2.mp3",
    "audio/12. Map.mp3",
    "audio/13. You'll Be in the Air.mp3",
    "audio/14. I Want to Be Cold.mp3",
    "audio/15. I Am Bored.mp3",
    "audio/16. I Felt My Size.mp3",
    "audio/17. Instrumental.mp3",
    "audio/18. I Felt Your Shape.mp3",
    "audio/19. Samurai Sword.mp3",
    "audio/20. My Warm Blood.mp3"
];

let currentSong = 0;
let song = new Audio();
window.onload = function () {
    playSong();
};

function playSong() {
    song.src = songArray[currentSong];
    document.getElementById("title").textContent = songArray[currentSong].slice(10, -4);
}

function playOrPause() {
    if (song.paused) {
        song.play();
        document.getElementById("play").src = "images/pause.png";
    } else {
        song.pause();
        document.getElementById("play").src = "images/play.png";
    }
}
var progressBar = document.getElementById('rewindSlider')
  function changeProgressBar(){
      song.currentTime = progressBar.value;
  }
song.addEventListener("timeupdate", function () {
    convertTime(song.currentTime);
    if (song.ended) {
        next();
    }
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
});

function convertTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    document.getElementById("currentTime").textContent = min + ":" + sec;
    totalTime(Math.floor(song.duration));
}

function totalTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    document.getElementById("currentTime").textContent += " / " + min + ":" + sec;
}

function next() {
    currentSong++;
    if (currentSong >= songArray.length) {
        currentSong = 0;
    }
    playSong();
    song.play();
    document.getElementById("play").src = "images/pause.png";
}

function prev() {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songArray.length - 1;
    }
    playSong();
    song.play();
    document.getElementById("play").src = "images/pause.png";
}


volumeSlider.addEventListener("mousemove", setvolume);

function setvolume() {
    song.volume = volumeSlider.value / 100;
    document.getElementById('volVal').value = volumeSlider.value;
}

document.getElementById('volVal').addEventListener('change', (event) => {
    volumeSlider.value = event.target.value;
    song.volume = volumeSlider.value / 100;
  });

