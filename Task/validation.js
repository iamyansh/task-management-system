import { taskDetail } from './data.js';
import { validateTitle } from './FormInputs/title.js';
import { validateAssigned } from './FormInputs/assigned.js';
import { validateStatus } from './FormInputs/status.js';
import { validateDescription } from './FormInputs/description.js';



function initializeValidation(){
    validateOneByOne();
}

const validateOneByOne = () => {
    
    taskDetail.title.addEventListener("blur",validateTitle);
    taskDetail.assigned.addEventListener("input",validateAssigned);
    taskDetail.status.addEventListener("input",validateStatus);
    taskDetail.description.addEventListener("blur",validateDescription);
    
}

const validateAll = () => {
    
    let isValid = true;

    isValid &= validateTitle();
    isValid &= validateAssigned();
    isValid &= validateStatus();
    isValid &= validateDescription();


    return isValid;
    
  
}


export {initializeValidation, validateOneByOne,validateAll};