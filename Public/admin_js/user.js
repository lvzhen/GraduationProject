$(function(){

	$('#editpwd').on('hidden.bs.modal', function () {
		$('.pwd').val('');
		$('.rpwd').val('');
		$('.help-block').html('');
	});

	$('.pwd').on('focus',function(){
		$('.help-block').eq('0').html('');
	});
	$('.rpwd').on('focus',function(){
		$('.help-block').eq('1').html('');
	});

	$('body').on('click','.modify',function(){
		var id = $(this).data('id');
		var usr = $(this).data('usr');
		$('.name').val(usr);
		$('.name').data('id',id);
	});

	$('#savepwd').on('click',function(){
		var name = $('.name').val();
		var id = $('.name').data('id');
		var pwd = $('.pwd').val();
		var rpwd = $('.rpwd').val();
		if (!pwd) {
			$('.help-block').eq(0).html('密码不能为空');
		}
		if (!rpwd || pwd !== rpwd) {
			$('.help-block').eq(1).html('密码不一致');
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
						$('.success').html('用户'+name+'密码修改成功。');
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