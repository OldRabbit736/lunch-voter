import React, { Component } from 'react';
import classes from './Selector.module.css'

const selector = (props) => {

    return (
        <div className={classes.Selector}>
            <h2 className={classes.h2}>Your Pick</h2>
            <label className={classes.label}>~사용법: 가게 이름을 찍으세요~</label>

            <div>
                {props.selectedStores.map((store, index) => {
                    return (
                        <li className={classes.list} key={index + 1}>{index + 1}. {store}</li>
                    )
                })}
            </div>
        </div>
    );
}

export default selector