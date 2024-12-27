import { getDataFromLocalStorage } from "../../Utility/localStorage.js";
import { storedDataKey } from "../data.js";


const assigned = document.getElementById("assigned");


const validateAssigned = () => {
    
    let isValid = true;

    assigned.classList.remove('is-valid');
    assigned.classList.remove('is-invalid');
    
    if(assigned.value==="0"){
        assigned.classList.add('is-invalid');
        isValid = false;
    }else{
        assigned.classList.add('is-valid')
    }
    return isValid;
}

function showAllUsersInAssigned(){
    
    const allUserData = getDataFromLocalStorage(storedDataKey);
    let assignedOptions = '<option value="0">Select user</option>';

    allUserData.forEach((userData,val) => {
        assignedOptions += `<option value="${val+1}"> ${userData.name} </option>`;
    });

    assigned.innerHTML = assignedOptions;
}

export {validateAssigned,showAllUsersInAssigned};