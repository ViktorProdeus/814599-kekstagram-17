'use strict';

(function () {

  var updatePictures = function (append) {
    window.render.addPictures(append);
  };

  var deletePictures = function (remove) {
    window.render.removePictures(remove);
  };

  var pictures = [];
  var successHandler = function (data) {
    pictures = data;

    updatePictures(pictures);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; padding: 10px; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var URL = 'https://js.dump.academy/kekstagram/data';

  window.load(URL, successHandler, errorHandler);

  var activeClassName = '.img-filters__button--active';
  var removeClassName = 'img-filters__button--active';

  var renderPictures = window.debounce(function (allPictures) {
    deletePictures();
    updatePictures(allPictures);
  });

  var makeActive = function (buttonName, selector) {
    buttonName = document.querySelector(selector);
    window.util.resetActive(activeClassName, removeClassName);
    buttonName.classList.add('img-filters__button--active');
  };

  var onFilterPopularClick = function () {
    makeActive('buttonPopular', '#filter-popular');
    renderPictures(pictures);
  };

  var onFilterNewClick = function () {
    var BUTTON_NEW_LENGTH = 10;
    var randomPictures = window.util.getUniqueElement(pictures, BUTTON_NEW_LENGTH);
    makeActive('buttonNew', '#filter-new');
    renderPictures(randomPictures);
  };

  var onFilterDiscussedClick = function () {
    makeActive('buttonDiscussed', '#filter-discussed');

    var picturesCopy = pictures.slice();
    // compare функция коллбэк
    var compare = function (a, b) {
      if (a.comments.length > b.comments.length) {
        return -1;
      }
      if (a.comments.length < b.comments.length) {
        return 1;
      }
      return 0;
    };
    picturesCopy.sort(compare);
    renderPictures(picturesCopy);
  };

  var onButtonFilterClick = function (evt) {
    var target = evt.target;

    while (target !== document) {
      if (target.id === 'filter-popular') {
        onFilterPopularClick();
        return;
      }
      if (target.id === 'filter-new') {
        onFilterNewClick();
        return;
      }
      if (target.id === 'filter-discussed') {
        onFilterDiscussedClick();
        return;
      }

      target = target.parentNode;
    }
  };

  document.addEventListener('click', onButtonFilterClick);
})();
