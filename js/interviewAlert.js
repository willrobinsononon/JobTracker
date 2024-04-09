import React, { useState, useEffect } from 'react';

export default function InterviewAlert({ interview, applications }) {
    const date = new Date(interview.scheduled_time);
    const dateString = date.toLocaleString();
    const application = applications.find(instance => instance.id === interview.application)

    return (
        <div className = "alert alert-light interview-alert" role="alert">
                <strong>{ dateString }<br/>
                Location: { interview.location }<br/></strong>
                Job Title: { application.job_title }<br/>
                Employer: { application.employer }
        </div>
    )
}