import React, { useState, useEffect } from 'react';
import InterviewTableRow from './interviewTableRow'

export default function InterviewTable( {interviews, setInterviews, userInterviews, setUserInterviews, setFormAlert} ) {
    return (
        <table className="table interview-table inner-bdr my-2">
        <thead>
            <tr>
            <th scope="col" className="col-2">Time</th>
            <th scope="col" className="col-5">Location</th>
            <th scope="col" className="col-5">Notes</th>
            <th scope="col" className="col-auto"></th>
            </tr>
        </thead>
        <tbody>
            { interviews.map( interview => 
            <InterviewTableRow 
                key={ interview.id } 
                interview={ interview } 
                interviews = { interviews } 
                setInterviews = { setInterviews } 
                userInterviews = { userInterviews } 
                setUserInterviews = { setUserInterviews }
                setFormAlert = { setFormAlert }
            />) }
                
        </tbody>
        </table>
    )
}