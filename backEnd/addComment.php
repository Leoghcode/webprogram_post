<?php
	header('Access-Control-Allow-Origin:*');
	$user_id=$_POST['userid'];
	$post_id=$_POST['postid'];
	$content=$_POST['content'];
	$time=$_POST['time'];
	//echo "yes accepted";
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
		$addComSql="INSERT INTO $tb
					(user_id,post_id,content,time)
					VALUES
					('$user_id','$post_id','$content','$time')";
		$AddRet=mysqli_query($con,$addComSql);
		if(!$AddRet)
		{
			die("could not insert:".mysqli_error($con));
		}
		else
		{
			//echo "insert ok!";
			$tb1="user";
			$getComSql="SELECT userName,avatar from $tb1
					where $tb1.user_id=$user_id
					";
			$insRsRet=mysqli_query($con,$getComSql);
			$row=mysqli_fetch_array($insRsRet,MYSQLI_ASSOC);
			if(!$row)
			{
				echo('{"getInsRs":"error"}');
			}
			else
			{
				echo('{
						"userName":'.'"'.$row["userName"].'"'.
						',"avatar":'.'"'.$row["avatar"].'"'.
						'}');
			}
			mysqli_free_result($insRsRet);
		}
	}
	mysqli_close($con);
?>