<?php
$to = "yevhenii.petler@gmail.com";
$subject = "Test Email";
$message = "This is a test email message.";
$headers = "From: no-reply@yourdomain.com";

if (mail($to, $subject, $message, $headers)) {
    echo "Email sent successfully.";
} else {
    echo "Failed to send email.";
}
?>
