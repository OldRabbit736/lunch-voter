import React from 'react';
import classes from './Result.module.css';

const react = (props) => {

    return (
        <div className={classes.Result}>
            <p className={classes.p}>{props.store.name}</p>
            <p className={classes.p}>{props.store.pick1votes}</p>
            <p className={classes.p}>{props.store.pick2votes}</p>
            <p className={classes.p}>{props.store.pick3votes}</p>
        </div>
    );
};

export default react;