$(document).ready(function(){
	/*
	$('.gnb li').on('focusin mouseenter', function(){
		$(this).addClass('on');
	});
	$('.gnb li').on('focusout mouseleave', function(){
		$(this).removeClass('on');
	});
	*/

	$('.gnb li, .navigation-bg').on('focusin mouseenter',function(){
		$('.gnb li').addClass('on');
		$('.navigation-bg').addClass('on');
		$('.navigation').addClass('on');
		$('.header').addClass('on');
	}).on('focusout mouseleave',function(){
		$('.gnb li').removeClass('on');
		$('.navigation-bg').removeClass('on');
		$('.navigation').removeClass('on');
		$('.header').removeClass('on');
	});


	// $('.js-to-top').on('click',function(e){
	// 	e.preventDefault();
	// 	$('html, body').animate({scrollTop:0}, 400);
	// });

	// $('.topbanner button').on('click',function(){
	// 	$('.topbanner').hide();
	// 	$('body').removeClass('has-top-banner');
	// });

	// $('.quickmenu-close').on('click',function(){
	// 	$('.quickmenu').toggleClass('on');
	// });
	//$('body').addClass('body-lock');
	//	$('.media-video').load("index_video.html", function() {	  alert( "Load was performed." );	});
});