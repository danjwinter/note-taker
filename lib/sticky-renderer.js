import React from 'react';
import { render } from 'react-dom';
import EditableNote from './components/editable-note';
import store from './store';

render(<EditableNote {...store.findActiveFile()} className='sticky-note' />, document.querySelector('.sticky'));
