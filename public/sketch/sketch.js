
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let currentMusic;

var zoom = 1;
var width = 100;



function bigger() {
  zoom = zoom + 0.1;
  width = 100 / zoom;
  document.body.style.transformOrigin = "left top";
  document.body.style.transform = "scale(" + zoom + ")";
  document.body.style.width = width + "%";
}
function smaller() {
  zoom = zoom - 0.1;
  width = 100 / zoom;
  document.body.style.transformOrigin = "left top";
  document.body.style.transform = "scale(" + zoom + ")";
  document.body.style.width = width + "%";
}
smaller();
smaller();

function hide(toHide) {
  thisdiv = document.getElementyById(toHide);
  thisdiv.style.display = 'none';
}


//initialization of global variables


//Meditation text functionality
const mediationLines = [
  "Let your subservience wash over you",
  "Release your mind to the empress",
  "Imagine yourself in an endless ocean of blood",
  "Floating on your back",
  "The Empress is here with you",
  "Mere light years away",
  "Her face lights up the sky",
  "Looking down on you",
  "With almost no disgust at all",
  "You are worthy of pity",
  "You are worthy of pity and hatred",
  "To unlock more meditative messages",
  "Enter proof of imperial army service",
  "With name, ID number, and confirmed kill count"

];
let currentIndex = 0;
const textDisplay = document.getElementById('textDisplay');
//textDisplay.textContent=mediationLines[0];
textDisplay.style.opacity = 0;


textDisplay.addEventListener('animationiteration', () => {
  if(textDisplay.style.animationPlayState=='running')
  {
    console.log("Animation iteration running");
    textDisplay.textContent = mediationLines[currentIndex];
    currentIndex = (currentIndex + 1) % mediationLines.length;
  }
})

function startAnimation(anim) {
  anim.style.animationPlayState = 'running';
}

function pauseAnimation(anim) {
  anim.style.animationPlayState = 'paused';
}




stringwidth=5;
let strings = [];
let images = [];


// List of image paths
const imagePaths = [
  "exporthere\\landbg.png",
  "exporthere\\bigharp_frame_only.png",
  "exporthere\\phonecameratop.png",
  "exporthere\\phone_blue_toplayer.png",
  "exporthere\\bigharp_buttons_toplayer.png",
];


//svg icons
var svgPhotoBackButton = `
<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 width="800px" height="800px" viewBox="0 0 489.394 489.394"
	 xml:space="preserve">
<g>
	<path d="M375.789,92.867H166.864l17.507-42.795c3.724-9.132,1-19.574-6.691-25.744c-7.701-6.166-18.538-6.508-26.639-0.879
		L9.574,121.71c-6.197,4.304-9.795,11.457-9.563,18.995c0.231,7.533,4.261,14.446,10.71,18.359l147.925,89.823
		c8.417,5.108,19.18,4.093,26.481-2.499c7.312-6.591,9.427-17.312,5.219-26.202l-19.443-41.132h204.886
		c15.119,0,27.418,12.536,27.418,27.654v149.852c0,15.118-12.299,27.19-27.418,27.19h-226.74c-20.226,0-36.623,16.396-36.623,36.622
		v12.942c0,20.228,16.397,36.624,36.623,36.624h226.74c62.642,0,113.604-50.732,113.604-113.379V206.709
		C489.395,144.062,438.431,92.867,375.789,92.867z"/>
</g>
</svg>
`;

var svgHeartIcon = `
<svg class="heart-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
</svg>
`;



//photo functionality
const photoUrls= [
  "exporthere/ppic_1.png",
  "exporthere/ppic_2.png",
  "exporthere/ppic_3.png",
  "exporthere/ppic_4.png",
  "exporthere/ppic_5.png",
  "exporthere/ppic_6.png",
  "exporthere/ppic_7.png",
  "exporthere/ppic_8.png",
  "exporthere/ppic_9.png",
]

const photosApp = document.getElementById('photos');
const expandedPhotoContainer = document.getElementById('expanded-photo-container');//need seperate containers for thumbnail and expanded
const photoContainer = document.getElementById('photo-container');
let currentPhoto;

//generates photo thumbnails and adds to photo container
photoUrls.forEach((imageUrl) => {
  const photoElement = document.createElement('div');
  photoElement.classList.add('photo');
  photoElement.style.backgroundImage = `url(${imageUrl})`;
  photosApp.appendChild(photoElement);
        });

//open photo from thumbnail when clicked
photosApp.addEventListener("click", (event) => {
  if(!currentPhoto){
  if(event.target.classList.contains('photo')) {
    currentPhoto=event.target;//currentphoto is being used
    currentPhoto.classList.add('photoExpanded');
    //I know this function is janky. Nobody has to tell me that.
    const rect = currentPhoto.getBoundingClientRect();
    const photosApp = document.querySelector('.photos');
    const containerRect = photosApp.getBoundingClientRect();
    console.log("container rect width="+ containerRect.width);
    console.log("rect width="+rect.width);
    console.log("rect left="+ rect.left);
    console.log("rect top="+rect.top);
    const scaleX = containerRect.width / rect.width;
    const scaleY = (containerRect.height / rect.height);
    const scale = Math.min(scaleX, scaleY); // Maintain aspect ratio
    const translateX = ((containerRect.left + containerRect.width / 2) - (rect.left + rect.width / 2))*1.25;
    const translateY = ((containerRect.top + containerRect.height / 2) - (rect.top + rect.height / 2))*1.22;

    currentPhoto.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;

        // Create the back button
        const backButton = document.createElement('button');
        backButton.textContent = 'Back'; // Customize the button label as needed
        backButton.classList.add('photo-exit-button'); // Add a class for styling
        backButton.innerHTML = svgPhotoBackButton;
    
        // Append the back button to the expanded photo
        currentPhoto.appendChild(backButton);
    
        // Now you can handle the back button click event
        backButton.addEventListener('click', () => {
          currentPhoto.classList.remove('photoExpanded');
          currentPhoto.style.transform='';
          currentPhoto.removeChild(backButton); // Remove the back button
          currentPhoto=null;
        });
      }
    }
})
//file functionality


const tracksList=[
"bitcrusher",
"catThing",
"sparseThing",
"pianoThing",
"otherPianoThing",
"coolBassChords"
]

//music container and control buttons
const musicContainer = document.getElementById('music-container');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');

let currentTrack = null; // To keep track of the selected audio element


function createMusicFileElement(track) {  //creates music file element
  const div = document.createElement('div');  //creates the div
  div.textContent = track;    //the div element has the name of the track
  div.id="track " + track;
  div.classList.add('musicfile');  //its now a music file

  div.onclick = () => {   //when the track is clicked
    // Highlight the selected track
    document.querySelectorAll('.musicfile').forEach(file => file.classList.remove('selected'));//unselects other music files
    stopMusic(currentTrack);//stops the currenttrack
    div.classList.add('selected');

    // Set the current track
    currentTrack = document.getElementById(track);
    console.log("current track is",currentTrack);
  };




  return div;
}

tracksList.forEach(track => { //populates files app
  const musicFileElement = createMusicFileElement(track);
  musicContainer.appendChild(musicFileElement);
});

playButton.onclick = () => {
  if (currentTrack) {
    console.log("playing with playbutton current track", currentTrack);
    playSound(currentTrack, true, 0.2,true); // Play the selected track with resuming capabilities.
    currentMusic=currentTrack;//updates the current track
  } else {
    alert('Please select a track to play.');
  }
};


pauseButton.onclick = () => {
  console.log("should pause track");
  if (currentTrack) {
    pauseTrack(currentTrack); // PAUSES the selected track. not necessarily stops
  } else {
    console.log("no track to stop");
  }
};



//PRELOAD LOADS ALL IMAGES, IDS THEM ACCORDINGLY AND DRAWS THE FIRST 5.


function preload() {
  console.log('Memory before:', performance.memory); // if available in your browser
   //Loads all images
  for (let i = 0; i < imagePaths.length; i++) {
    thisImage=loadImage(imagePaths[i]);
    //thisImage.id=imagePaths[i];
    images[i] = thisImage;
  }
  console.log('Memory after:', performance.memory); // if available in your browser

}



let backgroundCanvas;
let buttonCanvas;
function setup() {
  createCanvas(1700, 800);
  
  strings.push(new HarpString(30, 115, 80)); 
  strings.push(new HarpString( 80, 140, 120));
  strings.push(new HarpString( 135, 153, 220));
  strings.push(new HarpString( 193, 155, 300));
  strings.push(new HarpString( 245, 135, 400));
  strings.push(new HarpString( 285, 100, 500));
  strings.push(new HarpString( 320, 60, 600));
  strings.push(new HarpString( 360, 15, 700));
  strings.push(new HarpString( 400, 0, 800));
  strings.push(new HarpString( 440, 0, 900));
  strings.push(new HarpString( 480, 0, 1000));
  strings.push(new HarpString( 520, 0, 1100));
  strings.push(new HarpString( 560, 0, 1100));


  backgroundCanvas = createGraphics(1700, 800); //background canvas below harp strings
  backgroundCanvas.clear();
  
  for (let i = 0; i < 4; i++) {
    backgroundCanvas.image(images[i], 0, 0);
  }

  buttonCanvas = createGraphics(1700, 800); //button canvas above harp strings
  buttonCanvas.clear();
  buttonCanvas.image(images[4], 0, 0);

  
}


function draw() {
  //background(255);
  // Draw images first
  image(backgroundCanvas, 0, 0);



  //displays harp strings
  for (let string of strings) {
    string.display();
  }


  image(buttonCanvas, 0, 0);
}



class HarpString {
  constructor(x, y, height) {
    this.x = x;
    this.height = height;
    this.y = y+height/2;
    this.width = stringwidth;
    this.isPlucked = false;
    this.pluckTime = 0;
    this.initialAmplitude = 20; // Initial amplitude of the wave
    this.amplitude = this.initialAmplitude;
    this.frequency = 2; // Frequency of the wave
    this.damping = 0.95; // Damping factor to reduce amplitude over time
  }

  display() {
    stroke(255,215,0);
    strokeWeight(this.width);
    noFill();
    
    beginShape();
    for (let i = -this.height / 2; i <= this.height / 2; i++) {
      let offset = 0;
      if (this.isPlucked) {
        let time = (millis() - this.pluckTime) / 200;
        let normalizedPosition = (i + this.height / 2) / this.height; // Normalize position between 0 and 1
        offset = this.amplitude * sin(TWO_PI* this.frequency * i + time * TWO_PI) * (1 - normalizedPosition) * normalizedPosition;
      }
      vertex(this.x + offset, this.y + i);
    }
    
    endShape();

    if (this.isPlucked) {
      this.amplitude *= this.damping;
      if (this.amplitude < 0.1) {
        console.log("pluck over");
        this.isPlucked = false;
      }
    }
  }

  calculateAmplitude() {
    // Normalize height to a range (e.g., 1 to 10)
    let normalizedHeight = this.height / 300;
    // Apply logarithmic scaling
    let logAmplitude = Math.log(normalizedHeight + 1); // Adding 1 to avoid log(0)
    
    console.log(logAmplitude);
    return (logAmplitude*(Math.random() * (25 - 18) + 18));
  }


  pluck() {
    this.initialAmplitude=this.calculateAmplitude();
    console.log(this.initialAmplitude);
    this.isPlucked = true;
    this.pluckTime = millis();
    this.amplitude = this.initialAmplitude; // Reset amplitude when plucked
  }
}

//
//AUDIO API STUFF

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(soundId, shouldLoop=false,volume=0.5,resume=false) {   //function to easily play sound from ID, incluidng optional volume and looping args
    audioContext.resume().then(() => {
        const audioElement = soundId;
        if (!audioElement) {
            const source = audioContext.createMediaElementSource(audioElement);
            source.connect(audioContext.destination);
            audioElement.source = source; // Store the source to avoid creating it multiple times
        }
        audioElement.loop=shouldLoop;
        if(!resume){audioElement.currentTime = 0;} // Reset playback position if not set to resume
        audioElement.volume = volume; // Set the volume
        audioElement.play();
    });
    console.log("played sound", soundId);

}
function stopMusic() {
  if (currentMusic) {
      console.log("stopping current track", currentMusic);
      currentMusic.pause(); // Pause the audio element
      currentMusic=null;
  }
}

function pauseTrack() {
  if (currentMusic) {
      console.log("pausing current track", currentMusic);
      currentMusic.pause(); // Pause the audio element
  }
}








playSound(document.getElementById('desertWind'),true,1.0);//LOOPING WIND NOISE
const pressedKeys = new Set();



//HARP CONTROLS

document.addEventListener('keydown', function(event) {
    if(!audioContext){audioContext = new AudioContext();} 
    audioContext.resume();
    keyPressed=event.key;
    if (pressedKeys.has(keyPressed)) {
      return;
  }
    pressedKeys.add(keyPressed);
    switch (keyPressed) {
        
        case '1':
        console.log("a pressed");
        sound = document.getElementById('c5');

        strings[0].pluck();
        playSound(sound);
        break;
        case '2':
        sound = document.getElementById('c#5');

        strings[1].pluck();
        playSound(sound);
        break;
        case '3':
        sound = document.getElementById('d5');
 
        strings[2].pluck();
        playSound(sound);
        break;
        case '4':
        strings[3].pluck();

        sound = document.getElementById('d#5');
        playSound(sound);
        break;
        case '5':
        strings[4].pluck();
        sound = document.getElementById('e5');
        playSound(sound);

        break;
        case '6':
        strings[5].pluck();
        sound = document.getElementById('f5');
        playSound(sound);
        break;
        case '7':
        strings[6].pluck();
        sound = document.getElementById('f#5');
        playSound(sound);
        break;
        case '8':
        strings[7].pluck();
        sound = document.getElementById('g5');
        playSound(sound);
        break;
        case 'q':
        strings[8].pluck();
        sound = document.getElementById('g#5');
        playSound(sound);
        break;
        case 'w':
        strings[9].pluck();
        sound = document.getElementById('a5');  
        playSound(sound);
        break;
        case 'e':
        strings[10].pluck();
        sound = document.getElementById('a#5');  
        playSound(sound); 
        break;
        case 'r':
        strings[11].pluck();
        sound = document.getElementById('b5');  
        playSound(sound);
        break;
        case 't':
          strings[12].pluck();
          sound = document.getElementById('c6');  
          playSound(sound);
          break;

}
});

document.addEventListener('keyup', function(event) {
  const keyReleased = event.key;
  // Remove the key from the set of pressed keys
  pressedKeys.delete(keyReleased);
});

//TUTORIAL CONTROLS. When the buttons clicked, show the controls box, when the controlsbox is clicked, hide it.
const controlsBox=document.getElementById('controlsBox'); 
const controlsButton=document.getElementById('controlsButton'); 
controlsBox.addEventListener('click', () => {
  controlsBox.style.display="none";
});
document.addEventListener('keydown', () => { controlsBox.style.display = "none"; });
controlsButton.addEventListener('click', () => {
  controlsBox.style.display="block";
});




//PHONE CONTROLS
//apps are handled with all apps technically being there at once, only expanding and unexpanding to fit the screen when opened
const discorpse=document.getElementById('discorpse'); 
const meditation=document.getElementById('meditation');
const garageband=document.getElementById('garageband'); 
const files=document.getElementById('files'); 
const homeScreen= document.getElementById('homeScreen'); 
const phone=document.getElementById('phone');
const snapchat=document.getElementById('snapchat');

let bgSize=800;
let isDragging = false; //whether an app/message is being dragged or not
let startY;// initial mouse position
let initialBackgroundPositionY;//initial position of the background image
let maxScrollY; //used for message background image max.
let currentMessage;
let currentMessageFrame;
let currentApp=null;
let scrollTop=0;;


document.addEventListener('DOMContentLoaded', function() {

  var likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach(function(button) {
    button.innerHTML = svgHeartIcon;
    button.addEventListener('click', function() { // like button functionality
      this.classList.toggle("liked");
      console.log("should have liked image");
    });
  });
});

const dropdown = document.querySelector('.dropdown');
const dropdownButton = document.querySelector('.dropdown-button');
const dropdownMenu = document.querySelector('.dropdown-menu');

dropdownButton.addEventListener('click', () => {
    // Toggle the visibility of the dropdown menu
    const isMenuVisible = dropdownMenu.style.display === 'block';
    dropdownMenu.style.display = isMenuVisible ? 'none' : 'block';
});

// Close the dropdown menu if clicking outside the dropdown
document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
        dropdownMenu.style.display = 'none';
    }
});

//below function changes the background of a button to it's alt when clicked
function changeBackground(button) {
  // Get the value of the CSS variable --newbg
  const newBg = getComputedStyle(button).getPropertyValue('--newbg');
  // Set the button's background image to the new background image
  button.style.backgroundImage = newBg;
}

//kind of a weird function, probably should have set up way better. Adds the correct background image to all the frames. Looking back, this shouldn't require js. I'm as confused as you are.
//like it's set up as if it's all the same message frame just with changing backgrounds, but theres still 4 messageframes? Did I really not want to write 4 near identical css items that badly?? what the fuck.
//the more I look at all the message functionality the more horrifying it is. I think it all started with me just going with it when Lily sent all the messagelogs as giant images, instead of letting her know it would be way easier to just do it all in html.
//and I have to manually input the size of the background images?? If I wasn't almost done with this I'd rewrite it.
//Im sorry, me.
function setMessageFrameBackground(frameId, imageUrl) {
  const frame = document.getElementById(frameId);
  if (frame) {
      frame.style.setProperty('--frame-bg', `url(${imageUrl})`);
  }
}

setMessageFrameBackground('ineeriMessageFrame', 'exporthere/ineeri_red_bg.png');
setMessageFrameBackground('kolleiMessageFrame', 'exporthere/kollei_red_bg.png');
setMessageFrameBackground('natlwaMessageFrame', 'exporthere/natlwa_red_bg.png');
setMessageFrameBackground('meldilMessageFrame', 'exporthere/meldil_red_bg.png');





//closes app or message if x key is pressed, 
document.addEventListener('keydown', (event) => { 
  if ((event.key === 'x' || event.key === 'X')&& !currentMessage) { closeApp()}
  else if ((event.key === 'x' || event.key === 'X')&& currentMessage) { closeMessage()}

});


  function openApp(newApp) {
  currentApp=document.getElementById(newApp);
  currentApp.classList.add('expanded');
  if(currentApp.classList.contains("scrollable"))
  {
    currentApp.addEventListener('mousedown',handleMouseDown,);//inits scrolling of scrollable app
  }
  if (currentApp==meditation) //MEDITATION APP SETUP
  {
    console.log(currentApp);
    if(!audioContext){audioContext = new AudioContext();} audioContext.resume();
    playSound(document.getElementById('calmMusic'),true,0.2);
    pauseTrack(currentTrack);
    currentMusic=document.getElementById('calmMusic');
    startAnimation(textDisplay);
  }


}

function closeApp() {
  if (currentApp==meditation) //MEDITATION APP SETUP
  {
    pauseAnimation(textDisplay);
  }
  if(currentApp.classList.contains("scrollable"))
  {
    currentApp.removeEventListener('mousedown',handleMouseDown,);
  }
  currentApp.classList.remove('expanded');
  if(currentApp==meditation) //the music from files persists upon app closing (meditation does not though)
  {
    console.log("current app is", currentApp, "so music stop");
    stopMusic(currentMusic);
    currentMusic=null;
  }
  currentApp=null; 



}







//discorpse CONTROLS
//openMessage loads a new image url, resets backgroundposition, and should set the discorpse window to visible
function openMessage(newMessage,newMessageFrame) {
  currentApp=document.getElementById(newMessage);//sets app to this new message to allow scrolling
  currentMessage=document.getElementById(newMessage); //sets currentMessage to correct message 
  currentMessageFrame=document.getElementById(newMessageFrame);  //setscurrent MessageFrame to the new frame
  currentMessageFrame.classList.add('expanded');//expands the current message frame, and the message within
  currentMessage.addEventListener('mousedown',handleMouseDown,);
  console.log(currentApp);
}

function closeMessage() {
  currentMessageFrame.classList.remove('expanded');
  currentMessage.removeEventListener('mousedown',handleMouseDown);
  currentMessage=null; 
  currentMessageFrame=null;  
  discorpse.classList.add('expanded');
  currentApp=discorpse;//sets current app back to discorpse when message closed
  console.log("discorpse should be back open for message");
}


document.getElementById("discorpseSongLink").addEventListener('click', () => {
  closeMessage(currentMessage);
  closeApp(currentApp);
  openApp("files");
  document.getElementById("track coolBassChords").click();  
});



//below three functions allow for the scrolling of ALL APPS. NOT JUST discorpse MESSAGES.


function handleMouseDown(e) {
  isDragging = true;  //sets is dragging to true
  // Removed currentMessage handling
  console.log("current app is ",currentApp);
  startY = e.pageY;
  scrollTop = currentApp.scrollTop;
  console.log("mouseDownOnApp");
  console.log("scrolltop =",currentApp.scrollTop);

  console.log(currentApp);

}


document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    requestAnimationFrame(() => {
      const deltaY = e.pageY - startY;  //deltaY is mouse movement
      // Removed currentMessage handling
      const y = e.pageY - currentApp.offsetTop;
      console.log(y);

      const walk = (y - startY) * 2; // Scroll-fast
      console.log(walk);

      currentApp.scrollTop = scrollTop - walk;
      console.log(currentApp);

      console.log("scrolling app");
    });
  }
});


document.addEventListener('mouseup', () => {
  if(isDragging){
    isDragging = false;
    // Removed currentMessage handling
  }
});

phone.addEventListener('mouseleave', () => {  
  console.log("CURSOR LEFT PHONE");
  isDragging = false;
  // Removed currentMessage handling
});
