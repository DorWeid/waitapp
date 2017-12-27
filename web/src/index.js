import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';

import Routes from './routes';


import registerServiceWorker from './registerServiceWorker';


ReactDOM.render( <Routes  />, document.getElementById('root'));
registerServiceWorker();
