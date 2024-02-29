export default function test1({ applications }) {
    const applications = [];

    useEffect(() => {
        fetch('http://localhost:8000/jobapi/applications.json')
            .then(response => response.json())
            .then(result => {
                applications =;
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        applications.map( application => <ApplicationCard application={ application } />)
    )
}