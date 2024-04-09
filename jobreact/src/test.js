import React, { useState, useEffect } from 'react';

function Test12() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:8000/jobapi/applications.json')
            .then(response => response.json())
            .then(result => {
                setMessage(result[0]['employer']);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
        
    return (
        <div>
            <h1>{message}</h1>
            <p>testing testing...</p>
        </div>
    );
}

export default Test12;
