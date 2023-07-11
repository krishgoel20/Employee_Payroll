<?php
// Assuming you have a database connection established
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include_once("db_connection.php");
// Get the email parameter from the request
$emp_mail_id = $_GET['email'];

// Prepare the SQL statement
$stmt = $mysqli->prepare("SELECT * FROM emp_details WHERE emp_mail_id = ?");
$stmt->bind_param("s", $emp_mail_id); // "s" indicates a string parameter
$stmt->execute();

// Fetch the result
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Fetch the result into an associative array
    $employee = $result->fetch_assoc();

    // Return the employee details as JSON response
    header('Content-Type: application/json');
    echo json_encode($employee);
} else {
    // Return an error response if no employee found
    header("HTTP/1.0 404 Not Found");
    echo "No employee found with the given email ID.";
}

$stmt->close();
// $conn->close();
?>
