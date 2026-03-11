//get elements

//modal task 

const btnopenmodaltask = document.getElementById("btnopenmodaltask");
const modaltask = document.getElementById("modaltask");
const btnclosemodaltask = document.getElementById("btnclosemodaltask");

// modal create new task
const btnnewtask = document.getElementById("btnnewtask");
const modalnewtask = document.getElementById("modalnewtask");
const btnclosemodalnewtask = document.getElementById("btnclosemodalnewtask");
const btncreatemodalnewtask = document.getElementById("btncreatemodalnewtask");
// ----

const idInput = document.getElementById("id_task");
const titleInput = document.getElementById("title_task");
const descriptionInput = document.getElementById("description_task");
const statusSelect = document.getElementById("status_initial");




// side menu
const sidemenu = document.getElementById("sidemenu");
const opensidemenu = document.getElementById("opensidemenu");
const closesidemenu = document.getElementById("closesidemenu");

// modal config
const btnopenconfig = document.getElementById("btnopenconfig");
const modalconfig = document.getElementById("modalconfig");
const btncloseconfig = document.getElementById("btncloseconfig");


// Funções de controle de modais

function OpenNewTask() {
   
    if (!modalnewtask) return;  //checagem de existência para evitar erros quando o elemento não existe.
    modalnewtask.classList.add("active");
    console.log("modal new task aberto");
}

function CloseNewTask(){
    if (!modalnewtask) return;
    modalnewtask.classList.remove("active");
    console.log("modal new task fechado");
}

function createNewTask(){
    
    alert("atualizado no banco de dados (simulado)");
}


//função modal config - new status
function openConfigModal() {
    if (!modalconfig) return;
    modalconfig.classList.add("active");
    console.log("Config modal opened");
}

function closeConfigModal() {
    if (!modalconfig) return;
    modalconfig.classList.remove("active");
    console.log("Config modal closed"); 
}

//função side menu

function openSideMenu() {
    if (!sidemenu) return;
    sidemenu.classList.add("active");
    console.log("Side menu opened");
}

function closeSideMenu() {
    if (!sidemenu) return;
    sidemenu.classList.remove("active");
    console.log("Side menu closed");
}

//função modal task

function openTaskModal() {
    if (!modaltask) return;
    modaltask.classList.add("active");
    console.log("Task modal opened");
}

function closeTaskModal() {
    if (!modaltask) return;
    modaltask.classList.remove("active");
    console.log("Task modal closed");
}

function getFormData() {
        return {
            id:        idInput?.value.trim()     ?? '',
            titulo:    titleInput?.value.trim()  ?? '',
            descricao: descInput?.value.trim()   ?? '',
            status:    statusSelect?.value       ?? '',
        };
    }

//verificar todos esses itens se estão corretos 
// validação cliente 

const validate = (() => {
    const STATUS_VALIDOS = ['backend', 'review', 'published'];

    function tarefa({ titulo, descricao, status }) {
        const erros = {};

        if (!titulo)
            erros.titulo = 'Título é obrigatório';
        else if (titulo.length > 20)
            erros.titulo = 'Máximo 20 caracteres';

        if (descricao.length > 50)
            erros.descricao = 'Máximo 50 caracteres';

        if (!STATUS_VALIDOS.includes(status))
            erros.status = 'Status inválido';

        return {
            valido: Object.keys(erros).length === 0,
            erros,
        };
    }

    return { tarefa };
})();


// ── 3. CAMADA DE API ─────────────────────────────────────────────────────────

const api = (() => {
    // Lê o token CSRF da meta tag gerada pelo PHP
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content ?? '';

    async function cadastrarTarefa(dados) {
        const res = await fetch('tarefas/cadastrar.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': csrfToken,          // enviado no header
            },
            body: JSON.stringify(dados),
        });

        // repassa o JSON independente do status HTTP
        const json = await res.json();
        return { status: res.status, ...json };
    }

    return { cadastrarTarefa };
})();


// ── HANDLER DE SUBMIT (orquestra as 3 camadas) ────────────────────────────────

document.getElementById('formNewTask')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const dados = ui.getFormData();

    // 1. valida no cliente primeiro (feedback imediato)
    const { valido, erros: errosClient } = validate.tarefa(dados);
    if (!valido) {
        ui.showErrors(errosClient);
        return;
    }

    ui.setLoading(true);

    try {
        const resultado = await api.cadastrarTarefa(dados);

        if (resultado.sucesso) {
            ui.close();

            // dispara evento customizado para que app.js possa ouvir
            // e adicionar o card ao board sem acoplamento
            document.dispatchEvent(new CustomEvent('tarefa:criada', {
                detail: {
                    id:       resultado.id,
                    titulo:   dados.titulo,
                    descricao: dados.descricao,
                    status:   dados.status,
                }
            }));

        } else if (resultado.erros) {
            // erros por campo vindos do PHP
            ui.showErrors(resultado.erros);

        } else {
            // erro genérico (500, etc.)
            alert('Erro: ' + (resultado.mensagem ?? 'Tente novamente'));
        }

    } catch (err) {
        console.error('[modal-newtask] fetch falhou:', err);
        alert('Falha na conexão com o servidor');

    } finally {
        ui.setLoading(false);
    }
});




// -----------------------------
// Wiring de eventos (com checagens)
// -----------------------------
// ERRO comum que causava falha silenciosa: se um getElementById retorna null,
// chamar addEventListener sem checar gera TypeError; aqui evitamos isso com ifs.

// side menu
if (opensidemenu) opensidemenu.addEventListener("click", openSideMenu);
if (closesidemenu) closesidemenu.addEventListener("click", closeSideMenu);

// new task modal trigger
if (btnnewtask) btnnewtask.addEventListener("click", OpenNewTask);

// task modal open/close
if (btnopenmodaltask) btnopenmodaltask.addEventListener("click", openTaskModal);
if (btnclosemodaltask) btnclosemodaltask.addEventListener("click", closeTaskModal);

// config modal
if (btnopenconfig) btnopenconfig.addEventListener("click", openConfigModal);
if (btncloseconfig) btncloseconfig.addEventListener("click", closeConfigModal);

// CORREÇÃO IMPORTANTE:
// ERRO detectado no seu arquivo original: havia um erro de sintaxe no listener global de keyboard
// (fechamento extra de chaves/parênteses) — isso causa SyntaxError e impede TODO o JS de rodar.
// Aqui está o listener corrigido (sem chaves/parênteses extras).

// fechar modais ao clicar fora do conteúdo
if (modaltask) {
    modaltask.addEventListener("click", function(event) {
        if (event.target === modaltask) {
            closeTaskModal();
        }
    });
}

if (modalconfig) {
    modalconfig.addEventListener("click", function(event) {
        if (event.target === modalconfig) {
            closeConfigModal();
        }
    });
}

if (modalnewtask) {
    modalnewtask.addEventListener("click", function(event) {
        if (event.target === modalnewtask) {
            CloseNewTask();
        }
    });
}

// Adiciona listeners do botão fechar/atualizar do modal "new task"
// ERRO anterior: você havia obtido os elementos mas não havia ligado os botões a nenhuma ação.
if (btnclosemodalnewtask) btnclosemodalnewtask.addEventListener("click", CloseNewTask);
if (btnupdatemodalnewtask) btnupdatemodalnewtask.addEventListener("click", UpdateNewTask);

// handler global de Escape (SINTAXE CORRIGIDA)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (modalconfig && modalconfig.classList.contains('active')) closeConfigModal();
        if (modaltask && modaltask.classList.contains('active')) closeTaskModal();
        if (modalnewtask && modalnewtask.classList.contains('active')) CloseNewTask();
    }
});


const form = document.querySelector("#forNewTask");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData (form);
    const data = Object.fromEntries(formData);

    fetch("/api/salvar " , {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    .then (response => response.json())
    .then (result => console.log(result));

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


