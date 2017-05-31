<?php
	header('Access-Control-Allow-Origin:*');
	$user_id=$_POST['userid'];
	$content=$_POST['content'];
	echo "yes accepted";
	//echo user_id;
	//write to mysql
	$db_host="localhost:3306";
	$db_user="root";
	$db_pwd="12345";
	$db_db="web_program";
	$con=mysqli_connect($db_host,$db_user,$db_pwd,$db_db);
	if(!$con){
		die("could not connect".mysqli_error($con));
	}
	else{
		$tb="comments";
		$user_id="1";
		$post_id="1";
		$addComSql="INSERT INTO $tb
					(user_id,post_id,content)
					VALUES
					('$user_id','$post_id','$content')";
		$AddRet=mysqli_query($con,$addComSql);
		if(!$AddRet)
		{
			die("could not insert:".mysqli_error($con));
		}
		else
		{
			echo("insert ok!".$user_id);
		}
	}
	mysqli_close($con);
?>