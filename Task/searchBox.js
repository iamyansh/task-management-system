

const searchBox = document.getElementById("searchBox");



const initializeSearchBox = () => {
    searchBox.addEventListener("keyup",function(){
        searchHere();
    });
    searchHere();
}

export function searchHere(){
    searchHereWithFieldIndex(0,2,3);
}


function searchHereWithFieldIndex(...allIndex){
    
    const filter = searchBox.value.toUpperCase();
    const data = document.getElementsByTagName("tr");

    Array.from(data).forEach((rowData,rowIndex)=>{
        
        if(rowIndex>=2){
            
            
            let found = false;
            const allCell = rowData.getElementsByTagName("td");

            allIndex.forEach(specificInd => {
                
                const content = allCell[specificInd].innerText.toUpperCase();
                // console.log(content);
                
                if(content.indexOf(filter)>-1){
                    found = true;
                }
            });

            
            if(found){
                rowData.style.display = "table-row";
            }else{
                rowData.style.display = "none";
            }
        }
    }) 
}


export default initializeSearchBox;
