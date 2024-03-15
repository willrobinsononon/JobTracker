import React, { useState, useEffect } from 'react';
import SubmitButton from './submitButton';
import EditButton from './editButton';
import DeleteButton from './deleteButton';

export default function ButtonToggle({ mode, setMode, submit, onDelete }) {

    if ( mode === 'edit') {
        return ( <div className = "buttons"><SubmitButton setMode = { setMode } submit={ submit }/><DeleteButton mode = { mode } onDelete = { onDelete }/></div>)
    }
    else {
        return ( <div className = "buttons"><EditButton setMode = { setMode }/></div> )
    }
}