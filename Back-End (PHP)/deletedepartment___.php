<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include_once("db_connection.php");

// Get the ID of the item to be deleted
$id = $_GET['id'];

// Prepare the DELETE statement
$sql_delete = "DELETE FROM dept_master WHERE id = ?";

// Create a prepared statement for deletion
$stmt_delete = $mysqli->prepare($sql_delete);

// Bind the ID parameter
$stmt_delete->bind_param("i", $id);

// Execute the deletion statement
if ($stmt_delete->execute()) {
    // Delete successful
    echo "Item deleted successfully.";

    // Prepare the SELECT statement to fetch all remaining items
    $sql_select = "SELECT * FROM dept_master";

    // Execute the select statement
    $result = $mysqli->query($sql_select);

    if ($result) {
        // Fetch all rows as an associative array
        $items = $result->fetch_all(MYSQLI_ASSOC);

        // Convert the array to JSON and send the response
        echo json_encode($items);
    } else {
        // Error executing the select statement
        echo "Error fetching items: " . $mysqli->error;
    }
} else {
    // Delete failed
    echo "Error deleting item: " . $stmt_delete->error;
}

// Close the statement and the database connection
// $stmt_delete->close();
// $mysqli->close();
?>
