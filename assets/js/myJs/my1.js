$('.phpclick').click(function(){
	$.get('hello.php',function(data,status){
			alert("data:"+data+" status:"+status);
		}
	);
});