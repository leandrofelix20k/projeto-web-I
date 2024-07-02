const adicionarForm = document.querySelector("#adicionar-form");
const adicionar = document.querySelector("#adicionar");
const editarForm = document.querySelector("#editar-form");
const editar = document.querySelector("#editar");
const listaTarefas = document.querySelector("#lista-tarefas");
const cancelarEdicao = document.querySelector("#cancelar-edicao");
const buscarInput = document.querySelector("#buscar-input");
const filtro = document.querySelector("#filtro");
const apagarBusca = document.querySelector("#apagar-busca");

let tituloAntigo;

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

const toggleForms = () => {
    editarForm.classList.toggle("hide");
    adicionarForm.classList.toggle("hide");
    listaTarefas.classList.toggle("hide");
}

const atualizarTarefa = (input) => {
    const tarefas = document.querySelectorAll(".tarefa");

    tarefas.forEach((tarefa) => {
        let titulo = tarefa.querySelector("h3");

        if (titulo.innerText === tituloAntigo) {
            titulo.innerText = input;
        }
    });
}

const filtrarTarefas = () => {
    const filtroValor = filtro.value;
    const buscarTexto = buscarInput.value.toLowerCase();
    const tarefas = document.querySelectorAll(".tarefa");

    tarefas.forEach((tarefa) => {
        const tarefaTexto = tarefa.querySelector("h3").innerText.toLowerCase();
        const tarefaConcluida = tarefa.classList.contains("concluido");

        let mostrar = true;

        if (filtroValor === "feitos" && !tarefaConcluida) {
            mostrar = false;
        }
        if (filtroValor === "a-fazer" && tarefaConcluida) {
            mostrar = false;
        }
        if (buscarTexto && !tarefaTexto.includes(buscarTexto)) {
            mostrar = false;
        }

        tarefa.style.display = mostrar ? "flex" : "none";
    });
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
    let titulo;

    if (parentEl && parentEl.querySelector("h3")) {
        titulo = parentEl.querySelector("h3").innerText;
    }

    if (item.classList.contains("finalizar")) {
        parentEl.classList.toggle("concluido");
    }
    if (item.classList.contains("deletar")) {
        parentEl.remove();
    }
    if (item.classList.contains("editar")) {
        toggleForms();

        editar.value = titulo;
        tituloAntigo = titulo;
    }
});

cancelarEdicao.addEventListener("click", (evento) => {
    evento.preventDefault();

    toggleForms();
});

editarForm.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const input = editar.value;

    if (input) {
        atualizarTarefa(input);
    }

    toggleForms();
});

filtro.addEventListener("change", filtrarTarefas);
buscarInput.addEventListener("input", filtrarTarefas);
apagarBusca.addEventListener("click", (evento) => {
    evento.preventDefault();
    buscarInput.value = "";
    filtrarTarefas();
});