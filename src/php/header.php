<?php
session_start();

require_once 'functions.php';

$userstr = " (Guest)";
$loggedin = false;

if(isset($_SESSION['user']))
{
    $id = $_SESSION['id'];
    $user = $_SESSION['user'];
    $userstr = " ($user)";
    $loggedin = true;
}

	  if(!$loggedin)
	  {
	  
		
		if ( get_script_name() != "login.php")
			header("Location:../login/login.php");
		
	  }
		     
?>
		