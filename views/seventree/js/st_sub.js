$(document).ready(function(){
  $('.breadcrumb li')
    .on('click', function() {
      $(this).toggleClass('on')
    })
});