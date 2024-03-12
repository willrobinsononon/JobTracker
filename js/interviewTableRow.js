import React, { useState, useEffect } from 'react';

export default function InterviewTableRow({ interview, mode}) {
    const dateObj = new Date(interview.scheduled_time);
    var year = dateObj.getFullYear().toString().slice(2)
    var month = dateObj.getMonth()
    var day = dateObj.getDate()
    var hours = dateObj.getHours();
    var minutes = dateObj.getMinutes();
    var suffix = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var date =  hours + ':' + minutes + suffix + ", " +  day + "/" + month + "/" + year;

    return (
        <tr>
        <td><input type="text" name="date" className="int-input edit-input-text" defaultValue={ date } disabled={ mode === "view" }></input></td>
        <td><input type="text" name="location" className="int-input edit-input-text" defaultValue={ interview.location } disabled={ mode === "view" }></input></td>
        <td><input type="text" name="interview-notes" className="int-input edit-input-text" defaultValue={ interview.notes } disabled={ mode === "view" }></input></td>
        </tr>
    )
}