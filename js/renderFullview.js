'use strict';

(function () {

  window.renderFullview = {

    addtoFullview: function (data) {
      var blockFullView = document.querySelector('.big-picture');
      var fullPhoto = blockFullView.querySelector('.big-picture__img img');
      var description = blockFullView.querySelector('.social__caption');
      var countLikes = blockFullView.querySelector('.likes-count');
      var blockCountComments = blockFullView.querySelector('.social__comment-count');
      var countComments = blockCountComments.querySelector('.comments-count');
      var loaderComments = blockFullView.querySelector('.comments-loader');
      var listComments = blockFullView.querySelector('.social__comments');
      var comment = listComments.querySelector('.social__comment');

      var onPopupEscPress = function (evt) {
        if (evt.keyCode === window.util.ESC_KEYCODE) {
          document.removeEventListener('keydown', onPopupEscPress);
          closePopup();
        }
      };


      var onPopupCloseClick = function (evt) {
        if (evt.target.classList.contains('big-picture__cancel')) {
          evt.target.removeEventListener('click', onPopupCloseClick);
          closePopup();
        }
      };


      var closePopup = function () {
        var clearValue = document.querySelector('.social__footer-text');
        document.querySelector('.big-picture').classList.add('hidden');
        clearValue.value = '';
        document.querySelector('.social__comments-loader').removeEventListener('click', loadComments);
      };

      blockFullView.classList.remove('hidden');

      blockFullView.querySelector('#picture-cancel').addEventListener('click', onPopupCloseClick);
      document.addEventListener('keydown', onPopupEscPress);

      fullPhoto.src = data.url;
      countLikes.textContent = data.likes;
      countComments.textContent = data.comments.length;
      description.textContent = data.description;
      blockCountComments.classList.add('visually-hidden');
      loaderComments.classList.add('visually-hidden');
      var newComment = comment.cloneNode(true);

      var fragment = document.createDocumentFragment();
      fragment.appendChild(listComments.cloneNode(false));

      if (data.comments.length > 5) {
        loaderComments.classList.remove('visually-hidden');
      } else {
        loaderComments.classList.add('visually-hidden');
      }

      var len = data.comments.length > 5 ? 5 : data.comments.length;


      for (var i = 0; i < len; i++) {
        var newSocialComment = newComment.cloneNode(true);
        newSocialComment.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg';
        newSocialComment.querySelector('.social__text').textContent = data.comments[i].message;
        fragment.firstChild.appendChild(newSocialComment);
      }

      listComments.parentNode.replaceChild(fragment, listComments);

      var loadComments = function () {
        var currentLen = document.querySelectorAll('.social__comment').length;
        len = currentLen + 5;
        if (currentLen + 5 >= data.comments.length) {
          blockFullView.querySelector('.comments-loader').classList.add('visually-hidden');
          len = data.comments.length;
        }

        fragment = document.createDocumentFragment();
        for (i = currentLen; i < len; ++i) {
          newSocialComment = newComment.cloneNode(true);
          newSocialComment.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg';
          newSocialComment.querySelector('.social__text').textContent = data.comments[i].message;
          fragment.appendChild(newSocialComment);
        }

        blockFullView.querySelector('.social__comments').appendChild(fragment);
      };

      document.querySelector('.social__comments-loader').addEventListener('click', loadComments);

      blockFullView.addEventListener('click', onPopupCloseClick);

      document.addEventListener('keydown', onPopupEscPress);
    }
  };

})();
