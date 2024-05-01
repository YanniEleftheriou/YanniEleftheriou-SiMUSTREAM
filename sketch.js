// ===================== > CHAT ARRAY < ==============

let usernames = [
  "lunarLullaby_42:",
  "WhisperingWillow_77:",
  "nebulaNinja_123:",
  "VividVortex_99:",
  "StellarScribe_28:",
  "radiantRhythm_55:",
  "CosmicCascade_86:",
  "MysticMarauder_11:",
  "glimmeringGrove_37:",
  "ShimmeringShade_64:",
  "dreamingDove_22:",
  "TwinklingTerra_89:",
  "HarmonicHorizon_45:",
  "luminousLagoon_73:",
  "VibrantVoyager_17:",
  "sereneSapphire_57:",
  "NebulousNectar_81:",
  "DazzlingDusk_36:",
  "EnigmaticEcho_68:",
  "SilverSunrise_31:",
  "CelestialSerenity_52:",
  "MichaelMagic_123:",
  "GoldenGlimmer_95:",
  "SonicSkyline_63:",
  "PixelPioneer_10:",
  "GracefulGlow_24:",
  "DreamyDawn_47:",
  "EchoingEmbrace_84:",
  "MysticalMuse_16:",
  "EtherealEclipse_39:",
  "FantasticFusion_70:",
  "LavishLagoon_93:",
  "EternalEssence_58:",
  "DaringDreamer_76:",
  "ShiningStar_21:",
  "AuroraAdventures_44:",
  "EmilyElysium_777:",
  "RadiantRapture_888:",
  "MidnightMelody_67:",
  "SeraphicSerenade_99:",
  "LucidLabyrinth_333:",
  "TranquilTide_666:",
  "VioletVivid_444:",
  "CrimsonCrescent_555:",
  "HarmonyHeaven_222:",
  "MelodicMist_79:"
];


let chat = [
  "hey",
  "whats up",
"Saur whats goin on",
"nice",
"feels good",
"mmm",
"sup",
  "not much going on",
"hru",
"how's the day?",
"a mess",
"walking my dog",
"Just got off work and needed some laughs. Thanks for being here!",
  "Your stream is the highlight of my day!",
  "Can we take a moment to appreciate the amazing setup?",
  "Hey, just wanted to say you're doing great. Keep being awesome!",
  "Feeling cozy with a blanket and your stream. Best way to unwind!",
  "I'm loving the positive vibes in this chat!",
  "I'm convinced my cat is secretly plotting to take over the world.",
  "I accidentally put salt in my coffee instead of sugar. It's a bold flavor choice.",
  "Is it just me, or does anyone else talk to their houseplants?",
  "Today feels like a good day to conquer the world... or maybe just conquer my laundry pile.",
  "I've been binge-watching cat videos for the past hour. No regrets.",
"feelin' that vibe when the weather matches your mood, y'know?",
  "hmm, what's your go-to drink for chillin' on a rainy day?",
  "ever get that feelin' like someone's playin' music just for you, y'know?",
  "ya ever look up at the stars and feel like they're singin' a song just for you?",
  "i feel like i'm swimmin' in a sea of thoughts and the rain's just pourin' fuel on the fire 🔥",
  "who else's brain goes into overdrive when it's raining outside?",
"yever get that feelin' like the rain's tryna tell you somethin', but you just can't figure out what?",
"cute",
"omg luv",
"queennn",
"Lol",
"Laugh out loud",
"this is so bad",
"Literally can't even read",
"are you blind",
"loser",
"g3t off the internet",
"*******",
"***",
"***********",
"****ing ****",
"go to hell",
"save the tears for your pillow",
"sitting here",
"in the house",
"did you see that?",
"see what",
"OMG",
"OMG BEHIND YOU",
"DON'T YOU SEE THAT!",
];

//===================== > PROMPT ARRAY < ==============
let prompts = [
 "T-Pose!",
 "Do the disco.",
 "Make a Y!",
 "you're boring. make an A!!",
"test your balance. do a Tree pose!",
"Jump to the left",
 "Jump to the right",
 "Hands up",
  "Stand on your right",
 "Stand on your left",
  "Punch the person on your left!",
"Punch the person on your right!",
"Crouch!"
];

// ===================== > CHAT VARIABLES < ==============
let currChat = "";
let prevChat = ""; // Store previous chat message

let currPrompt = "";
let chatTimer = 0;
let userTimer = 0;
let promptTimer = 0;
let prevUser = "";
let currUser = "";
let completedPrompt = false;
let promptCompleted = false;
let likes = 0;
let views = 3; // Starting viewer count

//===================== > POSENET VARIABLES < ==============
let video;
let poseNet;
let pose;
let skeleton;

// ===================== > SOUND VARIABLES < ==============
let punch;
let woosh;
let disco;
let siren;

// ===================== > IMAGE VARIABLES < ==============
let hearts;
let r;
let g;
let b;
// ===================== > STATE < ============== 
let state ="start";
// ===================== > PRELOAD < ==============
function preload(){
disco = loadSound("looperman-l-6413071-0348447-disco-drum-loop.wav");
punch = loadSound("505417__daleonfire__punch.wav");
woosh = loadSound ("449994__djt4nn3r__whoosh_med_mid.wav");
hearts = loadImage('hearts.png');
siren = loadSound('98536__xxlegendxx__yelp3.wav');
}

// ===================== > SETUP < ==============
function setup() {
  createCanvas(640, 750);
  video = createCapture(VIDEO);
video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose',gotPoses);

}

//===================== > DETECT SKELETON FRAME < ============== 
function gotPoses(poses) {
//console.log(poses);
if (poses.length > 0) {
pose = poses[0].pose;
  skeleton = poses[0].skeleton;
}
}

// ===================== > LOAD MODEL < ============== 
function modelLoaded(){
console.log('poseNet ready');
}

//===================== > DISPLAY COUNTERS < ============== 
function displayCounters() {
  fill(255);
textFont('Arial')
  textStyle(BOLD)
  textAlign(CENTER);
  
}

// ===================== > DRAW < ============== 
function draw() {

// ===================== > DRAW SKELETON < ============== 
  
if (state == 'start') {
startScreen()
} else if (state == "live") {
liveStream();
}
}

// ===================== > CHAT / USER FUNCTION < ============== 
function chooseChat() {
  currChat = random(chat);
}
function chooseUser() {
currUser = random(usernames)
}

// Randomly choose a prompt from the prompts array
function choosePrompt() {
  currPrompt = random(prompts);
  completedPrompt = false;
}


// ===================== > DETECT PROMPT FUNCTION < ============== 
function promptDetect() {


  if (!promptCompleted) {
    
  if (currPrompt === "T-Pose!" && pose){
  if (pose.rightWrist.x < 216 && pose.rightWrist.y < 300 && pose.leftWrist.x > 432 && pose.leftWrist.y < 300)  {
    print('T POSE!');
    views+=1;
likes-=2;
    promptCompleted = true;
   }
 }
  
   if (currPrompt === "test your balance. do a Tree pose!" && pose) {
    if (pose.rightWrist.x < 432 && pose.rightWrist.x > 216 && pose.leftWrist.x < 432 && pose.leftWrist.x > 216 && pose.rightKnee.y < 400)  {
      print('Nice balace!');
     views+=1;
promptCompleted = true;
    }
  }
   if (currPrompt === "Make a Y!" && pose) {
    if (pose.rightWrist.x < 216 && pose.rightWrist.y < 200 && pose.leftWrist.x > 600 && pose.leftWrist.y < 200)  {
      print('Y is for Yanni!');
     views+=2;
likes+=2;
promptCompleted = true;

    }
  }

 if (currPrompt === "you're boring. make an A!!" && pose){
  if (pose.rightWrist.x < 500 && pose.rightWrist.x > 240 && pose.leftWrist.x < 500 && pose.leftWrist.x > 240 && pose.rightElbow.y < 400 && pose.leftElbow.y < 400) {
     print('F**king A!');
    views+=1;
likes+=2;
promptCompleted = true;
    }
}
    
if (currPrompt === "Stand on your left" && pose && pose.nose) {
    if (pose.nose.x > 500) {
      print('STOOD ON YOUR LEFT');
      // Increment likes or perform other actions here
    likes+=2;
      views+=1;
      promptCompleted = true;
    }
  }
  if (currPrompt === "Stand on your right" && pose && pose.nose) {
    if (pose.nose.x < 200) {
      print('STOOD ON YOUR RIGHT');
    likes+=3;
      views-=2;
      promptCompleted = true;
    }
  }
  if (currPrompt === "Jump to the left" && pose && pose.nose) {
    if (pose.nose.x > 500) {
      print('JUMPED TO THE LEFT');
    likes+=2;
      views+=3;
      promptCompleted = true;
    }
  }
 if (currPrompt === "Jump to the right" && pose && pose.nose) {
    if (pose.nose.x < 250) {
      print('JUMPED TO THE RIGHT');
    likes-=2;
      views+=6;
promptCompleted = true;
    }
  }
if (currPrompt === "Punch the person on your left!" && pose && pose.rightWrist.x) {
    if (pose.rightWrist.x > 500) {
punch.playMode('untilDone')
punch.play();
      print('Nice punch!');
    likes+=5;
views+=3;
      promptCompleted = true;
    }
  }
  if (currPrompt === "Punch the person on your right!" && pose) {
    if (pose.leftWrist.x < 200) {

      punch.playMode('untilDone')
punch.play();
      
      print('Nice left hook!');
    likes-=3;
      views+=6;
      promptCompleted = true;
    }
  }


if (currPrompt === "Crouch!" && pose) {
    if (pose.nose.y > 500) {
woosh.playMode('untilDone')
woosh.play();
      print('Duck duck duck!');
    likes+=6;
views-=3;
promptCompleted = true;
    }
  }
  if (currPrompt === "Hands up" && pose) {
    if (pose.rightWrist.y < 200 && pose.leftWrist.y < 200) {
siren.playMode('untilDone')
siren.play();
      print('Party!');
    likes +=8;
promptCompleted = true;

    }
  }
  if (currPrompt === "Do the disco." && pose) {
    if (pose.rightWrist.x < 250 && pose.rightWrist.y < 200) {
      print('Disco!');
disco.playMode('untilDone');
disco.play();
    likes+=4;
views-=11;
      promptCompleted = true;
    }
}
  }
}

// ===================== > START SCREEN < ============== 
function startScreen() {
background(0,0,0)


fill(255)
textAlign(CENTER)
  textSize(50)
textStyle(BOLD)
text ('SiMU STREAM', width/2, 300)
textSize(30); 
text('Start Your Stream', width/2,500)

if (mouseIsPressed){
  
state = "live";
}
}

function liveStream(){
 background (200)
  
  
//MIRROR WEBCAM
    translate(video.width, 0);
    scale(-1, 1);
    image(video, 0, 0,640,480);
  
if (pose){
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
//ellipse(x,y,16,16);
}
    
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
    //  strokeWeight(2)
     // stroke(255)
      //line(a.position.x, a.position.y, b.position.x, b.position.y)
}
  }

  
translate(video.width, 0);
 scale(-1, 1);
  
  // Check if it's time to change the chat
  if (millis() >= chatTimer) {
    prevChat = currChat; // Store the current chat as previous chat
    chooseChat();
    chatTimer = millis() + 3000; // Set timer for next chat change (3 seconds)
  }

if (millis() >= userTimer) {
    prevUser = currUser; // Store the current chat as previous chat
    chooseUser();
    userTimer = millis() + 3000; // Set timer for next chat change (3 seconds)
}
  
  //CHAT BOX
  fill(30,60)
   rect(10,490,620,250)
  
  //LIKE BOX
  fill(30,60)
   rect(580,400,50,70)
  
 //DISPLAY LIKE HEART
  image(hearts,585,395,40,55)
  
  
//VIEWER BOX
  fill(30,60)
   rect(580,35,50,70)

  //DISPLAY VIEWS AND LIKES
fill(255,255,255,200)
  text(views, 605, 95);
  ellipse(605,60,30)
  
//viewer count
fill(2)
  ellipse(605,60,20)
  fill(0,200,255)
  ellipse(605,60,10)
fill(255,255,255,200)
  
//like count
textAlign(CENTER)
  text(likes, 595, 450, 20);
  
  // DISPLAY PREVIOUS CHAT
  fill(255);
  textAlign(LEFT);
  textStyle(NORMAL)
  textSize(15);
  text(prevChat, 100, 530,620);
  text(currChat, 100, 700,620);
textStyle(BOLD)
fill(0)
  text(prevUser,20,525)
text(currUser, 20,695)
  // Check if it's time to change the prompt
  if (millis() >= promptTimer) {
    completedPrompt = true; // Automatically complete prompt
    choosePrompt(); // Generate new prompt
    promptTimer = millis() + 5000; // Set timer for next prompt change 
    promptCompleted = false;
  }
  
  // Display current prompt
  if (!completedPrompt) {
textStyle(BOLD);
  fill(255)
    text(currPrompt, 100, 620);
  }
  noStroke();
fill(255,0,0,200)
ellipse(20,20,20)
promptDetect();
// DISPLAY COUNTERS CALLED
  displayCounters(); 
  let button = createButton('X');
  button.position(595, 10);
button.mousePressed(noLoop);

}

