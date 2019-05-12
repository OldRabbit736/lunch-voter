import React from 'react';

const item = (props) => {

    return (
        <div>
            <input type="checkbox"/> {props.name}
        </div>
    );
};

export default item;