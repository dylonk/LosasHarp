

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


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
  "exporthere\\ineeri_red_bg.png",  //images [5]
  "exporthere\\kollei_red_bg.png",
  //last image drawn in draw function, all other images must be drawn as needed.  
  "exporthere\\phonehomescreen_blank.png",
  "exporthere\\full_ineeri_darkbg.png",
  "exporthere\\full_ineeri_isolated_text.png",
  "exporthere\\discord_white_bg.png", //images[10]
  "exporthere\\full_kollei_darkbg.png",
  "exporthere\\full_kollei_isolated_text.png",
  "exporthere\\phone_text_battery.png", 
  "exporthere\\phone_discord_bg.png",
  "exporthere\\phone_discord_gray.png", //images[15]
  "exporthere\\phone_discord_red.png",
  "exporthere\\phone_icons_isolated.png",
  "exporthere\\phone_icons_text_combo.png",
  "exporthere\\phone_icons_text_isolated.png",
  "exporthere\\phonegray.png",  //images[20]
];




//PRELOAD LOADS ALL IMAGES, IDS THEM ACCORDINGLY AND DRAWS THE FIRST 5.
function preload() {
   //Loads all images
  for (let i = 0; i < imagePaths.length; i++) {
    thisImage=loadImage(imagePaths[i]);
    //thisImage.id=imagePaths[i];
    images[i] = thisImage;
    console.log("Image " + i + " loaded?");
  }
}




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
  strings.push(new HarpString( 450, 0, 900));
}



function draw() {
  //background(255);
  // Draw images first
  let x = 0;
  let y = 0;
  for (let i = 0; i < 4; i++) {
    image(images[i], x, y); // Adjust size and position as needed 
  }
  //displays harp strings
  for (let string of strings) {
    string.display();
  }


  image(images[4], x, y); //loads harp buttons after strings
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
    this.damping = 0.9999; // Damping factor to reduce amplitude over time
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
        this.amplitude *= this.damping; // Reduce amplitude over time
        if (this.amplitude < 0.1) {
          this.isPlucked = false;
        }
      }
      vertex(this.x + offset, this.y + i);
    }
    endShape();
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

function playSound(soundId) {
    audioContext.resume().then(() => {
        const audioElement = soundId;
        if (!audioElement.source) {
            const source = audioContext.createMediaElementSource(audioElement);
            source.connect(audioContext.destination);
            audioElement.source = source; // Store the source to avoid creating it multiple times
        }
        audioElement.currentTime = 0; // Reset playback position
        audioElement.play();
    });
}









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
        sound = document.getElementById('d5');

        strings[1].pluck();
        playSound(sound);
        break;
        case '3':
        sound = document.getElementById('d#5');
 
        strings[2].pluck();
        playSound(sound);
        break;
        case '4':
        strings[3].pluck();

        sound = document.getElementById('f5');
        playSound(sound);
        break;
        case '5':
        strings[4].pluck();
        sound = document.getElementById('f#5');
        playSound(sound);

        break;
        case '6':
        strings[5].pluck();
        sound = document.getElementById('g5');
        playSound(sound);
        break;
        case '7':
        strings[6].pluck();
        sound = document.getElementById('a5');
        playSound(sound);
        break;
        case '8':
        strings[7].pluck();
        sound = document.getElementById('a#5');
        playSound(sound);
        break;
        case '9':
        strings[8].pluck();
        sound = document.getElementById('b5');
        playSound(sound);
        break;
        case '0':
        strings[9].pluck();
        sound = document.getElementById('c6');  
        playSound(sound);
}
});

document.addEventListener('keyup', function(event) {
  const keyReleased = event.key;
  // Remove the key from the set of pressed keys
  pressedKeys.delete(keyReleased);
});




//PHONE CONTROLS
//apps are handled with all apps technically being there at once, only expanding and unexpanding to fit the screen when opened
const trollian=document.getElementById('trollian'); 
const homeScreen= document.getElementById('homeScreen'); 
openApp('homeScreen');

let bgSize=800;
let isDraggingMessage = false;
let startY;// initial mouse position
let initialBackgroundPositionY;//initial position of the background image
let maxScrollY; 
let currentMessage;
let currentMessageFrame;



function openApp(newApp)
{
  currentApp=document.getElementById(newApp);
  currentApp.classList.add('expanded');

}


//TROLLIAN CONTROLS
//openMessage loads a new image url, resets backgroundposition, and should set the trollian window to visible
function openMessage(newMessage,newMessageFrame,newBgSize) {
  currentMessage=document.getElementById(newMessage); //sets currentMessage to correct message 
  currentMessageFrame=document.getElementById(newMessageFrame);  //setscurrent MessageFrame to the new frame
  bgSize=newBgSize;
  currentMessageFrame.classList.add('expanded');//expands the current message frame, and the message within
  console.log(newBgSize);
  currentMessage.style.backgroundPositionY=0;
  console.log(currentMessage.id);
  if (currentMessage) {
    currentMessage.addEventListener('mousedown', handleMouseDown);
}
trollian.classList.remove('expanded')
}

function closeMessage() {
  currentMessageFrame.classList.remove('expanded');
  currentMessage=null; //sets currentMessage to correct message 
  currentMessageFrame=null;  //setscurrent MessageFrame to the new frame
  bgSize=null;
  trollian.classList.add('expanded')
}
function closeApp() {
  currentApp.classList.remove('expanded');
  currentApp=null; //sets currentMessage to correct message 
  currentMessageFrame=null;  //setscurrent MessageFrame to the new frame
  bgSize=null;
}



/*
currentMessage.addEventListener('mousedown', (e) => {
    isDraggingMessage = true;
    startY = e.pageY;
    // Extract the current background position Y
    initialBackgroundPositionY = parseInt(window.getComputedStyle(currentMessage).backgroundPositionY, 10);
    maxScrollY = bgSize*-1;
    console.log("dragging Message");
    console.log(bgSize);
    if (currentMessage) {
      currentMessage.addEventListener('mousedown', handleMouseDown);
  }
});
*/

function handleMouseDown(e) {
  isDraggingMessage = true;
  startY = e.pageY;
  initialBackgroundPositionY = parseInt(window.getComputedStyle(currentMessage).backgroundPositionY, 10);
  maxScrollY = bgSize * -1;
  console.log("dragging Message");
  console.log(bgSize);
}
//below three functions allow for the scrolling of trollian
document.addEventListener('mousemove', (e) => {
    if (isDraggingMessage) {
      requestAnimationFrame(() => {
        const deltaY = e.pageY - startY;  //deltaY is mouse movement
        // Update the background position Y
        let newBackgroundPositionY = initialBackgroundPositionY + deltaY; 
        console.log("max Scroll is " + bgSize+"new backrgound position is " + newBackgroundPositionY);
        if (newBackgroundPositionY < 0) {     //if the new background position is greater than 0, set it to 0
          newBackgroundPositionY = 0;
      } else if (newBackgroundPositionY > maxScrollY) {
          newBackgroundPositionY = maxScrollY;
      }
      currentMessage.style.backgroundPositionY = `${initialBackgroundPositionY + deltaY}px`;  
    });
    }
    
});

document.addEventListener('mouseup', () => {
  if(isDraggingMessage){
    const currentBackgroundPositionY = parseInt(window.getComputedStyle(currentMessage).backgroundPositionY, 10);
  if (currentBackgroundPositionY > 0) {   //if the background is too far up, slingshot it back down
    currentMessage.style.backgroundPositionY = '0px';
} else if (currentBackgroundPositionY < maxScrollY) { //if the background is too far down, slingshot it back up
    currentMessage.style.backgroundPositionY = `${maxScrollY}px`;
}

  }
  isDraggingMessage = false;
});