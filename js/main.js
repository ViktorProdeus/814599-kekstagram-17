'use strict';

// Нашли контейнер для вставки фотографий
var picturesContainer = document.querySelector('.pictures');

// Нашли шаблон и контент внутри него
var picturesTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

// Свойства фотографий, опубликованных пользователем
var dataUserPictures = {
  // количество фотографий
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

// Функция, которая генерирует массив комментариев
function generateUserComments(messages, names) {
  var userComments = [];
  var count = getRandomNumber(0, dataUserPictures.COMMENTS_LENGTH);
  for (var i = 1; i <= count; i++) {
    userComments.push({
      avatars: 'img/avatar-' + i + '.svg',
      messages: getRandomElement(messages),
      names: getRandomElement(names)
    });
  }
  return userComments;
}

// Функция, которая генерирует массив фотографий
function generateUserPictures(dataPictures) {
  var userPictures = [];
  for (var i = 1; i <= dataPictures.NUMBERS_IMAGES; i++) {
    userPictures.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumber(dataPictures.LIKES_MIN, dataPictures.LIKES_MAX),
      comments: generateUserComments(dataUserPictures.MESSAGES, dataUserPictures.NAMES)
    });
  }
  return userPictures;
}

var userPictures = generateUserPictures(dataUserPictures);

// Генерируем шаблон фотографий
function renderUserPictures(picture) {
  var cloneInElement = picturesTemplate.cloneNode(true);

  cloneInElement.querySelector('.picture__img').src = picture.url;
  cloneInElement.querySelector('.picture__likes').textContent = picture.likes;
  cloneInElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return cloneInElement;
}

// Добавляем шаблон в контейнер для изображений
function addtoPictures() {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < userPictures.length; i++) {
    picturesContainer.appendChild(renderUserPictures(userPictures[i]));
  }
  return picturesContainer.appendChild(fragment);
}

addtoPictures();
