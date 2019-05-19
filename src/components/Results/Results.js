import React from 'react';
import classes from './Results.module.css';
import Result from './Result/Result';
import Votes from './Votes/Votes';

const results = (props) => {

    const votes = props.votes;

    const scoresObj = {};
    for (var key1 in votes) {
        if (votes.hasOwnProperty(key1)) {
            votes[key1].picks.map((pick, index) => {
                // make list of store names and count the picks
                // cautious! pick is string so use [pick] not .pick
                if (!scoresObj.hasOwnProperty(pick)) {
                    scoresObj[pick] = [0, 0, 0];
                    scoresObj[pick][index] += 1;
                } else {
                    scoresObj[pick][index] += 1;
                }
            });
        }
    }    

    // convert the object into array
    const scoresArr = [];
    for (var key2 in scoresObj) {
        if (scoresObj.hasOwnProperty(key2)) {

            // cautious! key2 is string so use [key2] not .key2   
            var score = [];           
            var score = [scoresObj[key2][0], scoresObj[key2][1], scoresObj[key2][2], key2];

            scoresArr.push(score);
        }
    }    

    const scoreComparator = (store1, store2) => {
        // about pick 1
        if (store1[0] > store2[0]) {
            return -1;
        }

        if (store1[0] < store2[0]) {
            return 1;
        }

        // pick1 is the same
        // about pick 2
        if (store1[1] > store2[1]) {
            return -1;
        }

        if (store1[1] < store2[1]) {
            return 1;
        }

        // pick2 is the same
        // about pick 3
        if (store1[2] > store2[2]) {
            return -1;
        }

        if (store1[2] < store2[2]) {
            return 1;
        }

        return 0;
    };

    // rank concluded!
    scoresArr.sort(scoreComparator);   
    console.log(scoresArr);

    return (
        <div className={classes.Results}>
            <h2 className={classes.h2}>Results</h2>
            <Result store={scoresArr[0]} />
            <Result store={scoresArr[1]} />
            <Result store={scoresArr[2]} />
            <Votes votes={props.votes} />
        </div>
    )
}

export default results;