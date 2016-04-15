import React, { Component } from 'react';
import EditableNote from './editable-note';
import store from '../store';

class StickyNote extends Component {
  constructor() {
    super();
    this.state = { sticky: store.stickies.currentSticky };
  }

  render() {
    let file = this.state.sticky;
    debugger
    return <EditableNote {...file}/>;
  }
}
