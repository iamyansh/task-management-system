import { initializeTable } from './table.js';
import {initializeForm} from './TaskFormInterface.js'
import initializeSearchBox from './searchBox.js'


initializeAllUserData();

function initializeAllUserData(){
    
    initializeTable();
    initializeForm();
    initializeSearchBox();
}

