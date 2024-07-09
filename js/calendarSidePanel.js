import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar'
import DailyInterviewList from './dailyInterviewList'

export default function CalendarSidePanel({ userInterviews, applications }) {

    const [interviewDates, setInterviewDates] = useState([]);
    const [dailyInterviews, setDailyInterviews] = useState([]);

    useEffect(() => {
      setInterviewDates(userInterviews.map((interview) => {if (!("new" in interview)) {return interview.scheduled_time}}));
  }, [userInterviews]);

      function onClickDay (value, event) {
        const clickedDay = new Date(value);
        var tempList = userInterviews.filter((interview) => {
            const interviewDate = new Date(interview.scheduled_time);
            return clickedDay.getDate() === interviewDate.getDate() && clickedDay.getMonth() === interviewDate.getMonth() && clickedDay.getFullYear() === interviewDate.getFullYear() 
        });
        setDailyInterviews(tempList);
      }

      function tileClassName({ date, view }) {
        if (view === 'month') {
          if (interviewDates.find(dDate => {
            const dDateObj = new Date(dDate);
            return (dDateObj.getDate() === date.getDate() && dDateObj.getMonth() === date.getMonth() && dDateObj.getFullYear() === date.getFullYear() ) })) {
            return 'interview-day';
          }
        }
      }

    return (
        <div className = "calendar-sidepanel container-fluid my-2">
            <div className = "row">
                <div className = "col-12">
                  <span className = "my-title">Interview Calendar</span>
                </div>
              </div>
            <div className = "row my-3">
              <div className = "col-12">
              <div classame = "calendar-container">
                  <Calendar onClickDay = { onClickDay } tileClassName = { tileClassName }/>
                </div>
              </div>
            </div>
            <div className = "row">
              <div className = "col-12">
                  <DailyInterviewList dailyInterviews = { dailyInterviews } applications = { applications }/>
              </div>
            </div>
        </div>
        
    )
}
