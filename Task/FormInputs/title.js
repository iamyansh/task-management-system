
const title = document.getElementById("title");


const validateTitle = () => {
    
    let isValid = true;
    
    title.classList.remove("is-valid");
    title.classList.remove("is-invalid");
    
    if(title.value.length<5){
        title.classList.add('is-invalid');
        title.nextElementSibling.innerHTML = "Please enter atleast 5 characters";
        isValid = false;
    }else if(title.value.length>30){
        title.classList.add('is-invalid');
        title.nextElementSibling.innerHTML = "Please enter less than 30 characters";
        isValid = false;
    }else{
        title.classList.add('is-valid')
    }
    return isValid;
}

export {validateTitle};