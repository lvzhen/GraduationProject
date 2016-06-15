$(function(){
	$(window).load(function(){
		$('body').on('keyup',"input[name='username']",function(){
			var username = $("input[name='username']").val();
			if (username == '') {
				$('.form-tip-wrap').eq(0).html('用户名不能为空！');
			}else{
				$('.form-tip-wrap').eq(0).html('');
			}
		});
		$('body').on('keyup',"input[name='password']",function(){
			var pwd = $("input[name='password']").val();
			var pwd_again = $("input[name='password-again']").val();
			if (pwd == '') {
				$('.form-tip-wrap').eq(1).html('请输入密码！');
			}else{
				$('.form-tip-wrap').eq(1).html('');
			}
		});
		$('body').on('keyup',"input[name='password-again']",function(){
			var pwd_again = $("input[name='password-again']").val();
			var pwd = $("input[name='password']").val();
			if (pwd.indexOf(pwd_again) >= 0) {
				$('.form-tip-wrap').eq(2).html("");
			}else{
				$('.form-tip-wrap').eq(2).html("密码不一致！");
			}
		});
		$('body').on('click','#signup',function(){
			var username = $("input[name='username']").val();
			var pwd = $("input[name='password']").val();
			var pwd_again = $("input[name='password-again']").val();
			if (!username) {
				$('.form-tip-wrap').eq(0).html('用户名不能为空！');
				return ;
			}
			if (!pwd) {
				$('.form-tip-wrap').eq(1).html('请输入密码！');
				return ;
			}
			if (!pwd_again || pwd != pwd_again) {
				$('.form-tip-wrap').eq(2).html('密码不一致！');
				return ;
			}
			submit();
			function submit(){
				$.ajax({
					type:'post',
					url:'./signup',
					dataType: 'json',
					data:'u='+username+'&p='+pwd,
					success: function(data){
						if (data == '1') {
							$('#signup').val('注册成功');
							setTimeout(function(){$("#myModal").modal("hide")},700);
							window.location.reload();
						}else if(data == '0'){
							$('.form-tip-globle').html('用户名已存在！');
						}
					}
				});
			}
			
		});
		$('body').on('click','#login',function(){
			var username = $("input[name='username']").val();
			var pwd = $("input[name='password']").val();
			if (username == '') {
				$('.form-tip-wrap').eq(0).html('用户名不能为空！');
				return ;
			}
			if (pwd == '') {
				$('.form-tip-wrap').eq(1).html('请输入密码！');
				return ;
			}
			$.ajax({
				type:'post',
				url:"./login",
				dataType: 'json',
				data:'u='+username+'&p='+pwd,
				success:function(data){
					if (data == '0') {
						$('.form-tip-globle').html('用户不存在！！');
					}else if(data == '-1'){
						$('.form-tip-wrap').eq(1).html('密码错误！！');
					} else{
						setTimeout(function(){$("#myModal").modal("hide")},700);
						var url = $("#myModal").data('url');
						if (url) {
							window.location.href=url;
						}else{
							window.location.reload();
						}
						
					}
				}
			});
		});
		/**
		 * 加入课程记录
		 */
		// function add(cid){
		// 	$.ajax({
		// 		type:'post',
		// 		url:'http://localhost/GraduationProject/index.php/Home/index/addnum.html',
		// 		data:'cid='+cid,
		// 		dataType:'json',
		// 		success:function(data){
					
		// 		}
		// 	});
		// }
		var str = window.location.pathname;
		if (str.toLowerCase().indexOf('index/allcourse') >= 0 ) {
			$('.all-lesson').addClass('active');
		}else if (str.toLowerCase().indexOf('index/course') >= 0 ) {
			$('.all-lesson').addClass('active');
		}
	});
});