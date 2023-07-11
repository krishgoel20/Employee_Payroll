<?php
// Assuming you have a database connection established
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include_once("db_connection.php");
// Get the ID of the item to be deleted
$id = $_GET['id'];
echo $id;

// Prepare the DELETE statement
$sql = "DELETE FROM dept_master WHERE id = ?";

// Create a prepared statement
$stmt = $mysqli->prepare($sql);

// Bind the ID parameter
$stmt->bind_param("i", $id);

// Execute the statement
if ($stmt->execute()) {
    // Delete successful
    echo "Item deleted successfully.";
    $data=array('message'=>'success');
    echo json_encode ($data);

} else {
    // Delete failed
    echo "Error deleting item: " . $stmt->error;
}

// Close the statement and the database connection
$stmt->close();
// $conn->close();
?>
