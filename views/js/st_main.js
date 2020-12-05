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

	var tab = $(".home-review-tablist a");
	var tabPanel = $(".home-review-tabpanel");

	tab.click(function(){ 
		var index = $(tab).index(this);
		$('.home-review-tablist a').removeClass('on');
		$(this).addClass('on');

		tabPanel.removeClass('on')
		tabPanel.eq(index).addClass('on')
	});
});