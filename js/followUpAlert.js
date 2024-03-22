import React, { useState, useEffect } from 'react';
import cookie from "react-cookies";


export default function FollowUpAlert({ application, appData }) {

    const applicationDate = new Date (application.date_applied)
    var twoWeeksAgo = new Date()
    twoWeeksAgo.setDate(twoWeeksAgo.getDate()-14);

    const [followUp, setFollowUp] = useState(false)

    useEffect(() => {
        if (applicationDate < twoWeeksAgo && application.followed_up !== true) {
            setFollowUp(true)
        }
    }, [])
    

    function followedUp() {
        fetch(`jobapi/applications/${appData.id}/`, {
            method: 'PATCH',
            headers: { 'X-CSRFToken': cookie.load("csrftoken"),
                        'Content-Type': 'application/json'},
            body: JSON.stringify({
                followed_up: true,
            })
        })
        .then(response => {
            if (response.status === 200) {
                setFollowUp(false);
        }});
    }

    if (followUp) {
        return (
            <div className = { "alert alert-warning my-alert" } role="alert">
                <span>It's been two weeks since you applied for this job, it's time to follow up! Contact the company by email or phone to check on the status of your application.</span><br/>
                <span>Tick if followed up: </span>
                <input type="checkbox" onClick = { followedUp }></input>
            </div>
        )
    }
    else {
        return
    }
}