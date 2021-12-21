import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {Style} from "./global"

ReactDOM.render(
  <React.StrictMode>
    <Style />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.register();

