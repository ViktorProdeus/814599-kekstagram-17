'use strict';

(function () {
  function renderUserPictures(picture, id) {
    var picturesTemplate = document.querySelector('#picture')
      .content.querySelector('.picture');

    var cloneInElement = picturesTemplate.cloneNode(true);

    cloneInElement.querySelector('.picture__img').src = picture.url;
    cloneInElement.querySelector('.picture__likes').textContent = picture.likes;
    cloneInElement.querySelector('.picture__comments').textContent = picture.comments.length;
    cloneInElement.setAttribute('data-id', id);
    return cloneInElement;
  }


  window.renderPreview = {

    pictures: [],

    addPictures: function (array) {
      window.renderPreview.pictures = array;
      var fragment = document.createDocumentFragment();
      var picturesContainer = document.querySelector('.pictures');

      for (var i = 0; i < array.length; i++) {

        fragment.appendChild(renderUserPictures(array[i], i));
      }

      picturesContainer.appendChild(fragment);

    },

    removePictures: function () {
      var pictures = document.querySelectorAll('.picture');

      pictures.forEach(function (node) {
        node.remove();
      });
    }

  };

})();
