import React from 'react';

export default function AddButton({ add }) {

    return (
        <img className="icon-button" src="/static/assets/add.png" title="add button" onClick={ add }></img>
    )
}