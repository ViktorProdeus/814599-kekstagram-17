'use strict';

(function () {

  var MAX_VALUE = 100;
  var MIN_VALUE = 25;
  var STEP_VALUE = 25;
  var CURRENT_VALUE = document.querySelector('.scale__control--value');
  var CURRENT_PIN_POSITION = document.querySelector('.effect-level__pin');
  var IMG_PREWIEW = document.querySelector('.img-upload__preview img');
  var EFFECT_LINE = document.querySelector('.effect-level__line');
  var EFFECT_LINE_DEPTH = document.querySelector('.effect-level__depth');
  var EFFECT_VALUE = document.querySelector('.effect-level__value');

  // Объявили обработчик ESC
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closePopup();
    }
  };

  // Функция открытия popup
  var openPopup = function () {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    CURRENT_PIN_POSITION.style.left = '100%';
    EFFECT_LINE_DEPTH.style.width = '100%';
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    document.querySelector('#effect-none').checked = 'true';
  };

  // Функция закрытия popup
  var closePopup = function () {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    document.querySelector('.img-upload__preview').style.transform = '';
    document.querySelector('.img-upload__input').value = '';
    CURRENT_VALUE.value = MAX_VALUE + '%';
    CURRENT_VALUE.setAttribute('value', MAX_VALUE + '%');
    IMG_PREWIEW.removeAttribute('class');
    IMG_PREWIEW.removeAttribute('style');
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
        CURRENT_VALUE.setAttribute('value', CURRENT_VALUE.value);
        return;
      }

      if (target.classList.contains('scale__control--bigger')) {
        // получили текущее значение при уменьшении картинки
        CURRENT_VALUE.value = changeImgSize(-(STEP_VALUE), MAX_VALUE, parseInt(CURRENT_VALUE.value, 10));
        CURRENT_VALUE.setAttribute('value', CURRENT_VALUE.value);
        return;
      }

      switch (target.id) {
        case 'effect-none':
          document.querySelector('.img-upload__effect-level').classList.add('hidden');
          IMG_PREWIEW.setAttribute('class', 'effects__preview--none');
          IMG_PREWIEW.removeAttribute('style');
          break;

        case 'effect-chrome':
          getEffect('chrome');
          break;

        case 'effect-sepia':
          getEffect('sepia');
          break;

        case 'effect-marvin':
          getEffect('marvin');
          break;

        case 'effect-phobos':
          getEffect('phobos');
          break;

        case 'effect-heat':
          getEffect('heat');
          break;

        default:

      }

      target = target.parentNode;
    }
  });

  document.addEventListener('keydown', function (evt) {
    var target = evt.target;

    while (target !== document) {

      if (target.classList.contains('img-upload__cancel') && evt.keyCode === window.util.ENTER_KEYCODE) {
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
          moveEvt.preventDefault();

          var coords = getCoords(EFFECT_LINE, moveEvt);
          var value = (coords.x + target.offsetWidth / 2 - shifts.x) / EFFECT_LINE.offsetWidth * 100;
          if (value < 0) {
            value = 0;
          }
          if (value > 100) {
            value = 100;
          }

          value = Math.ceil(value);
          target.style.left = value + '%';
          EFFECT_LINE_DEPTH.style.width = target.style.left;
          EFFECT_VALUE.setAttribute('value', value);
          changeEffect(value);
        };

        document.onmouseup = function (upEvt) {
          var targetUp = upEvt.target;

          if (targetUp.classList.contains('effect-level__pin')) {
            var shiftsUp = getCoords(targetUp, upEvt);

            var coords = getCoords(EFFECT_LINE, upEvt);
            var value = (coords.x + targetUp.offsetWidth / 2 - shiftsUp.x) / EFFECT_LINE.offsetWidth * 100;
            if (value < 0) {
              value = 0;
            }
            if (value > 100) {
              value = 100;
            }

            value = Math.ceil(value);

            target.style.left = value + '%';
            EFFECT_LINE_DEPTH.style.width = target.style.left;
            EFFECT_VALUE.setAttribute('value', value);
            changeEffect(value);
          }

          document.onmousemove = null;
          document.onmouseup = null;

        };

        return;
      }

      target = target.parentNode;
    }
  });

  document.addEventListener('focus', function (evt) {
    var target = evt.target;

    while (target !== document) {
      if (target.classList.contains('text__hashtags')) {

        document.removeEventListener('keydown', onPopupEscPress);

      }

      if (target.classList.contains('text__description')) {
        document.removeEventListener('keydown', onPopupEscPress);
      }
      target = target.parentNode;
    }
  }, true);

  document.addEventListener('blur', function (evt) {
    var target = evt.target;

    while (target !== document) {
      if (target.classList.contains('text__hashtags')) {
        document.addEventListener('keydown', onPopupEscPress);
      }

      if (target.classList.contains('text__description')) {
        document.addEventListener('keydown', onPopupEscPress);
      }
      target = target.parentNode;
    }
  }, true);

  var validate = function (evt) {
    var target = evt.target;

    while (target !== document) {
      if (target.classList.contains('text__hashtags')) {

        var textHashtags = document.querySelector('.text__hashtags');
        var tags = textHashtags.value.split(' ');
        var arrayTags = [];

        textHashtags.style = 'outline: 3px solid red';
        textHashtags.setCustomValidity('');

        for (var i = 0; i < tags.length; i++) {


          if (tags[i].indexOf('#') !== 0) {
            textHashtags.setCustomValidity('хэш-тег начинается с символа # (решётка)');
            return;
          }

          if (tags[i].length === 1 && tags[i].indexOf('#') === 0) {
            textHashtags.setCustomValidity('хеш-тег не может состоять только из одной решётки');
            return;
          }

          if (tags[i].includes('#', 1)) {
            textHashtags.setCustomValidity('хэш-теги разделяются пробелами');
            return;
          }

          if (tags.length > 5) {
            textHashtags.setCustomValidity('нельзя указать больше пяти хэш-тегов');
            return;
          }

          if (tags[i].length > 20) {
            textHashtags.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
            return;
          }

          if (arrayTags.includes(tags[i])) {
            textHashtags.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
            return;
          }

          textHashtags.style = 'outline: 3px solid green';
          arrayTags.push(tags[i]);
        }

      }
      target = target.parentNode;
    }
  };

  document.addEventListener('input', validate);

  var main = document.querySelector('main');
  var imgUploadForm = document.querySelector('.img-upload__form');

  var showMessage = function (type) {
    var template = document.querySelector('#' + type)
      .content.querySelector('.' + type);

    var message = template.cloneNode(true);

    var fragment = document.createDocumentFragment();
    fragment.appendChild(message);
    main.appendChild(fragment);
  };

  var onMessageEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeMessage(evt);
    }
  };

  var closeMessage = function (evt) {
    evt.stopPropagation();
    if (document.querySelector('.success')) {
      document.querySelector('.success').remove();
    } else {
      document.querySelector('.error').remove();
    }

    document.removeEventListener('click', onMessageEscPress);
  };

  var successFormHandler = function () {
    showMessage('success');
    var successBtn = document.querySelector('.success__button');
    successBtn.addEventListener('click', closeMessage);

    document.querySelector('.success').addEventListener('click', function (evt) {
      var target = evt.target;
      if (target.closest('.success__inner') !== null) {
        return;
      }
      document.querySelector('.success').remove();
      evt.stopPropagation();
    });

    document.addEventListener('keydown', onMessageEscPress);

  };

  var errorFormHandler = function () {
    showMessage('error');

    var errorBtns = document.querySelectorAll('.error__button');
    for (var i = 0; i < errorBtns.length; i++) {
      errorBtns[i].addEventListener('click', closeMessage);
      document.querySelector('.error').addEventListener('click', function (evt) {
        var target = evt.target;
        if (target.closest('.error__inner') !== null) {
          return;
        }
        document.querySelector('.error').remove();
        evt.stopPropagation();
      });

      document.addEventListener('keydown', onMessageEscPress);
    }

  };

  var onFormSubmit = function (evt) {

    var URL = 'https://js.dump.academy/kekstagram';

    window.load(URL, successFormHandler, errorFormHandler, 'POST', new FormData(imgUploadForm));
    evt.preventDefault();

    imgUploadForm.reset();
    closePopup();
  };


  imgUploadForm.addEventListener('submit', onFormSubmit);

})();
