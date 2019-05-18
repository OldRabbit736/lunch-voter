import React from 'react';
import classes from './Item.module.css';

const item = (props) => {

    return (
        <div className={classes.Item}>
            <input type="checkbox" id={props.id} checked={props.checked}
                onChange={props.onCheckedChange} /> {props.name}
        </div>
    );
};

export default item;