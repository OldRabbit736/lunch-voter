import React from 'react';
import classes from './Result.module.css';

const result = (props) => {

    //console.log(props.store[0])
    return (
        <div className={classes.Result}>
            <p className={classes.p}>{props.store}</p>
            <p className={classes.p}>{props.store} 표</p>
            <p className={classes.p}>{props.store} 표</p>
            <p className={classes.p}>{props.store} 표</p>
        </div>
    );
};

export default result;