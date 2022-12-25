<?php
if(!isset($_POST['submit']))
{
	//This page should not be accessed directly. Need to submit the form.
	echo "error; you need to submit the form!";
}
$topic = $_POST['topic'];
$visitor_email = $_POST['email'];
$message = $_POST['mess'];

//Validate first


if(IsInjected($visitor_email))
{
    echo "Bad email value!";
    exit;
}

$email_from = $visitor_email;//<== update the email address
$email_subject = $topic;
$email_body = "You have received a new message from the user $visitor_email.\n".
    "Here is the message:\n $message".
    
$to = "mieszkostrzelczyk03@gmail.com";//<== update the email address

//Send the email!
mail($to,$email_subject,$email_body);
//done. redirect to thank-you page.
header("Location: index.html");
exit();

// Function to validate against any email injection attempts
function IsInjected($str)
{
  $injections = array('(\n+)',
              '(\r+)',
              '(\t+)',
              '(%0A+)',
              '(%0D+)',
              '(%08+)',
              '(%09+)'
              );
  $inject = join('|', $injections);
  $inject = "/$inject/i";
  if(preg_match($inject,$str))
    {
    return true;
  }
  else
    {
    return false;
  }
}
   
?> 