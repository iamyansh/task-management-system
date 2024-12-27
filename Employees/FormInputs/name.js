
const name = document.getElementById("name");


const validateName = () => {
    
    let isValid = true;
    
    name.classList.remove("is-valid");
    name.classList.remove("is-invalid");
    
    if(name.value.length<5){
        name.classList.add('is-invalid');
        name.nextElementSibling.innerHTML = "Please enter atleast 5 characters";
        isValid = false;
    }else if(name.value.length>18){
        name.classList.add('is-invalid');
        name.nextElementSibling.innerHTML = "Please enter less than 18 characters";
        isValid = false;
    }else{
        name.classList.add('is-valid')
    }
    return isValid;
}

export {validateName};