import React from 'react';

const item = (props) => {

    return (
        <div>
            <input type="checkbox"/> {props.storeName}
        </div>
    );
};

export default item;