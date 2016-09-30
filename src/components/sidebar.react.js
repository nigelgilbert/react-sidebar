"use strict";

import React from "react";
import "./sidebar.css";
import { Drawer } from "./drawer.react";
import tweener from "../utils/tweener";
var TWEEN = require("tween.js");

export class SideBar extends React.Component {

  constructor() {
    super();

    this.state = {
      hover: false,
      translate: -200,
      active: 0,
    };

    this._animateSidebar = this._animateSidebar.bind(this);
    this._activate = this._activate.bind(this);
    this._hoverIn = this._hoverIn.bind(this);
    this._hoverOut = this._hoverOut.bind(this);
  }

  _animateSidebar(target) {
    let dimensions = { translate: this.state.translate };
    this.setState({ hover: !this.state.hover });

    let update = (t) => {
      this.setState({ translate: t });
    };

    const tween = tweener(dimensions, target, 500)
      .easing(TWEEN.Easing.Quartic.Out)
      .onUpdate(function() {
        update(this.translate);
      })
      .start();
  }

  _hoverIn() {
    this._animateSidebar({translate: 0});
  }

  _hoverOut() {
    this._animateSidebar({translate: -200});
  }

  _activate(i) {
    this.setState({active: i});
  }

  componentDidUpdate() {
    document.getElementById("slide-right").style.transform =
      "translate(" + this.state.translate + "px, 0px)";
  }

  render() {
    return (
      <div className="sidebar"
       id="slide-right"
       onMouseEnter={this._hoverIn}
       onMouseLeave={this._hoverOut}
      >
        <Drawer
         index={1}
         title="demo 1"
         onClick={this._activate}
         canOpen={this.state.active === 1}
        >
          <div className="drawer-row"> This is some content that is </div>
          <div className="drawer-row"> hidden by the drawer. </div>
        </Drawer>

        <Drawer
         index={2}
         title="demo 2"
         onClick={this._activate}
         canOpen={this.state.active === 2}
        >
          <div className="drawer-row"> This is some content that is </div>
          <div className="drawer-row"> hidden by the drawer. </div>
        </Drawer>

        <Drawer
         index={3}
         title="demo 3"
         onClick={this._activate}
         canOpen={this.state.active === 3}
        >
          <div className="drawer-row"> This is some content that is </div>
          <div className="drawer-row"> hidden by the drawer. </div>
        </Drawer>

      </div>
    );
  }
}