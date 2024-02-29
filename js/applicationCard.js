import React from 'react';

export default function ApplicationCard({ application }) {
    return (
        <div className = "applicationContainer" data-app_id={ application.id }>
            <div className = "applicationHeader">
                <span className = "jobTitle">{ application.job_title}</span>
                <span className = "employerName">{ application.employer }</span>
            </div>
            <div className = "applicationBody">
                <div className = "status">
                    { application.status }
                </div>
                <textarea className = "Notes" value={ application.notes } readOnly></textarea>
            </div>
        </div>
    )
}