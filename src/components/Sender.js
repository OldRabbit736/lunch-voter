import React, { Component } from 'react';
import firebase from 'firebase';

class Sender extends Component {
    constructor() {
        super();
        this.state = {
            text: ''
        };
        this.storesRef = firebase.database().ref('stores');
        this.updateList = () => {
            if (this.state.text) {
                this.storesRef.push({
                    name: this.state.text
                })
            }

            // initialize text state
            this.setState({ text: '' });
        };
    }

    textChanged = (event) => {
        this.setState({ text: event.target.value })
    }

    btnClicked = () => {
        // push input text to store list        
        this.updateList();
    }

    render() {
        return (
            <div>
                <input type="textfield" onChange={this.textChanged} value={this.state.text} />
                <button onClick={this.btnClicked}>Add</button>
            </div>
        );
    }
}

export default Sender;