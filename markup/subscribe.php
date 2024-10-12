<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);

    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $to = $email;
        $subject = "Subscription Successful";
        $message = "Thank you for subscribing to our newsletter!";
        $headers = "From: yevhenii.petler@gmail.com";

        if (mail($to, $subject, $message, $headers)) {
            echo json_encode(["status" => "success", "message" => "Thank you for subscribing!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to send email."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid email address."]);
    }
}

?>
