import React, { Component } from 'react';
import Items from '../components/Items/Items';
import Sender from '../components/Sender';

class App extends Component {

    addBtnHandler = () => {
        // push input text to store list

    }

    render() {

        return (
            <div>
                <Items stores={this.props.stores} />
                <Sender />
            </div>


        );
    }
}

export default App;