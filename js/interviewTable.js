import React from 'react';
import InterviewTableRow from './interviewTableRow'

export default function InterviewTable({ interviews, mode }) {

    return (
        <table className="table interview-table inner-bdr my-2">
        <thead>
            <tr>
            <th scope="col" className="col-2">Time</th>
            <th scope="col" className="col-5">Location</th>
            <th scope="col" className="col-5">Notes</th>
            </tr>
        </thead>
        <tbody>
            { interviews.map( interview => <InterviewTableRow key={ interview.id } interview={ interview } mode={ mode } />) }
        </tbody>
        </table>
    )
}