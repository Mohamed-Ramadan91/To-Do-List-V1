//============================ Dark Mode ============================//
let dark = document.querySelector(".dark");
darkCheck();
dark.onclick = function (e) {
  document.body.classList.toggle("dark-on");
  if (document.body.classList.contains("dark-on")) {
    window.localStorage.setItem("dark", true);
  } else {
    window.localStorage.setItem("dark", false);
  }
};
function darkCheck() {
  if (window.localStorage.getItem("dark") == "true") {
    document.body.classList.add("dark-on");
  } else {
    document.body.classList.remove("dark-on");
  }
}
//============================  Select the Elements ============================//
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

//============================  Declair Variables ============================//
let arryOfTasks = [];
//Check If I had Data on Local Storage.
if (localStorage.getItem("tasks")) {
  arryOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

//================ call The Data From local storage  ================//
getDataFromLocalStorage();

//============================ Add Tasks ============================//
submit.onclick = function () {
  if (input.value != "") {
    addTasksToArray(input.value); // => Use Function To Add Task To Array
    input.value = ""; // => Empty input field After Click On Submit
    addTasksToLocalStorage(arryOfTasks); // => Add Tasks Data To Local Storage
  }
};

//================== Delete Tasks & Update Task status ==================//
tasksDiv.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete")) {
    //Delete The Task From Local Storage
    deleteFromLocalStroage(e.target.parentElement.getAttribute("data-id"));

    //Delete The Task From The Page
    let x = e.target.parentElement;
    x.classList.add("deleted");
    x.addEventListener("animationend", function () {
      e.target.parentElement.remove();
    });
  }
  //Update Task status
  if (e.target.classList.contains("task")) {
    // Update Task status In Local Storage
    updateStatusInLocalStorage(e.target.getAttribute("data-id"));
    // Update Task status In Page.
    e.target.classList.toggle("done");
  }
});

//============================ Delete All Tasks ============================//
let container = document.querySelector(".container");
let deleteAll = document.createElement("button");
deleteAll.className = "delete-all";
deleteAll.append("Delete All Tasks");
container.appendChild(deleteAll);
deleteAll.onclick = function () {
  arryOfTasks = [];
  addTasksToLocalStorage(arryOfTasks);
  tasksDiv.innerHTML = "";
};
//============================ Functions ============================//
// 1 - Create addTasksToArray Function
function addTasksToArray(tasksText) {
  // Make the Task As Object
  let task = {
    id: Date.now(), // => Uniqe Id by using the Date
    txt: tasksText,
    completed: false, // => The Default Value Of tasks is Not Completed.
  };
  // Put The Task (task ==> Object) in to Array (arryOfTasks)
  arryOfTasks.push(task);
  console.log(arryOfTasks); //#####========> For Testing <========######//
  //Call addTasksToPage Function
  addTasksToPage(arryOfTasks); // => Use Function To Add Task To page
}

// 1.1 Create addTasksToPage Function
function addTasksToPage(arryTasks) {
  tasksDiv.innerHTML = ""; // Empty Tasks Div To Prevent Repeating The Tasks.
  // Create Elements
  // => Loop At Every Element (task) in The array
  arryOfTasks.forEach(function (task) {
    //Create div (task)
    let div = document.createElement("div");
    div.classList.add("task");
    // If Task Completed Add Class (done)
    if (task.completed === true) {
      div.classList.add("done");
    }
    let txt = document.createElement("p");
    txt.append(task.txt);
    div.appendChild(txt);
    div.setAttribute("data-id", task.id);
    //Create Delete button
    let sympol = document.createElement("i");
    sympol.classList.add("ri-delete-bin-line");
    sympol.classList.add("delete");
    sympol.style.fontSize = "21px";
    div.appendChild(sympol);
    tasksDiv.appendChild(div);
  });
}
// 2. Create addTasksToPageLocal Storage Function
function addTasksToLocalStorage(arryOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arryOfTasks));
}

// 3. Get Data From Local Storage
function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addTasksToPage(tasks);
  }
}

// 4. Delete From Local Storage Function
function deleteFromLocalStroage(taskId) {
  arryOfTasks = arryOfTasks.filter((task) => task.id != taskId);
  addTasksToLocalStorage(arryOfTasks);
}

// 5. Update Task Status In Local Storage Function
function updateStatusInLocalStorage(taskId) {
  for (i = 0; i < arryOfTasks.length; i++) {
    if (arryOfTasks[i].id == taskId) {
      arryOfTasks[i].completed === false
        ? (arryOfTasks[i].completed = true)
        : (arryOfTasks[i].completed = false);
    }
  }
  addTasksToLocalStorage(arryOfTasks);
}
