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

    handleChecked(event) {
        // find the id of the target
        const id = event.target.id;

        // find the index of the target in the stores
        const index = this.state.stores.findIndex(store => { return store.id === id });

        // update the store        
        const updatedStore = { ...this.state.stores[index] };
        updatedStore.checked = event.target.checked;

        // insert the store into the stores
        const stores = [...this.state.stores];
        stores[index] = updatedStore;

        // update the state
        this.setState({ stores: stores });
    }

    componentDidMount() {
        // listen to realtime database and setState
        const storesRef = firebase.database().ref('stores');

        storesRef.on('value', (snapshot) => {
            const newStores = [];
            for (var key in snapshot.val()) {
                if (snapshot.val().hasOwnProperty(key)) {
                    var store = {
                        id: key,
                        name: snapshot.val()[key].name,
                        checked: false
                    }
                    newStores.push(store);
                }
            }
            this.setState({ stores: newStores });            
        });
    }

    render() {

        return (
            <div>
                <Items stores={this.state.stores}
                    onCheckedChange={this.handleChecked.bind(this)} />
                <Sender />
            </div>
        );
    }
}

export default App;