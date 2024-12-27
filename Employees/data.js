
const userDetail = {}, buttons = {};

userDetail.name = document.getElementById("name");
userDetail.email = document.getElementById("email");

buttons.closeFormButton = document.getElementById("closeFormButton");
buttons.submitFormButton = document.getElementById("submitForm");
buttons.deleteUserData = document.getElementById("deleteUserData");
buttons.editButtonInForm = document.getElementById("editButtonInForm");



let UserInEditMode = false;
let selectedUserData = null;

const updateUserInEditMode = curMode => UserInEditMode = curMode;
const updateSelectedUserData = curUserData => selectedUserData = curUserData;

const form = document.getElementById("form");
const storedDataKey = "user";


export {userDetail,buttons,form,storedDataKey, UserInEditMode, selectedUserData, updateUserInEditMode, updateSelectedUserData};
