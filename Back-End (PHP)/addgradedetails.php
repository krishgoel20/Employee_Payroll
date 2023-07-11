<?php

include_once("db_connection.php");

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){ 
$request = json_decode($postdata);

$grade_name = trim($request->grade_name);
$grade_short_name = trim($request->grade_short_name);
$grade_basic = trim($request->grade_basic);
$grade_da = trim($request->grade_da);
$grade_ta = trim($request->grade_ta);
$grade_hra = trim($request->grade_hra);
$grade_ma = trim($request->grade_ma);
$grade_bonus = trim($request->grade_bonus);
$grade_pf = trim($request->grade_pf);
$grade_pt = trim($request->grade_pt);


$sql = "INSERT INTO emp_grade_details(grade_name, grade_short_name, grade_basic, grade_da,grade_ta, grade_hra,
grade_ma, grade_bonus, grade_pf, grade_pt) VALUES (
 '$grade_name', '$grade_short_name', '$grade_basic', '$grade_da','$grade_ta', '$grade_hra',
'$grade_ma', '$grade_bonus', '$grade_pf', '$grade_pt')";

if ($mysqli->query($sql)) {
    $gradeId = $mysqli->insert_id;
    $data=array('message'=>'success', "id"=>$gradeId, "grade_name"=>$grade_name, "grade_short_name"=>$grade_short_name,"grade_basic"=>$grade_basic, "grade_da"=>$grade_da, "grade_ta"=>$grade_ta, "grade_hra"=>$grade_hra,
    "grade_ma"=>$grade_ma, "grade_bonus"=>$grade_bonus, "grade_pf"=>$grade_pf, "grade_pt"=>$grade_pt);
    echo json_encode ($data); 
}else{
    $data-array('message' =>"failed");
    echo json_encode($data);
    
}
}

?>