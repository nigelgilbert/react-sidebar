"use strict";

const TWEEN = require("tween.js");

// Used to cleanup the browser's AnimationFrame after our 
// animation completes.
let previousCompletionHandler = null;
let isAnimating = false;

// Wrapper Service for the Tween.js lib that handles AnimationFrame
// setup and cleanup.  Also allows multiple animations to use the
// same AnimationFrame.
export default function tweener(initial, target, duration) {

  // Cancel the previous cleanup because we're gonna 
  // animate for longer.
  if (previousCompletionHandler !== null) {
    clearTimeout(previousCompletionHandler);
  }

  const toggleOff = () => {
    isAnimating = false;
    previousCompletionHandler = null;
  };

  // Timeout to turn the animation frame off.
  // keep a reference so that next time it's called we can cancel
  // it and continue tweening.
  previousCompletionHandler = setTimeout(toggleOff, duration + 25);

  // Begin the recursive tween loop.
  isAnimating = true;
  requestAnimationFrame(updateTween);
  return new TWEEN.Tween(initial).to(target, duration);
}

// Calls itself (thereby updating the tween) until the animation
// is complete.
function updateTween(time) {
  if (isAnimating) {
    requestAnimationFrame(updateTween);
    TWEEN.update(time);
  }
}
