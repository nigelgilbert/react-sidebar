"use strict";

import React from "react";
import "./sidebar.css";
import tweener from "../utils/tweener";
var TWEEN = require("tween.js");

export class SideBar extends React.Component {

  constructor() {
    super();
    this.state = {
      sidebar: {
        hover: false,
        translate: -200
      },
      drawer: {
        open : false,
        x: 0
      }
    };

    // clean this up
    this._updateDrawer = this._updateDrawer.bind(this);
    this._updateSidebar = this._updateSidebar.bind(this);

    // maybe refactor to 1 function
    this._openDrawer = this._openDrawer.bind(this);
    this._closeDrawer = this._closeDrawer.bind(this);

    // event handling functions
    this._onClick = this._onClick.bind(this);
    this._hoverIn = this._hoverIn.bind(this);
    this._hoverOut = this._hoverOut.bind(this);
  }

  _updateDrawer(height) {
    this.setState({
      drawer: {
        open: this.state.drawer.open,
        height: height
      }
    });
  }

  _updateSidebar(t) {
    this.setState({
      sidebar: {
        hover: this.state.sidebar.hover,
        translate: t
      }
    });
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

    var tween = tweener(dimensions, target, 400)
      .easing(TWEEN.Easing.Quartic.InOut)
      .onUpdate(function() {
        context._updateDrawer(this.height);
      })
      .start();
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

    var tween = tweener(dimensions, target, 500)
      .easing(TWEEN.Easing.Quartic.InOut)
      .onUpdate(function() {
        context._updateDrawer(this.height);
      })
      .start();
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
    var dimensions = { translate: this.state.sidebar.translate };
    var target = { translate: 0 };
    var context = this;

    this.setState({
      sidebar: {
        hover: true
      }
    });

    var tween = tweener(dimensions, target, 500)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(function() {
        context._updateSidebar(this.translate);
      })
      .start();
  }

  _hoverOut() {
    var dimensions = { translate: this.state.sidebar.translate };
    var target = { translate: -200 };
    var context = this;

    this.setState({
      sidebar: {
        hover: false
      }
    });

    var tween = tweener(dimensions, target, 400)
      .easing(TWEEN.Easing.Quartic.Out)
      .onUpdate(function() {
        context._updateSidebar(this.translate);
      })
      .start();
  }

  componentDidUpdate() {
    document.getElementById("slide-right").style.transform = "translate(" + this.state.sidebar.translate + "px, 0px)";
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