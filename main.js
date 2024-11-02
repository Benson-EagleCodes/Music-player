const songs = [
 {
  src: '/music/African-Child-Kumoo-www.crateshub.com.mp3',
  cover: '/cover /cover1.jpg',
  title: 'Kumoo',
  artist: 'African Child'
 },
 {
  src: '/music/Alpha-Blondy-Love-Power-ft-Stonebwoy-www.crateshub.com.mp3',
  cover: '/cover /cover2.jpg',
  title: 'Love Power',
  artist: 'Alpha Blondy'
 },
 {
  src: '/music/Busy-Signal-–-Missing-You-Come-Over-www.oneclickghana.com_.mp3',
  cover: '/cover /cover3.jpg',
  title: 'Missing You Babe',
  artist: 'Busy Signal'
 },
 {
  src: '/music/Heathen-Real-Life-Riddim-www.crateshub.com.mp3',
  cover: '/cover /cover4.jpg',
  title: 'Heathen',
  artist: 'African Child'
 },
 {
  src: '/music/Ras-Kuuku-One-Africa-feat-Stonebwoy-www.crateshub.com.mp3',
  cover: '/cover /cover5.jpg',
  title: 'One Africa',
  artist: 'Ras Kuuku'
 },
 {
  src: '/music/Stonebwoy-Rat-Race-(TrendySongz.com).mp3',
  cover: '/cover /cover6.jpg',
  title: 'Rat Race',
  artist: 'Stonebwoy'
 },
 {
  src: '/music/Stonebwoy-Roots-And-Culture-(TrendySongz.com).mp3',
  cover: '/cover /cover7.jpg',
  title: 'Roots And Culture',
  artist: 'Stonebwoy'
 }
 ];
 
 const audio = document.querySelector('audio');
 const musicContainer = document.getElementById('container');
 const imgage = document.querySelector('img');
 const title = document.querySelector('.song-title');
 const artist = document.querySelector('.artist');
 const currentTime = document.querySelector('.currentTime');
 const totalTime = document.querySelector('.totalTime');
 const progressCont = document.querySelector('.progress-cont');
 const progressBar = document.querySelector('.progress-bar');
 const volumeSlider = document.querySelector('.volume');
 const volLow = document.querySelector('.vol-low');
 const volHigh = document.querySelector('.vol-high');
 const playBtn = document.querySelector('.play');
 const prevBtn = document.querySelector('.prev');
 const nextBtn = document.querySelector('.next');
 const stopBtn = document.querySelector('.stop');
 
 let songIndex = 0;
 
 audio.volume = volumeSlider.value;
 
 loadSongs(songIndex);
 
 function loadSongs(songIndex) {
  audio.src = `${songs[songIndex].src}`
  artist.textContent = `${songs[songIndex].artist}`
  title.textContent = `${songs[songIndex].title}`
  imgage.src = `${songs[songIndex].cover}`
  progressBar.style.width = '0%';
 }
 
 function playSong() {
   container.classList.add('playing');
   imgage.classList.add('play-song');
   playBtn.classList.add('fa-pause');
   playBtn.classList.remove('fa-play');
   audio.play();
 }
 
 function pauseSong() {
  container.classList.remove('playing');
   imgage.classList.remove('play-song');
   playBtn.classList.remove('fa-pause');
   playBtn.classList.add('fa-play');
   audio.pause();
 }
 
 function stopSong() {
  container.classList.remove('playing');
     imgage.classList.remove('play-song');
   playBtn.classList.remove('fa-pause');
   playBtn.classList.add('fa-play');
   audio.pause();
   audio.currentTime = 0;
 }
 
 function prevSong() {
  if (songIndex === 0) {
   songIndex = songs.length -1;
   loadSongs(songIndex);
   playSong();
  } else {
   songIndex--
   loadSongs(songIndex);
   playSong();
  }
 }
 
  function nextSong() {
  if (songIndex >= songs.length-1) {
   songIndex = 0;
  
   loadSongs(songIndex);
   playSong();
  } else {
   songIndex++
   loadSongs(songIndex);
   playSong();
  }
 }
 
 function volumeControl() {
  audio.volume = volumeSlider.value;
  if (audio.volume === 0.0) {
   volLow.classList.remove('fa-volume-low');
   volLow.classList.add('fa-volume-xmark');
  } else {
   volLow.classList.remove('fa-volume-xmark');
   volLow.classList.add('fa-volume-low');
  }
 }
 
 function volumeLow() {
  audio.volume -= 0.1;
  volumeSlider.value = audio.volume;
  if (audio.volume === 0.0 || volumeSlider.value === 0.0) {
   volLow.classList.remove('fa-volume-low');
   volLow.classList.add('fa-volume-xmark');
  } else {
   volLow.classList.remove('fa-volume-xmark');
   volLow.classList.add('fa-volume-low');
  }
 }
 
  function volumeHigh() {
  audio.volume += 0.1;
  volumeSlider.value = audio.volume;
 }
 
 function currTime() {
  let timeMin = `${Math.floor(audio.currentTime/60)}`;
 let timeSec = `${Math.floor(audio.currentTime%60)}`;
 if (timeSec <= 9) {
  currentTime.textContent = `0${timeMin}:0${timeSec}`;
 } else {
  currentTime.textContent = `${timeMin}:${timeSec}`;
 }
 }
 
 function totalDuration() {
  let min = Math.floor(audio.duration/60);
  let sec = Math.floor(audio.duration%60);
  totalTime.textContent = `${min}:${sec}`;
 }
 
 function progress(e) {
  let {currentTime,duration} = e.srcElement;
  let progressPercent = (currentTime/duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
 }
 
 function setProgressBar(e) {
  let width = this.clientWidth;
  let clickX = e.offsetX;
  let dur = audio.duration;
  audio.currentTime = (clickX/width) * dur;
 }
 
 
playBtn.addEventListener('click',() =>{
 let isPlaying = container.classList.contains('playing');
 if (isPlaying) {
  pauseSong();
  } else {
  playSong();
  }
});
stopBtn.addEventListener('click',() =>{
let playingSong = container.classList.contains('playing');
if (playingSong) {
 stopSong();
}
});

prevBtn.addEventListener('click',()=>{
 prevSong();
});

nextBtn.addEventListener('click',()=>{
 nextSong();
});

audio.addEventListener('ended', nextSong);

volumeSlider.addEventListener('input',volumeControl);

volLow.addEventListener('click',volumeLow);

volHigh.addEventListener('click',volumeHigh);

audio.addEventListener('timeupdate',() =>{
 currTime();
});

audio.addEventListener('loadedmetadata',totalDuration);

audio.addEventListener('timeupdate',progress);

progressCont.addEventListener('click', setProgressBar);