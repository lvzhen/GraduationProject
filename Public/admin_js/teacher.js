$(function(){

	$('#editpwd,#add').on('hidden.bs.modal', function () {
		$('.name').eq(0).val('');
		$('.pwd').val('');
		$('.rpwd').val('');
		$('.help-block').html('');
	});
	$('.name').on('focus',function(){
		$('.help-block').eq('0').html('');
		$('.help-block').eq('3').html('');
	});
	$('.pwd').on('focus',function(){
		$('.help-block').eq('1').html('');
		$('.help-block').eq('4').html('');
	});
	$('.rpwd').on('focus',function(){
		$('.help-block').eq('2').html('');
		$('.help-block').eq('5').html('');
	});

	$('#save').on('click',function(){
		var name = $('.name').eq(0).val();
		var pwd = $('.pwd').eq(0).val();
		var rpwd = $('.rpwd').eq(0).val();

		if (!name) {
			$('.help-block').eq(0).html('请输入教师名');
		}
		if (!pwd) {
			$('.help-block').eq(1).html('请输入密码');
		}
		if (!rpwd || rpwd !== pwd) {
			$('.help-block').eq(2).html('请确认密码');
		}
		if (name && pwd && rpwd) {
			if (pwd === rpwd) {
				$.ajax({
					type:'post',
					url:'./addteach.html',
					dataType:'json',
					data:{name:name,pwd:pwd},
					success:function(data){
						if (data == 1) {
							$('#add').modal('hide');
							$('.success').html('添加教师成功。');
							$("#table").load(location.href+" #table");
							$('#success').removeClass('hide');
							setTimeout(function(){
								$('#success').addClass('hide');
							},3000);
						}else if (data == 0) {
							$('.help-block').eq(0).html('教师名称已被占用！');
						}
					}
				});
			}
		}
	});

	$('body').on('click','.modify',function(){
		var id = $(this).data('id');
		var usr = $(this).data('usr');
		$('.name').eq(1).val(usr);
		$('.name').eq(1).data('id',id);
	});

	$('#savepwd').on('click',function(){
		var name = $('.name').eq(1).val();
		var id = $('.name').eq(1).data('id');
		var pwd = $('.pwd').eq(1).val();
		var rpwd = $('.rpwd').eq(1).val();
		if (!pwd) {
			$('.help-block').eq(3).html('密码不能为空');
		}
		if (!rpwd || pwd !== rpwd) {
			$('.help-block').eq(4).html('密码不一致');
		}
		if(pwd && rpwd){
			if (pwd === rpwd) {
				$.ajax({
					type:'post',
					url:'./editpwd.html',
					dataType:'json',
					data:{id:id,pwd:pwd},
					success:function(data){
						$('#editpwd').modal('hide');
						$('.success').html('教师'+name+'密码修改成功。');
						$('#success').removeClass('hide');
						setTimeout(function(){
							$('#success').addClass('hide');
						},3000);
					}
				});
			}
		}
	});
});
