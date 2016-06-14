$(function(){
	$('#add,#edit').on('hidden.bs.modal', function () {
		$('.name').val('');
		$('.type').val('');
		$('.brief').val('');
		$('.help-block').html('');
	});
	$('.name').on('focus',function(){
		$('.help-block').eq('0').html('');
	});
	/**
	 * 添加课程
	 */
	$('#savecourse').on('click',function(){
		var name = $('.name').val();
		var brief = $('.brief').val();
		var type = $('.type').val();
		var isshow = $('.isshow').val();
		if (!name) {
			$('.help-block').eq(0).html('<span class="text-danger">请输入课程名称</span>');
		}
		if (name) {
			$.ajax({
				type:'post',
				url:'http://localhost/GraduationProject/index.php/Admin/Course/addcourse.html',
				dataType:'json',
				data:'name='+name+'&brief='+brief+'&type='+type,
				success:function(data){
					$('#add').modal('hide');
					$('.success').html('添加课程成功。');
					$("#table").load(location.href+" #table");
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
		var name = $(this).data('coursename');
		var type = $(this).data('type');
		var brief = $(this).data('brief');
		$('.name').eq(1).val(name);
		$('.name').eq(1).data('id',id);
		$('.brief').eq(1).val(brief);
		$('.type').eq(1).val(type);
	});
	/**
	 * 编辑课程
	 */
	$('#editcourse').on('click',function(){
		var id = $('.name').eq(1).data('id');
		var name = encodeURIComponent($('.name').eq(1).val());
		var brief = $('.brief').eq(1).val();
		var type = $('.type').eq(1).val();
		if (!name) {
			$('.help-block').eq(1).html('<span class="text-danger">请输入课程名称</span>');
		}
		if (name) {
			$.ajax({
				type:'post',
				url:'http://localhost/GraduationProject/index.php/Admin/Course/editcourse.html',
				dataType:'json',
				data:'id='+id+'&name='+name+'&brief='+brief+'&type='+type,
				success:function(data){
					$('#edit').modal('hide');
					$('.success').html('修改课程成功。');
					$("#table").load(location.href+" #table");
					$('#success').removeClass('hide');
					setTimeout(function(){
						$('#success').addClass('hide');
					},3000);
				}
			});
		}
	});
	/**
	 * 删除课程
	 */
	$('#del').on('click',function(){
		var id = $('.name').eq(1).data('id');
		var name = $('.name').eq(1).val();
		var r = confirm("删除课程后将删除课程下的全部课时，确认删除"+name+"?");
		if (r==true) {
			$.ajax({
				type:'post',
				url:'http://localhost/GraduationProject/index.php/Admin/Course/delcourse.html',
				data:'id='+id,
				dataType:'json',
				success:function(data){
					$('#edit').modal('hide');
					$('.success').html('删除课程成功。');
					$("#table").load(location.href+" #table");
					$('#success').removeClass('hide');
					setTimeout(function(){
						$('#success').addClass('hide');
					},3000);
				}
			});
		}
	});
	/**
	 * 上传操作
	 */
	$('#input').fileupload({
		url:'http://localhost/GraduationProject/index.php/Admin/Course/upload.html',
        dataType: 'json',
        add: function (e, data) {
            // data.context = $('<p/>').text('Uploading...').appendTo(document.body);
            // data.submit();
            console.log(data);
            $('.title').html(data['files'][0]['name']);
            data.submit();
            $('#savelesson').attr('disabled',true);
        },
        progressall: function (e, data) {
        	console.log(data);
	        var progress = parseInt(data.loaded / data.total * 100, 10);
	        $('#progress').removeClass('hide');
	        $('#progress .progress-bar').css(
	            'width',
	            progress + '%'
	        );
	        $('#progress .progress-bar').html(progress+'%');
	        if(progress == 100){
	        	$('#progress .progress-bar').html('已上传完成！');
	        	$('#progress').removeClass('active');
	        	$('#savelesson').attr('disabled',false);
	        }
	    },
        done: function (e, data) {
        	console.log(data);
            $('.path').val('/GraduationProject/upload/'+data.result);
        }
    });
    $('#pic').fileupload({
		url:'http://localhost/GraduationProject/index.php/Admin/Course/uploadpic.html',
        dataType: 'json',
        add: function (e, data) {
            // data.context = $('<p/>').text('Uploading...').appendTo(document.body);
            // data.submit();
            console.log(data);
            data.submit();
            $('#savepic').attr('disabled',true);
        },
        progressall: function (e, data) {
        	console.log(data);
	        var progress = parseInt(data.loaded / data.total * 100, 10);
	        $('#progress').removeClass('hide');
	        $('#progress .progress-bar').css(
	            'width',
	            progress + '%'
	        );
	        $('#progress .progress-bar').html(progress+'%');
	        if(progress == 100){
	        	$('#progress .progress-bar').html('已上传完成！');
	        	$('#progress').removeClass('active');
	        	$('#savepic').attr('disabled',false);
	        }
	    },
        done: function (e, data) {
        	console.log(data);
            $('.path').val('/GraduationProject/upload/'+data.result);
            $('.img-thumbnail').attr('src','/GraduationProject/upload/'+data.result);
        }
    });
	/**
	 * 上传封面图片
	 */
	$('body').on('click','.uploadpic',function(){
		var id = $(this).data('id');
		var name = $(this).data('coursename');
		var pic = $(this).data('pic');
		$('.name').eq(2).val(name);
		$('.name').eq(2).data('id',id);
		$('.img-thumbnail').attr('src',pic);
	});

	/**
	 * 保存封面图片
	 */
	$('#savepic').on('click',function(){
		var id = $('.name').eq(2).data('id');
		var path = $('.path').val();
		$.ajax({
			type:'post',
			url:'http://localhost/GraduationProject/index.php/Admin/Course/savepic.html',
			dataType:'json',
			data:'id='+id+'&path='+path,
			success:function(data){
				$('#editpic').modal('hide');
				$('.success').html('封面图片修改成功。');
				$("#table").load(location.href+" #table");
				$('#success').removeClass('hide');
				setTimeout(function(){
					$('#success').addClass('hide');
				},3000);
			}
		});
	});

});