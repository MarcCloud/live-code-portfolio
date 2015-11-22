import React from 'react';
import { render } from 'react-dom';
import app from './layout';

const startApp = app(React);

render(startApp({ message: 'Live Portfolio' }), document.getElementById('app'));

