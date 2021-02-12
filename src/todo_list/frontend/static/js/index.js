let title_field = document.getElementById('title');
let form = document.getElementById('form');
let currentItem = null;

function displayTaskList(){
    let listWrapper = document.getElementById('list-wrapper');
    listWrapper.innerHTML = "";
    url = "http://127.0.0.1:8000/api/tasks/";

    fetch(url)
    .then((response) => response.json())
    .then(function(data){
            let tasksData = data;
            for (let i=0; i < tasksData.length; i++){
                let titleDiv = '';

                if (tasksData[i].is_completed){
                    titleDiv = `
                        <strike id="task-title" class="title px-4 py-2">
                            ${tasksData[i].title}
                        </strike>
                ` 
                }else{
                    titleDiv = `
                    <div id="task-title" class="title px-4 py-2">
                        ${tasksData[i].title.charAt(0).toUpperCase() + tasksData[i].title.substr(1).toLowerCase()}
                    </div>
                ` 
                }

                let itemHtml = `
                    <div id="data-row-${i}" class="row task-wrapper p-2 mb-2">
                        <div class="col-8 col-md-9">
                            ${titleDiv}
                        </div>
                        <div class="col-2 d-flex justify-content-end">
                            <div>
                                <button class="btn btn-outline-info edit")">Edit</button>
                            </div>
                        </div>
                        <div class="col-1 d-flex justify-content-start">
                            <div class="ml-auto">
                                <button class="btn btn-outline-dark delete">-</button>
                            </div>
                        </div>
                    </div>
                `
                listWrapper.insertAdjacentHTML('beforeend', itemHtml);

                editBtn = document.getElementsByClassName('edit')[i];
                editBtn.addEventListener('click', () => editTask(tasksData[i]))

                deleteBtn = document.getElementsByClassName('delete')[i];
                deleteBtn.addEventListener('click', () => deleteTask(tasksData[i]))

                taskTitle = document.getElementsByClassName('title')[i];
                taskTitle.addEventListener('click', () => markCompleted(tasksData[i]))
            }
    })
}


function editTask(item){
    currentItem = item
    title_field.value = currentItem.title;
}

function deleteTask(item){
    url = "http://127.0.0.1:8000/api/tasks/" + item.id + "/delete/";
    fetch(url, {
        method:'DELETE',
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken': csrftoken
        }
    }).then(() => {
        displayTaskList();
    })
}


function markCompleted(item){
    item.is_completed = !item.is_completed
    url = "http://127.0.0.1:8000/api/tasks/" + item.id + "/edit/";

    fetch(url, {
        method:'POST',
        headers:{
            'Content-type':'application/json',
            'X-CSRFToken': csrftoken,
        },
        body:JSON.stringify({
            'title': item.title,
            'is_completed': item.is_completed,
        })
    })
    .then(() => displayTaskList())
}


form.addEventListener('submit', function(event){
    event.preventDefault();
    if (!currentItem){
        url = "http://127.0.0.1:8000/api/tasks/create/"
    }else{
        url = "http://127.0.0.1:8000/api/tasks/" + currentItem.id + "/edit/";
        currentItem = null;
    }
    fetch(url, {
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'X-CSRFToken': csrftoken,
            },
            body:JSON.stringify({
                'title': title_field.value,
                'is_completed': false,
            })
    }).then(function(){
        displayTaskList();
        form.reset();
    })
})



displayTaskList()



// CSRF Token
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');