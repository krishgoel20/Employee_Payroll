<?php
// ini_set('display_errors', 1);
// error_reporting(E_ALL);

// Assuming you have a database connection established
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");


include_once("db_connection.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $emp_title = trim($_POST['emp_title']);
    $emp_id = trim($_POST['emp_id']);
    $emp_dob = trim($_POST['emp_dob']);
    $emp_address = trim($_POST['emp_address']);
    $emp_state = trim($_POST['emp_state']);
    $emp_mobile_no = trim($_POST['emp_mobile_no']);
    $emp_pan_no = trim($_POST['emp_pan_no']);
    $emp_name = trim($_POST['emp_name']);
    $emp_doj = trim($_POST['emp_doj']);
    $emp_city = trim($_POST['emp_city']);
    $emp_pincode = trim($_POST['emp_pincode']);
    $emp_mail_id = trim($_POST['emp_mail_id']);
    $id = trim($_POST['id']);
    $previousimage = trim($_POST['previousimage']);

    

    // Check if a new image file is uploaded
    if (isset($_FILES['emp_upload_pan']) && $_FILES['emp_upload_pan']['error'] === UPLOAD_ERR_OK) {
        $targetDir = 'uploads/';
        $targetFile = $targetDir . basename($_FILES['emp_upload_pan']['name']);
        $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

        // Allow only specific file types (e.g., jpeg, jpg, png)
        // You can customize this list based on your requirements
        if ($imageFileType === 'jpg' || $imageFileType === 'jpeg' || $imageFileType === 'png') {
            // Move the uploaded file to the desired location
            if (move_uploaded_file($_FILES['emp_upload_pan']['tmp_name'], $targetFile)) {
                // Update the image file path in the database
                $filePath = $targetFile;
                $sql = "UPDATE emp_details SET emp_upload_pan = '$filePath' WHERE id = $id";

                if ($mysqli->query($sql)) {
                    $employeeId = $mysqli->insert_id;
                    $data = ['message' => 'success', 'id' => $employeeId, 'emp_title'=>$emp_title, 'emp_id'=>$emp_id, 'emp_dob'=>$emp_dob, 'emp_address'=>$emp_address, 'emp_state'=>$emp_state, 'emp_mobile_no'=>$emp_mobile_no, 'emp_pan_no'=>$emp_pan_no, 'emp_name'=>$emp_name, 'emp_doj'=>$emp_doj, 'emp_city'=>$emp_city, 'emp_pincode'=>$emp_pincode, 'emp_mail_id'=>$emp_mail_id, 'emp_upload_pan'=>$filePath];
                    echo json_encode($data);
                } else {
                    $data = ['message' => 'failed'];
                    echo json_encode($data);
                }
            } else {
                echo json_encode(['message' => 'Error uploading image']);
            }
        } else {
            echo json_encode(['message' => 'Only JPG, JPEG, and PNG files are allowed']);
        }
    }else{
        // Update the fields except for the image field
    $sql = "UPDATE emp_details SET emp_title = '$emp_title', emp_id = '$emp_id', emp_dob = '$emp_dob', emp_address = '$emp_address', emp_state = '$emp_state', emp_mobile_no = '$emp_mobile_no', emp_pan_no = '$emp_pan_no', emp_name = '$emp_name', emp_doj = '$emp_doj', emp_city = '$emp_city', emp_pincode = '$emp_pincode', emp_mail_id = '$emp_mail_id' WHERE id = $id";

    if ($mysqli->query($sql)) {
        $employeeId = $id;
        $data = ['message' => 'success', 'id' => $employeeId, 'emp_title'=>$emp_title, 'emp_id'=>$emp_id, 'emp_dob'=>$emp_dob, 'emp_address'=>$emp_address, 'emp_state'=>$emp_state, 'emp_mobile_no'=>$emp_mobile_no, 'emp_pan_no'=>$emp_pan_no, 'emp_name'=>$emp_name, 'emp_doj'=>$emp_doj, 'emp_city'=>$emp_city, 'emp_pincode'=>$emp_pincode, 'emp_mail_id'=>$emp_mail_id, 'emp_upload_pan'=>$previousimage];
        echo json_encode($data);
    } else {
        $data = ['message' => 'failed'];
        echo json_encode($data);
    }
    }
} else {
    echo json_encode(['message' => 'Invalid request']);
}
?>
