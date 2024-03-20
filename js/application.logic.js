export function submit() {
    if ( appData.job_title === "" || appData.job_title === "Job Title" ) {
        alert("You must enter a job title");
        return false
    }
    if ( appData.employer === "" || appData.employer === "Employer" ) {
        alert("You must enter an employer");
        return false
    }

    if ('new' in application && application['new'] === true) {
        fetch(`jobapi/applications/`, {
            method: 'POST',
            headers: { 'X-CSRFToken': cookie.load("csrftoken"),
                        'Content-Type': 'application/json'},
            body: JSON.stringify({
                job_title: appData.job_title,
                employer: appData.employer,
                notes: appData.notes,
                status: appData.status
            })})
            .then(response => {
                if (response.status === 201) {
                    application.new = false;
                    response.json().then(result => {
                        setAppData({ ...appData, ['id']: result.id })
                    })
                }
            });
    }
    else {
        fetch(`jobapi/applications/${appData.id}/`, {
            method: 'PUT',
            headers: { 'X-CSRFToken': cookie.load("csrftoken"),
                        'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: appData.id,
                date_applied: application.date_applied,
                job_title: appData.job_title,
                employer: appData.employer,
                notes: appData.notes,
                followed_up: application.followed_up,
                status: appData.status
            })
        })
        {/*}.then(response => response.json())
        .then(result => {console.log(result)});*/}
    }
    return true
}

export function onDelete() {
    if ('new' in application && application['new'] === true) {
        removeApplication(204)
        return 
    }

    fetch(`jobapi/applications/${appData.id}/`, {
        method: 'DELETE',
        headers: { 'X-CSRFToken': cookie.load("csrftoken")},
      })
      .then(response => removeApplication(response.status))
}

function removeApplication( status ) {
    if ( status === 204 ) {
        setApplications(applications.filter((item) => item.id !== appData.id))
    }
}

export function addApplication() {
    var id = 0
    if ( applications.length > 0 ) {
        id = applications[0].id + 1
    }

    var newApplication = {
        id: id,
        job_title: "Job Title",
        employer: "Employer",
        status: "Applied",
        notes: "",
        interviews: [],
        new: true
    }
    setApplications([newApplication, ...applications])
}