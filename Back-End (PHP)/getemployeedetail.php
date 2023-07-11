<?php
// Create a new MySQLi connection
include_once("db_connection.php");


// Query to retrieve data from the newdepartment table
$query = "SELECT * FROM emp_details";

// Execute the query
$result = $mysqli->query($query);

// Fetch the data and store it in an array
$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

// Close the database connection
$mysqli->close();

// Encode the data as JSON and send it to Angular
echo json_encode($data);
?>
