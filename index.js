document.addEventListener('DOMContentLoaded', () => {
    getJobs();
    const submitForm = document.getElementsByClassName('add-job-form')[0];
    submitForm.addEventListener('submit', handleSubmit);

    //acquires all data from api
    function getJobs() {
        fetch("http://localhost:3000/jobs")
            .then(res => res.json())
            .then(jobs => {
                jobs.forEach(job => {
                    addJobToTheDOM(job);
                })
            })
    }

    //Function that takes care of new job being added to the DOM 
    function handleSubmit(e) {
        e.preventDefault();
        let jobObj = {
            companyName: e.target.name.value,
            position: e.target.position.value,
            imageURL: e.target.image.value,
            interviewDate: "Not schelduled"
        }
        createNewJob(jobObj);
        e.target.name.value = "";
        e.target.position.value = "";
        e.target.image.value = "";
    }

    //adds new job to the server
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
                addJobToTheDOM(job);
            })
    }

    //creates cards 
    function addJobToTheDOM(jobObj) {
        const div = document.createElement('div');
        div.classList.add(`card`);
        div.setAttribute('id', `card-${jobObj.id}`);
        const h2 = document.createElement('h2');
        h2.innerText = jobObj.companyName;
        const date = document.createElement('h2');
        date.innerText = `Interview Date: ${jobObj.interviewDate}`;
        date.setAttribute('id', `interviewDate-${jobObj.id}`);
        date.style.display = 'none';
        const img = document.createElement('img');
        img.src = jobObj.imageURL;
        const h3 = document.createElement('h3');
        h3.innerText = `Job Title: ${jobObj.position}`;
        rmvBtn = document.createElement('button');
        rmvBtn.classList.add(`remove-btn-${jobObj.id}`);
        rmvBtn.innerText = "Remove Job";
        const interviewBtn = document.createElement('button');
        interviewBtn.setAttribute("id", `add-interview-${jobObj.id}`);
        interviewBtn.innerText = "Add interview date";
        const popupForm = document.createElement('form');
        popupForm.style.display = "none";
        popupForm.setAttribute(`id`, `popupForm-${jobObj.id}`);
        popupForm.innerHTML = `
            <form class="add-date-form">
                <input
                type="text"
                name="date"
                value=""
                placeholder="Enter date..."
                class="input-text"
                />
                <br />
                <input
                type="submit"
                name="submit"
                value="submit"
                class="submit"
                />
            </form>
            `

        interviewBtn.addEventListener('click', (e) => {
            addInterview(div, jobObj.id);
        });
        rmvBtn.addEventListener('click', () => {
            removeJobDOM(jobObj.id);
            deleteJob(jobObj.id);
        });
        img.addEventListener("mouseover", () => {
            date.style.display = "block";
        });
        img.addEventListener("mouseout", () => {
            date.style.display = "none";
        });

        div.appendChild(h2);
        div.appendChild(date);
        div.appendChild(img);
        div.appendChild(h3);
        div.appendChild(interviewBtn);
        div.appendChild(rmvBtn);
        div.appendChild(popupForm);

        document.getElementById('job-collection').appendChild(div);
    };

    //submit pop up for the date is shown and data is entered - sends event to submit handler
    function addInterview(div, id) {
        const popup = document.getElementById(`popupForm-${id}`)
        popup.style.display = 'block';
        const interviewBtn = document.getElementById(`add-interview-${id}`);
        popup.addEventListener('submit', (e) => {
            e.preventDefault();
            handleDateSubmit(e, div, popup, id);
        });
    }

    // removes card from DOM
    function removeJobDOM(id) {
        const rmvCard = document.getElementById(`card-${id}`);
        rmvCard.remove();

    }

    // removes card from server
    function deleteJob(id) {
        fetch(`http://localhost:3000/jobs/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(job => {
                console.log(job);
            })
    }

    //Get value from date submit and have it be set to the 'date' in the DOM
    function handleDateSubmit(e, div, popup, id) {
        const date = e.target.children[0].value;
        div.children[1].innerText = `Interview date: ${date}`;
        popup.style.display = 'none';
        addDate(id, date);
    }

    //Adds date to the api
    function addDate(id, date) {
        fetch(`http://localhost:3000/jobs/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                interviewDate: date,
            }),
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json"
            }
        })
            .then(res => res.json())
            .then(job => {
                console.log(job);
            })
    }
})
