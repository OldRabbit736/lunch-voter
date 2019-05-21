import React from 'react';
import classes from './Item.module.css';

const item = (props) => {

    return (
        <div className={classes.Item}>
            <input type="checkbox"
                id={props.id}
                checked={props.checked}
                onChange={props.onCheckedChange}
            />
            <label className={classes.label}>{props.index + 1}.</label>
            <p className={classes.store}
                id={props.name}
                onClick={props.storeClicked}>
                {'\u00A0'}{props.name}
            </p>
        </div>
    );
};

export default item;