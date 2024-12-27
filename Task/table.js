import { deleteDataFromLocalStorage, getDataFromLocalStorage, getOneUserDataFromLocalStorage, updateDataToLocalStorage, getUserIdFromNameFromLocalStorage } from "../Utility/localStorage.js";
import { storedDataKey, storedTaskKey, updateTaskInEditMode, updateSelectedTaskData, selectedTaskData, selectedTaskId, updateSelectedTaskId } from "./data.js";
import { setDataToForm, removeTaskInUserData } from "./TaskFormInterface.js";
import { showAllUsersInAssigned } from "./FormInputs/assigned.js";
import { searchHere } from "./searchBox.js";


const dataContainerInTable = document.getElementById("tbody");



function initializeTable(){
    setDataToTable(getDataFromLocalStorage(storedTaskKey));
}

function setDataToTable(alltaskData){

    dataContainerInTable.innerHTML = `<tr class="table-light">
    <th class="text-center" scope="col">Title</th>
    <th class="text-center" scope="col">Description</th>
    <th class="text-center" scope="col">Assigned</th>
    <th class="text-center" scope="col">Status</th>
    <th class="text-center" scope="col">Actions</th>
  </tr>`;
    

    alltaskData.forEach((taskData,taskId) => { 
        addDataToTable(taskId,taskData);
    });
}

const addDataToTable = (taskId,newtaskData) => {
    
    const newTask = document.createElement("tr");
    newTask.taskId = taskId;


    let status;

    switch(newtaskData.status){
        case "0":
            status = "Not started"; 
            break;
        case "1":
            status = "In-Progress";
            break;
        case "2":
            status = "Completed";
    }

    newTask.innerHTML = `
    <td class="text-center" scope="row">${newtaskData.title}</td>
    <td class="text-center" scope="row">${newtaskData.description}</td>
    <td class="text-center" scope="row">${newtaskData.name}</td>
    <td class="text-center" scope="row">${status}</td>
    
    <td class="text-center">
    
        <button class="btn p-1 edit" data-bs-toggle="modal" data-bs-target="#exampleModal"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
        </svg></button>
        <button class="btn p-1 delete" data-bs-toggle="modal" data-bs-target="#exampleModal2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
        </svg></button>
    </td>
    `;
    const editButton = newTask.querySelector(".edit");
    const deleteButton = newTask.querySelector(".delete");


    editButton.addEventListener("click",function(){
        showAllUsersInAssigned();
        setDataToForm(newtaskData);
        updateSelectedTaskData(newtaskData);
        updateSelectedTaskId(newTask.taskId);
        updateTaskInEditMode(true);
    });
    
    deleteButton.addEventListener("click",function(){
        updateSelectedTaskData(newTask);
        updateSelectedTaskId(newTask.taskId);
        // console.log(selectedTaskData);
    });
    dataContainerInTable.appendChild(newTask);
}


function deleteTaskIfValid(curTaskItem){
    
    const taskId = curTaskItem.taskId;

    let curTaskData = getOneUserDataFromLocalStorage(storedTaskKey,taskId);



    if(curTaskData.status!=="2"){
        
        const curUserId = getUserIdFromNameFromLocalStorage(storedDataKey,curTaskData.name);
        const curUserData = getOneUserDataFromLocalStorage(storedDataKey,curUserId);

        removeTaskInUserData(curUserId,curUserData,curTaskData);

        deleteTask(storedTaskKey, taskId);

    }else{
        const notDeleteButton = document.getElementById("notDeleteButton");
        notDeleteButton.click();
    }
}

function deleteTask(storedTaskKey ,taskId){
    deleteDataFromLocalStorage(storedTaskKey,taskId);
    setDataToTable(getDataFromLocalStorage(storedTaskKey));
    searchHere();
}


export {initializeTable, setDataToTable,deleteTaskIfValid};
