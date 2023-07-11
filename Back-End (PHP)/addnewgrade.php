<?php
include_once("db_connection.php");

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){ 
$request = json_decode($postdata);

$grade_name = trim($request->grade_name);

$sql = "INSERT INTO grade_master(grade_name) VALUES (
'$grade_name')";

if ($mysqli->query($sql)) {
    $gradeId = $mysqli->insert_id;
    $data=array('message'=>'success', "id"=>$gradeId, "grade_name"=>$grade_name);
    echo json_encode ($data);    
}else{
    $data-array('message' =>"failed");
    echo json_encode($data);
    
}
}

?>