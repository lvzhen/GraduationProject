$(function(){
	$('#add,#edit').on('hidden.bs.modal', function () {
		$('.name').val('');
		$('.order').val('0');
		$('.code').val('');
		$('.help-block').html('');
	});

	/**
	 * @param  {[type]}
	 * @return {[type]}
	 * 添加课程类型
	 */
	$('#savesort').on('click',function(){
		var name = $('.name').val();
		var order = $('.order').val();
		var code = $('.code').val();
		if(check(name,order,code) == 'yes'){
			$.ajax({
				type:'post',
				url:"http://localhost/GraduationProject/index.php/Admin/Course/addclasstype.html",
				data:'name='+name+'&order='+order+'&code='+code,
				dataType:'json',
				success:function(data){
					$('#add').modal('hide');
					$('.success').html('添加分类成功。');
					$("#table").load(location.href+" #table");
					$('#success').removeClass('hide');
					setTimeout(function(){
						$('#success').addClass('hide');
					},3000);
				}
			});
		}
		// console.log(check());
	});
	/**
	 * @param  {[type]}
	 * @return {[type]}
	 * 修改课程类型
	 */
	$('#editsort').on('click',function(){
		var id = $('.name').eq(1).data('id');
		var name = $('.name').eq(1).val();
		var order = $('.order').eq(1).val();
		var code = $('.code').eq(1).val();
		check(name,order,code,id);
		$.ajax({
			type:'post',
			url:'http://localhost/GraduationProject/index.php/Admin/Course/editclass.html',
			data:'id='+id+'&name='+name+'&order='+order+'&code='+code,
			dataType:'json',
			success:function(data){
				$('#edit').modal('hide');
				$('.success').html('编辑分类成功。');
				$("#table").load("http://localhost/GraduationProject/index.php/Admin/Course/coursetype.html #table");
				$('#success').removeClass('hide');
				setTimeout(function(){
					$('#success').addClass('hide');
				},3000);
			}
		});
	});
	$('body').on('click','.modify',function(){
		var id = $(this).data('id');
		var type = $(this).data('type');
		var ord = $(this).data('ord');
		var code = $(this).data('code');
		$('.name').eq(1).val(type);
		$('.name').eq(1).data('id',id);
		$('.order').eq(1).val(ord);
		$('.code').eq(1).val(code);
	});

	/**
	 * 删除课程类型
	 */
	$('#del').on('click',function(){
		var id = $('.name').eq(1).data('id');
		$.ajax({
			type:'post',
			url:'http://localhost/GraduationProject/index.php/Admin/Course/delclass.html',
			data:'id='+id,
			dataType:'json',
			success:function(data){
				$('#edit').modal('hide');
				$('.success').html('删除分类成功。');
				$("#table").load("http://localhost/GraduationProject/index.php/Admin/Course/coursetype.html #table");
				$('#success').removeClass('hide');
				setTimeout(function(){
					$('#success').addClass('hide');
				},3000);
			}
		});
	});

	/**
	 * 检测输入
	 */
	// var repeat;
	function check(name,order,code,id) {
		var repeat;
		if (parseInt(order) != order) {
			$('.help-block').eq('1').html('<span class="text-danger">显示序号必须为整数</span>');
			$('.help-block').eq('4').html('<span class="text-danger">显示序号必须为整数</span>');
			return 'no';
		}
		if (!name) {
			$('.help-block').eq('0').html('<span class="text-danger">请输入分类名称</span>');
			$('.help-block').eq('3').html('<span class="text-danger">请输入分类名称</span>');
		}
		if (!code) {
			$('.help-block').eq('2').html('<span class="text-danger">请输入分类名称编码</span>');
			$('.help-block').eq('5').html('<span class="text-danger">请输入分类名称编码</span>');
		}
		$('.name').on('focus',function(){
			$('.help-block').eq('0').html('');
			$('.help-block').eq('3').html('');
		});
		$('.code').on('focus',function(){
			$('.help-block').eq('2').html('');
			$('.help-block').eq('5').html('');
		});
		if (name && code) {
			$.ajax({
				type:'post',
				async:false,
				url:"http://localhost/GraduationProject/index.php/Admin/Course/isexist.html",
				data:'code='+code+'&id='+id,
				dataType:'json',
				success:function(data){
					// alert(data);
					if (data == '-1') {
						$('.help-block').eq('2').html('<span class="text-danger">编码已被使用，请换一个。</span>');
						$('.help-block').eq('5').html('<span class="text-danger">编码已被使用，请换一个。</span>');
						repeat = data;
					}
				}
			});
		}else{
			return 'no';
		}
		if(repeat == '-1'){
			return 'no';
		}
		return 'yes';
	}

	
	

});