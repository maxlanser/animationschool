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

// Объект с параметрами Swiper.js по умолчанию
const defaultSwiperOptions = {
  // ...
};

// Функция для инициализации слайдера Swiper.js
const initSwiper = debounce(() => {
  const swiper = new Swiper('.swiper-container', {
    // Параметры Swiper.js
    ...defaultSwiperOptions,

    // Адаптивные параметры
    slidesPerView: getScreenWidth() >= 768 ? 3 : 1,
    spaceBetween: getScreenWidth() >= 768 ? 30 : 10,
  });

  // Отслеживание изменения ширины экрана
  window.addEventListener('resize', () => {
    if (getScreenWidth() < 576) {
      swiper.destroy();
    } else {
      swiper.init();
    }
  });

  // Инициализация слайдера
  swiper.init();
}, 500); // Задержка 500 мс

// Инициализация слайдера
initSwiper();
