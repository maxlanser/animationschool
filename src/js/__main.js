(() => {
  let categoriesSwiper, newsSwiper, vacanciesSwiper, coursesSwiper, lastWeekNewsSwiper;

  const categoriesSwiperDefaults = {
    slidesPerView: 4,
    spaceBetween: 30,
    navigation: {
      nextEl: ".js-categories-news__slider-next",
      prevEl: ".js-categories-news__slider-prev",
    }
  }

  const newsSwiperDefaults = {

  }

  // Функция debounce
  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  }

  // Функция для определения ширины экрана
  function getScreenWidth() {
    return window.innerWidth;
  }





  categoriesSwiper = new Swiper(".js-categories-news-slider", {});


  document.addEventListener('DOMContentLoaded', () => {



    newsSwiper = new Swiper(".js-news-slider", {

    });

    vacanciesSwiper = new Swiper(".js-vacancies-slider", {
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

    coursesSwiper = new Swiper(".js-courses-slider", {
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

    lastWeekNewsSwiper = new Swiper(".js-last-week-news-slider", {
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
