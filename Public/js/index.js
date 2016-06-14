$(function(){
	// $(".carousel-control").css("line-height",$(".carousel-inner img").height()+'px');
	// alert($(".carousel-inner img").height());
	// $(window).resize(function(){
	// 	var height = $(".carousel-inner img").eq(1).height() ||
	// 				 $(".carousel-inner img").eq(2).height() ||
	// 				 $(".carousel-inner img").eq(3).height();
	// 	$(".carousel-control").css("line-height",height+'px');
	// });
	$(window).load(function(){
		$("#myCarousel").carousel({
		interval : 3000,
		});
	});
	
});