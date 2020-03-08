import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Registro from './components/Registro';
import './App.css';
import './index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
