$(document).ready(function(){
	// main visual
	$('.main-visual-inbox').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 1000000,
		arrows: false,
		dots: true
	});

	$('.main-review-tabpanel .images').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,
		arrows: true,
		dots: false
	});


	
	$('.slider-branch').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 4000
	});

	var tab = $(".main-review-tablist a");
	var tabPanel = $(".main-review-tabpanel");

	tab.click(function(){ 
		var index = $(tab).index(this);
		$('.main-review-tablist a').removeClass('on');
		$(this).addClass('on');

		tabPanel.removeClass('on')
		tabPanel.eq(index).addClass('on')
	});
});