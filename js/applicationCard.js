import React, { useState, useEffect } from 'react';
import InterviewTable from './interviewTable';
import EditButton from './editButton';
import SubmitButton from './submitButton';
import StatusColumn from './statusColumn';
import cookie from "react-cookies";


export default function ApplicationCard({ application, setApplications }) {
    
    const appInitialValues = {
        job_title: application.job_title,
        employer: application.employer,
        status: application.status,
        notes: application.notes
    };

    const [appData, setAppData] = useState(appInitialValues);
    const [mode, setMode] = useState('view');

    function submit() {

        fetch(`jobapi/applications/${application.id}/`, {
            method: 'PUT',
            headers: { 'X-CSRFToken': cookie.load("csrftoken"),
                        'Content-Type': 'application/json'},
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

    const ChangeHandle = (event) => {
        if (mode === "edit") {
            setAppData({ ...appData, [event.target.name]: event.target.value });
        }
      };

    function renderStatusRow() {
        if (mode === 'edit') {
            return (
                <div className = "row">
                    <StatusColumn mode = { mode } appData = { appData } setAppData = { setAppData }/>
                    <div className = "col-6 text-end">
                        <span className="inner-title">Editing    </span>
                        <SubmitButton setMode = { setMode } submit = { submit }/>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className = "row">
                    <StatusColumn mode = { mode } appData = { appData } setAppData = { setAppData }/>
                    <div className = "col-6 text-end">
                        <EditButton setMode = { setMode }/>
                    </div>
                </div>
            )
        }
    }

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
                        <textarea className = "notes-textarea inner-bdr my-2" name="notes" value={ appData.notes } disabled={ mode === "view" } onChange={ ChangeHandle }></textarea>
                    </div>
                </div>
                <div className = "row">
                    <div className = "col-12">
                        <span className="inner-title">Interviews:</span>
                        <InterviewTable initInterviews = { application.interviews }/>
                    </div>
                </div>
            </div>
        </div>
    )
}