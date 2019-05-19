import React from 'react';
import classes from './Results.module.css';
import Result from './Result/Result';

const results = (props) => {

    const testStore1 = { name: '명량진사갈비', pick1votes: 3, pick2votes: 2, pick3votes: 4 };
    const testStore2 = { name: '장어', pick1votes: 2, pick2votes: 4, pick3votes: 4 };
    const testStore3 = { name: '명량진사갈비', pick1votes: 1, pick2votes: 2, pick3votes: 4 };

    return (
        <div className={classes.Results}>
            <h2 className={classes.h2}>Results</h2>
            <Result store={testStore1}/>
            <Result store={testStore2}/>
            <Result store={testStore3}/>
        </div>
    )
}

export default results;