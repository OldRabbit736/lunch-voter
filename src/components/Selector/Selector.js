import React from 'react';
import classes from './Selector.module.css'

const selector = (props) => {

    return (
        <div className={classes.Selector}>
            <h2 className={classes.h2}>Your Pick</h2>
            <label className={classes.label}>~사용법: 가게 이름을 찍으세요~</label>
            <div>
                <label className={classes.label2}>제출자</label>
                <input
                    className={classes.inputId} type="text"
                    onChange={props.typedId}
                    value={props.sender}>
                </input>
            </div>
            <div>
                <label className={classes.label2}>비번</label>
                <input
                    className={classes.inputId} type="text"
                    onChange={props.typedPassword}
                    value={props.password}>
                </input>
            </div>
            
            <button className={classes.btn} onClick={props.storeReset}>픽 리셋</button>
            <button className={classes.btn} onClick={props.selectRandomly}>랜덤3</button>
            <button className={classes.btn} onClick={props.storeConfirm}>이 픽으로 간다!</button>

            <div>
                {props.selectedStores.map((store, index) => {
                    return (
                        <li className={classes.list} key={index + 1}
                            onClick={() => props.storeClickedInPickedList(index)}>
                            {index + 1}>  {store}</li>
                    )
                })}
            </div>
        </div>
    );
}

export default selector