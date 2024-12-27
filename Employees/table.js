import { deleteDataFromLocalStorage, getDataFromLocalStorage, getOneUserDataFromLocalStorage } from "../Utility/localStorage.js";
import { storedDataKey, updateUserInEditMode, updateSelectedUserData } from "./data.js";
import { setDataToForm } from "./userFormInterface.js";


const dataContainerInTable = document.getElementById("tbody");



function initializeTable(){
    setDataToTable(getDataFromLocalStorage(storedDataKey));
}

function setDataToTable(allUserData){

    dataContainerInTable.innerHTML = `<tr class="table-light">
    <th class="text-center" scope="col">Name</th>
    <th class="text-center" scope="col">Emails</th>
    <th class="text-center" scope="col">Actions</th>
  </tr>`;
    
    allUserData.forEach((userData,userId) => {
        addDataToTable(userId,userData);
    });
}

function addDataToTable(userId,newUserData){
    
    const newUser = document.createElement("tr");
    newUser.userId = userId;

    newUser.innerHTML = `
    <td class="text-center" scope="row">${newUserData.name}</td>
    <td class="text-center" scope="row">${newUserData.email}</td>
    
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
    const editButton = newUser.querySelector(".edit");
    const deleteButton = newUser.querySelector(".delete");


    editButton.addEventListener("click",function(){
        
        setDataToForm(newUserData);
        updateSelectedUserData(newUser);
        updateUserInEditMode(true);
    });

    deleteButton.addEventListener("click",function(){
        updateSelectedUserData(newUser);
    });
    dataContainerInTable.appendChild(newUser);
}

function deleteUserIfValid(curUserItem){
    
    const userId = curUserItem.userId;

    let allUserData = getOneUserDataFromLocalStorage(storedDataKey,userId);

    if(allUserData.assignedTask.length===0){
        deleteUser(storedDataKey, userId);
    }else{
        const notDeleteButton = document.getElementById("notDeleteButton");
        notDeleteButton.click();
    }

}

function deleteUser(storedDataKey ,userId){
    deleteDataFromLocalStorage(storedDataKey,userId);
    setDataToTable(getDataFromLocalStorage(storedDataKey));
}


export {initializeTable, setDataToTable,deleteUserIfValid};