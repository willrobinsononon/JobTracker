import React from 'react';

export default function InterviewTableRow({ interview }) {
    return (
        <tr>
        <td>{ interview.scheduled_time }</td>
        <td>{ interview.location }</td>
        <td>{ interview.notes }</td>
        </tr>
    )
}