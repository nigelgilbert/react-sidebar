var TWEEN = require("tween.js");

let _isAnimating = false;
let _animationTimeoutHandle = null;

function _animate(time) {
  if (_isAnimating) {
    requestAnimationFrame(_animate);
    TWEEN.update(time);
  }
}

export default function tweener(initial, target, duration) {
  _isAnimating = true;

  if (_animationTimeoutHandle !== null) {
    clearTimeout(_animationTimeoutHandle);
  }

  let toggle = () => {
    _isAnimating = false;
    _animationTimeoutHandle = null;
  }

  _animationTimeoutHandle = setTimeout(toggle, duration + 50);

  requestAnimationFrame(_animate);
  return new TWEEN.Tween(initial).to(target, duration);
}