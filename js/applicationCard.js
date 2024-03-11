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

    function renderHeader() {
        if (mode === 'view') {
            return (
                <div className = "application-header row">
                    <div className = "job-title col-6">{ application.job_title}</div>
                    <div className = "employer-name col-6 mt-auto text-end">{ application.employer }</div>
                </div>
            )
        }
        else {
            return (
                <div className = "application-header row">
                    <input type="text" id="app-title" className = "job-title col-6 edit-input-text" defaultValue={ application.job_title }></input>
                    <input type="text" id="app-employer" className = "employer-name col-6 mt-auto text-end edit-input-text" defaultValue={ application.employer }></input>
                </div>
            )
        }
    }

    function renderStatusRow() {
        if (mode === 'view') {
            return (
                <div className = "row">
                    <div className = {"current-status col-6 inner-title " + statusClass}>
                        { application.status }
                    </div>
                    <div className = "col-6 text-end">
                        <img className="icon-button" data-application-id={ application.id } src="/static/assets/edit.png" title="edit button" onClick={editClick}></img>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className = "row">
                    <input type="text" id="app-status" className = "current-status col-6 inner-title edit-input-text" defaultValue={ application.status }>
                    </input>
                    <div className = "col-6 text-end">
                        <img className="icon-button" data-application-id={ application.id } src="/static/assets/submit.png" title="submit button" onClick={editClick}></img>
                    </div>
                </div>
            )
        }
    }

    function renderNotes() {
        if (mode === 'view') {
            return (
                <textarea className = "notes-textarea inner-bdr my-2" defaultValue={ application.notes } readOnly></textarea>
            )
        }
        else {
            return(
                <textarea className = "notes-textarea inner-bdr my-2" defaultValue={ application.notes }></textarea>
            )
        }
    }

    return (
        <div className = {"application-container container-fluid my-2 status-" + application.status.slice(0, 3)} data-app_id={ application.id }>
            { renderHeader() }
            <div className = "application-body">
                { renderStatusRow()}
                <hr className="mt-3 mx-2" />
                <div className = "row my-2">
                    <div className = "status col-12">
                        <span className="inner-title">Notes:</span>
                        { renderNotes() }
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