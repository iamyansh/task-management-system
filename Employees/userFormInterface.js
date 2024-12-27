import { userDetail, buttons, form, storedDataKey, UserInEditMode, selectedUserData, updateUserInEditMode } from './data.js';
import { initializeValidation, validateAll } from './validation.js';
import { getDataFromLocalStorage, addDataToLocalStorage, updateDataToLocalStorage } from '../Utility/localStorage.js';
import { deleteUserIfValid, setDataToTable } from './table.js';



function initializeForm(){
    
    
    
    buttons.submitFormButton.addEventListener("click",()=>{
    
        if(validateAll()){
            if(UserInEditMode){
                updateDataToLocalStorage(storedDataKey,selectedUserData.userId,getDataFromForm());
            }else{
                addDataToLocalStorage(storedDataKey,getDataFromForm());
            }
            closeForm();
            setDataToTable(getDataFromLocalStorage(storedDataKey));
        }
    });
    
    buttons.closeFormButton.addEventListener("click",function(){
        closeForm();
    });

    buttons.editButtonInForm.addEventListener("click",function(){
        updateUserInEditMode(true);
    });
    
    buttons.deleteUserData.addEventListener("click",function(){
        deleteUserIfValid(selectedUserData);
    })
    
    form.addEventListener("blur",closeForm);
    
    initializeValidation();
}




function removeValidation(){

    for (const key in userDetail) {
        if(userDetail[key] instanceof HTMLCollection){
            Array.from(userDetail[key]).forEach((ele)=>{
                ele.classList.remove('is-valid','is-invalid');
            });
        }else{
            userDetail[key].classList.remove('is-valid','is-invalid');
        }
    }
}


function closeForm(){
    form.reset();
    removeValidation()
    buttons.closeFormButton.click();
    updateUserInEditMode(false);
}

function getDataFromForm(){
    
    const curUserData = {};

    for (const key in userDetail) {

        if(userDetail[key] instanceof HTMLCollection){
            curUserData[key] = Array.from(userDetail[key]).map(ele=>ele.value);
        }else{
            curUserData[key] = userDetail[key].value;
        }

    }
    curUserData.assignedTask = [];
    return curUserData;
}

function setDataToForm(curUserData){

    for (const key in userDetail) {
        userDetail[key].value = curUserData[key];
    }
    // curUserData.date = (new Date()).toString();
    return curUserData;

}



export {initializeForm, getDataFromForm, setDataToForm};

