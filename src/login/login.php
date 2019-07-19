<?php
    session_start();

	require_once '../php/functions.php';

	$loggedin = false;

	if(isset($_SESSION['user']))
	{
		
		$id = $_SESSION['id'];
		$user = $_SESSION['user'];
		$priv = $_SESSION['privilege'];
		$loggedin = true;
		header("Location:../index.html");
		
	} else {
		if ( get_script_name() != "login.php")
		header("Location:login.php");
	}

	

	
	

    $user = $pass = $errorLogin = "";
	$errorRegister = "";
    global $connection;
	
    if(isset($_POST["username"]))
    {
        $username = $connection->real_escape_string($_POST['username']);
        $password = $connection->real_escape_string($_POST['password']);
        if($username == "" || $password == "")
        {
            $errorLogin = "Not all fields were entered.";
        }
        else 
        {
            $result =  
                queryMysql("SELECT * FROM users WHERE username='$username'");
            if($result->num_rows == 0)
            {
                $errorLogin = "Wrong username or password.";
            }
            else 
            {
                $hpass = hash('ripemd128', $password);
                $row = $result->fetch_assoc();
                if($hpass == $row['password'])
                // if($row['pass'] == $hpass) 
                {
                    $_SESSION['id'] = $row['id'];
                    $_SESSION['user'] = $row['username'];
					
					$privID = $row['privileges'];
                    
					$id = $_SESSION['id'];
					
					$result1 =  
					queryMysql("SELECT name FROM privileges WHERE id='$privID'");
					
					
						 if($result1->num_rows == 0)
						{
							$error = "Error no privilege.";
						} else {
							
							$row1 = $result1->fetch_assoc();
							
							$_SESSION['privilege'] = $row1['name'];
							
						
							header("Location:../index.html");
						
						}
					
						
                } else {
					$errorLogin = "Wrong username or password.";
            
				}
            }
        }
		
		//print($error);
    }


	if(isset($_POST["newusername"])) {
		
		
		$username = $connection->real_escape_string($_POST["newusername"]);
        $password = $connection->real_escape_string($_POST["newpassword"]);
        if($username == "" || $password == "")
        {
            $errorRegister = "Not all fields were entered.";
        }
        else 
        {
            $result = queryMysql("SELECT * FROM users WHERE username='$username'");
            if(!$result->num_rows){
                $hpass = hash("ripemd128", $password);
				queryMysql("INSERT INTO users(username,password, privileges) 
				VALUES('$username', '$hpass', 2)");
				
				
				$last_id = $connection->insert_id;
				
				
				$len = strlen('username:$username;password:$password');
				$size = $len * 8;

				$time = time() * 1000;
				queryMysql("INSERT INTO files(name,createdBy, bodyText, sizeInBits, sizeOnDiskInBits, createdTimestamp) 
				VALUES('config', '$last_id', 'username:$username;password:$password', $size , $size+200, $time)");
				
				
				
				
				$result = queryMysql("SELECT * from files WHERE name = 'admin'");
				
				if ( $result->num_rows ) {
					
		
					$row = $result->fetch_assoc();
					$txt = $row["bodyText"];
					
					$txt .= $username . ";";
					
					
					
				}
				
				
                queryMysql("UPDATE files SET
                     bodyText='$txt'
                     WHERE name='admin'");
				
				
				
				
				
            } else 
				$errorRegister = "Username already taken.";
				
			
        }
		
	}

?>



<html>

	<head>
	
	
		<title> Windows XP </title>
		<link rel="stylesheet" href="loginstyle.css">
		
		<link rel="shortcut icon" href="Utilis/images/title-icon.jpg" />
	</head>
	
	<body>
		<div class="bg">
			
				<div class="login_panel" style="visibility: <?php echo ($errorRegister != "" ? "hidden": "visible"); ?>">
		
				
					
					<form action="login.php" method="post" id="login-form">
						<label for="username">Username: </label>
						<input type="text" name="username" id="username" autocomplete="off">
						<br>
						<label for="password">Password: </label>
						<input type="password" name="password" id="password" autocomplete="off">
			
					
						<div class="btn login_btn_ok active" type="submit">
						OK
						</div>
						
					</form>
					
					
					
					<div class="btn login_btn_cancel">
					Cancel
					</div>
					
					<div class="btn login_btn_options">
					Options >>
					</div>
		
		
					<div class="login_error">
					
						<?php echo $errorLogin ?>
					
					</div>
					
		
				</div>
			
				<div class="register_panel" style="visibility: <?php echo ($errorRegister != "" ? "visible": "hidden"); ?>">
		
		
					<form action="login.php" method="post" id="register-form">
				
						<label for="newusername" id="newusername_label">New username: </label>
						<input type="text" name="newusername" id="newusername" autocomplete="off">
						<br>
						<label for="newpassword" id="newpassword_label">New password: </label>
						<input type="password" name="newpassword" id="newpassword" autocomplete="off">
			
					</form>
			
					<div class="btn register_btn_ok active">
						OK
					</div>
					
					<div class="btn register_btn_cancel">
						Cancel
					</div>
					
					<div class="register_error">
					
						
						<?php echo $errorRegister ?>
					
					</div>
					
		
				</div>
				
				
				
		</div>
		
	
		<script  type="module" src="login.js"> </script>
	</body>

</html>
