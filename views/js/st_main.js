$(document).ready(function(){
	// main visual
	$('.main-visual').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: false,
		dots: true
	});

	$('.slider-branch').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 4000
	});

	$('.branch_select').hover(function(){
		$(this).find('ul').stop().slideDown(300).show();
		$(this).addClass('open');
		$(this).hover(function(){
		}, function(){
			$(this).find('ul').stop().slideUp(300).show();
			$(this).removeClass('open');
		}
		)
	});


});