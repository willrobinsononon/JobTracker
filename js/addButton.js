import React from 'react';

export default function AddButton({ add, isNew }) {

    if (isNew) {
        return
    }
    else {
        return (
            <img className="icon-button" src="/static/assets/add.png" title="add button" onClick={ add }></img>
        )
    }
}