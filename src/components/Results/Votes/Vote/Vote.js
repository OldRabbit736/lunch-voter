import React from 'react';
import classes from './Vote.module.css';

const vote = (props) => {
    return (
        <div className={classes.Vote}>
            <label className={classes.label}>{props.vote.name}</label>
            <label className={classes.label}>{props.vote.time}</label>
            {props.vote.picks.map((pick, index) => {
                return (
                    <h3 key={index}>{index+1}픽 {pick}</h3>                        
                )
            })}
        </div>
    )
};

export default vote;