$(function(){
	$('input[name="user_admin"]').on('blur',function(){
		$('input[name="user_admin"]').tooltip('destroy');
	});
	$('input[name="pwd_admin"]').on('blur',function(){
		$('input[name="pwd_admin"]').tooltip('destroy');
	});
	$('.btn-block').on('click',function(){
		var user = $('input[name="user_admin"]').val();
		var pwd = $('input[name="pwd_admin"]').val();
		if (!user) {
			$('input[name="user_admin"]').tooltip();
			$('input[name="user_admin"]').focus();	
			return false;
		}if (!pwd) {
			$('input[name="pwd_admin"]').tooltip();
			$('input[name="pwd_admin"]').focus();	
			return false;
		}
		return true;
	});
});