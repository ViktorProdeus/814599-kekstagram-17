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

    renderPicturePreview: function (data) {
      document.querySelector('.big-picture__img img').src = data[0].url;
      document.querySelector('.likes-count').textContent = data[0].likes;
      document.querySelector('.comments-count').textContent = data[0].comments.length;
      document.querySelector('.social__caption').textContent = data[0].description;
      document.querySelector('.social__comment-count').classList.add('visually-hidden');
      document.querySelector('.comments-loader').classList.add('visually-hidden');
      var socialComment = document.querySelector('.social__comment').cloneNode(true);
      var socialComments = document.querySelector('.social__comments');
      while (socialComments.firstChild) {
        socialComments.removeChild(socialComments.firstChild);
      }
      for (var i = 0; i < data[0].comments.length; i++) {
        var newSocialComment = socialComment.cloneNode(true);
        newSocialComment.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg';
        newSocialComment.querySelector('.social__text').textContent = data[0].comments[i].message;
        socialComments.appendChild(newSocialComment);
      }
    },

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
