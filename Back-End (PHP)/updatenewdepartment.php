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
$dept_name = trim($request->dept_name);

// var_dump($dept_name, $id);
// Prepare and execute the update statement
$stmt = $mysqli->prepare("UPDATE dept_master SET dept_name = ? WHERE id = ?");
$stmt->bind_param("ss", $dept_name, $id);
$stmt->execute();


// Check if the update was successful
if ($stmt->affected_rows > 0) {
    // echo "Data updated successfully";
    $data=array('message'=>'success', 'id' => $id, "dept_name"=>$dept_name);
    echo json_encode ($data);    
} else {
    echo "Failed to update data";
}
}
// Close the statement and the database connection
// $stmt->close();
// $conn->close();
?>
