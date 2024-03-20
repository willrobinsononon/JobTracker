import React, { useState, useEffect } from 'react';
import ButtonToggle from './buttonToggle'
import cookie from "react-cookies";
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


export default function InterviewTableRow({ interview, interviews, setInterviews, applicationId, userInterviews, setUserInterviews, formAlert, setFormAlert }) {

    var intInitialValues = {
        id: interview.id,
        location: interview.location,
        notes: interview.notes
    };
    
    var initMode = 'view'
    if ('new' in interview) {
        initMode = 'edit';
        intInitialValues = {
            id: interview.id,
            location: interview.location,
            notes: interview.notes,
            new: true
        };
    }


    const [intData, setIntData] = useState(intInitialValues);
    const [mode, setMode] = useState(initMode);
    const [intDate, setIntDate] = useState(new Date(interview.scheduled_time));
    

    registerLocale("en-GB", enGB);

    function submit() {
        if ( intData.location === "" ) {
            setFormAlert({alert: true, message: "Location can't be empty"});
            return false
        }

        var clash = false;
        var intClash = {}
        var intClashTime = new Date()
        const msHour = 60*60*1000
        const intDatems = intDate.getTime()
        userInterviews.map( interview => {
            if (interview.id != intData.id) {
                const compDate = new Date(interview.scheduled_time);
                const compDatems = compDate.getTime()
                if (compDatems > intDatems  - msHour && compDatems < intDatems + msHour) {
                    clash = true
                    intClash = interview
                    intClashTime = compDate
                }
            }
        })

        if (clash) {
            setFormAlert({alert: true, message: `Clash! You already have an interview at ${intClash.location} at ${intClashTime.toLocaleString()}`});
            return false
        }


        if ('new' in intData ) {
            fetch(`jobapi/interviews/`, {
                method: 'POST',
                headers: { 'X-CSRFToken': cookie.load("csrftoken"),
                            'Content-Type': 'application/json'},
                body: JSON.stringify({
                    scheduled_time: intDate,
                    location: intData.location,
                    notes: intData.notes,
                    application: applicationId
                })
              })
            .then(response => {
                if (response.status === 201) {
                    response.json().then(result => {
                        const {new: _, ...rest} = intData;
                        setFormAlert({alert: false, message: ""});
                        updateInterviewList (userInterviews, rest, result.id, setUserInterviews)
                        updateInterviewList (interviews, rest, result.id, setInterviews)
                        setIntData({ ...rest, ['id']: result.id, ['scheduled_time']: intDate });
                    })
                }
            });
        }
        else {
            fetch(`jobapi/interviews/${intData.id}/`, {
                method: 'PUT',
                headers: { 'X-CSRFToken': cookie.load("csrftoken"),
                            'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: intData.id,
                    scheduled_time: intDate,
                    location: intData.location,
                    notes: intData.notes,
                    application: applicationId
                })
            })
            .then(response => response.json())
            .then(result => {console.log(result)});
        }
        return true
    }

    function onDelete() {
        if ('new' in intData ) {
            removeRow(204)
            return 
        }

        fetch(`jobapi/interviews/${intData.id}/`, {
            method: 'DELETE',
            headers: { 'X-CSRFToken': cookie.load("csrftoken")},
          })
          .then(response => removeRow(response.status))
    }

    function removeRow( status ) {
        if ( status === 204 ) {
            setInterviews(interviews.filter((item) => item.id !== intData.id))
            setUserInterviews(userInterviews.filter((item) => item.id !== intData.id))
            setFormAlert({alert: false, message: ""});
        }
    }

    const ChangeHandle = (event) => {
        if (mode === "edit") {
            setIntData({ ...intData, [event.target.name]: event.target.value });
        }
    };

    function updateInterviewList (interviewList, data, newId, updateFunction) {
        let tempInterviewList = [...interviewList] 
        let intIndex = tempInterviewList.findIndex(obj => obj.id == intData.id);
        tempInterviewList[intIndex] = { ...data, ['id']: newId, ['scheduled_time']: intDate }
        updateFunction(tempInterviewList)
    }

    return (
        <tr className = { mode } id = { intData.id }>
        <td><DatePicker 
            selected={intDate} 
            locale={'en-GB'} 
            onChange={(date) => setIntDate(date)} 
            dateFormat="dd/MM/yy h:mm aa"  
            showTimeInput 
            disabled={ mode === "view" }
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            /></td>
        <td><input type="text" name="location" className="int-input text-ellipsis" value={ intData.location } disabled={ mode === "view" } onChange={ ChangeHandle }></input></td>
        <td><input type="text" name="notes" className="int-input text-ellipsis" value={ intData.notes } disabled={ mode === "view" } onChange={ ChangeHandle }></input></td>
        <td><ButtonToggle mode = { mode } setMode = { setMode } submit = { submit } onDelete = { onDelete }/></td>
        </tr>
    )
}