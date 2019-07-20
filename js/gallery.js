'use strict';

(function () {
  // Функция, возвращающая случайное число в диапазоне
  function getRandomNumber(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Функция, возвращающая случайный элемемент массива
  function getRandomElement(array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    var randomElement = array[randomIndex];

    return randomElement;
  }

  // Функция, которая создает массив комментариев
  function createUserComments(messages, names) {
    var userComments = [];
    var count = getRandomNumber(0, window.dataUserPictures.COMMENTS_LENGTH);

    for (var i = 1; i <= count; i++) {
      var avatarCount = getRandomNumber(1, window.dataUserPictures.NUMBERS_AVATARS);

      userComments.push({
        avatars: 'img/avatar-' + avatarCount + '.svg',
        messages: getRandomElement(messages),
        names: getRandomElement(names)
      });
    }

    return userComments;
  }

  // Функция, которая создает массив фотографий с данными
  function createUserPictures() {
    var userPictures = [];
    var count = window.dataUserPictures.NUMBERS_IMAGES;

    for (var i = 1; i <= count; i++) {
      userPictures.push({
        url: 'photos/' + i + '.jpg',
        likes: getRandomNumber(window.dataUserPictures.LIKES_MIN, window.dataUserPictures.LIKES_MAX),
        comments: createUserComments(window.dataUserPictures.MESSAGES, window.dataUserPictures.NAMES)
      });
    }

    return userPictures;
  }

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
  function addtoPictures(array) {
    var fragment = document.createDocumentFragment();
    var picturesContainer = document.querySelector('.pictures');

    for (var i = 0; i < array.length; i++) {
      picturesContainer.appendChild(renderUserPictures(array[i]));
    }

    return fragment;
  }

  // Выводим шаблон на страницу
  addtoPictures(createUserPictures());

})();
