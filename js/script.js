const adicionarForm = document.querySelector("#adicionar-form");
const adicionar = document.querySelector("#adicionar");
const editarForm = document.querySelector("#edit-form");
const editar = document.querySelector("#editar");
const listaTarefas = document.querySelector("#lista-tarefas");

const salvarInput = (input) => {

    const tarefa = document.createElement("div");
    tarefa.classList.add("tarefa");

    const tarefaTexto = document.createElement("h3");
    tarefaTexto.innerText = input;
    tarefa.appendChild(tarefaTexto);
    
    const finalizarTarefa = document.createElement("button");
    finalizarTarefa.classList.add("finalizar");
    finalizarTarefa.innerHTML = '<i class="fas fa-check"></i>';
    tarefa.appendChild(finalizarTarefa);

    const editarTarefa = document.createElement("button");
    editarTarefa.classList.add("editar");
    editarTarefa.innerHTML = '<i class="fas fa-pen"></i>';
    tarefa.appendChild(editarTarefa);

    const deletarTarefa = document.createElement("button");
    deletarTarefa.classList.add("deletar");
    deletarTarefa.innerHTML = '<i class="fas fa-xmark"></i>';
    tarefa.appendChild(deletarTarefa);
    
    listaTarefas.appendChild(tarefa);
    adicionar.value = "";
    adicionar.focus();
}


adicionarForm.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const input = adicionar.value;

    if (input) {
        salvarInput(input);
    }
});

document.addEventListener("click", (evento) => {
    const item = evento.target;
    const parentEl = item.parentElement;

    if (item.classList.contains("finalizar")) {
        parentEl.classList.toggle("concluido");
    }
});