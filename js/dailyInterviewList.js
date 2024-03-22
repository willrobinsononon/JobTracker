import React, { useState, useEffect } from 'react';
import InterviewAlert from './interviewAlert'

export default function DailyInterviewList({ dailyInterviews, applications }) {
    return (
        <div className = "daily-interviews-container">
            { dailyInterviews.map( interview =>
                <InterviewAlert key={ interview.id } interview = { interview } applications = { applications }/>
            )}
        </div>
        
    )
}