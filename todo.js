const doneArea=document.querySelector("#done")
const hideDoneBtn=document.querySelector("#doneBtn")

hideDoneBtn.addEventListener("click",()=>{
    doneArea.classList.toggle("hidden")
    if(doneArea.classList.contains("hidden")){
        hideDoneBtn.innerHTML="Done list 보이기"
    } else{
        hideDoneBtn.innerHTML="Done list 숨기기"
    }
})

const todolist=document.querySelector("#todo-list")
const todoForm=document.querySelector("#todoForm")
const todoInput=document.querySelector("#newTodo")
todoForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const todoObj={
        text:todoInput.value,
        id:Date.now()
    }
    createTodo(todoObj)
    todoInput.value=""

})

const dones=[]
const donelist=document.querySelector("#done-list")
const todos=[]
loadTodos()
loadDones()
function loadTodos(){
    const loadTodo=JSON.parse(localStorage.getItem("todos"))
    if(loadTodo){
        loadTodo.forEach(createTodo)
    }
}
function loadDones(){
    const loadDone=JSON.parse(localStorage.getItem("dones"))
    if(loadDone){
        loadDone.forEach(createDone)
    }
    
}



function createTodo(todo){
    const li=document.createElement("li");
    li.id=todo.id
    const div=document.createElement("div")
    div.className="inline"

    const span=document.createElement("span")
    span.innerText=todo.text

    const closeButton=document.createElement("img")
    closeButton.src="assets/icons/close.png"
    closeButton.className="closeBtn"
    closeButton.addEventListener("click",deleteTodoByEvent)

    const completeButton=document.createElement("input")
    completeButton.type="checkbox"
    completeButton.addEventListener("click",completeTodo)
    div.appendChild(completeButton)
    div.appendChild(span)

    li.appendChild(div)
    li.appendChild(closeButton)
    todolist.appendChild(li)
    todos.push(todo)
    saveTodoList()
}

function deleteTodoByEvent(e){
    const li=e.target.parentElement
    deleteTodo(li)
}
function deleteTodo(li){
    const removeId=li.id

    li.remove()
    const index=todos.findIndex(item=>item.id==removeId)
    if(index!==-1){ 
        todos.splice(index,1)
    }
        console.log(index, removeId, todos)
    // todos=todos.filter(item=>item.id!=removeId)
    console.log(todos)
    saveTodoList()
}


function saveTodoList(){
    localStorage.setItem("todos",JSON.stringify(todos))
}

function completeTodo(e){
    console.log(e)
    const div=e.target.parentElement
    const li=div.parentElement
    console.log(li.children[0].children[1].innerText)
    const doneObj={
        text:div.children[1].innerText,
        time:document.querySelector("#time").innerText,
        id:Date.now()
    }
    createDone(doneObj)
    deleteTodo(li)
}





function createDone(done){
    const li=document.createElement("li");
    li.id=done.id
    const div=document.createElement("div")


    const textDiv=document.createElement("div")
    textDiv.className="inline"
    const checkedbox=document.createElement("img")
    checkedbox.src="assets/icons/checkedbox.png"
    checkedbox.className="closeBtn"
    textDiv.appendChild(checkedbox)
    const text=document.createElement("span")
    text.innerText=done.text
    textDiv.appendChild(text)
    // textDiv.className="completed"
    const timeDiv=document.createElement("div")
    timeDiv.innerText=done.time
    timeDiv.className="doneTime"


    const closeButton=document.createElement("img")
    closeButton.src="assets/icons/close.png"
    closeButton.className="closeBtn"
    closeButton.addEventListener("click",deleteDone)
    
    div.appendChild(textDiv)
    div.appendChild(timeDiv)
    li.appendChild(div)
    li.appendChild(closeButton)
    donelist.appendChild(li)


    dones.push(done)
    saveDoneList()
}

function deleteDone(e){
    const li=e.target.parentElement
    const removeId=li.id

    li.remove()
    const index=dones.findIndex(item=>item.id==removeId)
    if(index!==-1){ 
        dones.splice(index,1)
    }
    saveDoneList()
}

function saveDoneList(){
    localStorage.setItem("dones",JSON.stringify(dones))
}

/**
 * 그 외 해야할 일...
 * 이미지 찾기
 * 이미지~> 시간에 맞게 색상 변하게
 * 몇 개 배경 중 랜덤으로 선정
 * 탈 것.... 굴러가는 애니메이션
 * 날씨에 맞게, 구름, 비, 눈, 애니메이션!
 * CSS 집어넣기~
 */