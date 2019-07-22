'use strict';

(function () {

  // Генерируем шаблон фотографий
  function renderUserPictures(picture) {
    var picturesTemplate = document.querySelector('#picture')
      .content.querySelector('.picture');

    var cloneInElement = picturesTemplate.cloneNode(true);

    cloneInElement.querySelector('.picture__img').src = picture.url;
    cloneInElement.querySelector('.picture__likes').textContent = picture.likes;
    cloneInElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return cloneInElement;
  }

  // Добавляем шаблон в контейнер для изображений
  var successHandler = function addtoPictures(array) {
    var fragment = document.createDocumentFragment();
    var picturesContainer = document.querySelector('.pictures');

    for (var i = 0; i < array.length; i++) {
      picturesContainer.appendChild(renderUserPictures(array[i]));
    }

    return fragment;
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

  window.load(successHandler, errorHandler);

})();
