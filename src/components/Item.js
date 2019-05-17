import React from 'react';

const item = (props) => {

    return (
        <div>
            <input type="checkbox" onChange={(event) => { console.log(event.target.type) }} /> {props.name}
        </div>
    );
};

export default item;