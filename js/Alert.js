import React from 'react';


export default function Alert({ alert, alertClass }) {
    if (alert.alert) {
        return (
            <div className = {`alert ${alertClass}`} role="alert">
                { alert.message }
            </div>
        )
    }
    else {
        return
    }
}