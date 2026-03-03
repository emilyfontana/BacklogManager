//get elements
const btnopenmodaltask = document.getElementById("btnopenmodaltask");
const modaltask = document.getElementById("modaltask");
const btnclosemodaltask = document.getElementById("btnclosemodaltask");

const newtask = document.getElementById("newtask");

const sidemenu = document.getElementById("sidemenu");
const opensidemenu = document.getElementById("opensidemenu");
const closesidemenu = document.getElementById("closesidemenu");

const btnopenconfig = document.getElementById("btnopenconfig");
const modalconfig = document.getElementById("modalconfig");
const btncloseconfig = document.getElementById("btncloseconfig");

// configuration modal helpers
function openConfigModal() {
    modalconfig.classList.add("active");
    console.log("Config modal opened");
}

function closeConfigModal() {
    modalconfig.classList.remove("active");
    console.log("Config modal closed"); 
}

// side menu toggles
function openSideMenu() {
    sidemenu.classList.add("active");
    console.log("Side menu opened");
}

function closeSideMenu() {
    sidemenu.classList.remove("active");
    console.log("Side menu closed");
}

// TODO: replace alert with real implementation
function addTask() {
    alert("Function to add a new task will be implemented here.");
}

function openTaskModal() {
    modaltask.classList.add("active");
    console.log("Task modal opened");
}

function closeTaskModal() {
    modaltask.classList.remove("active");
    console.log("Task modal closed");
}

// wire up click handlers
opensidemenu.addEventListener("click", openSideMenu);
closesidemenu.addEventListener("click", closeSideMenu);
newtask.addEventListener("click", addTask);
btnopenmodaltask.addEventListener("click", openTaskModal);
btnclosemodaltask.addEventListener("click", closeTaskModal);
btnopenconfig.addEventListener("click", openConfigModal);
btncloseconfig.addEventListener("click", closeConfigModal);

// close task modal when clicking outside content
modaltask.addEventListener("click", function(event) {
    if (event.target === modaltask) {
        closeTaskModal();
    }
});

// close config modal when clicking outside content
modalconfig.addEventListener("click", function(event) {
    if (event.target === modalconfig) {
        closeConfigModal();
    }
});

// global key handler for escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (modalconfig.classList.contains('active')) closeConfigModal();
        if (modaltask.classList.contains('active')) closeTaskModal();
    }
});

//regras para utilizar 

//----como vai funcionar add new task----
// ao clicar em "add new task", abrirá um modal com um formulário para preencher os detalhes da task 
//user podera colocar informações relevantes
//infos obrigatórias: PBI, título,status
//infos únicas: PBI (identificador único da task)
// poderá editar qual a data que a task foi aberta se não for a data atual, ou a data atual será default
// poderá editar a descrição da task com o objetivo de detalhar melhor o que precisa ser feito
// deverá ter a opção de adicionar a priroridade da task de 1-5
//poderá editar a task para adicionar comentários ou atualizar o status, os outros itens tambpem são editaveis menos o seu histórico e o pbi
// ao editar o status deverá manter em tela um histórico de mudanças de status com data e hora - podendo adiconar uma especpifica oua adicionando a atual
//se o item for adicionado com sucesso, deverá aparecer na lista de tasks com a cor determinada de cada status e de forma que o mais recente aperece por primeiro
//se tiver algum dos campos obrigatórios vazio, deverá aparecer uma mensagem de erro solicitando o preenchimento dos campos obrigatórios
// se tiver com algum dos status nos indicadores deverá ser atualizado automaticamente

// filtros --> estudar melhor o funcionamento

// deverá ter filtros para visualizar tasks por prioridade, status e data de criação/conclusão
// os filtros poderão ser combinados para refinar a busca
// ao aplicar um filtro, a lista de tasks deverá ser atualizada para mostrar apenas as tasks que correspondem aos critérios selecionados
// deverá ter a opção de limpar todos os filtros aplicados para voltar a visualizar todas as tasks


//---os indicadores---

// se o usuário clicar em um dos indicadores (ex: número de tasks "em andamento"), a lista de tasks deverá ser filtrada automaticamente para mostrar apenas as tasks com esse status
// os indicadores deverão ser atualizados automaticamente conforme as tasks são adicionadas, editadas ou removidas


// ---- se o item for concluido/publicado ----

// se o item for publicado/concluído, deverá ser movido para uma seção de "publicados", podendo ser acessado por um filtro ou nos indicadores, mas deverá sair da pag principal
// deverá ter a opção de restaurar a task, que a moverá de volta para a lista principal com status "em andamento" ou outro status escolhido pelo usuário
//deverá manter o histórico de status e comentários mesmo quando restaurado
//deverá ter a opção de excluir permanentemente a task, com um alerta de confirmação antes de realizar a ação
//deverá aparecer no relatório mensal como "concluído" com a data de conclusão caso a data selecionada esteja dentro do mês selecionado no relatório
//deverá atualizar os indicadores automaticamente

// ---- se o item for excluído/removido ----
// se o item for excluído, deverá ser movido para uma seção de "excluídos", podendo ser acessado por um filtro ou nos indicadores, mas deverá sair da pag principal
// deverá ter a opção de restaurar a task, que a moverá de volta para a lista principal com status "em andamento" ou outro status escolhido pelo usuário
// deverá manter o histórico de status e comentários mesmo quando restaurado
// deverá ter a opção de excluir permanentemente a task, com um alerta de confirmação antes de realizar a ação
// não deverá aparecer no relatório mensal, a menos que seja restaurado antes do final do mês
//deverá atualizar os indicadores automaticamente

//verificar regra de relatório

// será parecido com o do epays?
//ou será mais simples, apenas contando o número de tasks concluídas por status e por prioridade?


// dashboard

//dentro do dashbaord, deverá ter indicadores visuais (gráficos de barras, pizza, etc) mostrando o número de tasks por status e tempo médio para conclusão
//deverá ter filtros para visualizar tasks por prioridade, status e data de criação/conclusão


