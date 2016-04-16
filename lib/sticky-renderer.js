import React from 'react';
import { render } from 'react-dom';
import StickyNote from './components/sticky-note';
import store from './store';

render(<StickyNote />, document.querySelector('.sticky'));
