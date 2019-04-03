/**
 * app.js
 *
 * Main entrypoint into the Mandelbrot app. Handles high level communication
 * with p5.js, as well as any DOM manipulation.
 */

// The initial x coordinate of the center of the image
const INIT_X_CENTER = 0.0;
// The initial y coordinate of the center of the image
const INIT_Y_CENTER = 0.0;
// The initial range from the center to the top of the screen
const INIT_RANGE = 1.5;
// How many iterations to run before bailing
const INIT_BAILOUT = 50;

// Key code for the space bar
const SPACE = 32;

// Will hold the data for drawing the Mandelbrot set
var image;

// Indicates whether the program should pause rendering
var paused = false;

/**
 * Called before anything else, by p5.js
 *
 * Registers an event listener to toggle the info button when the page goes
 * full screen
 */
function preload() {
  adjustInfoVisibility();
  window.addEventListener('resize', adjustInfoVisibility);
}

/**
 * Called once by p5.js; prepares the sketch prior to rendering
 */
function setup() {
  // Using P2D to hopefully engage the GPU, but this may not help since it's
  // just points that are being rendered.
  createCanvas(windowWidth, windowHeight, P2D);
  colorMode(HSB);

  image = new Mandelbrot(INIT_X_CENTER, INIT_Y_CENTER, INIT_RANGE, INIT_BAILOUT);
}

/**
 * Called once per frame by p5.js
 *
 * Draws a single line of the Mandelbrot set, so long as there are lines left
 * to draw.
 */
function draw() {
  if (!paused) {
    image.drawNextLine();
  }
}

/**
 * Event listener for click events. Causes the set to zoom in 10x on the point
 * clicked. The set will re-render using the new coordinates.
 */
function mousePressed() {
  image.zoomInOn(mouseX / float(width), mouseY / float(height));
  image.reset();
}

/**
 * Event listener for keypress events. If the key is the space bar, causes the
 * program to pause rendering.
 */
function keyPressed() {
  if (keyCode === SPACE) {
    paused = !paused;
  }
}

/**
 * Callback function to adjust the info button based on the screen height. If
 * the window is fullscreen, hides the info button.
 */
function adjustInfoVisibility() {
  let infoEl = document.getElementById('info');

  if (isFullscreen()) {
    infoEl.classList.add('hidden');
  } else {
    infoEl.classList.remove('hidden');
  }
}
