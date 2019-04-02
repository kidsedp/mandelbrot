/**
 * util.js
 *
 * Utility functions for the Mandelbrot app
 */

/**
 * Finds the log base 2 of a number
 */
function log2(n) {
  return log(n) / log(2);
}

/**
 * Determines if the app is in full screen or not
 */
function isFullscreen() {
  return window.innerHeight === screen.height;
}
