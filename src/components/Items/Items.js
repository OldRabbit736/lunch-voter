import React from 'react';
import Item from '../Item';

const items = (props) => {

    return props.stores.map((store, index) => {
        return (
            <Item name={store.name} key={1}/>
        );
    });
};

export default items;