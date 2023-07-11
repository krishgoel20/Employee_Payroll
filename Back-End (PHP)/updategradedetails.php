<?php

// Assuming you have a database connection established
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include_once("db_connection.php");


// Assuming you have received the updated data from a form or other source
// $id = $_POST['id']; // Assuming the ID of the row to update is passed via a form field
// $dept_name = $_POST['dept_name']; // Assuming the new value to update is passed via a form field

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){ 
$request = json_decode($postdata);
$id = trim($request->id);
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

// var_dump($grade_name, $grade_short_name, $grade_basic, $grade_da, $grade_ta, $grade_hra,
// $grade_ma, $grade_bonus, $grade_pf, $grade_pt, $id);
// Prepare and execute the update statement
$stmt = $mysqli->prepare("UPDATE emp_grade_details SET grade_name = ?, grade_short_name = ?, grade_basic = ?, grade_da = ?,grade_ta =?, grade_hra = ?,
grade_ma = ?, grade_bonus = ?, grade_pf = ?, grade_pt = ?  WHERE id = ?");
$stmt->bind_param("sssssssssss", $grade_name, $grade_short_name, $grade_basic, $grade_da, $grade_ta, $grade_hra,
$grade_ma, $grade_bonus, $grade_pf, $grade_pt, $id);
$stmt->execute();


// Check if the update was successful
if ($stmt->affected_rows > 0) {
    // echo "Data updated successfully";
    $data=array('message'=>'success', 'id' => $id, 'grade_name'=>$grade_name, 'grade_short_name'=>$grade_short_name, 'grade_basic'=>$grade_basic, 'grade_da'=>$grade_da,'grade_ta'=>$grade_ta, 'grade_hra'=>$grade_hra,
    'grade_ma'=>$grade_ma, 'grade_bonus'=>$grade_bonus, 'grade_pf'=>$grade_pf, 'grade_pt'=>$grade_pt);
    echo json_encode ($data);    
} else {
    echo "Failed to update data";
}
}
// Close the statement and the database connection
// $stmt->close();
// $conn->close();
?>
