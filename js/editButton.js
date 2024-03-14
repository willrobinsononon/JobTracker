import React, { useState, useEffect } from 'react';

export default function EditButton({ setMode }) {

    function editClick() {
        setMode('edit');
    }

    return (
        <img className="icon-button" src="/static/assets/edit.png" title="edit button" onClick={editClick}></img>
    )
}