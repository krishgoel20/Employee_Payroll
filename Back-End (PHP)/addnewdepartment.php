<?php

include_once("db_connection.php");

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){ 
$request = json_decode($postdata);

$dept_name = trim($request->dept_name);

$sql = "INSERT INTO dept_master(dept_name) VALUES (
'$dept_name')";

if ($mysqli->query($sql)) {
    $departmentId = $mysqli->insert_id;
    $data=array('message'=>'success', 'id' => $departmentId, "dept_name"=>$dept_name);
    echo json_encode ($data);    
}else{
    $data-array('message' =>"failed");
    echo json_encode($data);
    
}
}

?>