var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0];
var incTaskHolder = document.getElementById("incomplete-tasks");
var compTaskHolder = document.getElementById("completed-tasks");

//New Task List Item
var createNewTaskElement = function(taskString){
    var listItem = document.createElement("li");
    //input (checkbox)
    var checkBox = document.createElement("input"); //checkbox
    //label
    var label = document.createElement("label");
    //input(text)
    var editInput = document.createElement("input");
    //button.edit
    var editButton = document.createElement("button");
    //button.delete
    var deleteButton = document.createElement("button");
    //Each element needs modifying
    checkBox.type = "checkbox";
    editInput.type = "text";

    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    label.innerText = taskString;

    //Each element needs appending
    listItem.appendChild(checkBox); 
    listItem.appendChild(label); 
    listItem.appendChild(editInput); 
    listItem.appendChild(editButton); 
    listItem.appendChild(deleteButton); 

    return listItem
}

//Add a new task

var addTask = function(){
  console.log("Add task...");

     //when button is pressed, 
     //create a new list item with the text from #newtask
    var listItem = createNewTaskElement(taskInput.value);

    //append li to inctaskholder
    incTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskComp);
}



//Edit an existing task
var editTask = function(){
    console.log("Edit task...");


    var listItem = this.parentNode;
    var editInput = listItem.querySelector("input[type=text]");
    var label = listItem.querySelector("label");

    var containsClass = listItem.classList.contains("editMode");



 //if the class pf parent is .editmode
 if (containsClass){
    //label text become the input's value  
    label.innerText = editInput.value;

  } else {
      //switch to .editmode
      //input value becomes the label's text
    editInput.vaule = label.innerText;
  }

  listItem.classList.toggle("editMode"); //toggle .editmode on the parent

}

//Delete an existing task
var deleteTask = function(){
console.log("Delete task...");
//remove parent list item from the ul
var listItem = this.parentNode;
var ul = listItem.parentNode;
ul.removeChild(listItem);

}




//mark a task as complete
var taskComp = function(){
console.log("Completed task...");
   //when the checkbox is checked
    //append the task list itm to the #completedtasks 
 var listItem = this.parentNode;
compTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskInc);

}



//mark a task as incomplete
var taskInc = function(){
  console.log("incompleted task...");
  //when the checkbox is unchecked
      //append the task list itm to the #incompletedtasks 
  var listItem = this.parentNode;
  incTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskComp);

}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  console.log("bind list item events...");
  //select li's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");

  //bind edittask to edit button
  editButton.onclick = editTask;
    //bind deltask to del button
  deleteButton.onclick = deleteTask;
    //bind CBEH to check box
  checkBox.onchange = checkBoxEventHandler;

 }

 //Set the click-handler to the addTask function

addButton.onclick = addTask;


//cycle over inctaskholder ul ils
for(var i = 0; i < incTaskHolder.children.length; i++){
   //bind events to list item's children
  bindTaskEvents(incTaskHolder.children[i], taskComp);
}


//cycle over comptaskholder ul ils
for(var i = 0; i < compTaskHolder.children.length; i++){
   //bind events to list item's children
  bindTaskEvents(compTaskHolder.children[i], taskInc);
}