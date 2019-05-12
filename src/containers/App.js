import React, { Component } from 'react';
import Items from '../components/Items/Items';

class App extends Component {


    render() {
        
        return (
            <Items stores={this.props.stores} />
        );
    }
}

export default App;