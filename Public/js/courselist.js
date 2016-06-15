$(function(){
	$('#practice').on('click', function(){
		var cid = $(this).data('cid');
		check(cid);
	});
	$('body').on('click','#next',function(){
		var count = $(this).data('count');
		var id = $(this).data('id');
		var cid = $(this).data('cid');
		var p = $(this).data('p') + 1;
		var v = $("input:radio:checked").val();
		if (p >= count) {
			answ(id,v);
			score(cid);
		}else{
			check(cid,p);
			answ(id,v);
		}
	});
	function check(cid,p){
		$.ajax({
			type:'get',
			url:URL+'/check',
			dataType:'json',
			data:{cid:cid,p:p},
			success:function(data){
				if (data == 0) {
					var html = '<div class="modal-body">暂无测试题</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">关闭</button></div>';
					$('.modal-html').html(html);
				}else{
					$('.modal-html').html(data);
				}
				
			}
		})
	}

	function answ(id,v){
		$.ajax({
			type:'get',
			url:URL+'/answ',
			dataType:'json',
			data:{id:id,v:v},
		})
	}

	function score(cid){
		$.ajax({
			type:'get',
			url:URL+'/score',
			dataType:'json',
			data:{cid:cid},
			success:function(data){
				$('.modal-html').html(data);
			}
		});
	}
});