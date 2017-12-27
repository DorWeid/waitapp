import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import { Provider } from "mobx-react";
import DevTools from 'mobx-react-devtools';
import Routes from './routes';

const stores = {};

ReactDOM.render(
    <div>
        <Provider {...stores}>
            <Routes />
        </Provider>
        {process.env.NODE_ENV === 'development' && <DevTools />}
    </div>    ,
    document.getElementById('root')
);
registerServiceWorker();
