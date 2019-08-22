import React from 'react';
import classes from './Pass.module.css';

const pass = (props) => {
    return (
        <div className={classes.Pass}>
            <label className={classes.labelName}>{props.pass.name}</label>

            <button className={classes.delBtn}
                id={props.id} onClick={props.delPassBtnClicked}>del</button>

            <label className={classes.labelTime}>{props.pass.time}</label>

        </div>
    );
}

export default pass;