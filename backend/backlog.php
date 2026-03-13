
<?php

header('Content-Type: application/json');

$id_task = $_POST['id_task'] ?? '';
$title_task = $_POST['title_task'] ?? '';
$description_task = $_POST['description_task'] ?? '';

$response = ['status' => 'OK', 'description_task' => '', 'field' => ''];

if (empty($id_task)) {
    $response = ['status' => 'Erro', 'id_task' => 'Por favor, preencha o id.', 'field' => 'id_task'];
} elseif (empty($title_task)) {
    $response = ['status' => 'Erro', 'title_task' => 'Por favor, preencha o título.', 'field' => 'title_task'];

} elseif (empty($description_task)) {
    $response = ['status' => 'Erro', 'description_task' => 'Por favor, escreva uma descrição.', 'field' => 'description_task'];
} else {
    //
    // Adicione aqui o código para enviar a mensagem por e-mail
    //
    // Se passar por todas as validações, considera a mensagem como enviada com sucesso
    $response = ['status' => 'OK', 'description_task' => 'Mensagem enviada com sucesso!', 'field' => ''];
}

echo json_encode($response);


/*
//define variables and set to empty values
$id_task = $title_task = $description_task = $status_initial = "";
//define error variables and set to empty values
$id_taskErr = $title_taskErr = $description_taskErr = $status_initialErr = "";


if ($SERVER_["REQUEST_METHOD"] == "POST") {
    $id_task = test_input($_POST["id"]);
    $title_task = test_input($_POST["title"]);
    $description_task = test_input($_POST["description"]);
    $status_initial = test_input($_POST["status-initial"]);
}

//ERROS 

if($_SERVER["REQUEST_METHOD"] == "POST") {
    if(empty($_POST["id"])) {
        $id_taskErr = "ID é obrigatório";
    } if ($id_task = test_input($_POST["id"]));
        if(!is_numeric($id-task) || $id-task <= 0) {
            $id-taskErr = "ID deve ser um número positivo";
        } else {
            $id_task = test_input($_POST["id"]);
            if(strlen($id_task) > 6) {
                $id-taskErr = "ID deve ter no máximo 6 dígitos";
            }
        }
    }  //CRIAR ESPECIFICIDADES PARA NÃO ACEITAR QUALQUER TIPO DE DADO 

    if(empty($_POST["title"])) {
        $title_taskErr = "Title é obrigatório";
    } if ($title_task = test_input($_POST["title"])) {
        if(strlen($title-task) > 20) {
            $title_taskErr = "Title deve ter no máximo 20 caracteres";
        }else {
            $title_task = test_input($_POST["title"]);
            if(!preg_match("/^[a-zA-Z0-9 ]*$/", $title-task)) {
                $title-taskErr = "Title deve conter apenas letras, números e espaços";
            }
        }
    }

    if(strlen($description_task) > 50) {
            $description-taskErr = "Description deve ter no máximo 50 caracteres";
        }
    

    if(empty($_POST["status-initial"])) {
        $status_initialErr = "Status Inicial é obrigatório";
    } else {
        $status_initial = test_input($_POST["status-initial"]);
    }
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}


echo "ID: " . $id_task . "<br>";
echo "Title: " . $title_task . "<br>";  
echo "Description: " . $description_task . "<br>";
echo "Status: " . $status_initial . "<br>";
*/
?>
