import React, { useState, useEffect } from 'react';
import ButtonToggle from './buttonToggle'
import cookie from "react-cookies";
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


export default function InterviewTableRow({ interview}) {

    const intInitialValues = {
        location: interview.location,
        notes: interview.notes
    };

    const [intData, setIntData] = useState(intInitialValues);
    const [mode, setMode] = useState('view');
    const [intDate, setIntDate] = useState(new Date(interview.scheduled_time));

    registerLocale("en-GB", enGB);

    function submit() {

        fetch(`jobapi/interviews/${interview.id}/`, {
            method: 'PUT',
            headers: { 'X-CSRFToken': cookie.load("csrftoken"),
                        'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: interview.id,
                scheduled_time: intDate,
                location: intData.location,
                notes: intData.notes
            })
          })
          .then(response => response.json())
          .then(result => {console.log(result)});
    }

    const ChangeHandle = (event) => {
        if (mode === "edit") {
            setIntData({ ...intData, [event.target.name]: event.target.value });
        }
    };

    return (
        <tr class = { mode }>
        <td><DatePicker selected={intDate} locale={'en-GB'} onChange={(date) => setIntDate(date)} dateFormat="dd/MM/yy h:mm aa"  showTimeInput disabled={ mode === "view" }/></td>
        <td><input type="text" name="location" className="int-input" value={ intData.location } disabled={ mode === "view" } onChange={ ChangeHandle }></input></td>
        <td><input type="text" name="notes" className="int-input" value={ intData.notes } disabled={ mode === "view" } onChange={ ChangeHandle }></input></td>
        <td><ButtonToggle mode = { mode } setMode = { setMode } submit = { submit }/></td>
        </tr>
    )
}