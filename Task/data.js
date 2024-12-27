
import {storedDataKey} from '../Employees/data.js'

const taskDetail = {}, buttons = {};

taskDetail.title = document.getElementById("title");
taskDetail.assigned = document.getElementById("assigned");
taskDetail.status = document.getElementById("status");
taskDetail.description = document.getElementById("description");

buttons.closeFormButton = document.getElementById("closeFormButton");
buttons.submitFormButton = document.getElementById("submitForm");
buttons.deleteUserData = document.getElementById("deleteUserData");
buttons.editButtonInForm = document.getElementById("editButtonInForm");
buttons.addTask = document.getElementById("addTask");



let TaskInEditMode = false;
let selectedTaskData = null;
let selectedTaskId;

const updateTaskInEditMode = curMode => TaskInEditMode = curMode;
const updateSelectedTaskData = curTaskData => selectedTaskData = curTaskData;
const updateSelectedTaskId = curTaskId => selectedTaskId = curTaskId;

const form = document.getElementById("form");
const storedTaskKey = "tasks";


export {taskDetail,buttons,form,storedTaskKey,storedDataKey, TaskInEditMode, selectedTaskData, updateTaskInEditMode, updateSelectedTaskData, selectedTaskId, updateSelectedTaskId};
