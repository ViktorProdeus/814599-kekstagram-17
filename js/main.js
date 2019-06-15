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
  NUMBER_IMAGES: 25,

  LIKES_MIN: 15,
  LIKES_MAX: 200,
  COMMENTS: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!']
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

// Функция, возвращающаая массив объектов пользовательских фото
function generateUserPictures() {
  var userPictures = [];
  for (var i = 1; i <= dataUserPictures.NUMBER_IMAGES; i++) {
    userPictures.push({
      url: 'photos/' + i + '.jpg',
      likes: getRandomNumber(dataUserPictures.LIKES_MIN, dataUserPictures.LIKES_MAX),
      comments: getRandomElement(dataUserPictures.COMMENTS)
    });
  }
  return userPictures;
}

var userPictures = generateUserPictures();

// Генерируем шаблон фотографий
var renderUserPictures = function (picture) {
  var userPicturesElement = picturesTemplate.cloneNode(true);

  userPicturesElement.querySelector('.picture__img').src = picture.url;
  userPicturesElement.querySelector('.picture__likes').textContent = picture.likes;
  userPicturesElement.querySelector('.picture__comments').textContent = picture.comments;

  return renderUserPictures;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < userPictures.length; i++) {
  picturesContainer.appendChild(renderUserPictures(userPictures[i]));

}
picturesContainer.appendChild(fragment);
