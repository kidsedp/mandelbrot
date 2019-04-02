/**
 * mandelbrot.js
 *
 * Defines the Mandelbrot class, which stores information about a region of the
 * Mandelbrot set and renders it to the screen.
 */

class Mandelbrot {

  /**
   * Initializes a Mandelbrot object
   *
   * @param xCenter  The x coordinate of the center of the image
   * @param yCenter  The y coordinate of the center of the image
   * @param range    The distance from the center to the top of the screen
   * @param bailout  How many iterations of the Mandelbrot function to perform
   *                 before deciding that a number is in the Mandelbrot set
   */
  constructor(xCenter, yCenter, range, bailout) {
    this.center = new Complex(xCenter, yCenter);
    this.range = new Complex(range * width / height, range);
    this.y = 0;
    this.bailout = bailout;
  }

  /**
   * Draws the next line of the current set on the screen
   *
   * @return  true if there are more lines to be drawn, and false otherwise
   */
  drawNextLine() {
    if (this.y >= height) {
      return false;
    }

    // Find the imaginary part of c. Since we're doing all the values in a row
    // at a time, they will all have the same imaginary component.
    let i = map(this.y, 0, height, this.center.i + this.range.i, this.center.i - this.range.i);

    for (let x = 0; x < width; x++) {
      // Find the real part of c
      let r = map(x, 0, width, this.center.r - this.range.r, this.center.r + this.range.r);
      let c = new Complex(r, i);
      // Iterate the Mandelbrot function based on c
      let escapeVal = this.findEscapeVal(c);

      stroke(escapeVal * 255 / this.bailout, 255, escapeVal < this.bailout ? 255 : 0);
      point(x, this.y);
    }

    this.y++;
    return this.y < height;
  }

  /**
   * Finds the point at which c escapes 2, up to `this.bailout` using the
   * Mandelbrot function.
   *
   * @param c  The complex number c in the Mandelbrot function
   * @return  A value corresponding to the time it takes to escape a magnitude
   *          of 2 on iteration
   */
  findEscapeVal(c) {
    let z = new Complex(0.0, 0.0);
    let m = 0;

    while (m < this.bailout && z.abs() < 2) {
      z = z.square().plus(c);
      m++;
    }

    if (m >= this.bailout) {
      return this.bailout;
    }

    return m + 1 - log(log2(z.abs()));
  }

  /**
   * Alters the parameters of the image to focus on a new center point. Zooms
   * in 10x and increases the bailout to account for the resolution loss.
   *
   * @param x  The x coordinate (in pixels) of the new center
   * @param y  The y coordinate (in pixels) of the new center
   */
  zoomInOn(x, y) {
    this.center = new Complex(
      map(x, 0, 1.0, this.center.r - this.range.r, this.center.r + this.range.r),
      map(y, 0, 1.0, this.center.i + this.range.i, this.center.i - this.range.i)
    );
    
    this.range = this.range.scale(0.1);
    this.bailout *= 2;
  }
  
  /**
   * Resets the current line being drawn at 0
   */
  reset() {
    this.y = 0;
  }
  
  /**
   * Logs to the console the parameters the image is using
   */
  dump() {
    console.table({
      'center': this.center,
      'range': this.range,
      'bailout': this.bailout
    });
  }
}
