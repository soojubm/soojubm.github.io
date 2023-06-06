$(document).ready(function() {
  var bodyElement = $('body')
  var windowWidth = $(window).width()
  var headerElement = $('.header')
  var navElement = $('.navigation')

  if ($(document).scrollTop() > 0) {
    bodyElement.addClass('is-fixed-header')
  } else {
    bodyElement.removeClass('is-fixed-header')
    // headerBackdropElement.hide()
    // navBackdropElement.hide()
  }

  $('.navbar-burger').on('click', function() {
    // 스크롤 고정
    $('body').toggleClass('fixed')
    bodyElement.toggleClass('is-opened-navigation-mobile')
  })

  if (windowWidth > 1200) navigateDesktop()
  else navigateMobile()

  $(window).resize(function() {
    windowWidth = $(window).width()

    if (windowWidth > 1200) {
      $('.gnb li').off('focusin focusout mouseenter mouseleave')
      resetNavigation()
      navigateDesktop()
    } else {
      $('.gnb li, .navigation-bg').off('focusin focusout mouseenter mouseleave')
      resetNavigation()
      navigateMobile()
    }
        
    function resetNavigation() {
      var bodyElement = $('body')
      bodyElement.removeClass('is-opened-navigation')
      bodyElement.removeClass('is-opened-navigation-mobile')
    }
  })

  $(window).scroll(function() {
    // if (windowWidth < 1200) return
    if ($(document).scrollTop() > 0) bodyElement.addClass('is-fixed-header')
    else bodyElement.removeClass('is-fixed-header')
  })
})

function navigateDesktop() {
  var bodyElement = $('body')
  $('.gnb li, .navigation-bg')
    .on('focusin mouseenter', function() {
      bodyElement.addClass('is-opened-navigation')
    })
    .on('focusout mouseleave', function() {
      bodyElement.removeClass('is-opened-navigation')
    })
}

function navigateMobile() {
  $('.gnb li')
    .on('focusin mouseenter', function() {
      $(this).addClass('on')
    })
    .on('focusout mouseleave', function() {
      $(this).removeClass('on')
    })
}

// if (windowWidth > 1200) {
//   if ($(document).scrollTop() > 0) {
//     // body 공통 클래스
//     headerElement.addClass('on fixed')
//     navElement.addClass('on fixed')
//     navBGElement.addClass('fixed')
//   } else {
//     headerElement.removeClass('on fixed')
//     navElement.removeClass('on fixed')
//     navBGElement.removeClass('fixed')
//   }
// } else {
//   if ($(document).scrollTop() > 0) {
//     headerElement.addClass('fixed')
//   }
//   else {
//     headerElement.removeClass('fixed')
//   }
// }


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


$(document).ready(function(){
  $('.breadcrumb li')
    .on('click', function() {
      $(this).toggleClass('on')
    })
});