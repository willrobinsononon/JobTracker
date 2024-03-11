import React, { useState, useEffect } from 'react';
import InterviewTable from './interviewTable'

export default function ApplicationCard({ application }) {
    var statusClass = ""

    if (application.status === "Unsuccessful" || application.status === "Successful") {
        statusClass = "status-final"
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

    renderHeader() {
        if (mode === 'view') {
            
        }
        else {
            
        }
    }

    renderStatus() {
        if (mode === 'view') {
            
        }
        else {
            
        }
    }

    renderNotes() {
        if (mode === 'view') {
            
        }
        else {
            
        }
    }

    renderInterviews() {
        if (mode === 'view') {
            
        }
        else {
            
        }
    }
    if (editMode) {
    return (
        <div className = {"application-container container-fluid my-2 status-" + application.status.slice(0, 3)} data-app_id={ application.id }>
            <div className = "application-header row">
                <div className = "job-title col-6">{ application.job_title}</div>
                <div className = "employer-name col-6 mt-auto text-end">{ application.employer }</div>
            </div>
            <div className = "application-body">
                <div className = "row">
                    <div className = {"current-status col-6 inner-title " + statusClass}>
                    { application.status }
                        <hr />
                    </div>
                    <div className = "col-6 text-end">
                        <img className="edit-image" data-application-id={ application.id } src="/static/assets/edit.png" title="edit button" onClick={editClick}></img>
                    </div>
                </div>
                <div className = "row my-2">
                    <div className = "status col-12">
                        <span className="inner-title">Notes:</span>
                        <textarea className = "notes-textarea inner-bdr my-2" value={ application.notes } readOnly></textarea>
                    </div>
                </div>
                <div className = "row">
                    <div className = "col-12">
                        <span className="inner-title">Interviews:</span>
                        <InterviewTable interviews = { application.interviews } />
                    </div>
                </div>
            </div>
        </div>
    )
    }
    else {
        return (
            <div className = {"application-container container-fluid my-2 status-" + application.status.slice(0, 3)} data-app_id={ application.id }>
                <div className = "application-header row">
                    <div className = "job-title col-6">{ application.job_title}</div>
                    <div className = "employer-name col-6 mt-auto text-end">{ application.employer }</div>
                </div>
                <div className = "application-body">
                    <div className = "row">
                        <div className = {"current-status col-6 inner-title " + statusClass}>
                        { application.status }
                            <hr />
                        </div>
                        <div className = "col-6 text-end">
                            <img className="edit-image" data-application-id={ application.id } src="/static/assets/edit.png" title="edit button" onClick={editClick}></img>
                        </div>
                    </div>
                    <div className = "row my-2">
                        <div className = "status col-12">
                            <span className="inner-title">Notes:</span>
                            <textarea className = "notes-textarea inner-bdr my-2" value={ application.notes } readOnly></textarea>
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "col-12">
                            <span className="inner-title">Interviews:</span>
                            <InterviewTable interviews = { application.interviews } />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}