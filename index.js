document.addEventListener('DOMContentLoaded', () => {
    getJobs();
    const submitForm = document.getElementsByClassName('add-job-form')[0];
    submitForm.addEventListener('submit', handleSubmit);

    function getJobs() {
        fetch ("http://localhost:3000/jobs")
        .then(res => res.json())
        .then(jobs => {
            for (const job of jobs){
                addJobToTheDOM(job);
            }
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        //console.log(submitForm);
        let jobObj = {
            companyName: e.target.name.value,
            position: e.target.position.value,
            imageURL: e.target.image.value,
            id: e.target.id.value
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
            div.classList.add(`card`);
            div.setAttribute('id', `card-${jobObj.id}`);
            const h2 = document.createElement('h2');
            h2.innerText = jobObj.companyName;
            //console.log(h2.innerText);
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

            interviewBtn.addEventListener('click', (e) =>{
                e.preventDefault();
                addInterview(div, jobObj.id);
            });
            rmvBtn.addEventListener('click', () => {
                removeJobDOM(div, jobObj.id);
                deleteJob(jobObj.id);
            });

            div.appendChild(h2);
            div.appendChild(img);
            div.appendChild(h3);
            div.appendChild(interviewBtn);
            div.appendChild(rmvBtn);
            div.appendChild(popupForm);

            document.getElementById('job-collection').appendChild(div);
    }

    function addInterview(div, id) {
        console.log(div);
        const popup = document.getElementById(`popupForm-${id}`)
        popup.style.display = 'block';
        const interviewBtn = document.getElementById(`add-interview-${id}`);
        popup.addEventListener('submit', (e) => {
            e.preventDefault();
            handleDateSubmit(popup, id);
        });
    }

    function removeJobDOM(div, id) {
        // console.log(div);
        // console.log(id);
        const rmvCard = document.getElementById(`card-${id}`);
        //console.log(rmvCard);
        rmvCard.remove();

    }

    function deleteJob(id){
        fetch(`http://localhost:3000/jobs/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(job => {
            console.log(job);
        })
    }

    function handleDateSubmit(popup, id) {
        console.log(popup);
        popup.style.display = 'none';
    }
})
