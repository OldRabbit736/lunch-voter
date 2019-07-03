import React from 'react';
import classes from './Vote.module.css';

const vote = (props) => {
    return (
        <div className={classes.Vote}>
            <label className={classes.label}>{props.vote.name}</label>
            <label className={classes.label}>{props.vote.time}</label>
            <button className={classes.delBtn} id={props.id} onClick={props.onClicked}>del</button>
            {props.open ? props.vote.picks.map((pick, index) => {
                return (
                    <h3 className={classes.h3} key={index}>{index + 1}픽 {pick}</h3>
                )
            }) : null}
        </div>
    )
};

export default vote;