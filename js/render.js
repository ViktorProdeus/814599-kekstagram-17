'use strict';

(function () {
  function renderUserPictures(picture) {
    var picturesTemplate = document.querySelector('#picture')
      .content.querySelector('.picture');

    var cloneInElement = picturesTemplate.cloneNode(true);

    cloneInElement.querySelector('.picture__img').src = picture.url;
    cloneInElement.querySelector('.picture__likes').textContent = picture.likes;
    cloneInElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return cloneInElement;
  }

  window.render = {

    addPictures: function (array) {

      var fragment = document.createDocumentFragment();
      var picturesContainer = document.querySelector('.pictures');

      for (var i = 0; i < array.length; i++) {

        fragment.appendChild(renderUserPictures(array[i]));
      }

      picturesContainer.appendChild(fragment);

    },

    removePictures: function () {
      var pictures = document.querySelectorAll('.picture');
      // forEach для псевдомассива
      pictures.forEach(function (node) {
        node.remove();
      });
    }

  };

})();
