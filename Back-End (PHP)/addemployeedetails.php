<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

include_once("db_connection.php");

$targetDir = 'uploads/';
$targetFile = $targetDir . basename($_FILES['emp_upload_pan']['name']);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['emp_upload_pan'])) {
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
  

    // Check if the image file is a valid image
    $check = getimagesize($_FILES['emp_upload_pan']['tmp_name']);
    if ($check === false) {
        echo json_encode(['message' => 'Invalid image file']);
        $uploadOk = 0;
    }

    // Check if the file already exists
    // if (file_exists($targetFile)) {
    //     echo json_encode(['message' => 'File already exists']);
    //     $uploadOk = 0;
    // }

    // Allow only specific file types (e.g., jpeg, jpg, png)
    // You can customize this list based on your requirements
    if ($imageFileType !== 'jpg' && $imageFileType !== 'jpeg' && $imageFileType !== 'png') {
        echo json_encode(['message' => 'Only JPG, JPEG, and PNG files are allowed']);
        $uploadOk = 0;
    }

    // If no errors, move the uploaded file to the desired location
    if ($uploadOk === 1) {
        if (move_uploaded_file($_FILES['emp_upload_pan']['tmp_name'], $targetFile)) {
            // Insert the image file path into the database
            $filePath = $targetFile;
            $sql = "INSERT INTO emp_details(emp_title, emp_id, emp_dob, emp_address, emp_state, emp_mobile_no, emp_pan_no, emp_name, emp_doj, emp_city, emp_pincode, emp_mail_id, emp_upload_pan) VALUES ('$emp_title', '$emp_id', '$emp_dob', '$emp_address', '$emp_state', '$emp_mobile_no', '$emp_pan_no', '$emp_name', '$emp_doj', '$emp_city', '$emp_pincode', '$emp_mail_id', '$filePath')";

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
    }
} else {
    echo json_encode(['message' => 'Invalid request']);
}
?>
