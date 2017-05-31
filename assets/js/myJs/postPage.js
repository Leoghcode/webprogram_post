$(document).ready(function(){
	//alert("Hello");
	getContent();
	$("#sideNav").click(function(){
			if($(this).hasClass('closed')){
				$('.navbar-side').animate({left: '0px'});
				$(this).removeClass('closed');
				$('#page-wrapper').animate({'margin-left' : '260px'},function(){
					setEquaHeight();
				});
				
			}
			else{
			    $(this).addClass('closed');
				$('.navbar-side').animate({left: '-260px'});
				$('#page-wrapper').animate({'margin-left' : '0px'},function(){
					setEquaHeight();
				}); 
			}
			//setEquaHeight();
		});

	$("#comment-commit").click(function(){
		addComment();
		});
});

function setEquaHeight(){
	//alert("setHeight");
	var left=$(".comment-cell-left");
	//alert("length: "+left.length);
	var h1,h2;
	for(var i=0;i<left.length;i++){
		h1=$(left[i]).height();
		h2=$(left[i]).next().height();
		//alert("this: "+$(left[i]).height()+" , next: "+$(left[i]).next().height());
		if(h1<h2)
			$(left[i]).height(h2);
		else
			$(left[i]).next().height(h1);
	}
}
function setFirstEquaHeight(){
	//alert("setHeight");
	var left=$(".comment-cell-left").first();
	//alert("length: "+left.length);
	var h1,h2;
		h1=$(left).height();
		h2=$(left).next().height();
		//alert("this: "+$(left[i]).height()+" , next: "+$(left[i]).next().height());
		if(h1<h2)
			$(left).height(h2);
		else
			$(left).next().height(h1);
}

function getContent(){
	getPost();
	getComment();
}
function getPost(){
	var postid=window.location.search.substring(3);
	//alert(postid+" postid");
	$(".post-content-all").text("hello-------------------------------------");
	/*$.ajax({
		url:"backEnd/getPost.php",
		type:"GET",
		dataType:string,
		success:function(){

		},
		error:function(){

		}
	});*/
}
function getComment(){
	var postid=window.location.search.substring(3);
	//alert(postid+" postid");
	$.ajax({
		url:"backEnd/getComment.php",
		type:"get",
		dataType:"json",
		data:{
			'postid':postid
		},
		success:function(data){
			var comm;
			//alert("success ajax");
			$('.comments').empty();
			for(var i in data){
				comm=data[i];
				printComment(comm.userName,comm.avatar,comm.time,comm.content);
			}
			setEquaHeight();
		},
		error: function(XMLHttpRequest, textStatus, errorThrown)
		 { alert(XMLHttpRequest.status); 
		 	alert(XMLHttpRequest.readyState); 
		 	alert(textStatus);   
		 }
	});
}
function printComment(user,avatar,time,content){
	var comment='<div class="comment-cell">\
						<div class="comment-cell-left">\
							<div class="vertical-middle">\
								<img class="rank-img" src="' +avatar+
								'" />\
								<span class="brief-intro">\
									<strong>'+user+'</strong><br/>\
									<span class="post-time">&nbsp;&nbsp;&nbsp;'+time+'</span>\
									<br/>\
								</span>\
							</div>\
						</div>\
						<div class="comment-cell-right">'+content+'\
						</div>\
					</div>';
	$('.comments').prepend(comment);
}
function addComment(){
	var comments=$('.comments');
	var commentContent=$('textarea[name="comment-content"]').val();
	//alert(commentContent);
	var postid=window.location.search.substring(3);
	var dateTime=getFormattedTime();
	//alert(dateTime);
	$("#newComment").modal('hide');
	$.ajax({
		url:"backEnd/addComment.php",
		type:"POST",
		dataType:"json",
		data:{
			'userid':1,
			'postid':postid,
			'content':commentContent,
			'time':dateTime
		},
		success:function(data){
			//alert("success:"+data);
			if(!data.getInsRs)
			{
				$("#successMsg").modal('show');
				printComment(data.userName,data.avatar,dateTime,commentContent);
				setFirstEquaHeight();
			}
			//setFirstEquaHeight();
			else
			{
				$("#errorMsg").modal('show');
			}
		},
		error:function(err,err1,err2){
			alert(err);
			alert(err1);
			alert(err2);
			$("#errorMsg").modal('show');
		}

	});
	var v1='<"Hello"\
			world';
	console.log(v1);
	/*var comElement='<div class="comment-cell">\
						<div class="comment-cell-left">\
							<div class="vertical-middle">\
								<img class="rank-img" src="assets/img/avatar1.jpg" />\
								<span class="brief-intro">\
									<strong>Leo Lucas</strong><br/>\
									<span class="post-time">2017年5月29日</span>\
									<br/>\
								</span>\
							</div>\
						</div>\
						<div class="comment-cell-right">'+commentContent+'\
						</div>\
					</div>';
	comments.prepend(comElement);*/
	//$("#newComment").modal('hide');
}


function getFormattedTime(){
	var time = new Date();
	var year = time.getFullYear();
	var month = time.getMonth()+1;
	var day = time.getDate();
	var hour = time.getHours();
	var minute = time.getMinutes();
	var second = time.getSeconds();
	month=addZero(month);
	day=addZero(day);
	hour=addZero(hour);
	minute=addZero(minute);
	second=addZero(second);
	var formatTime = year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
	return formatTime;
}

function addZero(data)
{
	if(data<"10")
		data="0"+data;
	return data;
}
function getCookie(key){
	if(document.cookie.length>0)
	{
		var c_start=document.cookie.valueOf(key+"=");
		if(c_start!=-1)
		{
			c_start=c_start+key.length+1;
			var c_end=document.cookie.valueOf(";",cstart);
			if(c_end==-1)
				c_end=document.cookie.length;
			return document.cookie.substring(c_start,c_end);
		}
	}
	return "";
}
function setCookie(){
	var userid;
}