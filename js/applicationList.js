import React, { useState, useEffect } from 'react';
import ApplicationCard from './applicationCard';

export default function ApplicationList({ userInterviews, setUserInterviews, applications, setApplications }) {
    

    useEffect(() => {
        fetch('/jobapi/applications.json')
            .then(response => response.json())
            .then(result => {
                var allInterviews = []
                result.map(application => allInterviews = [...allInterviews, ...application.interviews])
                setUserInterviews(allInterviews)
                const reversed = result.reverse();
                setApplications(reversed);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function addApplication() {
        var id = 0
        if ( applications.length > 0 ) {
            id = applications[0].id + 1
        }

        var newApplication = {
            id: id,
            job_title: "Job Title",
            employer: "Employer",
            status: "Applied",
            notes: "",
            interviews: [],
            new: true
        }
        setApplications([newApplication, ...applications])
    }

    return (
        <div className = "application-list">
            <div className="big-add-button-container">
                <img className="big-icon-button" src="/static/assets/big_add.png" title="add button" onClick={ addApplication }></img>
            </div>
            { applications.map( application =>
                <ApplicationCard 
                    key={ application.id } 
                    application={ application } 
                    applications = { applications } 
                    setApplications = { setApplications }
                    userInterviews = { userInterviews } 
                    setUserInterviews = { setUserInterviews }
                />)}
        </div>
        
    )
}
