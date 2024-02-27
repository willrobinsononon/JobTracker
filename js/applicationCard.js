export default function ApplicationCard({ application }) {
    return (
        <div className = "applicationContainer">
            <div className = "applicationHeader">
                <span className = "jobTitle">{ application.job_title}</span>
                <span className = "employerName">{ application.employer }</span>
            </div>
            <div className = "applicationBody">
                <div className = "status">
                    { application.status }
                </div>
                <textarea className = "Notes">
                    { application.notes }
                </textarea>
            </div>
        </div>
    )
}