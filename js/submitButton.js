import React, { useState, useEffect } from 'react';

export default function SubmitButton({ setMode, submit }) {

    function submitClick() {

        const submitted = submit()
        if (submitted) {
            setMode('view');
        }
    }

    return (
        <img className="icon-button" src="/static/assets/submit.png" title="submit button" onClick={ submitClick }></img>
    )

}