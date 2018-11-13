import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import 'normalize.css';
import './styles/index.css';
import './styles/modal-video.scss';

ReactDOM.render(
  <App />, 
  document.getElementById('root')
);

registerServiceWorker();
