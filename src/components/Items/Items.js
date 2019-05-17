import React from 'react';
import Item from './Item/Item';

const items = (props) => {

    return props.stores.map((store, index) => {
        return (
            <Item name={store.name}
             key={store.id} id={store.id} checked={store.checked}
             onCheckedChange={props.onCheckedChange}/>
        );
    });
};

export default items;