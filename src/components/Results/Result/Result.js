import React from 'react';
import classes from './Result.module.css';

const result = (props) => {

    var store = props.store;

    return (
        <div className={classes.Result}>
            {
                store === undefined ? null : (<p className={classes.p}>{store[0]}점 {store[1]}/{store[2]}/{store[3]} {store[4]}</p>)
            }
        </div>
    );
};

export default result;