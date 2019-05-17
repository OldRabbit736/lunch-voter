import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';

// initializing firebase
const firebaseConfig = {
    apiKey: "AIzaSyBYlkKmi5bJr4EMwd4YNo7VbqVlQoQn8mo",
    authDomain: "lunchvoter-try-1.firebaseapp.com",
    databaseURL: "https://lunchvoter-try-1.firebaseio.com",
    projectId: "lunchvoter-try-1",
    storageBucket: "lunchvoter-try-1.appspot.com",
    messagingSenderId: "28955730132",
    appId: "1:28955730132:web:194492a79f4134e9"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
