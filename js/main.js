'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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

// Объявили обработчик ESC
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

// Функция открытия popup
var openPopup = function () {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');

  document.querySelector('.effect-level__pin').style.left = '100%';
  document.querySelector('.effect-level__depth').style.width = '100%';
  document.querySelector('.img-upload__effect-level').classList.add('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// Функция закрытия popup
var closePopup = function () {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  document.querySelector('.img-upload__preview').style.transform = '';
  document.querySelector('.img-upload__input').setAttribute('value', '');
  document.querySelector('.img-upload__preview img').removeAttribute('class');
};

document.addEventListener('change', function (evt) {
  var target = evt.target;

  while (target !== document) {
    if (target.classList.contains('img-upload__input')) {
      openPopup(target);
      return;
    }

    target = target.parentNode;
  }
}, true);

var MAX_VALUE = 100;
var MIN_VALUE = 25;
var STEP_VALUE = 25;
var CURRENT_VALUE = document.querySelector('.scale__control--value');
var CURRENT_PIN_POSITION = document.querySelector('.effect-level__pin');
var IMG_PREWIEW = document.querySelector('.img-upload__preview img');
var EFFECT_LINE = document.querySelector('.effect-level__line');
var EFFECT_LINE_DEPTH = document.querySelector('.effect-level__depth');
var EFFECT_VALUE = document.querySelector('.effect-level__value');

function checksRange(min, max, current) {
  return (current > min && current < max);
}

function changeImgSize(step, valueRange, current) {
  current -= step;

  if (!checksRange(MIN_VALUE, MAX_VALUE, current)) {
    current = valueRange;
  }
  document.querySelector('.img-upload__preview').style.transform = 'scale(' + (current / 100) + ')';

  return current + '%';
}

function changeEffect(current) {

  var Effect = 'grayscale';
  var effectValue = current / 100;

  if (IMG_PREWIEW.classList.contains('effects__preview--sepia')) {
    Effect = 'sepia';
  }

  if (IMG_PREWIEW.classList.contains('effects__preview--marvin')) {
    Effect = 'invert';
    effectValue = current + '%';
  }
  if (IMG_PREWIEW.classList.contains('effects__preview--phobos')) {
    Effect = 'blur';
    effectValue = (current / 100 * 3) + 'px';

  }
  if (IMG_PREWIEW.classList.contains('effects__preview--heat')) {
    Effect = 'brightness';
    effectValue = current / 100 * 2 + 1;
  }

  IMG_PREWIEW.style.filter = Effect + '(' + effectValue + ')';

  return;
}


function getEffect(effect) {
  CURRENT_PIN_POSITION.style.left = 100 + '%';
  EFFECT_LINE_DEPTH.style.width = CURRENT_PIN_POSITION.style.left;
  document.querySelector('.img-upload__effect-level').classList.remove('hidden');
  IMG_PREWIEW.setAttribute('class', 'effects__preview--' + effect);
  IMG_PREWIEW.removeAttribute('style');
  return;
}

var getCoords = function (element, evt) {
  var rect = element.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
};

document.addEventListener('click', function (evt) {
  var target = evt.target;


  while (target !== document) {
    if (target.classList.contains('img-upload__cancel')) {
      closePopup();
      return;
    }

    if (target.classList.contains('scale__control--smaller')) {
      // получили текущее значение при уменьшении картинки
      CURRENT_VALUE.value = changeImgSize(STEP_VALUE, MIN_VALUE, parseInt(CURRENT_VALUE.value, 10));
      return;
    }

    if (target.classList.contains('scale__control--bigger')) {
      // получили текущее значение при уменьшении картинки
      CURRENT_VALUE.value = changeImgSize(-(STEP_VALUE), MAX_VALUE, parseInt(CURRENT_VALUE.value, 10));
      return;
    }

    if (target.getAttribute('id') === 'effect-none') {
      document.querySelector('.img-upload__effect-level').classList.add('hidden');
      IMG_PREWIEW.setAttribute('class', 'effects__preview--none');
      IMG_PREWIEW.removeAttribute('style');
      return;
    }

    if (target.getAttribute('id') === 'effect-chrome') {
      getEffect('chrome');
    }

    if (target.getAttribute('id') === 'effect-sepia') {
      getEffect('sepia');
    }

    if (target.getAttribute('id') === 'effect-marvin') {
      getEffect('marvin');
    }

    if (target.getAttribute('id') === 'effect-phobos') {

      getEffect('phobos');
    }

    if (target.getAttribute('id') === 'effect-heat') {
      getEffect('heat');
    }

    target = target.parentNode;
  }
});

document.addEventListener('keydown', function (evt) {
  var target = evt.target;

  while (target !== document) {

    if (target.classList.contains('img-upload__cancel') && evt.keyCode === ENTER_KEYCODE) {
      closePopup();

      return;
    }

    target = target.parentNode;
  }
});

document.addEventListener('mousedown', function (evt) {
  var target = evt.target;

  while (target !== document) {

    if (target.classList.contains('effect-level__pin')) {
      var shifts = getCoords(target, evt);

      document.onmousemove = function (moveEvt) {
        var coords = getCoords(EFFECT_LINE, moveEvt);
        var value = (coords.x - shifts.x) / EFFECT_LINE.offsetWidth * 100;
        if (value < 0) {
          value = 0;
        }
        if (value > 100) {
          value = 100;
        }

        target.ondragstart = function () {
          return false;
        };

        CURRENT_PIN_POSITION.style.left = getCoords(EFFECT_LINE, evt);
        EFFECT_LINE_DEPTH.style.width = CURRENT_PIN_POSITION.style.left;
        EFFECT_VALUE.setAttribute('value', parseInt(CURRENT_PIN_POSITION.style.left, 10));

        target.style.left = Math.ceil(value) + '%';
      };

      document.onmouseup = function () {

        document.onmousemove = null;
        document.onmouseup = null;

        CURRENT_PIN_POSITION.style.left = getCoords(EFFECT_LINE, evt);
        EFFECT_LINE_DEPTH.style.width = CURRENT_PIN_POSITION.style.left;
        EFFECT_VALUE.setAttribute('value', parseInt(CURRENT_PIN_POSITION.style.left, 10));

        changeEffect(parseInt(CURRENT_PIN_POSITION.style.left, 10));
      };

      return;
    }

    target = target.parentNode;
  }
});


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
