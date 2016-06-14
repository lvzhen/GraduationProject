$(function(){
	// $("#upload-video").fileinput({showCaption: false,showUpload:false,});
	$('#add,#edit').on('hidden.bs.modal', function () {
		$('.name').val('');
		$('#input').val('');
		$('.brief').val('');
		$('.title').html('');
		$('#progress,#progress1').addClass('hide');
		$('#progress,#progress1').addClass('active');
		$('.help-block').html('');
	});
	$('.name').on('focus',function(){
		$('.help-block').eq('0').html('');
	});
	$('#input').on('change',function(){
		$('.help-block').eq('1').html('');
	});
	/**
	 * 添加课时
	 */
	$('#savelesson').on('click',function(){
		var name = $('.name').val();
		var brief = $('.brief').val();
		var video = $('.title').html();
		var cid = $('.cid').val();
		var path = $('.path').val();
		var type = $('.type').val();
		if (!name) {
			$('.help-block').eq(0).html('<span class="text-danger">请输入标题</span>');
		}
		if (video == '') {
			$('.help-block').eq(1).html('<span class="text-danger">请上传课时视频</span>');
		}
		if (name && video) {
			$.ajax({
				type:'post',
				url:'http://localhost/GraduationProject/index.php/Admin/Course/addlesson.html',
				dataType:'json',
				data:'cid='+cid+'&path='+path+'&name='+name+'&brief='+brief+'&title='+video+'&type='+type,
				success:function(data){
					$('#add').modal('hide');
					$('.success').html('添加课时成功。');
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
	 * 编辑时获取数据
	 */
	$('body').on('click','.modify',function(){
		var id = $(this).data('id');
		var brief = $(this).data('brief');
		var name = $(this).data('name');
		var title = $(this).data('title');
		var path = $(this).data('path');
		$('.name').eq(1).val(name);
		$('.name').eq(1).data('id',id);
		$('.title').html(title);
		$('.brief').eq(1).val(brief);
		$('.path').eq(1).val(path);
	});

	/**
	 * 保存编辑数据
	 */
	$('#editlesson').on('click',function(){
		var id = $('.name').eq(1).data('id');
		var name = $('.name').eq(1).val();
		var brief = $('.brief').eq(1).val();
		var video = $('.title').eq(1).html();
		var path = $('.path').eq(1).val();
		var type = $('.type').eq(1).val();
		if (!name) {
			$('.help-block').eq(0).html('<span class="text-danger">请输入标题</span>');
		}
		if (video == '') {
			$('.help-block').eq(1).html('<span class="text-danger">请上传课时视频</span>');
		}
		if (name && video) {
			$.ajax({
				type:'post',
				url:'http://localhost/GraduationProject/index.php/Admin/Course/editlesson.html',
				dataType:'json',
				data:'id='+id+'&path='+path+'&name='+name+'&brief='+brief+'&title='+video+'&type='+type,
				success:function(data){
					$('#edit').modal('hide');
					$('.success').html('修改课时成功。');
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
	 * 删除课时
	 */
	$('body').on('click','.del',function(){
		var key = $(this).data('key');
		var id = $(this).data('id');
		var r = confirm("是否删除课时"+key+"?");
		if (r==true) {
			$.ajax({
				type:'post',
				url:'http://localhost/GraduationProject/index.php/Admin/Course/del.html',
				dataType:'json',
				data:'id='+id,
				success:function(data){
					$('.success').html('删除课时'+key+'成功。');
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