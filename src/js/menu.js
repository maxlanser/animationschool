(function(){
  const toogleButton = document.querySelector(".js-toggle-button");
  const mobileMenu = document.querySelector(".js-mobile-menu");
  const body = document.querySelector('body');
  const hasChildren = document.querySelectorAll(".menu-item-has-children");


  function toggleMenu() {
    if (!mobileMenu.classList.contains('is-opened')) {
      mobileMenu.classList.add('is-opened');
      body.classList.add('is-locked');
    } else {
      mobileMenu.classList.remove('is-opened');
      body.classList.remove('is-locked');
    }
  }

  function burgerHandler() {
    toogleButton.classList.toggle("is-active");
    toggleMenu();
  }

  function init() {
    toogleButton.addEventListener('click', burgerHandler);

    hasChildren.forEach(function(item){
      const link = item.querySelector('a');
      link.addEventListener('click', function(e){
        e.preventDefault();
        item.classList.toggle('is-clicked');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    init();
  });

})();
