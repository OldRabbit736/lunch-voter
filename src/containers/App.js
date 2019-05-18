import React, { Component } from 'react';
import classes from './App.module.css';
import Items from '../components/Items/Items';
import Selector from '../components/Selector/Selector';
import firebase from 'firebase';

class App extends Component {
    constructor() {
        super();
        this.state = {
            stores: [],
            selectedStores: []
        };
        this.storesRef = firebase.database().ref('stores');
    }

    storeClicked = (event) => {
        // highlight selected store

        // add the store id and name to the selected stores        
        const newSelectedStores = [...this.state.selectedStores];
        newSelectedStores.push(event.target.id);

        // update the state
        this.setState({ selectedStores: newSelectedStores });
    }

    handleChecked = (event) => {
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

    delBtnClicked = () => {
        // find the checked stores
        const checkedStores = [];
        this.state.stores.forEach((store) => {
            if (store.checked === true) {
                checkedStores.push(store.id);
            }
        });

        // request to the server to delete the stores
        if (checkedStores.length > 0) {
            checkedStores.forEach((checkedStore) => {
                this.storesRef.child(checkedStore).remove();
            })
        }
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
            <div className={classes.App}>
                <Items stores={this.state.stores}
                    onCheckedChange={this.handleChecked.bind(this)}
                    delBtnClicked={this.delBtnClicked.bind(this)}
                    storeClicked={this.storeClicked.bind(this)} />
                <Selector selectedStores={this.state.selectedStores}/>
            </div>
        );
    }
}

export default App;