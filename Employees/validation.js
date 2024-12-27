import { userDetail, storedDataKey } from './data.js';
import { validateEmail } from './FormInputs/email.js';
import { validateName } from './FormInputs/name.js';
import { getDataFromLocalStorage } from '../Utility/localStorage.js';



function initializeValidation(){
    validateOneByOne();
}

const validateOneByOne = () => {
    
    userDetail.name.addEventListener("blur",()=>{
        validateName();
        validateDuplicacy();
    });
    userDetail.email.addEventListener("blur",()=>{
        validateEmail();
        validateDuplicacy();
    });
    
}

const validateAll = () => {
    
    let isValid = true;

    isValid &= validateName();
    isValid &= validateEmail();
    isValid &= validateDuplicacy();

    return isValid;
}

function validateDuplicacy(){
    
    let duplicacy = false;
    
    if(userDetail.name.value && userDetail.email.value){

        const allUserData = getDataFromLocalStorage(storedDataKey);
        allUserData.forEach((curUserData)=>{
            if(curUserData.name===userDetail.name.value && curUserData.email===userDetail.email.value){
                duplicacy = true;
            }
        });
    
        const name = document.getElementById("name");
        
    
        if(duplicacy){
            name.classList.remove("is-valid");
            name.classList.add("is-invalid");
            name.nextElementSibling.innerHTML = "This user is already present";
        }else{
            validateName();
        }
    }


    return !duplicacy;
}


export {initializeValidation, validateOneByOne,validateAll};