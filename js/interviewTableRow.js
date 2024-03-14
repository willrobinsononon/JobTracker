import React, { useState, useEffect } from 'react';

export default function InterviewTableRow({ interview }) {
    const intInitialValues = {
        scheduled_time: interview.scheduled_time,
        location: interview.location,
        notes: interview.notes
    };

    const [intData, setIntData] = useState(intInitialValues);

    function dateFormat(date) {
        const dateObj = new Date(date);
        var year = dateObj.getFullYear().toString().slice(2);
        var month = dateObj.getMonth();
        var day = dateObj.getDate();
        var hours = dateObj.getHours();
        var minutes = dateObj.getMinutes();
        var suffix = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0'+ minutes : minutes;
        day = day < 10 ? '0'+ day : day;
        month = month < 10 ? '0'+ month : month;
        return (hours + ':' + minutes + suffix + ", " +  day + "/" + month + "/" + year)
    }

    function dateParse(dateString) {
        const hours = dateString.slice(0, 2);
        const minutes = dateString.slice(3, 5);
        const day = dateString.slice(10, 12);
        const month = dateString.slice(14, 16);
        const year = "20" + dateString.slice(18-20);
        dateObj = new Date(year, month, day, hours, minutes);
        return dateObj.toISOString()
    }
   

    const ChangeHandle = (event) => {
        if (mode === "edit") {
            setIntData({ ...intData, [event.target.name]: event.target.value });
        }
      };

    return (
        <tr>
        <td><input type="text" name="scheduled_time" className="int-input edit-input-text" value={ dateFormat(intData.scheduled_time) } disabled={ mode === "view" }></input></td>
        <td><input type="text" name="location" className="int-input edit-input-text" value={ interview.location } disabled={ mode === "view" }></input></td>
        <td><input type="text" name="notes" className="int-input edit-input-text" value={ interview.notes } disabled={ mode === "view" }></input></td>
        </tr>
    )
}