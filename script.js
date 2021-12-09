
const addTaskForm = document.querySelector('#addTaskForm');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
const btnAddNewTask = document.querySelector('#btnAddNewTask')
let items;

loadItems();
eventListeners()

function eventListeners(){
   btnAddNewTask.addEventListener('click',addNewItem)
   taskList.addEventListener('click',deleteItem)
   btnDeleteAll.addEventListener('click',deleteAll)
}


function loadItems(){
    items = getItemFromLS();
    items.forEach(function(item){
        createItem(item);
    })


}

function createItem(text){
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    const a = document.createElement('a');
    a.className = 'delete-item float-right';
    a.setAttribute('href','#');
    a.innerHTML = '<i class="fas fa-times" id="deleteBtn"></i>';

    li.appendChild(a);
    taskList.appendChild(li);


}

function addNewItem(){
    if(input.value === ''){
        alert('Add New Item')
    }
    else{
       
        createItem(input.value);

        // Save To LS
        setItemToLS(input.value);
        input.value = '';
}
}
function deleteItem(e){
    if(e.target.className === "fas fa-times"){
        e.target.parentElement.parentElement.remove();

        // Delete Item From LS
        deleteItemFromLS(e.target.parentElement.parentElement.textContent);
    }
    e.preventDefault();

}
function deleteAll(){
    // taskList.childNodes.forEach(function(item){
    //     if(item.nodeType === 1){
    //         item.remove();
    //     }
    // })
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
}


// LOCAL STORAGE
function getItemFromLS(){
    if(localStorage.getItem('items') === null){
        items = [];
    }
    else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}
function setItemToLS(text){
    items = getItemFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}


function deleteItemFromLS(text){
items = getItemFromLS();
items.forEach(function(item,index){
    if(item === text){
    items.splice(index,1);
}
})
localStorage.setItem('items',JSON.stringify(items))
}



