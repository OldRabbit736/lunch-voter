import React, { Component } from 'react';
import classes from './AddDelete.module.css';
import "@firebase/polyfill";
import firebase from 'firebase';

class AddDelete extends Component {
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

    addBtnClicked = () => {
        // push input text to store list        
        this.updateList();
    }

    render() {
        return (
            <div>
                <input className={classes.input} type="textfield" onChange={this.textChanged}
                    value={this.state.text} />
                <button className={classes.btn} onClick={this.addBtnClicked}>Add</button>
                <button className={classes.btn} onClick={this.props.delBtnClicked}>Delete</button>
            </div>
        );
    }
}

export default AddDelete;