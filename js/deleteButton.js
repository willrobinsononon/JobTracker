import React from 'react';

export default function DeleteButton({ mode, onDelete }) {

    if ( mode === "view") {
        return
    }
    else if ( mode === "edit" ) {
        return (
            <img className="icon-button" src="/static/assets/delete.png" title="delete button" onClick={ onDelete }></img>
        )
    }
}