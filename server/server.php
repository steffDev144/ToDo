<?php
//    error_reporting(-1);

    header('Content-Type: text/html; charset=utf-8');
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: *");

    define("DATEBASE", [
        "DBHOST" => "127.0.0.1", //Field for host
        "DBUSER" => "steff", //Field for user PMA
        "DBPASS" => "q3r7814HB2j", //Field for password PMA
        "DBNAME" => "ajax1"  //Field for name DB in PMA
    ]);

    $db_connect = mysqli_connect(DATEBASE["DBHOST"], DATEBASE["DBUSER"], DATEBASE["DBPASS"], DATEBASE["DBNAME"]);

    if($db_connect == false || $db_connect == 'false' || $db_connect === false) {
        echo "<h4 style='color: red; font-family: sans-serif;'>Ошибка соединения с базой данных!</h4>";
        die;
    }

    if(!empty($_POST)) {

        $your_json_string = file_get_contents('php://input');
        $data = json_decode($your_json_string, TRUE);

        if(!empty($data)) {
            if(isset($data['bool'])) {
                $userId = $data['userId'];
                $text = $data['text'];
                $bool = $data['bool'];

                $query = "INSERT INTO `tasks` (idUser, text, bool) VALUE ('".$userId."','".$text."', '".$bool."')";
                $sql_query = mysqli_query($db_connect, $query) or die('Запрос не удался: ' . mysqli_error($db_connect));

            }
            else {
                $id = base_convert(sha1(uniqid(mt_rand(), true)), 16, 36);
                $login = $data["login"];
                $password = $data["password"];
                $filter = $data["filter"];

                $querySubmit = "INSERT INTO `users` (id, name, password, filter) VALUES('".$id."','".$login."', '".$password."', '".$filter."')";
                $sql_query = mysqli_query($db_connect, $querySubmit);

                echo $sql_query;
            }

        }
    }

    if($_GET["data"] == "true") {
        $query = "SELECT * FROM `tasks`"; // WHERE `id` = 1
        $result = mysqli_query($db_connect, $query) or die('Запрос не удался: ' . mysqli_error($db_connect));

        $tasks = [];

        while($row1 = mysqli_fetch_assoc($result)) {
            $tasks[] = $row1;
        }

        echo json_encode($tasks);
    }

    if(isset($_GET['updateFilter'])) {

        $userId = $_GET["userId"];
        $updateFilter = $_GET['bool'];

        $queryUpdate = "UPDATE `users` SET `filter` = '".$updateFilter."' WHERE `id` = ".$userId;
        $resultUpdate = mysqli_query($db_connect, $queryUpdate) or die('Запрос не удался: ' . mysqli_error($db_connect));
    }

    if(isset($_GET["userName"])) {
        $query = "SELECT name, id FROM `users`"; // WHERE `id` = 1
        $result = mysqli_query($db_connect, $query) or die('Запрос не удался: ' . mysqli_error($db_connect));

        $tasks = [];

        while($row1 = mysqli_fetch_assoc($result)) {
            $tasks[] = $row1;
        }

        echo json_encode($tasks);
    }

    if(isset($_GET["auth"])) {
        $query = "SELECT name, password FROM `users`"; // WHERE `id` = 1
        $result = mysqli_query($db_connect, $query) or die('Запрос не удался: ' . mysqli_error($db_connect));

        $tasks = [];

        while($row1 = mysqli_fetch_assoc($result)) {
            $tasks[] = $row1;
        }

        echo json_encode($tasks);
    }

    if(isset($_GET['deleteAll'])) {
        $queryDelete = "DELETE FROM `tasks` WHERE `bool` = 'true'";
        $resultDelete = mysqli_query($db_connect, $queryDelete) or die('Запрос не удался: ' . mysqli_error($db_connect));
    }

    if(isset($_GET["deleteId"])) {

        $queryDelete = "DELETE FROM `tasks` WHERE `tasks`.`id`=" . $_GET["deleteId"];
        $resultDelete = mysqli_query($db_connect, $queryDelete) or die('Запрос не удался: ' . mysqli_error($db_connect));


        $querySelectUpdate = "SELECT * FROM `tasks` WHERE `id` = ".deleteId;
        $resultUpdate2 = mysqli_query($db_connect, $querySelectUpdate) or die('Запрос не удался: ' . mysqli_error($db_connect));

        $tasks2 = [];

        while($row2 = mysqli_fetch_assoc($resultUpdate2)) {
            $tasks2[] = $row2;
        }

        echo json_encode($tasks2);

    }

    if(!empty($_GET["updateCheck"])) {
        $updateId = strval($_GET["id"]);
        $updateBool = strval($_GET['bool']);

        $queryUpdate = "UPDATE `tasks` SET `bool` = '".$updateBool."' WHERE `id` = ".$updateId;
        $resultUpdate = mysqli_query($db_connect, $queryUpdate) or die('Запрос не удался: ' . mysqli_error($db_connect));
    }



    if(!empty($_GET["update"])) {

        $updateId = $_GET["id"];
        $updateText = $_GET['text'];
        $updateBool = strval($_GET['bool']);

        $queryUpdate = "UPDATE `tasks` SET `text` = '".$updateText."', `bool` = '".$updateBool."' WHERE `id` = ".$updateId;
        $resultUpdate = mysqli_query($db_connect, $queryUpdate) or die('Запрос не удался: ' . mysqli_error($db_connect));

    }