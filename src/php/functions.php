<?php
$dbhost = "localhost";
$dbname = "windowsxp";
$dbuser = "root";
$dbpass = "root-password";
$appname = "Windows XP";

$connection = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
if($connection->connect_error) die("Tralala");

//define('CONST_SERVER_TIMEZONE', 'Europe/Belgrade');
date_default_timezone_set('Europe/Belgrade');

function queryMysql($query)
{
    global $connection;
    $result = $connection->query($query);
    if(!$result)
    {
        die($connection->error);
		#echo(formatErrorQueryResponse())
    }
    return $result;
}

function createTable($name, $query)
{
    queryMysql("CREATE TABLE IF NOT EXISTS $name($query)");
    echo "Table '$name' created or already exists.<br>";
}

function formatErrorQueryResponse($query) {
	
	#return "Error: Query failed: '$query'";
	return "BSOD";
}

function formatErrorNoPriviliges($id, $forWhat) {
	
	$msg = "Error: No privileges $forWhat";
	
	$time = time() * 1000;
	queryMysql("INSERT INTO system_log(record_desc, createdBy, createdTimestamp) VALUES('$msg',  $id, $time)");
	
	return $msg;
}

function formatSuccessfulResponseAction($id, $file, $isWhat) {
	$msg = "Successful: File [$file] $isWhat";
	
	$time = time() * 1000;
	queryMysql("INSERT INTO system_log(record_desc, createdBy, createdTimestamp) VALUES('$msg',  $id, $time)");
	return $msg;
}

function formatErrorResponseAction($id, $file, $isNotWhat) {
	$msg = "Error: File [$file] $isNotWhat";
	
	$time = time() * 1000;
	queryMysql("INSERT INTO system_log(record_desc, createdBy, createdTimestamp) VALUES('$msg',  $id, $time)");
	return $msg;
}

function destroySession()
{
  
    //$_SESSION = array();
    unset($_SESSION);

    session_destroy();
	
	
	
}


function get_script_name(){

	$FILE = $_SERVER["SCRIPT_NAME"];
	$br = Explode('/', $FILE);
	$PFILE = $br[count($br)-1];
	
	return $PFILE;
	
}

