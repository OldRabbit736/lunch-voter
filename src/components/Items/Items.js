import React from 'react';
import Item from './Item/Item';
import AddDelete from './AddDelete/AddDelete';
import classes from './Items.module.css';

const items = (props) => {

    return (
        <div className={classes.Items}>
            {
                props.stores.map((store, index) => {
                    return (
                        <Item name={store.name}
                            key={store.id} id={store.id} checked={store.checked}
                            onCheckedChange={props.onCheckedChange}
                            storeClicked={props.storeClicked} />
                    );
                })
            }
            <AddDelete delBtnClicked={props.delBtnClicked} />
        </div>
    )


};

export default items;