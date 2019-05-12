import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';

const STORES = [
    {
        name: '호시'        
    },
    {
        name: '닭갈비'
    },
    {
        name: '홍콩반점'
    }
];

ReactDOM.render(<App stores={STORES}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
