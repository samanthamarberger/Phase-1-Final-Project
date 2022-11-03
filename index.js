document.addEventListener('DOMContentLoaded', () =>{
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
        console.log(jobObj);
        e.target.name.value="";
        e.target.position.value="";
        e.target.image.value="";
    }

    
})
