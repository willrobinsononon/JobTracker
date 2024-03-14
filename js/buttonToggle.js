import React, { useState, useEffect } from 'react';
import SubmitButton from './submitButton';
import EditButton from './editButton';

export default function ButtonToggle({ mode, setMode, submit }) {

    if ( mode === 'edit') {
        return ( <SubmitButton setMode = { setMode } submit={ submit }/>)
    }
    else {
        return ( <EditButton setMode = { setMode }/>
        )
    }
}