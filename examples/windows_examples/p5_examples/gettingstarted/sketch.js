// Copyright (c) 2019 Kinectron
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
Kinectron Example
Kinect Windows camera feeds example using p5.js
=== */
//

// declare variable for kinectron
let kinectron = null;

// FILL IN YOUR kinectron server ip address here
// ip address is a string between four 
// this is a string made up from four numbers
// each number is between 0 and 255 and separated with periods
let kinectronServerIPAddress = "18.121.129.122";

// declare new HTML elements for displaying text
let textKinectronServerIP;
let textCurrentFeed;
let textFramerate;

// variable for storing current 
let currentFeed = "none";

// setup() is a p5.js function
// setup() runs once, at the beginning
function setup() {

  // create canvas 500px wide x 500px high
  createCanvas(500, 500);

  // white background
  background(255);

  // create new HTML <p> elements for displaying text
  textKinectronServerIP = createP("");
  textCurrentFeed = createP("");
  textFramerate = createP("");

  // create an instance of kinectron
  kinectron = new Kinectron(kinectronServerIPAddress);

  // Set kinect type to windows
  kinectron.setKinectType("windows");

  // Connect with application over peer
  kinectron.makeConnection();

  // define callbacks for color, depth and infrared
  kinectron.setColorCallback(drawFeed);
  kinectron.setDepthCallback(drawFeed);
  kinectron.setInfraredCallback(drawFeed);
}

// draw() is a p5.js function
// after setup() runs once, draw() runs on a loop
function draw() {

  // p5.js drawing settings
  // black fill() and stroke()
  fill(0);
  stroke(0);

  // update text with current parameters
  textKinectronServerIP.html("Kinectron Server IP address: " + kinectronServerIPAddress);
  textCurrentFeed.html("current feed: " + currentFeed);
  textFramerate.html("fps: " + frameRate().toFixed(0));
}

// keyPressed() is a p5.js function
// choose camera to start based on key pressed
function keyPressed() {
  if (keyCode === ENTER) {
    kinectron.startColor();
    currentFeed = "color";
  } else if (keyCode === UP_ARROW) {
    kinectron.startDepth();
    currentFeed = "depth";
  } else if (keyCode === DOWN_ARROW) {
    kinectron.startInfrared();
    currentFeed = "infrared";
  } else if (keyCode === RIGHT_ARROW) {
    kinectron.stopAll();
    currentFeed = "none";
  }
}

// callback function when feed sends a new frame
function drawFeed(newFrame) {
  // loadImage() is a p5.js function
  // load new frame from feed and then place it on p5.js canvas
  loadImage(newFrame.src, function(loadedFrame) {
    // white background
    background(255);
    // place the frame from kinectron at (0,0)
    image(loadedFrame, 0, 0);
  });
}
