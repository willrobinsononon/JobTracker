import React, { useState, useEffect } from 'react';
import ApplicationList from './applicationList'
import CalendarSidePanel from './calendarSidePanel'
import 'react-calendar/dist/Calendar.css';

export default function JobtrackerApp( props ) {
    
    const [userInterviews, setUserInterviews] = useState([]);
    const [applications, setApplications] = useState([]);
    const [showCalendar, setShowCalendar] = useState(true);

    useEffect(() => {
        const handleResize = () => {
        if (window.innerWidth < 992) {
            setShowCalendar(false);
        } else {
            setShowCalendar(true);
        }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function calendarRenderer(showCalendar) {
        if (showCalendar) {
            return (
                <div className = "col-4 main-col">
                    <CalendarSidePanel userInterviews = { userInterviews } applications = { applications }/>
                </div>
            )
        }
        else {
            return
        }
    }

    return (
        <div className = "container">
            <div className = "row">
                <div className = "col main-col">
                    < ApplicationList userInterviews = { userInterviews } setUserInterviews = { setUserInterviews } applications = { applications } setApplications = { setApplications }/>
                </div>
                { calendarRenderer(showCalendar) }
            </div>
        </div>
    )
}
