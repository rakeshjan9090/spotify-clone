console.log("Welcome to Spotify");

// Initialize variables
let songIndex = 0;
let audioElement = new Audio(songs[songIndex].filePath);
let masterPlay = document.getElementById("masterplay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let currentTimeEl = document.getElementById("currentTime");
let totalDurationEl = document.getElementById("totalDuration");
let songItems = Array.from(document.getElementsByClassName("songItem"));

// Function to format time in MM:SS
function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? "0" + sec : sec}`;
}

// Load song details in the list
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Play/Pause functionality
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.replace("fa-circle-play", "fa-circle-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.replace("fa-circle-pause", "fa-circle-play");
    gif.style.opacity = 0;
  }
});

// Update total duration when metadata loads
audioElement.addEventListener("loadedmetadata", () => {
  totalDurationEl.textContent = formatTime(audioElement.duration);
});

// Update current time dynamically
audioElement.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(audioElement.currentTime);

  // Update progress bar
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

// Seekbar functionality
myProgressBar.addEventListener("change", () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Function to reset all play buttons
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.classList.replace("fa-circle-pause", "fa-circle-play");
  });
};

// Play song from the list
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
  element.addEventListener("click", (e) => {
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.replace("fa-circle-play", "fa-circle-pause");

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    gif.style.opacity = 1;
    masterPlay.classList.replace("fa-circle-play", "fa-circle-pause");
  });
});

// Next song functionality
document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex >= songs.length - 1) ? 0 : songIndex + 1;
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();

  masterPlay.classList.replace("fa-circle-play", "fa-circle-pause");
});

// Previous song functionality
document.getElementById("previous").addEventListener("click", () => {
  songIndex = (songIndex <= 0) ? songs.length - 1 : songIndex - 1;
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();

  masterPlay.classList.replace("fa-circle-play", "fa-circle-pause");
});
