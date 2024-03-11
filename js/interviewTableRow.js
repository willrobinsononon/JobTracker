import React, { useState, useEffect } from 'react';

export default function InterviewTableRow({ interview }) {
    const [date, setDate] = useState("");

    useEffect (() => {
        const date = new Date(interview.scheduled_time);
        var year = date.getFullYear().toString().slice(2)
        var month = date.getMonth()
        var day = date.getDate()
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var suffix = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+minutes : minutes;
        setDate(  hours + ':' + minutes + suffix + ", " +  day + "/" + month + "/" + year );
    })

    return (
        <tr>
        <td>{ date.toLocaleString() }</td>
        <td>{ interview.location }</td>
        <td>{ interview.notes }</td>
        </tr>
    )
}