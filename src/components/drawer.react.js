"use strict";

import React from "react";
import "./Drawer.css";
import tweener from "../utils/tweener";
var TWEEN = require("tween.js");

export class Drawer extends React.Component {

  static propTypes = {
    title: React.PropTypes.string.isRequired,
    index: React.PropTypes.number.isRequired,
    onClick: React.PropTypes.func.isRequired,
    canOpen: React.PropTypes.bool.isRequired,
  }

  constructor() {
    super();
    this.state = {
      open: false,
      height: 0
    }

    this._onClick = this._onClick.bind(this);
    this._animateDrawer = this._animateDrawer.bind(this);
    this._openDrawer = this._openDrawer.bind(this);
    this._closeDrawer = this._closeDrawer.bind(this);
  }

  _animateDrawer(target) {
    let dimensions = { height: this.state.height };
    this.setState({ open: !this.state.open });

    let update = (h) => {
      this.setState({ height: h });
    }

    const tween = tweener(dimensions, target, 400)
      .easing(TWEEN.Easing.Quartic.InOut)
      .onUpdate(function() {
        update(this.height);
      })
      .start();
  }

  _openDrawer() {
    this._animateDrawer({ height: 120 });
  }

  _closeDrawer() {
    this._animateDrawer({ height: 0 });
  }

  _onClick() {
    this.props.onClick(this.props.index);
    if (this.state.open === false) {
      this._openDrawer();
    }
    else {
      this._closeDrawer();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.canOpen === false && this.state.open === true)
      this._closeDrawer();
  }

  componentDidUpdate() {
    const id = "slide-down-" + this.props.index;
    document.getElementById(id).style.height = this.state.height + "px";
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState.height === this.state.height) {
      return false;
    }
    return true;
  }

  render() {
    const title = "title-active-" + this.state.open.toString();
    return (
      <div>
        <div className="row" onClick={this._onClick}>
          <div id={title}>{ this.props.title }</div>
        </div>

        <div className="drawer" id={"slide-down-" + this.props.index}>
          { this.props.children }
        </div>
      </div>
    );
  }
}