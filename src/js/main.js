(() => {
  document.addEventListener('DOMContentLoaded', () => {
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
        374: {
          slidesPerView: "auto",
          spaceBetween: 14.72,
          navigation: {
            enabled: false
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
      }
    });

    const categoriesSwiper = new Swiper(".js-categories-news-slider", {
      slidesPerView: 4,
      spaceBetween: 30,
      navigation: {
        nextEl: ".js-categories-news__slider-next",
        prevEl: ".js-categories-news__slider-prev",
      }
    });

    const coursesSwiper = new Swiper(".js-courses-slider", {
      slidesPerView: "auto",
      spaceBetween: 30,
      navigation: {
        nextEl: ".js-courses-slider-next",
        prevEl: ".js-courses-slider-prev",
      }
    });

    const lastWeekNewsSwiper = new Swiper(".js-last-week-news-slider", {
      slidesPerView: "auto",
      spaceBetween: 30,
      navigation: {
        nextEl: ".js-last-week-news-slider-next",
        prevEl: ".js-last-week-news-slider-prev",
      }
    });
  });

})();
