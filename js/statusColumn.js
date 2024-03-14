import React, { useState, useEffect } from 'react';

export default function StatusColumn({ mode, status, setAppData }) {
    
    function getStatusClass(status) {
        if (status === "Unsuccessful" || status === "Success") {
            return "status-final"
        }
        else {
            return ""
        }
    }
    
    const [statusClass, setStatusClass] = useState(getStatusClass(status));

    function ChangeStatusHandle() {
        setStatusClass(getStatusClass(event.target.value));                
        setAppData({ ...appData, ["status"]: event.target.value });
    }

    if (mode === 'view') {
        return (
            <div className = {"current-status col-6 inner-title " + statusClass}>
                { status }
            </div>
        )
    }
    else {
        return (
            <div className="current-status col-6 inner-title">
                <select title="status" className = "edit-input-text status-select" name="status" value = { status } onChange={ ChangeStatusHandle }>
                    <option value="Applied" >Applied</option>
                    <option value="Interview Booked" >Interview Booked</option>
                    <option value="Success" >Success</option>
                    <option value="Unsuccessful" >Unsuccessful</option>
                </select>
            </div>
        )
    }
}