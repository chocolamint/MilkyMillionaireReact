import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { newRandom } from './models/Game';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { reducer } from './reducers';

const Store = createStore(reducer);

ReactDOM.render(
    <Provider store={Store}>
        <App random={newRandom()} />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
