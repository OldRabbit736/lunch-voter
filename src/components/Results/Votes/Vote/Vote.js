import React from 'react';
import classes from './Vote.module.css';

const vote = (props) => {
    return (
        <div className={classes.Vote}>
            <label className={classes.labelName}>{props.vote.name}</label>

            <button className={classes.delBtn}
                id={props.id} onClick={props.delVoteBtnClicked}>del</button>
            <button className={classes.showBtn}
                id={props.id} onClick={props.showVoteBtnClicked}>show</button>

            <label className={classes.labelTime}>{props.vote.time}</label>


            {props.open !== -1 ? props.vote.picks.map((pick, index) => {
                return (
                    <h3 className={classes.h3} key={index}>{index + 1}픽 {pick}</h3>
                )
            }) : null}
        </div>
    )
};

export default vote;