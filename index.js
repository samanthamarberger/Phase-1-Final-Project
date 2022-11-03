document.addEventListener('DOMContentLoaded', () => {
    const submitForm = document.getElementsByClassName('add-job-form')[0];
    submitForm.addEventListener('submit', handleSubmit)

    function handleSubmit(e) {
        e.preventDefault();
        //console.log(submitForm);
        let jobObj = {
            companyName: e.target.name.value,
            position: e.target.position.value,
            imageURL: e.target.image.value
        }
        //console.log(jobObj);
        createNewJob(jobObj);
        e.target.name.value = "";
        e.target.position.value = "";
        e.target.image.value = "";
    }

    function createNewJob(jobObject) {
        fetch('http://localhost:3000/jobs', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
            },
            body: JSON.stringify(jobObject)
        })
        .then(res => res.json())
        .then(job => {
            addJobToTheDOM(job);
        })
    }

    // function addJobToTheDOM(job){
    //     const div = document.createElement('div');
    //     div.classList.add('card');
    // }
})
