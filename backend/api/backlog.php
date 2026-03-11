<?php
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

?>