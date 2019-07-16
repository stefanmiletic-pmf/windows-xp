<?php


require_once 'functions.php';


if (isset($_POST["resetPassword"])) {

	
	
	$user = $connection->real_escape_string($_POST["resetPassword"]);


	$result = queryMysql("SELECT * FROM users WHERE username='$user'");
	
		if($result->num_rows == 0)
		{
			
			
			echo "User not existing";
			
			
		} else {
			
			$row = $result->fetch_assoc();
			$userID = $row["id"];
			
			queryMysql("INSERT INTO reset_password_log(createdBy) VALUES('$userID')");
			echo "Request completed.";
			
			
					 
			
		}
		
}


?>