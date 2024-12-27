import { taskDetail, buttons, form, storedDataKey, TaskInEditMode, selectedTaskData, updateTaskInEditMode, storedTaskKey, selectedTaskId } from './data.js';
import { initializeValidation, validateAll } from './validation.js';
import { getDataFromLocalStorage, addDataToLocalStorage, updateDataToLocalStorage, getOneUserDataFromLocalStorage, getUserIdFromNameFromLocalStorage } from '../Utility/localStorage.js';
import { deleteTaskIfValid, setDataToTable } from './table.js';
import { showAllUsersInAssigned } from './FormInputs/assigned.js'
import {searchHere} from './searchBox.js';
// import { UserInEditMode, userDetail } from '../User/data.js';


function initializeForm(){
    
    buttons.addTask.addEventListener("click",showAllUsersInAssigned);
    
    buttons.submitFormButton.addEventListener("click",()=>{
    
        if(validateAll()){
            
            if(TaskInEditMode){
                // console.log(selectedTaskData);
                updateDataToLocalStorage(storedTaskKey,selectedTaskId,getDataFromForm());
                updateTaskInEditMode(false);
            }else{
                addDataToLocalStorage(storedTaskKey,getDataFromForm());
            }

            closeForm();
            setDataToTable(getDataFromLocalStorage(storedTaskKey));
            searchHere();
        }
    });
    
    buttons.closeFormButton.addEventListener("click",function(){
        removeValidation();
        closeForm();
    });

    
    buttons.deleteUserData.addEventListener("click",function(){
        deleteTaskIfValid(selectedTaskData);
    })
    
    form.addEventListener("blur",closeForm);
    
    initializeValidation();
    
}




function removeValidation(){

    for (const key in taskDetail) {
        if(taskDetail[key] instanceof HTMLCollection){
            Array.from(taskDetail[key]).forEach((ele)=>{
                ele.classList.remove('is-valid','is-invalid');
            });
        }else{
            taskDetail[key].classList.remove('is-valid','is-invalid');
        }
    }
}


function closeForm(){
    form.reset();
    buttons.closeFormButton.click();
    updateTaskInEditMode(false);
}

function getDataFromForm(){

    const curTaskData = {};

    for (const key in taskDetail) {

        if(key!=="assigned"){
            curTaskData[key] = taskDetail[key].value;
        }
    }

    
    
    if(TaskInEditMode){

        let userId = getUserIdFromNameFromLocalStorage(storedDataKey,selectedTaskData.name);
        let curUserData = getOneUserDataFromLocalStorage(storedDataKey,userId);
        removeTaskInUserData(userId,curUserData,selectedTaskData);

        userId = document.getElementById("assigned").value-1;
        curUserData = getOneUserDataFromLocalStorage(storedDataKey,userId);
        curTaskData.name = curUserData.name;
        addTaskInUserData(userId,curUserData,curTaskData);

    }else{
        const userId = document.getElementById("assigned").value-1;
        const curUserData = getOneUserDataFromLocalStorage(storedDataKey,userId);
            
        curTaskData.name = curUserData.name;
        
        addTaskInUserData(userId,curUserData,curTaskData);
    }

    return curTaskData;
}

function addTaskInUserData(userId,curUserData,curTaskData){
    
    curUserData.assignedTask.push(curTaskData.title);
    updateDataToLocalStorage(storedDataKey,userId,curUserData);
}

function removeTaskInUserData(userId,curUserData,curTaskData){

    const curTaskIndexInUserData = curUserData.assignedTask.indexOf(curTaskData.title);
    curUserData.assignedTask.splice(curTaskIndexInUserData,1);
    updateDataToLocalStorage(storedDataKey,userId,curUserData);
}

function setDataToForm(curTaskData){

    for (const key in taskDetail) {
        if(key==="assigned"){
            const curUserName = curTaskData.name;
            const curUserId = getUserIdFromNameFromLocalStorage(storedDataKey,curUserName);
            taskDetail[key].value = curUserId+1;
        }else{
            taskDetail[key].value = curTaskData[key];
        }
    }
    return curTaskData;

}



export {initializeForm, getDataFromForm, setDataToForm, removeTaskInUserData};

