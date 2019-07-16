<?php

session_start();
require_once 'functions.php';

$userstr = " (Guest)";
$loggedin = false;

//echo "_SESSION[user]";

if(isset($_SESSION['user']))
{
    $id = $_SESSION['id'];
    $user = $_SESSION['user'];
    $priv = $_SESSION['privilege'];
    $loggedin = true;
	
	
} else {
	
	header("Location:login.php");
	
}





if (isset($_POST["logout"])) {
	
	destroySession();
	
}




class SystemLog {
	
	public $record;
	public $createdBy;
	public $timestamp;
	
}


if (isset($_POST["getSystemLog"])) {
	
	$result = queryMysql("SELECT system_log.record_desc,users.username, system_log.createdTimestamp  FROM `system_log` INNER JOIN users ON system_log.createdBy = users.id ORDER by system_log.createdTimestamp");
		
	
	$returnValues = array();
	
	while($row = $result->fetch_assoc()) {
		
		$log = new SystemLog();
		$log->record=$row["record_desc"];
		$log->createdBy=$row["username"];
		$log->timestamp=$row["createdTimestamp"];
		
		
        array_push($returnValues, $log);
	}
	
	echo json_encode($returnValues);
	
}

// manipulating files
if (isset($_POST["deleteFile"])) {
	
	$fileName = $connection->real_escape_string($_POST["deleteFile"]);
		
	if ($priv != "admin" ){
		echo formatErrorNoPriviliges($id, "for deleting file[$fileName]");
		return;
	} else {
		
		
		$queryString = "DELETE FROM files WHERE name='$fileName'";
		
		queryMysql($queryString);
		echo formatSuccessfulResponseAction($id, "$fileName", "is  deleted");
			
		
		
	}
	
}

if (isset($_POST["renameFile"])) {
	
	if ($priv == "guest" ){
		echo formatErrorNoPriviliges($id, "for renaming file['$fileName']");
		return;
	} else {
		
		$oldFileName = $connection->real_escape_string($_POST["renameFile"]);
		$newFileName = $connection->real_escape_string($_POST["newFileName"]);
		
		$result = queryMysql("SELECT bodyText FROM files WHERE name='$oldFileName'");
		
		if($result->num_rows == 0)
		{
			echo formatErrorResponseAction($id,$oldFileName, "is not existing");
				
		} else {
			
			$queryString = "UPDATE files SET
                     name='$newFileName'
                     WHERE name='$oldFileName'";
			
            queryMysql($queryString);
			echo formatSuccessfulResponseAction($id,$oldFileName, "is renamed");
		}
		
	}
	
}

if (isset($_POST["changeFile"])) {
	
	$fileName = $connection->real_escape_string($_POST["changeFile"]);
		
	
	if ($priv == "guest" ){
		echo formatErrorNoPriviliges($id , "for changing file['$fileName']");
		return;
	} else {
		
		
		
		$txt = $connection->real_escape_string($_POST["content"]);
		$sizeInBits = strlen($txt) * 8;
		$sizeOnDiskInBits = $sizeInBits + 200;
		$result = queryMysql("SELECT bodyText FROM files WHERE name='$fileName'");
		
		
		
		if($result->num_rows == 0)
		{
			
			echo formatErrorResponseAction($id,$fileName, "is not edited(file not exists)");
			return; 
			
		} else {
			

			if ($fileName == "admin") {
	
					if($priv != "admin") {
						echo formatErrorNoPriviliges($id , "for changing file[$fileName]");
						return;
					}
				
				
					$result = queryMysql("SELECT * from files WHERE name = 'admin'");
							
							
					
					$row = $result->fetch_assoc();
					$oldFile = $row["bodyText"];
					
					
					$oldFile_arr = explode(";", $oldFile);
					$newFile_arr = explode(";", $connection->real_escape_string($txt) );
					
					
					//var_dump($newFile_arr);
					foreach($oldFile_arr as $_oldUser) {
						
						#echo "oldUser:  $_oldUser";
						
						$found = false;
						foreach($newFile_arr as $_newUser) {
						
							
						#echo "    newUser:  $_newUser";
							if ($_newUser == $_oldUser){
								$found = true;
								break;
							}
						
						}
						
						if (!$found) {
							
							
							$sqlString = "SELECT * from users WHERE username = '$_oldUser'";
							
							$result1 =  queryMysql($sqlString);
							
							$row1 = $result1->fetch_assoc();
							$_id_oldUser = $row1["id"];
							
							
							queryMysql("DELETE FROM users WHERE username='$_oldUser'");
							
							
							$msg = "User [$_oldUser] and all [$_oldUser]s files deleted.";
							$time = time() * 1000;
							
							queryMysql("INSERT INTO system_log(record_desc, createdBy, createdTimestamp) VALUES('$msg',  $id, $time)");
							 
							
						}
						
					}

				queryMysql("UPDATE files SET
				bodyText='$txt',
				sizeInBits=$sizeInBits,
				sizeOnDiskInBits=$sizeOnDiskInBits
				WHERE name='$fileName' and createdBy='$id'");
				
				
			} else if ($fileName == "config") {
				
				$_username_to_set = "";
				$_password_to_set = "";
				
				$str_arr = explode(";", $txt);
				foreach($str_arr as $node) {
					
					$items = explode(":", $node);
					
					$_field=$items[0];
					$_value=$items[1];
					
					if ($_field == "username") {
						$_username_to_set = $_value;
					} else if($_field == "password") {
						$_password_to_set = $_value;
					}
					
					
				}
				
				//echo "_username_to_set: $_username_to_set  -- _password_to_set: $_password_to_set";
				
				
				if ($_username_to_set == "" || $_password_to_set == ""){
					echo formatErrorResponseAction($id,"config", "is not edited");
					return;
				} else {
					
					
					$_password_to_set = hash("ripemd128", $_password_to_set);
					if ( queryMysql("UPDATE users SET
                     username='$_username_to_set',
					 password='$_password_to_set'
                     WHERE id='$id'")) {
						 
						$_SESSION['user'] = $_username_to_set;
						$user = $_username_to_set;
						
					 } else {
						 
						echo formatErrorResponseAction($id,"config", "is not edited");
						return;
					 }
					 
					 
					
				}

				queryMysql("UPDATE files SET
				bodyText='$txt',
				sizeInBits=$sizeInBits,
				sizeOnDiskInBits=$sizeOnDiskInBits
				WHERE name='$fileName' and createdBy='$id'");
				
				
			} else {

				queryMysql("UPDATE files SET
				bodyText='$txt',
				sizeInBits=$sizeInBits,
				sizeOnDiskInBits=$sizeOnDiskInBits
				WHERE name='$fileName'");
				
			}
			
			
			
			echo formatSuccessfulResponseAction($id, "$fileName", "is  edited");

				 
					 
			 
					 
			
		}
		
	}
	
}

if (isset($_POST["newFile"])) {
	
	if ($priv == "guest" ){
		echo formatErrorNoPriviliges($id , "for changing file[$fileName]");
		return;
	}
	
	$fileName = $connection->real_escape_string($_POST["newFile"]);
	$createdTimestamp = $connection->real_escape_string($_POST["createdTimestamp"]);
		
		
	$queryString = "INSERT INTO files(name, createdBy, bodyText, sizeInBits, sizeOnDiskInBits, createdTimestamp)  VALUES('$fileName',  $id, '', 0, 200, $createdTimestamp)";
	
	
	queryMysql($queryString);
	echo formatSuccessfulResponseAction($id, $fileName, "is created");

}

// returning user name,id, priv atm in session
class UserCustom {
	
	public $id;
	public $name;
	public $priv;
	
}

if (isset($_POST["ID"])) {
	
	
	
	$returnValues = array();
	
		
	$customUser = new UserCustom();
	$customUser->id=$id;
	$customUser->name=$user;
	$customUser->priv=$priv;
	
	array_push($returnValues, $customUser);

	
	
	echo json_encode($returnValues);
	
}




// returning all files
class FileCustom{

	public $name;
	public $txt;
	public $createdByName;
	public $sizeInBits;
	public $sizeOnDiskInBits;
	public $createdTimestamp;
	
}


if (isset($_POST["allFiles"])) {
	
	$sqlQuery = "SELECT * FROM files WHERE name != 'config'";
	
	
	if ( $priv != "admin" ) {
		$sqlQuery .= " and name != 'admin' ORDER BY name";
	}
	
	$result = queryMysql($sqlQuery);
	
	$returnValues = array();
	
	while($row = $result->fetch_assoc()) {
		
		$new_file = new FileCustom();
		$new_file->name=$row["name"];
		$new_file->txt=$row["bodyText"];
		$new_file->sizeInBits=$row["sizeInBits"];
		$new_file->sizeOnDiskInBits=$row["sizeOnDiskInBits"];
		$new_file->createdTimestamp=$row["createdTimestamp"];
		
		$idCreatedBy = $row["createdBy"];
		$querySql = "SELECT username from users WHERE id = $idCreatedBy";
		$resultCreatedByName = queryMysql($querySql);
		$rowCreatedByName = $resultCreatedByName->fetch_assoc();
		$new_file->createdByName=$rowCreatedByName["username"];
		
		
        array_push($returnValues, $new_file);
	}
	
	
	
	
	$result1 = queryMysql("SELECT * FROM files WHERE name = 'config' and createdBy = $id");
	if( $row = $result1->fetch_assoc() ){
	
		//echo "SELECT * FROM files WHERE name = 'config' and createdBy = $id";
	
	
		$new_file = new FileCustom();
		$new_file->name=$row["name"];
		$new_file->txt=$row["bodyText"];
		$new_file->sizeInBits=$row["sizeInBits"];
		$new_file->sizeOnDiskInBits=$row["sizeOnDiskInBits"];
		$new_file->createdTimestamp=$row["createdTimestamp"];
		array_push($returnValues, $new_file);
	}
	
	
	

	echo json_encode($returnValues);
	
}





?>