var gamestate;
var user;
var imagepaths = ["media/images/athlete/vest.png", "media/images/flags/gb.png", "media/images/flags/usa.png", "media/images/flags/china.png", "media/images/flags/france.png", "media/images/athlete/faces/happy.png", "media/images/athlete/faces/sad.png", "media/images/athlete/faces/straight.png", "media/images/icons/100m.png","media/images/others/trophycabinet.png","media/images/others/trophy.png"];
var images = [];
var navbar;
var soundpaths = ["media/sounds/menumusic.mp3"];
var sounds = [];
var gifpaths = ['media/animatedimages/olympicrings.gif', 'media/animatedimages/sprintstick.gif']
var gifs = [];
var sliders = []; // slider[0] = background volume, slider[1] = ingame sfx volume
var audience;

function setup() {
  createCanvas(displayWidth, displayHeight);
  gamestate = loadScreen;
  user = new athlete();
  sounds[0].loop();

  for (var i = 0; i < 2; i++) {
    sliders[i] = createSlider(0, 100, 75)
  }


}

function preload() {
  for (var i = 0; i < imagepaths.length; i++) {
    images[i] = loadImage(imagepaths[i]);
  }
  console.log('Images Loaded')

  for (var i = 0; i < soundpaths.length; i++) {
    sounds[i] = loadSound(soundpaths[i]);
  }
  console.log('Sounds Loaded')

  for (var i = 0; i < gifpaths.length; i++) {
    gifs[i] = loadGif(gifpaths[i]);
  }
  console.log('Gifs Loaded')
}

function draw() {
  gamestate();
 
}

function loadScreen() {
  refresh();

  textSize(64);
  textAlign(CENTER);
  textFont("Comic Sans MS");
  text("Welcome to the Stick Olympics Minigame!!!", width / 2, height * .1);


  image(gifs[0], width / 2, height * .8);

  textSize(48);
  text("Pick an Option Below!!!", width / 2, height * .2);

  var editathletebutton = new button(width * .8, height * .9, "Edit your Athlete", editAthleteScreen, 'medium', 'navigate');
  editathletebutton.createButton();
  user.stand();
  var optionsbutton = new button(width * .2, height * .9, "Options", optionScreen, 'medium', 'navigate');
  optionsbutton.createButton();
  var beginbutton = new button(width / 2, height / 2, "Begin", eventsScreen, 'large', 'navigate');
  beginbutton.createButton();
  
   user.trophies.drawcabinet();
}

function eventsScreen() {
  refresh();

  //Navbar
  navbar = new Navbar(loadScreen);
  navbar.createnavbar();

  //Title
  textSize(64);
  textAlign(CENTER);
  textFont("Comic Sans MS");
  text("Choose an Event", width / 2, height * .1);

  //Individual Events
  textSize(35);
  textAlign(LEFT);
  text("Individual events:", width * .05, height * .2);
  textSize(25);
  noFill();
  stroke(0);
  rectMode(CORNERS);
  rect(width * .05, height * .25, width * .5, height * .75, 25)
  var sport = [new icon(width * .1, height * .35, images[8], '100m Sprint', sprintsetup, 'medium', 'sport'), new icon(width * .1, height * .35 + (110), images[8], '100m Swim', null, 'medium', 'sport')]
  sport.forEach(function(self) {
    self.createIcon()
  });

}

function optionScreen() {
  refresh();

  //Navbar
  navbar = new Navbar(loadScreen);
  navbar.createnavbar();

  //SOUND OPTIONS
  textSize(35);
  textAlign(CENTER);
  text("Sound Options:", width / 2, height * .2);
  textAlign(LEFT);
  textSize(25);
  //BACKGROUND MUSIC VOLUME
  text("Background Music:", width * .2, height * .25);
  sliders[0].position(width * .65, height * .25 - 15);
  sliders[0].show();
  sounds[0].setVolume(sliders[0].value() / 100);
  //INGAME SFX VOLUME
  text("In Game SFX:", width * .2, height * .3);
  sliders[1].position(width * .65, height * .3 - 15);
  sliders[1].show();

  //My Athlete Options
  textSize(35);
  textAlign(CENTER);
  text("My Athlete Options:", width / 2, height * .4);
  textAlign(LEFT);
  textSize(25);
  //Reset My Athlete Data
  text("Reset my Athlete data:", width * .2, height * .45);
  var reset = new button(width * .7, height * .45, "Reset", null, 'medium', 'resetuserdata');
  reset.createButton();
}

var raceprogress = 0;
var leftcontrol = true;
var rightcontrol = false;
var userspeedvar = 0;
var userposition = 500;
var competitors = []
var automove = 0;
var difficulty = 4;
var gamestart = 0;
function sprintsetup(){  
  refresh();
  audience = new crowd(width*.1,height*.2,width*5.8,height*.1);
  audience.create();
  gamestate = sprint;
  userspeedvar = 0;
  automove = 0;
  leftcontrol = true;
  rightcontrol = false;
  raceprogress = 0;
  gamestart = 0;
  for (var i=0; i<3; i++){
    competitors[i]= new athlete();
  }
  
  gamestate = sprint;
  
}

function sprint() {
  if(gamestart == 0){
    background(0,255,0);
    text("Press any Key to begin",width*.5,height/2);
    text("Press 'A' and 'D' on your keyboard to run", width*.5,height*.7);
    
    if(keyIsPressed){gamestart=1}
    
  }
  if (gamestart == 1){
  //racetrack
  rectMode(CORNER);
  stroke(255, 255, 255);
  fill(20, 200, 20);
  rect(0, 0, width, height * .4);
  rect(0, height * .8, width, height * .2);
  fill(200, 20, 20);
  rect(0, height * .4, width, height * .4);
  line(0, height * .5, width, height * .5);
  line(0, height * .6, width, height * .6);
  line(0, height * .7, width, height * .7);

  //Movement effect
  textSize(100);
  fill(255);
  text("1",width*.2 - raceprogress,height*.48)
  text("2",width*.15 - raceprogress,height*.58)
  text("3",width*.1 - raceprogress,height*.68)
  text("4",width*.05 - raceprogress,height*.78)
  line((width * .1) - raceprogress, height * .8, (width * .3) - raceprogress, height * .4);
  line((width * .6) - raceprogress, height * .8, (width * .8) - raceprogress, height * .4);
  line((width * 1.1) - raceprogress, height * .8, (width * 1.3) - raceprogress, height * .4);
  line((width * 1.6) - raceprogress, height * .8, (width * 1.8) - raceprogress, height * .4);
  line((width * 2.1) - raceprogress, height * .8, (width * 2.3) - raceprogress, height * .4);
  line((width * 2.6) - raceprogress, height * .8, (width * 2.8) - raceprogress, height * .4);
  line((width * 3.1) - raceprogress, height * .8, (width * 3.3) - raceprogress, height * .4);
  line((width * 3.6) - raceprogress, height * .8, (width * 3.8) - raceprogress, height * .4);
  line((width * 4.1) - raceprogress, height * .8, (width * 4.3) - raceprogress, height * .4);
  line((width * 4.6) - raceprogress, height * .8, (width * 4.8) - raceprogress, height * .4);
  line((width * 5.1) - raceprogress, height * .8, (width * 5.3) - raceprogress, height * .4);
  line((width * 5.6) - raceprogress, height * .8, (width * 5.8) - raceprogress, height * .4);
    text("E",width*5.8 - raceprogress,height*.48)
  text("N",width*5.8 - raceprogress,height*.58)
  text("D",width*5.8 - raceprogress,height*.68)
  text("!!!",width*5.8 - raceprogress,height*.78)
  noFill();
  
  
  // Audience
    audience.show(raceprogress);
 
 
  //natural slowdown effect
   if (userspeedvar > 0) {
    userspeedvar = (userspeedvar - (userspeedvar * 0.01))
  };
  if (userspeedvar < 0) {
    userspeedvar = 0;
  }

  //User runner
  user.run(userposition,height*.45,10,floor(raceprogress/5))
  console.log(raceprogress);
  if (raceprogress >= width*5.5){gamestart = 2;}
  
  
  //CPU runners
  competitors[0].run((userposition + 100 +automove + automove*(3)-raceprogress),height*.35,10,floor(automove*(.8)/10))
  competitors[1].run((userposition - 100 +automove + automove*(2)-raceprogress),height*.55,10,floor(automove*(.7)/10))
  competitors[2].run((userposition - 200 +automove + automove*(3)-raceprogress),height*.65,10,floor(automove*(.7)/10))
  automove+=difficulty;
  
  if (((userposition + 100 +automove + automove*(3)-raceprogress))>=14500){gamestart = 3}
  //'a' & 'd' control movement  
  if (keyIsPressed) {
    if (key === "a") {
      if (rightcontrol == false && leftcontrol == true) {
        leftcontrol = false;
        console.log(leftcontrol);
        rightcontrol = true;
        userspeedvar = userspeedvar + 1;
      }
    }
    if (key === "d") {
      if (leftcontrol == false && rightcontrol == true) {
        rightcontrol = false;
        leftcontrol = true;
        userspeedvar = userspeedvar + 1;
      }
    }
  }

  raceprogress = raceprogress + userspeedvar;
}
  if(gamestart == 2){
    background(0,255,0);
    text("You Won",width*.5,height/2);
    text("Press any key to restart", width*.5,height*.7);
    if(keyIsPressed){gamestart=0}
    
  }
  if(gamestart == 3){
    background(0,255,0);
    text("You lost",width*.5,height/2);
    text("Press any key to restart", width*.5,height*.7);
    if(keyIsPressed){gamestart=0}
    
  }
  Navbar
  navbar = new Navbar(eventsScreen);
  navbar.createnavbar();
}

function editAthleteScreen() {
  refresh();


  navbar = new Navbar(loadScreen);
  navbar.createnavbar();

  fill(0);
  textSize(64);
  textAlign(CENTER);
  textFont("Comic Sans MS");
  text("Edit Your Athlete", width / 2, height * .1);
  user.stand();

  textAlign(LEFT);
  //Skin Colour Option
  textSize(40);
  text("Skin Colour:", width * .05, height * .3);
  stroke(0);
  strokeWeight(1);
  noFill();
  rectMode(CORNER)
  rect(width * .1, height * .3 + 10, 310, 70)
  var colourpallete = [new colourbox(0, "peru"), new colourbox(1, "pink"), new colourbox(2, "blancedalmond"), new colourbox(3, "yellow"), new colourbox(4, "black")];
  noStroke();

  //Gender option
  textSize(40);
  text("Gender:", width * .05, height * .5);
  var male = new button(width * .1, height * .56, "Male", 'male', 'medium', 'genderset');
  male.createButton();
  var female = new button(width * .2, height * .56, "Female", 'female', 'medium', 'genderset');
  female.createButton();

  //Nationality Option
  textSize(40);
  text("Nationality:", width * .05, height * .7);
  var nationalities = [new icon(width * .1, height * .8, images[1], "British", 'Britain', 'medium', 'nationalset'), new icon(width * .2, height * .8, images[2], 'USA', "USA", 'medium', 'nationalset'), new icon(width * .3, height * .8, images[3], 'China', "China", 'medium', 'nationalset'), new icon(width * .4, height * .8, images[4], 'France', "France", 'medium', 'nationalset')]
  nationalities.forEach(function(self) {
    self.createIcon()
  });

  function colourbox(n, a) {
    this.n = n;
    this.a = a;
    fill(a);
    rectMode(CORNER);
    rect(width * .1 + (10 + this.n * (60)), height * .3 + 15, 50, 50);

    this.checkclick = function() {
      if (hover(width * .1 + (10 + this.n * (60)), height * .3 + 15, width * .1 + (10 + this.n * (60)) + 50, height * .3 + 65)) {
        user.colour = a;
      }
    }

  }

  if (mouseIsPressed) {
    //Colourpicker
    colourpallete.forEach(function(self) {
      self.checkclick()
    });
  }
}

function athlete() {
  this.name = "yourname";
  this.gender = "male";
  this.colour = "Peru";
  this.flag = images[1];
  this.face = images[7];
  this.number = "01";
  this.centrepointx = width * .8;
  this.centrepointy = height / 2;
  this.trophies = new achievements();


  this.stand = function() {
    fill(this.colour);
    stroke(this.colour);
    ellipseMode(CENTER);
    ellipse(this.centrepointx + 15, this.centrepointy - 150, 90, 90);
    imageMode(CENTER);
    image(this.face, this.centrepointx + 15, this.centrepointy - 150, 100, 100);
    strokeWeight(25);
    line(this.centrepointx + 15, this.centrepointy - 100, this.centrepointx, this.centrepointy + 100);
    line(this.centrepointx, this.centrepointy + 100, this.centrepointx + 10, this.centrepointy + 175);
    line(this.centrepointx + 10, this.centrepointy + 175, this.centrepointx + 15, this.centrepointy + 250);
    line(this.centrepointx, this.centrepointy + 100, this.centrepointx - 15, this.centrepointy + 175);
    line(this.centrepointx - 15, this.centrepointy + 175, this.centrepointx - 25, this.centrepointy + 250);
    line(this.centrepointx + 15, this.centrepointy - 100, this.centrepointx - 75, this.centrepointy);

    line(this.centrepointx + 15, this.centrepointy - 100, this.centrepointx + 100, this.centrepointy + 10);
    imageMode(CENTER);
    images[0].resize(150, 200)
    image(images[0], this.centrepointx + 18, this.centrepointy + 5);
    image(this.flag, this.centrepointx + 10, this.centrepointy + 10, 50, 50);

    noStroke();
    fill(0);

  };
  
  this.run = function(posx,posy,sf,frame){
    
  fill(this.colour);
  stroke(this.colour);
  strokeWeight(sf);
    
  if ((frame%5)==1){ ellipse(posx,posy,5*sf,5*sf); //head
  line(posx,posy,posx-(1*sf),posy+(10*sf)) //body
  line(posx-(2*sf),posy+(4*sf),posx+(-1*sf),posy+(5*sf)) //elbow left
  line(posx+(-1*sf),posy+(5*sf),posx+(1*sf),posy+(6*sf)) //elbow right
  line(posx+(1*sf),posy+(6*sf),posx+(3*sf),posy+(4*sf)) //hand right
  line(posx-(2*sf),posy+(4*sf),posx-(3*sf),posy+(6*sf)) //hand left
  line(posx-(1*sf),posy+(10*sf),posx-(3*sf),posy+(12*sf)) //knee left
  line(posx-(3*sf),posy+(12*sf),posx-(5*sf),posy+(11*sf)) //foot left
  line(posx-(1*sf),posy+(10*sf),posx+(1*sf),posy+(9*sf)) //knee right
  line(posx+(1*sf),posy+(9*sf),posx+(2*sf),posy+(12*sf)) //foot right}
  }
  if (frame%5==2){
    ellipse(posx,posy,5*sf,5*sf); //head
  line(posx,posy,posx-(1*sf),posy+(10*sf)) //body
  line(posx-(3*sf),posy+(6*sf),posx+(-1*sf),posy+(5*sf)) //elbow left
  line(posx+(-1*sf),posy+(5*sf),posx+(0*sf),posy+(7*sf)) //elbow right
  line(posx+(0*sf),posy+(7*sf),posx+(2*sf),posy+(7*sf)) //handright
  line(posx-(2*sf),posy+(8*sf),posx-(3*sf),posy+(6*sf))//handleft
  line(posx-(1*sf),posy+(10*sf),posx-(2*sf),posy+(12*sf)) //knee left
  line(posx-(2*sf),posy+(12*sf),posx-(3*sf),posy+(12*sf)) //foot left
  line(posx-(1*sf),posy+(10*sf),posx+(0*sf),posy+(10*sf)) //knee right
  line(posx+(0*sf),posy+(10*sf),posx+(-1*sf),posy+(15*sf)) // foot right
  }
  if (frame%5==3){
        ellipse(posx,posy,5*sf,5*sf); //head
  line(posx,posy,posx-(1*sf),posy+(10*sf)) //body
  line(posx-(2*sf),posy+(7*sf),posx+(-1*sf),posy+(5*sf)) //elbow left
  line(posx+(-1*sf),posy+(5*sf),posx+(-1.5*sf),posy+(7*sf)) //elbow right
  line(posx+(-1.5*sf),posy+(7*sf),posx+(1*sf),posy+(8*sf)) //handright
  line(posx-(2*sf),posy+(7*sf),posx-(2.25*sf),posy+(8*sf))//handleft
  line(posx-(1*sf),posy+(10*sf),posx-(1*sf),posy+(13*sf)) //knee left
  line(posx-(1*sf),posy+(13*sf),posx-(2*sf),posy+(14*sf)) //foot left
  line(posx-(1*sf),posy+(10*sf),posx+(1*sf),posy+(11*sf)) //knee right
  line(posx+(1*sf),posy+(11*sf),posx+(-2*sf),posy+(13*sf)) // foot right
  }
  if (frame%5==4){
     ellipse(posx,posy,5*sf,5*sf); //head
  line(posx,posy,posx-(1*sf),posy+(10*sf)) //body
  line(posx-(1*sf),posy+(7*sf),posx+(-1*sf),posy+(5*sf)) //elbow left
  line(posx+(-1*sf),posy+(5*sf),posx+(0*sf),posy+(7*sf)) //elbow right
  line(posx+(0*sf),posy+(7*sf),posx+(1*sf),posy+(8*sf)) //handright
  line(posx-(1*sf),posy+(7*sf),posx-(-2*sf),posy+(7*sf))//handleft
  line(posx-(1*sf),posy+(10*sf),posx-(2*sf),posy+(13*sf)) //knee left
  line(posx-(2*sf),posy+(13*sf),posx-(4*sf),posy+(14.5*sf)) //foot left
  line(posx-(1*sf),posy+(10*sf),posx+(1*sf),posy+(12*sf)) //knee right
  line(posx+(1*sf),posy+(12*sf),posx+(0.5*sf),posy+(15*sf)) // foot right
  }
  if (frame%5==0){
      ellipse(posx,posy,5*sf,5*sf); //head
  line(posx,posy,posx-(1*sf),posy+(10*sf)) //body
  line(posx-(2*sf),posy+(5*sf),posx+(-1*sf),posy+(5*sf)) //elbow left
  line(posx+(-1*sf),posy+(5*sf),posx+(1*sf),posy+(6*sf)) //elbow right
  line(posx+(1*sf),posy+(6*sf),posx+(2*sf),posy+(5*sf)) //hand right
  line(posx-(2*sf),posy+(5*sf),posx-(2*sf),posy+(7*sf)) //hand left
  line(posx-(1*sf),posy+(10*sf),posx-(2.5*sf),posy+(13*sf)) //knee left
  line(posx-(2.5*sf),posy+(13*sf),posx-(5*sf),posy+(13*sf)) //foot left
  line(posx-(1*sf),posy+(10*sf),posx+(2*sf),posy+(12*sf)) //knee right
  line(posx+(2*sf),posy+(12*sf),posx+(3*sf),posy+(15*sf)) // foot right
  }
    
    
  }

  this.genderset = function(a) {
    if (a == 'male') {
      this.gender = a;
      console.log('male set')
    }
    if (a == 'female') {
      this.gender = a;
      console.log('female set')
    }
  }

  this.nationalset = function(a) {
    if (a == 'Britain') {
      this.flag = images[1];
      console.log('British set')
    }
    if (a == 'USA') {
      this.flag = images[2];
      console.log('USA set')
    }
    if (a == 'China') {
      this.flag = images[3];
      console.log('China set')
    }
    if (a == 'France') {
      this.flag = images[4];
      console.log('France set')
    }
  }

}

function achievements() {
  this.cabinet = [[],[],[],[]];
  
  this.drawcabinet = function() {
    imageMode(CENTER);
    image(images[9],width*.25,height*.5);
    for(var i=0; i<=this.cabinet.length; i++){
      for(var j=0: j<this.cabinet[i].length;i++){
        if(this.cabinet[i][j] = null){ return null; }
        else (image)
      }
    }
  }
  this.addtrophy = function(event){
    
    this.cabinet.push();
    
  }
  
}

function crowd(a,b,c,d){
  this.xpos = a;
  this.ypos = b;
  this.xsize = c;
  this.ysize = d;
  this.container = [];
  
  
  this.create = function (){
    for(var i = 0; i<(this.xsize/50);i++){
      this.container[i] = [];
      for(var j = 0; j<(this.ysize/50); j++){
        this.container[i][j] = new face(this.xpos + (i*50),this.ypos + (j*50));
      }
    }
  }
      
  this.show = function(a){
    rectMode(CORNER)
    rect(this.xpos-30-a,this.ypos-30,this.xsize+10,this.ysize+50,20)
    for(var i = 0; i<(this.xsize/50);i++){
      for(var j = 0; j<(this.ysize/50); j++){
     this.container[i][j].show(a);
     this.container[i][j].wobble();
        }}
  }
  
  }

function face(a,b){
  this.posx = a;
  this.posy = b;
  this.rcolor = random(100,255);
  this.gcolor = random(100,255);
  this.bcolor = random(100,255);
  
  this.show = function(a){
  fill(this.rcolor,this.gcolor,this.bcolor);
   rectMode(CENTER);
  rect(this.posx-a,this.posy+37,50,50,20);
  rectMode(CORNER);
  ellipse(this.posx-a,this.posy,50,50);
  imageMode(CENTER);
  image(images[5],this.posx-a,this.posy,50,50);
 
  
  }
  
  this.wobble = function(){
    this.posx= a + random(-1,1);
    this.poxy= b + random(-1,1);
  }
}

function Navbar(backTarget) {
  this.backbutton = new button(width * .05, height * .07, "Back", backTarget, 'medium', 'navigate');
  this.menubutton = new button(width * .15, height * .07, "Main Menu", loadScreen, 'medium', 'navigate');
  this.myathletebutton = new button(width * .9, height * .07, "MyAthlete", editAthleteScreen, 'medium', 'navigate');
  stroke(0);
  strokeWeight(2);
  line(0, height * .11, width, height * .11);
  noStroke();
  this.createnavbar = function() {
    this.backbutton.createButton();
    this.menubutton.createButton();
    this.myathletebutton.createButton();
  }
}

function button(xCenter, yCenter, label, target, size, type) {
  this.posx = xCenter;
  this.posy = yCenter;
  this.label = label;
  this.target = target;
  this.size = size;
  this.type = type;

  this.createButton = function() {
    rectMode(CENTER);
    textAlign(CENTER);
    noFill();
    strokeWeight(2);
    stroke(0);
    if (this.size == 'medium') {
      textSize(32);
      if (hover(this.posx - (this.label.length * 10), this.posy - 38, this.posx + (this.label.length * 10), this.posy + 18)) {
        fill(255);
        this.onclick(this.type);
      }
      rect(this.posx, this.posy - 10, this.label.length * 20, 55, 20);

    } else if (this.size == 'large') {
      textSize(64);
      if (hover(this.posx - (this.label.length * 18), this.posy - 60, this.posx + (this.label.length * 18), this.posy + 20)) {
        fill(255)
        this.onclick(this.type);
      }
      rect(this.posx, this.posy - 20, this.label.length * 35, 80, 20);
    } else if (this.size == 'small') {
      textSize(16);
      if (hover(this.posx - (this.label.length * 5), this.posy - 18, this.posx + (this.label.length * 5), this.posy + 8)) {
        fill(255)
        this.onclick(this.type);
      }
      rect(this.posx, this.posy - 5, this.label.length * 10, 25, 20);
    } else {
      textSize(32);
      rect(this.posx, this.posy - 10, this.label.length * 20, 55, 20);
      this.onclick(this.type);
    }
    noStroke(0);
    fill(0);
    text(this.label, this.posx, this.posy);
    textAlign(LEFT);
  }
  this.onclick = function(a) {
    if (mouseIsPressed) {
      if (a == 'navigate') {
        this.clicknav();
      } else if (a == 'genderset') {
        user.genderset(this.target);
      } else if (a == 'resetuserdata') {
        var check = confirm("Resetting my Athlete data will erase all achievements and personalisation. Do you still want to continue?");
        if (check == true) {
          user = new athlete();
        } else {
          mouseIsPressed = false;
        };
      }
    }
  }
  this.clicknav = function() {;
    gamestate = this.target;
  }
}

function icon(xCenter, yCenter, pic, label, target, size, type) {
  this.posx = xCenter;
  this.posy = yCenter;
  this.picture = pic;
  this.label = label;
  this.target = target;
  this.size = size;
  this.type = type;

  this.createIcon = function() {
    rectMode(CENTER);
    textAlign(CENTER);
    noFill();
    strokeWeight(2);
    stroke(0);
    textSize(16);
    if (this.size == 'medium') {
      if (hover(this.posx - 38, this.posy - 38, this.posx + 38, this.posy + 38)) {
        stroke(255);
        this.onclick(this.type);
      }
      rect(this.posx, this.posy, 76, 76);
      image(this.picture, this.posx, this.posy, 75, 75);
      text(label, this.posx, this.posy + 60);

    } else if (this.size == 'large') {
      if (hover(this.posx - 50, this.posy - 50, this.posx + 50, this.posy + 50)) {
        stroke(255);
        this.onclick(this.type);
      }
      rect(this.posx, this.posy, 101, 101);
      image(this.picture, this.posx, this.posy, 100, 100);
      text(label, this.posx, this.posy + 60);
    } else if (this.size == 'small') {
      if (hover(this.posx - (this.label.length * 5), this.posy - 18, this.posx + (this.label.length * 5), this.posy + 8)) {
        stroke(255);
        this.onclick(this.type);
      }
      rect(this.posx, this.posy - 5, this.label.length * 10, 25, 20);
      text(label, this.posx, this.posy + 60);
    } else {

      rect(this.posx, this.posy - 10, this.label.length * 20, 55, 20);
      this.onclick(this.type);
      text(label, this.posx, this.posy + 60);
    }


    noStroke(0);
    fill(0);
    console.log('achieved');


  }
  this.onclick = function(a) {
    if (mouseIsPressed) {
      if (a == 'sport') {
        gamestate = this.target;
      } else if (a == 'nationalset') {
        user.nationalset(this.target);

        console.log('reset')
      }
    }
  }
}

function hover(leftLimit, upperLimit, rightLimit, bottomLimit) {if (mouseX >= leftLimit && mouseX <= rightLimit && mouseY >= upperLimit && mouseY <= bottomLimit) {
    return true;
  } else return false;}

function refresh() {
  sliders[0].hide();
  sliders[1].hide();
  background(0, 255, 0);
  console.log('refresh');
}