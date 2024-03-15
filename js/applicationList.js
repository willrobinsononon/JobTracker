import React, { useState, useEffect } from 'react';
import ApplicationCard from './applicationCard'

export default function ApplicationList( props ) {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        fetch('/jobapi/applications.json')
            .then(response => response.json())
            .then(result => {
                setApplications(result);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        applications.map( application => <ApplicationCard key={ application.id } application={ application } applications = { applications } setApplications = { setApplications }/>)
    )
}
