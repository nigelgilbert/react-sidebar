var TWEEN = require("tween.js");

let _isAnimating = false;
let _cancelAnimation = null;

function _animate(time) {
  if (_isAnimating) {
    requestAnimationFrame(_animate);
    TWEEN.update(time);
  }
}

export default function tweener(initial, target, duration) {
  _isAnimating = true;

  if (_cancelAnimation !== null) {
    clearTimeout(_cancelAnimation);
  }

  let _toggle = () => {
    _isAnimating = false;
    _cancelAnimation = null;
  }

  _cancelAnimation = setTimeout(_toggle, duration + 50);

  requestAnimationFrame(_animate);
  return new TWEEN.Tween(initial).to(target, duration);
}