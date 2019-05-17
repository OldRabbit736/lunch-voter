import React, { Component } from 'react';
import Items from '../components/Items/Items';
import Sender from '../components/Sender';
import firebase from 'firebase';

class App extends Component {
    constructor() {
        super();
        this.state = {
            stores: []
        };
    }

    addBtnHandler = () => {
        // push input text to store list

    }

    componentDidMount() {
        // listen to realtime database and setState
        const storesRef = firebase.database().ref('stores');

        storesRef.on('value', (snapshot) => {
            const newStores = [];
            snapshot.forEach((childSnapshot) => {
                newStores.push(childSnapshot.val());
            });
            this.setState({ stores: newStores });
        })
    }

    render() {

        return (
            <div>
                <Items stores={this.state.stores} />
                <Sender />
            </div>
        );
    }
}

export default App;