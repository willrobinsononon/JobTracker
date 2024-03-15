import React, { useState, useEffect } from 'react';
import ButtonToggle from './buttonToggle'
import cookie from "react-cookies";
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


export default function InterviewTableRow({ interview, interviews, setInterviews, applicationId}) {

    const intInitialValues = {
        location: interview.location,
        notes: interview.notes
    };
    
    var initMode = 'view'
    if ('new' in interview) {
        initMode = 'edit';
    }


    const [intData, setIntData] = useState(intInitialValues);
    const [mode, setMode] = useState(initMode);
    const [intDate, setIntDate] = useState(new Date(interview.scheduled_time));

    registerLocale("en-GB", enGB);

    function submit() {
        if ( intData.location === "" ) {
            alert("Location can't be empty");
            return false
        }

        if ('new' in interview && interview['new'] === true) {
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
                    interview.new = false;
                }
                response.json().then(result => {
                    console.log(result)
                    interview.id = result.id;
                })});
        }
        else {
            fetch(`jobapi/interviews/${interview.id}/`, {
                method: 'PUT',
                headers: { 'X-CSRFToken': cookie.load("csrftoken"),
                            'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: interview.id,
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

        if ( intData.location === "" || intDate < new Date().toJSON()) {
            removeRow(204)
            return 
        }

        fetch(`jobapi/interviews/${interview.id}/`, {
            method: 'DELETE',
            headers: { 'X-CSRFToken': cookie.load("csrftoken")},
          })
          .then(response => removeRow(response.status))
    }

    function removeRow( status ) {
        if ( status === 204 ) {
            setInterviews(interviews.filter((item) => item.id !== interview.id))
        }
    }

    const ChangeHandle = (event) => {
        if (mode === "edit") {
            setIntData({ ...intData, [event.target.name]: event.target.value });
        }
    };

    return (
        <tr className = { mode }>
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
        <td><input type="text" name="location" className="int-input" value={ intData.location } disabled={ mode === "view" } onChange={ ChangeHandle }></input></td>
        <td><input type="text" name="notes" className="int-input" value={ intData.notes } disabled={ mode === "view" } onChange={ ChangeHandle }></input></td>
        <td><ButtonToggle mode = { mode } setMode = { setMode } submit = { submit } onDelete = { onDelete }/></td>
        </tr>
    )
}