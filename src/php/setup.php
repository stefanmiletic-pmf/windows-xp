<html>
	<head>
		<title>Setting up...</title>
	</head>
	
	<body>
		<?php
		  require_once 'functions.php';

		 	
		  
		  
			createTable("privileges", 
		      "id INT UNSIGNED AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                PRIMARY KEY(id)
                ");
		  
		  createTable("users", 
		      "id INT UNSIGNED AUTO_INCREMENT,
                username VARCHAR(255) NOT NULL,
                password TEXT NOT NULL,
				privileges INT UNSIGNED NOT NULL,
                PRIMARY KEY(id),
				FOREIGN KEY(privileges) REFERENCES privileges(id)
				ON UPDATE CASCADE ON DELETE CASCADE");
		  
		  
		
			createTable("files",
			"id INT UNSIGNED AUTO_INCREMENT,
			 name VARCHAR(255) NOT NULL,
			 createdBy INT UNSIGNED NOT NULL,
			 bodyText VARCHAR(10000), 
			 sizeInBits BIGINT UNSIGNED NOT NULL, sizeOnDiskInBits BIGINT UNSIGNED NOT NULL, createdTimestamp BIGINT UNSIGNED NOT NULL,
			 PRIMARY KEY(id),
			 FOREIGN KEY(createdBy) REFERENCES users(id)
				ON UPDATE CASCADE ON DELETE CASCADE");
				
				
		  
			
			 createTable("system_log",
			"id INT UNSIGNED AUTO_INCREMENT,
			  record_desc VARCHAR(255) NOT NULL,
			 createdBy INT UNSIGNED NOT NULL,
			 createdTimestamp BIGINT UNSIGNED NOT NULL,
			 PRIMARY KEY(id),
				FOREIGN KEY(createdBy) REFERENCES users(id)
				ON UPDATE CASCADE ON DELETE CASCADE");
			
			queryMysql("INSERT INTO privileges(name) 
				VALUES('admin')");
			 
			queryMysql("INSERT INTO privileges(name) 
				VALUES('user')");
			 
			queryMysql("INSERT INTO privileges(name) 
				VALUES('guest')");
		  
		  
		  
		  
		  
		  
		  
		  
			$hpass = hash("ripemd128", "admin"); 
			queryMysql("INSERT INTO users(username,password, privileges) 
				VALUES('admin', '$hpass', 1)");
				
			$time = time() * 1000;
				
			$last_id = $connection->insert_id;	
			
			queryMysql("INSERT INTO system_log(record_desc, createdBy, createdTimestamp) VALUES('System created',  $last_id, $time)");
				
			$len = 	strlen('username:admin;password:admin');
			$size = $len*8;
			
			queryMysql("INSERT INTO files(name,createdBy, bodyText, sizeInBits, sizeOnDiskInBits, createdTimestamp) 
				VALUES('config', '$last_id', 'username:admin;password:admin', $size , $size+200, $time)");
				
				
			queryMysql("INSERT INTO files(name,createdBy, bodyText, sizeInBits, sizeOnDiskInBits, createdTimestamp) 
				VALUES('admin', '$last_id', '', 0 , 200, $time)");
				
			
			
			
			$last_id = $connection->insert_id;
			$hpass = hash("ripemd128", "guest"); 
			queryMysql("INSERT INTO users(username,password, privileges) 
				VALUES('guest', '$hpass', 3)");
				
				
			
		  
		  
		?>
		<br> ... done.
	</body>
</html>