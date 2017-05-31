<?php
	header('Access-Control-Allow-Origin:*');
	$post_id=$_GET['postid'];

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
		$tb1="comments";
		$tb2="user";
		$getComSql="SELECT userName,time,avatar,content from $tb1
					INNER JOIN $tb2
					on $tb1.user_id=$tb2.user_id
					where $tb1.post_id=$post_id
					order by `time` asc
					";
		$getRet=mysqli_query($con,$getComSql);
		if(!$getRet)
		{
			die("could not get comments:".mysqli_error($con));
		}
		else
		{
			$jsonData="";
			$numb_row=mysqli_num_rows($getRet);
			if($numb_row==0){
				echo "{number:zero}";
			}
			/*else if(1==1)
			{
				echo '{
									"userName":'.'"'."user1".'"'.
									',"avatar":'.'"'."avatar1".'"'.
									',"time":'.'"'."time1".'"'.
									',"content":'.'"'.'\'content11\''.'"'.
									'}';
			}*/
			else 
			{
				for($i=1;$i<=$numb_row;$i++)
				{
					$row=mysqli_fetch_array($getRet,MYSQLI_ASSOC);
					$rContent=str_replace("\"","\\\"",$row["content"]);
					if($numb_row==1)
					{
						$jsonData.='{
									"userName":'.'"'.$row["userName"].'"'.
									',"avatar":'.'"'.$row["avatar"].'"'.
									',"time":'.'"'.$row["time"].'"'.
									',"content":'.'"'.$rContent.'"'.
									'}';
					}	

					else
					{
						if($i==1)
						{
								$jsonData="[";
						}
						$jsonData.='{
									"userName":'.'"'.$row["userName"].'"'.
									',"avatar":'.'"'.$row["avatar"].'"'.
									',"time":'.'"'.$row["time"].'"'.
									',"content":'.'"'.$rContent.'"'.
									'}';

						if($i!=$numb_row)
							$jsonData.=",";
						else
							$jsonData.="]";
					}
					
				}
				echo $jsonData;
			}
				
		}
		mysqli_free_result($getRet);
	}
	mysqli_close($con);
?>