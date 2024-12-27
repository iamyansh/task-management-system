
const email = document.getElementById("email");


const validateEmail = (e) => {

    let isValid = true;
    const curEmail = e ? (e instanceof Event ? e.target : e) : email;
    
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    

    curEmail.classList.remove('is-valid');
    curEmail.classList.remove('is-invalid');
    
    if(curEmail.value.length<5){
        curEmail.classList.add('is-invalid');
        isValid = false;
        email.nextElementSibling.innerHTML = "Please enter atleast 5 characters";
    }else if(curEmail.value.length>40){
        curEmail.classList.add('is-invalid');
        isValid = false;
        email.nextElementSibling.innerHTML = "Please enter less than 40 characters";
    }else if(!pattern.test(curEmail.value)){
        curEmail.classList.add('is-invalid');
        isValid = false;
        email.nextElementSibling.innerHTML = "Please enter valid email";
    }else{
        curEmail.classList.add('is-valid')
    }
    return isValid;
}


export {validateEmail};