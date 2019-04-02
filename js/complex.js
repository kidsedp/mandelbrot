/**
 * complex.js
 *
 * Defines a basic complex number.
 */

/**
 * Basic representation of a complex number. Has a real value `r` and an
 * imaginary value `i`. Can handle addition, scaling, squaring, and
 * absolute value operations.
 */
class Complex {

  /**
   * Initializes the complex number
   *
   * @param r  The real part of the number
   * @param i  The complex part of the number
   */
  constructor(r, i) {
    this.r = r;
    this.i = i;
  }

  /**
   * Performs addition between this and another complex number
   *
   * @param other  The number to add
   * @return  A new complex number that is the result of this number plus
   *          `other`
   */
  plus(other) {
    return new Complex(this.r + other.r, this.i + other.i);
  }

  /**
   * Squares this number
   *
   * @return  A new complex number that is the result of this number squared
   */
  square() {
    let r = sq(this.r) - sq(this.i);
    let i = 2 * this.r * this.i;
    return new Complex(r, i);
  }
  
  /**
   * Scales this number by a real number
   *
   * @param n  The number to scale by
   * @return  A new complex number that is the result of this number scaled by
   *         `n`
   */
  scale(n) {
    return new Complex(this.r * n, this.i * n);
  }

  /**
   * @return  the absolute value of this number
   */
  abs() {
    return sqrt(sq(this.r) + sq(this.i));
  }
}
