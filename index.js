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
        addJobToTheDOM(jobObj);
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
                console.log(job);
            })
    }

    function addJobToTheDOM(jobObj) {
        const div = document.createElement('div');
        div.classList.add('card');
        const h2 = document.createElement('h2');
        h2.innerText = jobObj.companyName;
        console.log(h2.innerText);
        const img = document.createElement('img');
        img.src = jobObj.imageURL;
        const h3 = document.createElement('h3');
        h3.innerText = `Job Title: ${jobObj.position}`;
        rmvBtn = document.createElement('button');
        rmvBtn.classList.add('remove-btn');
        rmvBtn.innerText = "Remove Job";
        const interviewBtn = document.createElement('button');
        interviewBtn.classList.add('add-interview');
        interviewBtn.innerText = "Add interview date";

        div.appendChild(h2);
        div.appendChild(img);
        div.appendChild(h3);
        div.appendChild(rmvBtn);
        div.appendChild(interviewBtn);

        document.getElementById('job-collection').appendChild(div);
    }
})
