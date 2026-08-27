// Get HTML elements

const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");

const prevBtn = document.getElementById("prevBtn");

const nextBtn = document.getElementById("nextBtn");

const progress = document.getElementById("progress");

const volume = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");

const songTitle = document.getElementById("songTitle");

const artist = document.getElementById("artist");

const albumArt = document.getElementById("albumArt");

const playlist = document.getElementById("playlist");


// Song List

const songs = [

    {
        title: "Opalite",
        artist: "Taylor Swift",
        src: "music/song1.mp3",
        image: "https://pbs.twimg.com/media/G_NZdkVW0AAuD8G.jpg"
    },

    {
        title: "Blank Space",
        artist: "Taylor Swift",
        src: "music/song2.mp3",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdTZ6e-cg_tEEsHsNfus2GxSWFcMgEYxmoDme6TUCLUOJQU82DYvVPDf4&s=10"
    },

    {
        title: "Cruel Summer",
        artist: "Taylor Swift",
        src: "music/song3.mp3",
        image: "https://cdn-images.dzcdn.net/images/cover/6111c5ab9729c8eac47883e4e50e9cf8/1900x1900-000000-80-0-0.jpg"
    }

];


// Current Song

let songIndex = 0;


// Load Song

function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;

    artist.textContent = song.artist;

    audio.src = song.src;

    albumArt.src = song.image;

    updatePlaylist();

}


// Play Song

function playSong() {

    audio.play();

    playBtn.textContent = "⏸";

}


// Pause Song

function pauseSong() {

    audio.pause();

    playBtn.textContent = "▶";

}


// Play / Pause Button

playBtn.addEventListener("click", function () {

    if (audio.paused) {

        playSong();

    } else {

        pauseSong();

    }

});


// Next Song

nextBtn.addEventListener("click", function () {

    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songIndex);

    playSong();

});


// Previous Song

prevBtn.addEventListener("click", function () {

    songIndex--;

    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);

    playSong();

});


// Update Progress Bar

audio.addEventListener("timeupdate", function () {

    if (audio.duration) {

        const progressPercent =
            (audio.currentTime / audio.duration) * 100;

        progress.value = progressPercent;

        currentTime.textContent =
            formatTime(audio.currentTime);

    }

});


// Show Duration

audio.addEventListener("loadedmetadata", function () {

    duration.textContent =
        formatTime(audio.duration);

});


// Change Song Position

progress.addEventListener("input", function () {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;

    }

});


// Volume Control

volume.addEventListener("input", function () {

    audio.volume = volume.value;

});


// Default Volume

audio.volume = 0.7;


// Format Time

function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    const minutes =
        Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60);

    return minutes + ":" +
        (seconds < 10 ? "0" : "") +
        seconds;

}


// Create Playlist

function createPlaylist() {

    playlist.innerHTML = "";

    songs.forEach((song, index) => {

        const item =
            document.createElement("div");

        item.classList.add("playlist-item");

        item.innerHTML = `

            <div>

                <div class="song-name">
                    ${song.title}
                </div>

                <div class="song-artist">
                    ${song.artist}
                </div>

            </div>

            <span>▶</span>

        `;


        item.addEventListener("click", function () {

            songIndex = index;

            loadSong(songIndex);

            playSong();

        });


        playlist.appendChild(item);

    });

}


// Highlight Current Song

function updatePlaylist() {

    const items =
        document.querySelectorAll(".playlist-item");

    items.forEach((item, index) => {

        if (index === songIndex) {

            item.classList.add("active");

        } else {

            item.classList.remove("active");

        }

    });

}


// Automatically Play Next Song

audio.addEventListener("ended", function () {

    songIndex++;

    if (songIndex >= songs.length) {

        songIndex = 0;

    }

    loadSong(songIndex);

    playSong();

});


// Keyboard Support

document.addEventListener("keydown", function (event) {

    if (event.code === "Space") {

        event.preventDefault();

        if (audio.paused) {

            playSong();

        } else {

            pauseSong();

        }

    }

    if (event.code === "ArrowRight") {

        nextBtn.click();

    }

    if (event.code === "ArrowLeft") {

        prevBtn.click();

    }

});


// Initialize Player

createPlaylist();

loadSong(songIndex);