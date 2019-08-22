import React from 'react';
import classes from './Selector.module.css'
import ingredients from '../../resources/img/2.jpg';

const selector = (props) => {

    return (
        <div className={classes.Selector}>
            <h2 className={classes.h2}>Your Pick</h2>
            <label className={classes.label}>리스트에서 가게를 선택하세요</label>
            <div>
                <label className={classes.label2}>제출자</label>
                <input
                    className={classes.input} type="text"
                    onChange={props.typedSender}
                    value={props.sender}>
                </input>
            </div>
            <div>
                <label className={classes.label2}>비번</label>
                <input
                    className={classes.input} type="text"
                    onChange={props.typedPassword}
                    value={props.password}>
                </input>
            </div>

            <button className={classes.btnPass} onClick={props.passConfirm}>패스</button>
            <button className={classes.btnConfirm} onClick={props.storeConfirm}>이 픽으로 간다!</button>
            <div className={classes.padding}></div>
            <button className={classes.btn} onClick={props.storeReset}>픽 리셋</button>
            <button className={classes.btn} onClick={props.selectRandomly}>랜덤3</button>
            <div className={classes.pickedList}>
                {props.selectedStores.length === 0 ?
                    <img className={classes.img} src={ingredients} alt="Ingredients..." /> :
                    props.selectedStores.map((store, index) => {
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