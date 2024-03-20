import React, { useState, useEffect } from 'react';
import ApplicationList from './applicationList'

export default function JobtrackerApp( props ) {
    const [userInterviews, setUserInterviews] = useState([]);

    return (
        < ApplicationList userInterviews = { userInterviews } setUserInterviews = { setUserInterviews } />
    )
}
