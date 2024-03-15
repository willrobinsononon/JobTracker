import React, { useState, useEffect } from 'react';
import ApplicationCard from './applicationCard';
import BigAddButton from './bigAddButton';

export default function ApplicationList( props ) {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetch('/jobapi/applications.json')
            .then(response => response.json())
            .then(result => {
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
                <BigAddButton add = { addApplication }/>
            </div>
            { applications.map( application => <ApplicationCard key={ application.id } application={ application } applications = { applications } setApplications = { setApplications }/>) }
        </div>
        
    )
}
