

const dataContainerInTable = document.getElementById("tbody");


const getDataFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key)) ?? [];
}

const getOneUserDataFromLocalStorage = (key,userId) => {
    return JSON.parse(localStorage.getItem(key))[userId];
}

const setDataToLocalStorage = (key, userData) => {
    localStorage.setItem(key,JSON.stringify(userData));
}

const addDataToLocalStorage = (key,curUserData) => {

    let allUserData = getDataFromLocalStorage(key);
    allUserData.push(curUserData);
    localStorage.setItem(key,JSON.stringify(allUserData));
}

const updateDataToLocalStorage = (key,userId,curUserData) => {

    let allUserData = getDataFromLocalStorage(key);
    allUserData[userId] = curUserData;
    localStorage.setItem(key,JSON.stringify(allUserData));
}

const deleteDataFromLocalStorage = (key,userId) => {

    let allUserData = getDataFromLocalStorage(key);
    allUserData.splice(userId,1);
    setDataToLocalStorage(key,allUserData);
}

const getUserIdFromNameFromLocalStorage = (key,userName) => {
    const allUserData = getDataFromLocalStorage(key);
    let index = -1;
    allUserData.forEach((curUser,userId) => {
        if(curUser.name===userName){
            index = userId;
        }
    });
    return index;
}

export {getDataFromLocalStorage, getOneUserDataFromLocalStorage, setDataToLocalStorage, addDataToLocalStorage, updateDataToLocalStorage, deleteDataFromLocalStorage, getUserIdFromNameFromLocalStorage};