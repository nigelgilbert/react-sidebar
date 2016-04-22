"use strict";

import React from "react";
import "./sidebar.css";
var TWEEN = require("tween.js");

export class SideBar extends React.Component {

  constructor() {
    super();
    this.state = {
      sidebar: {
        hover: false,
        left: 0
      },
      drawer: {
        open : false,
        x: 0
      }
    };

    this._update = this._update.bind(this);
    this._update2 = this._update2.bind(this);
    this._animate = this._animate.bind(this);
    this._animate2 = this._animate2.bind(this);
    this._openDrawer = this._openDrawer.bind(this);
    this._closeDrawer = this._closeDrawer.bind(this);
    this._onClick = this._onClick.bind(this);
    this._hoverIn = this._hoverIn.bind(this);
    this._hoverOut = this._hoverOut.bind(this);
  }

  _update(height) {
    this.setState({
      drawer: {
        open: this.state.drawer.open,
        height: height
      }
    });
  }

  _update2(x) {
    this.setState({
      sidebar: {
        hover: this.state.sidebar.hover,
        x: x
      }
    });
  }

  _animate2(time) {
    if (this.state.sidebar.x === 0 ||
    this.state.sidebar.x === -200) {
      return;
    }
    requestAnimationFrame(this._animate);
    TWEEN.update(time);
  }

  _animate(time) {
    if ((this.state.drawer.height === 120 || this.state.drawer.height === 0)
    && (this.state.sidebar.x === 0 || this.state.sidebar.x === -200)) {
      return;
    }
    requestAnimationFrame(this._animate);
    TWEEN.update(time);
  }

  _openDrawer() {
    var dimensions = { height: this.state.drawer.height };
    var target = { height: 120 };
    var context = this;

    this.setState({
      drawer: {
        open: true
      }
    });

    var tween = new TWEEN.Tween(dimensions)
      .to(target, 400)
      .easing(TWEEN.Easing.Quartic.InOut)
      .onUpdate(function() {
        context._update(this.height);
      })
      .start();

    requestAnimationFrame(this._animate);
  }

  _closeDrawer() {
    var dimensions = { height: this.state.drawer.height };
    var target = { height: 0 };
    var context = this;

    this.setState({
      drawer: {
        open: false
      }
    });

    var tween = new TWEEN.Tween(dimensions)
      .to(target, 500)
      .easing(TWEEN.Easing.Quartic.InOut)
      .onUpdate(function() {
        context._update(this.height);
      })
      .start();

    requestAnimationFrame(this._animate);
  }

  _onClick() {
    if (this.state.drawer.open === false) {
      this._openDrawer();
    }
    if (this.state.drawer.open === true) {
      this._closeDrawer();
    }
  }

  _hoverIn() {
    var dimensions = { translate: this.state.sidebar.x };
    var target = { translate: 0 };
    var context = this;

    this.setState({
      sidebar: {
        hover: true
      }
    });

    var tween = new TWEEN.Tween(dimensions)
      .to(target, 500)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(function() {
        context._update2(this.translate);
      })
      .start();

    requestAnimationFrame(this._animate);
  }

  _hoverOut() {
    var dimensions = { translate: this.state.sidebar.x };
    var target = { translate: -200 };
    var context = this;

    this.setState({
      sidebar: {
        hover: false
      }
    });

    var tween = new TWEEN.Tween(dimensions)
      .to(target, 400)
      .easing(TWEEN.Easing.Quartic.Out)
      .onUpdate(function() {
        context._update2(this.translate);
      })
      .start();

    requestAnimationFrame(this._animate);
  }

  componentDidUpdate() {
    document.getElementById("slide-right").style.transform = "translate(" + this.state.sidebar.x + "px, 0px)";
    document.getElementById("slide-down").style.height = this.state.drawer.height + "px";
  }

  render() {

    const drawer = () => {
        return (
          <li className="drawer" id="slide-down">
            <div className="drawer-row"> This is some content that is </div>
            <div className="drawer-row"> hidden by the drawer. </div>
          </li>
        );
    };

    return (
      <ul className="sidebar"
       id="slide-right"
       onMouseEnter={this._hoverIn}
       onMouseLeave={this._hoverOut}
      >
        <li className="row">
          <div id="title-2"> demo 1 </div>
        </li>

        <li className="row">
          <div id="title-2"> demo 2 </div>
        </li>

        <li className="row" onClick={this._onClick}>
          <div id="title"> demo 3 </div>
        </li>
        { drawer() }
      </ul>
    );
  }
}