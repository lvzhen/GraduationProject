$(function(){
	$('#add,#edit').on('hidden.bs.modal', function () {
		$('.o').val('');
		$('.checkout').val('');
		$('#answ').val('a');
		$('.help-block').html('');
	});
	$('.o,.checkout').on('focus',function(){
		$('.help-block').html('');
	});
	/**
	 * 添加试题
	 */
	$('#saveques').on('click',function(){
		var cid = $('.name').data('id');
		var ques = $('.checkout').val();
		var op_a = $('.option-a').val();
		var op_b = $('.option-b').val();
		var op_c = $('.option-c').val();
		var op_d = $('.option-d').val();
		var answ = $('.answ').val();
		var alldata = $('#addques').serialize();
		if (!ques) {
			$('.q').html('请输入题目');
		}
		if (!op_a) {
			$('.a').html('请输入A选项');
		}
		if (!op_b) {
			$('.b').html('请输入B选项');
		}
		if (!op_c) {
			$('.c').html('请输入C选项');
		}
		if (!op_d) {
			$('.d').html('请输入D选项');
		}
		if(ques && op_a && op_b && op_c && op_d) {
			$.ajax({
				type:'post',
				url:'/GraduationProject/index.php/Admin/Course/addques.html',
				dataType:'json',
				data:alldata+'&cid='+cid,
				success:function(data){
					$('#add').modal('hide');
					$('.success').html('添加试题成功。');
					$(".list-group").load(location.href+" .list-group");
					$('#success').removeClass('hide');
					setTimeout(function(){
						$('#success').addClass('hide');
					},3000);
				}
			});
		}
	});

	/**
	 * 修改时获取原数据
	 */
	$('body').on('click','.modify',function(){
		var id = $(this).data('id');
		var sub = $(this).data('sub');
		var oa = $(this).data('oa');
		var ob = $(this).data('ob');
		var oc = $(this).data('oc');
		var od = $(this).data('od');
		var a = $(this).data('a');
		$('.name').eq(1).data('id',id);
		$('.checkout').eq(1).val(sub);
		$('.option-a').eq(1).val(oa);
		$('.option-b').eq(1).val(ob);
		$('.option-c').eq(1).val(oc);
		$('.option-d').eq(1).val(od);
		$('.answ').eq(1).val(a);
	});

	/**
	 * 修改试题
	 */
	$('#editques').on('click',function(){
		var id = $('.name').eq(1).data('id');
		var ques = $('.checkout').eq(1).val();
		var op_a = $('.option-a').eq(1).val();
		var op_b = $('.option-b').eq(1).val();
		var op_c = $('.option-c').eq(1).val();
		var op_d = $('.option-d').eq(1).val();
		var answ = $('.answ').eq(1).val();
		var alldata = $('#ediques').serialize();
		if (!ques) {
			$('.q').eq(1).html('请输入题目');
		}
		if (!op_a) {
			$('.a').eq(1).html('请输入A选项');
		}
		if (!op_b) {
			$('.b').eq(1).html('请输入B选项');
		}
		if (!op_c) {
			$('.c').eq(1).html('请输入C选项');
		}
		if (!op_d) {
			$('.d').eq(1).html('请输入D选项');
		}
		if(ques && op_a && op_b && op_c && op_d) {
			$.ajax({
				type:'post',
				url:'/GraduationProject/index.php/Admin/Course/editques.html',
				dataType:'json',
				data:alldata+'&id='+id,
				success:function(data){
					$('#edit').modal('hide');
					$('.success').html('修改试题成功。');
					$(".list-group").load(location.href+" .list-group");
					$('#success').removeClass('hide');
					setTimeout(function(){
						$('#success').addClass('hide');
					},3000);
				}
			});
		}
	});

	/**
	 * 删除试题
	 */
	$('.del').on('click',function(){
		var id = $(this).data('id');
		var key = $(this).data('key');
		var r = confirm("是否删除题目"+key+"?");
		if (r==true) {
			$.ajax({
				type:'post',
				url:'/GraduationProject/index.php/Admin/Course/delques.html',
				dataType:'json',
				data:'id='+id,
				success:function(data){
					$('.success').html('删除题目'+key+'成功。');
					$(".list-group").load(location.href+" .list-group");
					$('#success').removeClass('hide');
					setTimeout(function(){
						$('#success').addClass('hide');
					},3000);
				}
			});
		}
	});
});
