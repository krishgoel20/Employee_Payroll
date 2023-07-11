<?php

include_once("db_connection.php");

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){ 
$request = json_decode($postdata);

$user_name = trim($request->user_name);
$password = trim($request->password);
$email_id = trim($request->email_id);
$userType = trim($request->userType);

$sql = "INSERT INTO signup(user_name, password, email_id, userType) VALUES (
'$user_name', '$password', '$email_id', '$userType')";

if ($mysqli->query($sql)) {
    $userId = $mysqli->insert_id;    
    $data=array('message'=>'success', 'userId' => $userId);
    echo json_encode ($data);    
}else{
    $data-array('message' =>"failed");
    echo json_encode($data);
    
}
}

?>