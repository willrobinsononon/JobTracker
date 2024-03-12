import React, { useState, useEffect } from 'react';
import InterviewTable from './interviewTable'

export default function ApplicationCard({ application }) {
    var statusClass = ""

    if (application.status === "Unsuccessful" || application.status === "Successful") {
        statusClass = "status-final";
    }

    const [mode, setMode] = useState('view');

    function editClick() {
        if (mode === 'view') {
            setMode('edit');
        }
        else {
            setMode('view');
        }
    }

    const initialValues = {
        job_title: application.job_title,
        employer: application.employer,
        status: application.status,
        notes: application.notes
    }

    const [appData, setAppData] = useState(initialValues)

    function renderModeButton() {
        if (mode === 'view') {
            return (
                <div className = "col-6 text-end">
                    <img className="icon-button" data-application-id={ application.id } src="/static/assets/edit.png" title="edit button" onClick={editClick}></img>
                </div>
            )
        }
        else {
            return (
                <div className = "col-6 text-end">
                    <span className="inner-title">Editing    </span>
                    <img className="icon-button" data-application-id={ application.id } src="/static/assets/submit.png" title="submit button" onClick={editClick}></img>
                </div>
            )
        }
    }

    return (
        <div className = {"application-container container-fluid my-2 " + (mode === 'view' ? "status-" +application.status.slice(0, 3) : "") } data-app_id={ application.id }>
            <div className = "application-header row">
                <input type="text" id="app-title" className = "job-title col-6 edit-input-text" value={ appData.job_title } disabled={ mode === "view" }></input>
                <input type="text" id="app-employer" className = "employer-name col-6 mt-auto text-end edit-input-text" value={ appData.employer } disabled={ mode === "view" }></input>
            </div>
            <div className = "application-body">
                <div className = "row">
                    <div className="current-status col-6 inner-title">
                        <select title="status" name="status" id="app-status" className = "edit-input-text status-select" value = { appData.status } disabled={ mode === "view" }>
                            <option value="Applied" >Applied</option>
                            <option value="Interview Booked" >Interview Booked</option>
                            <option value="Success" >Success</option>
                            <option value="Unsuccessful" >Unsuccessful</option>
                        </select>
                    </div>
                    { renderModeButton() }
                </div>
                <hr className="mt-3 mx-2" />
                <div className = "row my-2">
                    <div className = "status col-12">
                        <span className="inner-title">Notes:</span>
                        <textarea className = "notes-textarea inner-bdr my-2" value={ application.notes } readOnly={ mode === "view" }></textarea>
                    </div>
                </div>
                <div className = "row">
                    <div className = "col-12">
                        <span className="inner-title">Interviews:</span>
                        <InterviewTable interviews = { application.interviews } mode = { mode } />
                    </div>
                </div>
            </div>
        </div>
    )
}