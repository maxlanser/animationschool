(function($){
  const header = $('.js-fixed-header');

  function initFixedHeader() {
    $(window).scroll(function() {

      const wScroll = $(this).scrollTop(), scrollAmount = 700;

      if (wScroll > 400) {
        header.addClass("header__wrapper--fixed");
      } else {
        header.removeClass("header__wrapper--fixed");
      }

      if (wScroll > scrollAmount) {
        header.addClass("header__wrapper--show");
      } else {
        header.removeClass("header__wrapper--show");
      }
    });
  }

  $(function(){
    initFixedHeader();
  })
})(jQuery);
