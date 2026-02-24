let data = [];
let index = 1;
let tbtn;
let themeToggle = false

let todoInput = document.querySelector(".todo-input");
let ul = document.querySelector("ul")
let progressContainer = document.querySelector(".progress-clear-container")
let todoContainer = document.querySelector(".todos-container")
let mainTodoContainer = document.querySelector(".main-todo-container")
let themeBtn = document.querySelector(".theme-btn")
let body = document.querySelector("body")
let title = document.querySelector(".title")
let titleIconContainer = document.querySelector(".title-icon-container")


// Initial render of the progress container with "No item" message
document.addEventListener("DOMContentLoaded", (event) => {
    progressContainer.insertAdjacentHTML("beforeend", `<p class="list-stats">No item </p>`)
})

// Function to add a new todo item
function addTodo(input) {
    if (!input.value.trim()) return
    let todo = { id: index, data: input.value.trim(), complete: false }
    index++;
    data.push(todo)
    render(todo)
    input.value = ""
}



// Function to render a todo item in the DOM
function render(todo) {
    ul.insertAdjacentHTML("beforeend",
        `<li data-id = "${todo.id}">
          <div class="radio-label-container">
            <label>
            <input type="checkbox" class="checkbox" ${todo.complete ? "checked" : ""}>
            <span class="${todo.complete ? "completed" : ""}">${todo.data}</span>
            </label>
          </div>
         <button class="del-btn"><img src="./images/icon-cross.svg" alt=""></button>
        </li>`);
    updateProgress()
}


// Function to delete a todo item
function deleteTodo(id, li) {

    if (!confirm("Are you sure you want to delete this")) return;
    data = data.filter((item) => item.id != id);
    console.log(data);
    li.remove();
    updateProgress()

}


// Function to check the remaining items and update the progress container
function updateProgress() {
    let remaining = data.filter((item) => !item.complete).length;
    progressContainer.innerHTML = remaining > 0
        ? `<p class="list-stats">${remaining} item left</p><button class="clear-btn">Clear Completed</button>`
        : `<p class="list-stats">No item</p>`;
}

// Function to mark a todo item as completed or not completed
function completed(event) {
    if (event.target.classList.contains("checkbox")) {
        let span = event.target.closest("label").querySelector("span");
        span.classList.toggle("completed");
        let id = event.target.closest("li").dataset.id;

        if (event.target.checked) {
            data = data.map((item) => {
                if (item.id == id) {
                    return { ...item, complete: true }
                }
                return item;
            })

        } else {
            data = data.map((item) => {
                if (item.id == id) {
                    return { ...item, complete: false }
                }
                return item;
            })
        }

        updateProgress()
    }
}

// Event listener for adding a new todo item when the Enter key is pressed
todoInput.addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
        addTodo(todoInput)
    }

})

// Event listener for handling clicks on the delete buttons 
ul.addEventListener("click", (event) => {
    let btn = event.target.closest("button")
    if (btn) {
        let li = btn.closest("li");
        let id = li.dataset.id;
        deleteTodo(id, li)
    }
})


// Event listener for handling changes to the checkbox inputs
ul.addEventListener("change", (event) => {
    completed(event)

})



// Function to clear completed todo items from the dom and the data array
function clearComplete() {
    ul.innerHTML = ""
    data.forEach((item) => {
        if (!item.complete) {
            render(item)
        }
    })

}

// Function to show only completed todo items in the dom
function showComplete() {
    ul.innerHTML = ""
    data.forEach((item) => {
        if (item.complete) {
            render(item)
        }
    })
}

// Function to show only active todo items in the dom
function showActive() {
    ul.innerHTML = ""
    data.forEach((item) => {
        if (!item.complete) {
            render(item)
        }
    })
}

// Function to show all todo items in the dom
function showAll() {
    ul.innerHTML = "";
    data.forEach((item) => {
        render(item)
    })
}


// Event listener for handling clicks on the filter buttons and the clear completed button
mainTodoContainer.addEventListener("click", (event) => {
    let btn = event.target.closest("button");
    if (!btn) return;
    switch (btn.className) {
        case "show-all":
            showAll()
            break;
        case "show-active":
            showActive()
            break;
        case "show-comp":
            showComplete()
            break;
        case "clear-btn":
            clearComplete()
            break;
        case "theme-btn":
            themeChange(btn)
            break;
    }
})





// Function to toggle between light and dark themes
let darkBtn = document.createElement("button");
darkBtn.classList.add("theme-btn");
darkBtn.insertAdjacentHTML("beforeend", `<img src="./images/icon-moon.svg" alt="">`)


function themeChange(btn) {
    themeToggle = !themeToggle;
    body.classList.toggle("light");

    const currentBtn = btn
    if (currentBtn) currentBtn.remove();

    if (themeToggle) {
        titleIconContainer.insertAdjacentElement("beforeend", darkBtn);
    } else {
        titleIconContainer.insertAdjacentElement("beforeend", themeBtn);
    }
}







