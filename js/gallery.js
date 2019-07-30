'use strict';

(function () {

  var updatePictures = function (append) {
    window.render.addPictures(append);
  };

  var deletePictures = function () {
    window.render.removePictures();
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

  var renderPictures = window.debounce(function (allPictures) {
    deletePictures();
    updatePictures(allPictures);
  });

  var onButtonFilterClick = function (evt) {
    var target = evt.target;

    while (target !== document) {

      if (['filter-popular', 'filter-new', 'filter-discussed'].indexOf(target.id) !== -1) {
        var current = document.querySelector('.img-filters__button--active');
        var images = pictures.slice();

        target.classList.add('img-filters__button--active');

        if (current) {
          current.classList.remove('img-filters__button--active');
        }

        if (target.id === 'filter-new') {
          var COUNT = 10;
          images = window.util.getUniqueElement(images, COUNT);
        }

        if (target.id === 'filter-discussed') {
          images.sort(function (a, b) {
            return b.comments.length - a.comments.length;
          });
        }

        renderPictures(images);
        return;
      }

      target = target.parentNode;
    }
  };

  document.addEventListener('click', onButtonFilterClick);
})();
