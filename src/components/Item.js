import React from 'react';

const item = (props) => {

    return (
        <div>
            <input type="checkbox" id={props.id} checked={props.checked}
                onChange={props.onCheckedChange} /> {props.name}
        </div>
    );
};

export default item;