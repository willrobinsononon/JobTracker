import React, { useState, useEffect } from 'react';
import ButtonToggle from './buttonToggle'
import cookie from "react-cookies";
import DatePicker, { registerLocale } from "react-datepicker";
import enGB from "date-fns/locale/en-GB";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


export default function InterviewTableRow({ interview, interviews, setInterviews, userInterviews, setUserInterviews, setFormAlert }) {

    const intInitialValues = {...interview, ['scheduled_time']: new Date(interview.scheduled_time)}

    var initMode = 'view'
    if ('new' in interview) {
        initMode = 'edit';
    };
    
    const [intData, setIntData] = useState(intInitialValues);
    const [mode, setMode] = useState(initMode);

    useEffect(() => {
        updateList (userInterviews, intInitialValues, intInitialValues.id, setUserInterviews);
        updateList (interviews, intInitialValues, intInitialValues.id, setInterviews);
    }, []);

    registerLocale("en-GB", enGB);

    function submit() {
        if ( intData.location === "" ) {
            setFormAlert({alert: true, message: "Location can't be empty"});
            return false
        }

        var clash, intClash, intClashTime = [false, {}, new Date()];
        const msHour = 60*60*1000
        const intDatems = intData.scheduled_time.getTime()
        userInterviews.map( interview => {
            if (interview.id != intData.id) {
                const compDate = new Date(interview.scheduled_time);
                const compDatems = compDate.getTime()
                if (compDatems > intDatems  - msHour && compDatems < intDatems + 2 * msHour) {
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
                    scheduled_time: intData.scheduled_time,
                    location: intData.location,
                    notes: intData.notes,
                    application: intData.application
                })
              })
            .then(response => {
                if (response.status === 201) {
                    response.json().then(result => {
                        const {new: _, ...rest} = intData;
                        setFormAlert({alert: false, message: ""});
                        updateList (userInterviews, rest, result.id, setUserInterviews)
                        updateList (interviews, rest, result.id, setInterviews)
                        setIntData({ ...rest, ['id']: result.id });
                    })
                }
            });
        }
        else {
            fetch(`jobapi/interviews/${intData.id}/`, {
                method: 'PUT',
                headers: { 'X-CSRFToken': cookie.load("csrftoken"),
                            'Content-Type': 'application/json'},
                body: JSON.stringify(intData)
            })
            .then(response => {
                if (response.status === 200) {
                    setFormAlert({alert: false, message: ""});
                    updateList (userInterviews, intData, intData.id, setUserInterviews);
                    updateList (interviews, intData, intData.id, setInterviews);
                }
            });
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

    function updateList (interviewList, data, newId, updateFunction) {
        let tempInterviewList = [...interviewList];
        let intIndex = tempInterviewList.findIndex(obj => obj.id == intData.id);
        let intToSwapIndex = tempInterviewList.findIndex(obj => obj.id == newId);
        if (intToSwapIndex > -1) {
            tempInterviewList[intToSwapIndex] = { ...data, ['id']: intData.id, ['scheduled_time']: intData.scheduled_time };
        }
        tempInterviewList[intIndex] = { ...data, ['id']: newId, ['scheduled_time']: intData.scheduled_time };
        updateFunction(tempInterviewList);
    }

    return (
        <tr className = { mode }>
        <td><DatePicker 
            selected={intData.scheduled_time} 
            locale={'en-GB'} 
            onChange={(date) => setIntData({...intData, ['scheduled_time']: date})} 
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