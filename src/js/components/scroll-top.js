(function($){
  const button = $('.js-scroll-top');

  function initScrollTop() {
    $(window).scroll(function() {

      const wScroll = $(this).scrollTop(), scrollAmount = 600;

      if (wScroll > scrollAmount) {
        button.addClass("scroll-top__button--active");
      } else {
        button.removeClass("scroll-top__button--active");
      }
    });


    button.click(function(){
      $('html, body').animate({scrollTop: 0}, 1000);
    })
  }

  $(function(){
    initScrollTop();
  })
})(jQuery);
