const description = document.getElementById("description");

const validateDescription = () => {
    
    let isValid = true;

    description.classList.remove('is-valid','is-invalid');
    
    if(description.value.length<10){
        description.classList.add('is-invalid');
        description.nextElementSibling.innerHTML = "Please enter atleast 10 characters";
        isValid = false;
    }else if(description.value.length>50){
        description.classList.add('is-invalid');
        description.nextElementSibling.innerHTML = "Please enter less than 50 characters";
        isValid = false;
    }else{
        description.classList.add('is-valid')
    }
    return isValid;
}

export {validateDescription};