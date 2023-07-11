<?php

include_once("db_connection.php");

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){ 
$request = json_decode($postdata);

$emp_id = trim($request->emp_id);
$emp_salary_month = trim($request->emp_salary_month);
$emp_total_salary = trim($request->emp_total_salary);
$emp_salary_year = trim($request->emp_salary_year);
$emp_gross = trim($request->emp_gross);
$emp_salary_reimbursment = trim($request->emp_salary_reimbursment);
$emp_dept_id = trim($request->emp_dept_id);
$emp_grade_id = trim($request->emp_grade_id);
$emp_basic = trim($request->emp_basic);
$emp_da = trim($request->emp_da);
$emp_ta = trim($request->emp_ta);
$emp_hra = trim($request->emp_hra);
$emp_ma = trim($request->emp_ma);
$emp_bonus = trim($request->emp_bonus);
$emp_pf = trim($request->emp_pf);
$emp_pt = trim($request->emp_pt);


$sql = "INSERT INTO emp_salary_details(emp_id, emp_salary_month, emp_total_salary, emp_salary_year, emp_gross,  emp_salary_reimbursment, emp_dept_id, emp_grade_id, emp_basic, emp_da,emp_ta, emp_hra,
emp_ma, emp_bonus, emp_pf, emp_pt) VALUES (
 '$emp_id', '$emp_salary_month', '$emp_total_salary', '$emp_salary_year', '$emp_gross',  '$emp_salary_reimbursment', '$emp_dept_id', '$emp_grade_id', '$emp_basic', '$emp_da','$emp_ta', '$emp_hra',
'$emp_ma', '$emp_bonus', '$emp_pf', '$emp_pt')";

if ($mysqli->query($sql)) {
    $gradeId = $mysqli->insert_id;
    $data=array('message'=>'success', "id"=>$gradeId, "emp_id"=>$emp_id, "emp_salary_month"=>$emp_salary_month, "emp_total_salary"=>$emp_total_salary, "emp_salary_year"=>$emp_salary_year, "emp_gross"=>$emp_gross, "emp_salary_reimbursment"=>$emp_salary_reimbursment, "emp_dept_id"=>$emp_dept_id, "emp_grade_id"=>$emp_grade_id, "emp_basic"=>$emp_basic, "emp_da"=>$emp_da, "emp_ta"=>$emp_ta, "emp_hra"=>$emp_hra,
    "emp_ma"=>$emp_ma, "emp_bonus"=>$emp_bonus, "emp_pf"=>$emp_pf, "emp_pt"=>$emp_pt);
    echo json_encode ($data); 
}else{
    $data-array('message' =>"failed");
    echo json_encode($data);
    
}
}

?>