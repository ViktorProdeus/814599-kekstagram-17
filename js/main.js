'use strict';


// Массив с данными из ТЗ
var dataUserPictures = {
  NUMBERS_IMAGES: 25,

  LIKES_MIN: 15,
  LIKES_MAX: 200,

  NUMBERS_AVATARS: 6,
  NAMES: ['Артем', 'Рома', 'Эльдар', 'Мухамед', 'Вероника', 'Аркадий', 'Кекс', 'Дима', 'Борис', 'Толик'],
  MESSAGES: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],
  COMMENTS_LENGTH: 10
};

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
  var count = getRandomNumber(0, dataUserPictures.COMMENTS_LENGTH);

  for (var i = 1; i <= count; i++) {
    var avatarCount = getRandomNumber(1, dataUserPictures.NUMBERS_AVATARS);

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
  var count = dataUserPictures.NUMBERS_IMAGES;

  for (var i = 1; i <= count; i++) {
    var LIKES_MIN = dataUserPictures.LIKES_MIN;
    var LIKES_MAX = dataUserPictures.LIKES_MAX;
    var MESSAGES = dataUserPictures.MESSAGES;
    var NAMES = dataUserPictures.NAMES;

    userPictures.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumber(LIKES_MIN, LIKES_MAX),
      comments: createUserComments(MESSAGES, NAMES)
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
