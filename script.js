console.log('Welcome to Spotify');
//Initialize the variables
let songIndex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
	{songName: "diya_aur_baati_hum....(128k)", filePath: "song/1.mp3", coverPath: "covers/cover1.jpg"},
	{songName: "Har Funn Maula - Koi Jaane Na", filePath: "song/2.mp3", coverPath: "covers/cover2.jpg"},
	{songName: "Guilty - Karan Aujla", filePath: "song/3.mp3", coverPath: "covers/cover3.jpg"},
	{songName: "Tu Hi Meri Shab Hai - Gangster 320Kbps", filePath: "song/4.mp3", coverPath: "covers/cover4.jpg"},
	{songName: "Lut Gaye - Jubin Nautiyal", filePath: "song/5.mp3", coverPath: "covers/cover5.jpg"},
	{songName: "Mummy Kassam - Coolie No 1", filePath: "song/6.mp3", coverPath: "covers/cover6.jpg"},
	{songName: "Jai Veeru - Khasa Aala Chahar", filePath: "song/7.mp3", coverPath: "covers/cover7.jpg"},
	{songName: "Saiyyonee - Yasser Desai", filePath: "song/8.mp3", coverPath: "covers/cover8.jpg"},
	{songName: "Krrish 3 - Raghupati Raghav", filePath: "song/08.mp3", coverPath: "covers/cover8.jpg"},
]

songItems.forEach((element, i)=>{
	//console.log(element, i)
	element.getElementsByTagName("img")[0].src = songs[i].coverPath;
	element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
// audioElement.play();
// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
	if (audioElement.paused || audioElement.currentTime<=0) {
		audioElement.play();
		masterPlay.classList.remove('fa-circle-play');
		masterPlay.classList.add('fa-circle-pause');
		gif.style.opacity = 1;
	}else{
		audioElement.pause();
		masterPlay.classList.remove('fa-circle-pause');
		masterPlay.classList.add('fa-circle-play');
		gif.style.opacity = 0;		
	}
})
//Listen to Event
audioElement.addEventListener('timeupdate', ()=>{
	//update seekbar
	progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
	myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
	audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
	Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
		element.classList.remove('fa-circle-pause');
		element.classList.add('fa-circle-play');
	})
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
	element.addEventListener('click', (e)=>{
		//console.log(e.target);
		makeAllPlays();
		songIndex = parseInt(e.target.id);
		e.target.classList.remove('fa-circle-play');
		e.target.classList.add('fa-circle-pause');
		audioElement.src = `song/${songIndex}.mp3`;
		masterSongName.innerText = songs[songIndex].songName;
		audioElement.currentTime = 0;
		audioElement.play();
		gif.style.opacity = 1;
		masterPlay.classList.remove('fa-circle-play');
		masterPlay.classList.add('fa-circle-pause');
	})
})

document.getElementById('next').addEventListener('click', ()=>{
	if (songIndex>=10) {
		songIndex = 0;
	} else {
		songIndex += 1;
	}
	audioElement.src = `song/${songIndex}.mp3`;
	masterSongName.innerText = songs[songIndex].songName;
	audioElement.currentTime = 0;
	audioElement.play();
	masterPlay.classList.remove('fa-circle-play');
	masterPlay.classList.add('fa-circle-pause');	
})

document.getElementById('previous').addEventListener('click', ()=>{
	if (songIndex<=0) {
		songIndex = 0;
	} else {
		songIndex -= 1;
	}
	audioElement.src = `song/${songIndex}.mp3`;
	masterSongName.innerText = songs[songIndex].songName;
	audioElement.currentTime = 0;
	audioElement.play();
	masterPlay.classList.remove('fa-circle-play');
	masterPlay.classList.add('fa-circle-pause');	
})