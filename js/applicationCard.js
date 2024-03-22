import React, { useState, useEffect } from 'react';
import InterviewTable from './interviewTable';
import ButtonToggle from './buttonToggle'
import EditingFlag from './editingFlag';
import AddButton from './addButton';
import StatusColumn from './statusColumn';
import cookie from "react-cookies";
import Alert from './Alert'
import FollowUpAlert from './followUpAlert'



export default function ApplicationCard({ application, applications, setApplications, userInterviews, setUserInterviews }) {

    const {['interviews']: _, ...appInitialValues} = application;

    var initMode = 'view'
    if ('new' in application) {
        initMode = 'edit';
    }

    const [appData, setAppData] = useState(appInitialValues);
    const [mode, setMode] = useState(initMode);
    const [interviews, setInterviews] = useState(application.interviews);
    const [formAlert, setFormAlert] = useState({alert: false, message: ""});

    function submit() {
        if ( appData.job_title === "" || appData.job_title === "Job Title" ) {
            setFormAlert({alert: true, message: "You must enter a job title"});
            return false
        }
        if ( appData.employer === "" || appData.employer === "Employer" ) {
            setFormAlert({alert: true, message: "You must enter an employer"});
            return false
        }
        
        if ('new' in appData) {
            fetch(`jobapi/applications/`, {
                method: 'POST',
                headers: { 'X-CSRFToken': cookie.load("csrftoken"),
                            'Content-Type': 'application/json'},
                body: JSON.stringify({
                    job_title: appData.job_title,
                    employer: appData.employer,
                    notes: appData.notes,
                    status: appData.status
                })})
                .then(response => {
                    if (response.status === 201) {
                        const {new: _, ...rest} = appData;
                        setFormAlert({alert: false, message: ""});
                        response.json().then(result => {
                            setAppData({ ...rest, ['id']: result.id })
                        })
                    }
                });
        }
        else {
            fetch(`jobapi/applications/${appData.id}/`, {
                method: 'PUT',
                headers: { 'X-CSRFToken': cookie.load("csrftoken"),
                            'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: appData.id,
                    date_applied: application.date_applied,
                    job_title: appData.job_title,
                    employer: appData.employer,
                    notes: appData.notes,
                    followed_up: application.followed_up,
                    status: appData.status
                })
            });
        }
        return true
    }

    function onDelete() {
        if ('new' in application ) {
            removeApplication(204)
            return 
        }

        fetch(`jobapi/applications/${appData.id}/`, {
            method: 'DELETE',
            headers: { 'X-CSRFToken': cookie.load("csrftoken")},
          })
          .then(response => removeApplication(response.status))
    }

    function removeApplication( status ) {
        if ( status === 204 ) {
            interviews.map((interview) => setUserInterviews(userInterviews.filter((item) => item.id !== interview.id)));
            setApplications(applications.filter((item) => item.id !== appData.id));
        }
    }

    function addInterview() {
        var id = 0
        if ( interviews.length > 0 ) {
            id = interviews[interviews.length - 1].id + 1
        }

        var newInterview = {
            id: id,
            scheduled_time: new Date(),
            location: "",
            notes: "",
            application: appData.id,
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
        <div className= "container-fluid my-2">
            <div className = "alertContainer">
                <FollowUpAlert application = { application } appData = { appData }/>
                <Alert alert = { formAlert } alertClass = { "alert-danger my-alert" }/>
            </div>
            <div className = {"application-container container-fluid " + (mode === 'view' ? "status-" + appData.status.slice(0, 3) : "edit-mode") } data-app_id={ appData.id }>
                <div className = "row">
                    <input type="text" className = "my-title col-6 edit-input-text text-ellipsis" name="job_title" value={ appData.job_title } disabled={ mode === "view" } onChange={ ChangeHandle }></input>
                    <input type="text" className = "employer-name col-6 mt-auto text-end edit-input-text text-ellipsis" name="employer" value={ appData.employer } disabled={ mode === "view" } onChange={ ChangeHandle }></input>
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
                            <AddButton add = { addInterview } isNew = { ('new' in application) }/>
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "col-12">
                            <InterviewTable 
                                interviews = { interviews } 
                                setInterviews = { setInterviews }
                                userInterviews = { userInterviews } 
                                setUserInterviews = { setUserInterviews }
                                setFormAlert = { setFormAlert }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}