const renderTasksProgress = (tasks) => {
    //let tasksProgress;
    const tasksProgressDOM = document.getElementById('task-progress');

    const doneTask = tasks.filter(({checked})=> checked).length
    const totalTask = tasks.length;

    tasksProgressDOM.textContent =`${doneTask} Tarefa concluida`;
}




/*--------------------Gravação em Local------------------------*/ 
const getTasksFromLocationStorage = () =>{
    const localTasks = JSON.parse(window.localStorage.getItem('tasks'))
    return localTasks ? localTasks: [];
}



const setTaskInlocalStorage = (tasks) =>{
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
}

/*-------------------------------------------------------------*/ 

let tasks = getTasksFromLocationStorage();

if(tasks.length === 0){
    let tasks = [
        {id:1,description:'Implementar tela de listagem de tarefas',descriptionStick:'Front-End', checked: false},
        {id:2,description:'Criar endpoint para cadastro de tarefas',descriptionStick:'Back-End', checked: false},
        {id:3,description:'Implementar protótipo da listagem de tarefas',descriptionStick:'UX', checked: true}
    ];
    setTaskInlocalStorage(tasks);    
    
}

document.addEventListener('DOMContentLoaded', function(){
     document.getElementById('btn-plus').addEventListener('click',function(){
        const taskInput = document.getElementById('create-task').value;
        const etiquetaInput = document.getElementById('create-etiqueta').value;
    
        if (taskInput.trim()==="") return alert('A tarefa não pode ser vazia');
    
        const newTask = {
            id: tasks.length + 1,
            description: taskInput,
            descriptionStick: etiquetaInput,
            checked: false
        };
        tasks.push(newTask);
        renderTasks();

        taskInput.value =""
        etiquetaInput.value =""
    })
})

const taskButtonadd = document.getElementById('btn-plus');
taskButtonadd.addEventListener('click',function(){
    console.log('Botão acionado!!')
})



/*Função do botão 'concluir' das tasks */
const getButtonInput =({id, description, descriptionStick, checked})=>{
    const wrapper = document.createElement('div');
    wrapper.className = 'task-wrapper';

    const textwrapper = document.createElement('div');
    textwrapper.className = 'task-text-wrapper';
    

    //Criando o botão 
    const buttonConcluir = document.createElement('button');
    buttonConcluir.textContent = 'Concluir';
    buttonConcluir.className = checked ? 'btn-concluded' : 'btn-concluir'
    if (checked) {
        buttonConcluir.innerHTML = `<img src="icons/image.png" alt="Concluído" class = "button-icon">`;
    } else {
        buttonConcluir.textContent = 'Concluir'; // Botão padrão
    }
    buttonConcluir.dataset.taskId= id;

    /*---------------Acionamento do button---------------------*/
    buttonConcluir.addEventListener('click', function(){
        const taskIndex =tasks.findIndex((task) => task.id===id);
        if(taskIndex>=0){
            tasks[taskIndex].checked = !tasks[taskIndex].checked;
        }
        renderTasks();
    })
    
    
    /*-----------------------Titulo da task -------------------*/
    const label = document.createElement('span');
    label.textContent = description;
    label.className = checked ? 'task-completed': 'task-pending';
    
    /*-----------------------Etiqueta--------------------------*/
    
    const etiquetaWrapper = document.createElement('div');
    etiquetaWrapper.className = 'etiqueta-wrapper';

    const etiquetaElement = document.createElement('span');
    etiquetaElement.textContent = descriptionStick;
    etiquetaElement.className =  'task-etiqueta';

    etiquetaWrapper.appendChild(etiquetaElement);

    /*--------------------DATA DE CRIAÇãO-------------------------*/

    const hoje = new Date()
    const dia = hoje.getDate().toString().padStart(2,'0')
    const mes = String(hoje.getMonth() + 1).padStart(2,'0')
    const ano = hoje.getFullYear()
    const dataAtual = ' Criado em: '+`${dia} / ${mes} / ${ano}`
     
    const dateCreate = document.createElement('span');
    dateCreate.textContent = dataAtual;
    dateCreate.className =  'date-create';
     
    etiquetaWrapper.appendChild(dateCreate);
     
    /*--------------------------------------------------------*/
     

    textwrapper.appendChild(label);
    textwrapper.appendChild(etiquetaWrapper);
    setTaskInlocalStorage(tasks);

    wrapper.appendChild(textwrapper);
    wrapper.appendChild(buttonConcluir);

    
    
    return wrapper;
}

const renderTasks = () => {
    const list = document.getElementById('todo-list-card');
    list.innerHTML = '';

   

    tasks.forEach((task) => {
        const taskElement = getButtonInput(task);

        const toDo = document.createElement('li');
        toDo.style.listStyleType = 'none';
        toDo.appendChild(taskElement);
        list.appendChild(toDo);
    })
    renderTasksProgress(tasks);
}



window.onload = renderTasks;