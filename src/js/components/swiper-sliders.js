(function(){
  const breakpoint = window.matchMedia( '(min-width:561px)' );

  let categoriesSwiper;

  const breakpointChecker = function() {

    // if larger viewport and multi-row layout needed
    if ( breakpoint.matches === true ) {

      return enableSwiper();

      // else if a small viewport and single column layout needed
    } else if ( breakpoint.matches === false ) {

      if ( categoriesSwiper !== undefined ) categoriesSwiper.destroy(true, true);

      return;

    }

  };

  const enableSwiper = function() {

    categoriesSwiper = new Swiper(".js-categories-news-slider", {
      slidesPerView: 4,
      spaceBetween: 30,
      navigation: {
        nextEl: ".js-categories-news__slider-next",
        prevEl: ".js-categories-news__slider-prev",
      },

    });

  };

  document.addEventListener('DOMContentLoaded', () => {

    breakpoint.addListener(breakpointChecker);

    breakpointChecker();

    const newsSwiper = new Swiper(".js-news-slider", {
      navigation: {
        nextEl: ".js-news-slider__next",
        prevEl: ".js-news-slider__prev",
      },
      pagination: {
        el: ".js-news-slider__pagination",
        clickable: true
      },
      breakpoints: {
        320: {
          slidesPerView: "auto",
          spaceBetween: 14.72,
          navigation: {
            enabled: false
          }
        },

        561: {
          slidesPerView: 1,
          spaceBetween: 0,
          navigation: {
            nextEl: ".js-news-slider__next",
            prevEl: ".js-news-slider__prev",
          },
          pagination: {
            el: ".js-news-slider__pagination",
            clickable: true
          }
        }
      }
    });

    const vacanciesSwiper = new Swiper(".js-vacancies-slider", {
      slidesPerView: 4,
      spaceBetween: 30,
      navigation: {
        nextEl: ".js-vacancies__slider-next",
        prevEl: ".js-vacancies__slider-prev",
      },
      breakpoints: {
        320: {
          slidesPerView: "auto",
          spaceBetween: 15,
          navigation: {
            enabled: false
          },
          scrollbar: {
            el: ".js-vacancies__slider-scrollbar",
            hide: false
          }
        },
        561: {
          slidesPerView: 4,
          spaceBetween: 30,
          navigation: {
            nextEl: ".js-vacancies__slider-next",
            prevEl: ".js-vacancies__slider-prev",
          },
          scrollbar: {
            enabled: false
          }

        }
      }
    });

    const coursesSwiper = new Swiper(".js-courses-slider", {
      slidesPerView: "auto",
      spaceBetween: 30,
      navigation: {
        nextEl: ".js-courses__slider-next",
        prevEl: ".js-courses__slider-prev",
      },
      breakpoints: {
        320: {
          slidesPerView: "auto",
          spaceBetween: 15,
          navigation: {
            enabled: false
          },
          scrollbar: {
            el: ".js-courses__slider-scrollbar",
            hide: false
          }
        },
        561: {
          slidesPerView: 4,
          spaceBetween: 30,
          navigation: {
            nextEl: ".js-courses__slider-next",
            prevEl: ".js-courses__slider-prev",
          },
          scrollbar: {
            enabled: false
          }

        }
      },
      // on: {
      //   resize: function(swiper) { this.updateSlides(); }
      // }
    });

    const lastWeekNewsSwiper = new Swiper(".js-last-week-news-slider", {
      slidesPerView: "auto",
      spaceBetween: 30,
      navigation: {
        nextEl: ".js-last-week-news__slider-next",
        prevEl: ".js-last-week-news__slider-prev",
      },
      breakpoints: {
        320: {
          slidesPerView: "auto",
          spaceBetween: 15,
          navigation: {
            enabled: false
          },
          scrollbar: {
            el: ".js-last-week-news__slider-scrollbar",
            hide: false
          }
        },
        561: {
          slidesPerView: 4,
          spaceBetween: 30,
          navigation: {
            nextEl: ".js-last-week-news__slider-next",
            prevEl: ".js-last-week-news__slider-prev",
          },
          scrollbar: {
            enabled: false
          }

        }
      }
    });
  });

})();
