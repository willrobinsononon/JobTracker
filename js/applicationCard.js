import React, { useState, useEffect } from 'react';
import InterviewTable from './interviewTable';
import ButtonToggle from './buttonToggle'
import EditingFlag from './editingFlag';
import AddButton from './addButton';
import StatusColumn from './statusColumn';
import cookie from "react-cookies";


export default function ApplicationCard({ application, applications, setApplications }) {
    
    const appInitialValues = {
        job_title: application.job_title,
        employer: application.employer,
        status: application.status,
        notes: application.notes
    };

    const [appData, setAppData] = useState(appInitialValues);
    const [mode, setMode] = useState('view');
    const [interviews, setInterviews] = useState(application.interviews);

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
          {/*}.then(response => response.json())
        .then(result => {console.log(result)});*/}

        return true
    }

    function onDelete() {
        fetch(`jobapi/applications/${application.id}/`, {
            method: 'DELETE',
            headers: { 'X-CSRFToken': cookie.load("csrftoken")},
          })
          .then(response => removeApplication(response))
    }

    function removeApplication( response ) {
        if ( response.status === 204 ) {
            setApplications(applications.filter((item) => item.id !== application.id))
        }
    }

    function addInterview() {
        var id = 0
        if ( interviews.length > 0 ) {
            id = interviews[interviews.length - 1].id + 1
        }

        var newInterview = {
            id: id,
            scheduled_time: new Date().toJSON(),
            location: "",
            notes: "",
            application: application.id,
            new: true
        }

        setInterviews([ ...interviews, newInterview ])
    }

    const ChangeHandle = (event) => {
        if (mode === "edit") {
            setAppData({ ...appData, [event.target.name]: event.target.value });
        }
      };
 
    return (
        <div className = {"application-container container-fluid my-2 " + (mode === 'view' ? "status-" + appData.status.slice(0, 3) : "edit-mode") } data-app_id={ application.id }>
            <div className = "application-header row">
                <input type="text" className = "job-title col-6 edit-input-text" name="job_title" value={ appData.job_title } disabled={ mode === "view" } onChange={ ChangeHandle }></input>
                <input type="text" className = "employer-name col-6 mt-auto text-end edit-input-text" name="employer" value={ appData.employer } disabled={ mode === "view" } onChange={ ChangeHandle }></input>
            </div>
            <div className = "application-body">
                <div className = "row">
                    <StatusColumn mode = { mode } appData = { appData } setAppData = { setAppData }/>
                    <div className = "col-6 text-end">
                        <EditingFlag mode = { mode }/>
                        <ButtonToggle mode = { mode } setMode = { setMode } submit = { submit } onDelete = { onDelete }/>
                    </div>
                </div>
                <hr className="mt-3 mx-2" />
                <div className = "row my-2">
                    <div className = "status col-12"> 
                        <span className="inner-title">Notes:</span>
                    </div>
                </div>
                <div className = "row my-2">
                    <div className = "status col-12">
                        <textarea className = "notes-textarea inner-bdr my-2" name="notes" value={ appData.notes } disabled={ mode === "view" } onChange={ ChangeHandle }></textarea>
                    </div>
                </div>
                <div className = "row">
                    <div className = "status col-6"> 
                        <span className="inner-title">Interviews:</span>
                    </div>
                    <div className = "col-6 text-end">
                        <AddButton add = { addInterview }/>
                    </div>
                </div>
                <div className = "row">
                    <div className = "col-12">
                        <InterviewTable interviews = { interviews } setInterviews = { setInterviews }/>
                    </div>
                </div>
            </div>
        </div>
    )
}