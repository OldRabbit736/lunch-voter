import React from 'react';
import classes from './Votes.module.css';
import Vote from './Vote/Vote';

const votes = (props) => {
    return (
        <div className={classes.Votes}>
            {props.votes.map((vote) => {
                return (
                    <Vote vote={vote} key={vote.id} id={vote.id}
                        delVoteBtnClicked={props.delVoteBtnClicked}
                        showVoteBtnClicked={props.showVoteBtnClicked}
                        open={props.open} />
                )
            })}
        </div>
    );
};

export default votes;