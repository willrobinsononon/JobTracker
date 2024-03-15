import React from 'react';

export default function BigAddButton({ add }) {

    return (
        <img className="big-icon-button" src="/static/assets/big_add.png" title="add button" onClick={ add }></img>
    )
}