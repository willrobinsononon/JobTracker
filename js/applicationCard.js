import React, { useState, useEffect } from 'react';
import InterviewTable from './interviewTable'
import EditButton from './editButton'
import SubmitButton from './submitButton'

export default function ApplicationCard({ application }) {
    
    function getStatusClass(status) {
        if (status === "Unsuccessful" || status === "Success") {
            return "status-final"
        }
        else {
            return ""
        }
    }
    
    const appInitialValues = {
        job_title: application.job_title,
        employer: application.employer,
        status: application.status,
        notes: application.notes
    };

    const [appData, setAppData] = useState(appInitialValues);
    const [mode, setMode] = useState('view');
    const [statusClass, setStatusClass] = useState(getStatusClass(application.status));

    function renderStatusRow() {
        if (mode === 'view') {
            return (
                <div className = "row">
                    <div className = {"current-status col-6 inner-title " + statusClass}>
                        { application.status }
                    </div>
                    <div className = "col-6 text-end">
                        <EditButton setMode = { setMode }/>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className = "row">
                    <div className="current-status col-6 inner-title">
                        <select title="status" className = "edit-input-text status-select" name="status" value = { appData.status } onChange={ ChangeHandle }>
                            <option value="Applied" >Applied</option>
                            <option value="Interview Booked" >Interview Booked</option>
                            <option value="Success" >Success</option>
                            <option value="Unsuccessful" >Unsuccessful</option>
                        </select>
                    </div>
                    <div className = "col-6 text-end">
                        <span className="inner-title">Editing    </span>
                        <SubmitButton setMode = { setMode } submit = { test }/>
                    </div>
                </div>
            )
        }
    }

    function submit() {
        
        fetch(`jobapi/applications/${application.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                id: application.id,
                date_applied: application.date_applied,
                job_title: appData.job_title,
                employer: appData.employer,
                notes: appData.notes,
                followed_up: application.followed_up,
                status: appData.status
            })
          })
          .then(response => response.json())
          .then(result => {console.log(result)});
    }

    function test() {
        
        console.log( JSON.stringify({
                id: application.id,
                date_applied: application.date_applied,
                job_title: appData.job_title,
                employer: appData.employer,
                notes: appData.notes,
                followed_up: application.followed_up,
                status: appData.status
            }))

    }


    const ChangeHandle = (event) => {
        
        if (mode === "edit") {
            if (event.target.name === "status") {
                setStatusClass(getStatusClass(event.target.value));                
            }
            setAppData({ ...appData, [event.target.name]: event.target.value });
        }
      };

    return (
        <div className = {"application-container container-fluid my-2 " + (mode === 'view' ? "status-" +appData.status.slice(0, 3) : "") } data-app_id={ application.id }>
            <div className = "application-header row">
                <input type="text" className = "job-title col-6 edit-input-text" name="job_title" value={ appData.job_title } disabled={ mode === "view" } onChange={ ChangeHandle }></input>
                <input type="text" className = "employer-name col-6 mt-auto text-end edit-input-text" name="employer" value={ appData.employer } disabled={ mode === "view" } onChange={ ChangeHandle }></input>
            </div>
            <div className = "application-body">
                { renderStatusRow() }
                <hr className="mt-3 mx-2" />
                <div className = "row my-2">
                    <div className = "status col-12">
                        <span className="inner-title">Notes:</span>
                        <textarea className = "notes-textarea inner-bdr my-2" name="notes" value={ appData.notes } readOnly={ mode === "view" } onChange={ ChangeHandle }></textarea>
                    </div>
                </div>
                <div className = "row">
                    <div className = "col-12">
                        <span className="inner-title">Interviews:</span>
                        <InterviewTable interviews = { application.interviews }/>
                    </div>
                </div>
            </div>
        </div>
    )
}