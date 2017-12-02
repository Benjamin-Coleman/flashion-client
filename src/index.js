import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './fonts.css';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(<Provider store={store}><Router><Route path="/" component={App} /></Router></Provider>, document.getElementById('root'));
registerServiceWorker();
