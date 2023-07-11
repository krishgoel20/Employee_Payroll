<?php

include_once("db_connection.php");

// $postdata = file_get_contents("php://input");

$postdata = file_get_contents("php://input");

if(isset($postdata) && !empty($postdata)){ 
$request = json_decode($postdata);

$user_name = trim($request->user_name);
$password = trim($request->password);
$userType = trim($request->userType);

// $user_name = $_POST['user_name'];
// echo $user_name;
// $password = $_POST['password'];
// $userType = $_POST['userType'];


$sql = "SELECT email_id, userType FROM signup WHERE user_name = '$user_name' AND password = '$password' AND userType = '$userType'";
$result = $mysqli->query($sql);

if ($result->num_rows > 0) {
    // Fetch the email from the result
    $row = $result->fetch_assoc();    
    $email_id = $row['email_id'];
    $userType = $row['userType'];

    // Return the email as JSON response
    $response = [
        'message' => 'success',
        'email_id' => $email_id,
        'userType' => $userType
    ];
    echo json_encode($response);
} else {
    // Return an error message as JSON response
    $response = [
        'message' => 'Invalid credentials'
    ];
    echo json_encode($response);
}
}

?>