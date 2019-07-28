'use strict';

(function () {


  var buttonPopular = document.querySelector('#filter-popular');
  buttonPopular.addEventListener('click', function () {
    deletePictures();
    updatePictures(pictures);
    window.util.resetActive(activeClassName, removeClassName);
    buttonPopular.classList.add('img-filters__button--active');
  });

  var buttonNew = document.querySelector('#filter-new');
  var BUTTON_NEW_LENGTH = 10;
  buttonNew.addEventListener('click', function () {
    window.util.resetActive(activeClassName, removeClassName);
    var randomPictures = window.util.getUniqueElement(pictures, BUTTON_NEW_LENGTH);
    deletePictures();
    updatePictures(randomPictures);

    buttonNew.classList.add('img-filters__button--active');
  });

  var buttonDiscussed = document.querySelector('#filter-discussed');
  buttonDiscussed.addEventListener('click', function () {
    window.util.resetActive(activeClassName, removeClassName);
    deletePictures();
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
    updatePictures(picturesCopy);
    buttonDiscussed.classList.add('img-filters__button--active');
  });

  var activeClassName = '.img-filters__button--active';
  var removeClassName = 'img-filters__button--active';

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
})();
