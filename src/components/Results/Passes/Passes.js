import React from 'react';
import Pass from './Pass/Pass';
import classes from './Passes.module.css';

const passes = (props) => {

    return (
        <div className={classes.Passes}>
            <label>패스한 사람</label>
            {props.passes.length === 0 ?

                <label></label> :

                props.passes.map((pass) => {
                    return (
                        <Pass pass={pass} key={pass.id} id={pass.id}
                            delPassBtnClicked={props.delPassBtnClicked}
                        />
                    )
                })
            }

        </div>

    );
}

export default passes;