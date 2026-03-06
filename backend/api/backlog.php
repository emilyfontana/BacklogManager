<?php
//define variables and set to empty values
$id-task = $title-task = $description-task = $status-initial = "";
//define error variables and set to empty values
$id-taskErr = $title-taskErr = $description-taskErr = $status-initialErr = "";


if ($SERVER_["REQUEST_METHOD"] == "POST") {
    $id-task = test_input($_POST["id"]);
    $title-task = test_input($_POST["title"]);
    $description-task = test_input($_POST["description"]);
    $status-initial = test_input($_POST["status-initial"]);
}

//ERROS 

if($_SERVER["REQUEST_METHOD"] == "POST") {
    if(empty($_POST["id"])) {
        $id-taskErr = "ID é obrigatório";
    } if ($id-task = test_input($_POST["id"]));
        if(!is_numeric($id-task) || $id-task <= 0) {
            $id-taskErr = "ID deve ser um número positivo";
        } else {
            $id-task = test_input($_POST["id"]);
            if(strlen($id-task) > 6) {
                $id-taskErr = "ID deve ter no máximo 6 dígitos";
            }
        }
    }  //CRIAR ESPECIFICIDADES PARA NÃO ACEITAR QUALQUER TIPO DE DADO 

    if(empty($_POST["title"])) {
        $title-taskErr = "Title é obrigatório";
    } if ($title-task = test_input($_POST["title"])) {
        if(strlen($title-task) > 20) {
            $title-taskErr = "Title deve ter no máximo 20 caracteres";
        }else {
            $title-task = test_input($_POST["title"]);
            if(!preg_match("/^[a-zA-Z0-9 ]*$/", $title-task)) {
                $title-taskErr = "Title deve conter apenas letras, números e espaços";
            }
        }
    }

    if(strlen($description-task) > 50) {
            $description-taskErr = "Description deve ter no máximo 50 caracteres";
        }
    

    if(empty($_POST["status-initial"])) {
        $status-initialErr = "Status Inicial é obrigatório";
    } else {
        $status-initial = test_input($_POST["status-initial"]);
    }
}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}


echo "ID: " . $id-task . "<br>";
echo "Title: " . $title-task . "<br>";  
echo "Description: " . $description-task . "<br>";
echo "Status: " . $status-initial . "<br>";

?>