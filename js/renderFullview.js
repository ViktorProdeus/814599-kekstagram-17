'use strict';

var onFullviewEscPress = function (evt) {
  if (evt.keyCode === window.util.ESC_KEYCODE) {
    document.removeEventListener('keydown', onFullviewEscPress);
    closeFullview();
  }
};

var onFullviewCloseClick = function (evt) {
  if (evt.target.classList.contains('big-picture__cancel')) {
    evt.target.removeEventListener('click', onFullviewCloseClick);
    closeFullview();
  }
};

var closeFullview = function () {
  var clearValue = document.querySelector('.social__footer-text');
  document.querySelector('.big-picture').classList.add('hidden');
  clearValue.value = '';
};

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

    blockFullView.classList.remove('hidden');
    fullPhoto.src = data.url;
    countLikes.textContent = data.likes;
    countComments.textContent = data.comments.length;
    description.textContent = data.description;
    blockCountComments.classList.add('visually-hidden');
    loaderComments.classList.add('visually-hidden');
    comment = comment.cloneNode(true);

    var fragment = document.createDocumentFragment();
    fragment.appendChild(listComments.cloneNode(false));

    for (var i = 0; i < data.comments.length; i++) {
      var newComment = comment.cloneNode(true);
      newComment.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg';
      newComment.querySelector('.social__text').textContent = data.comments[i].message;
      fragment.firstChild.appendChild(newComment);
    }
    listComments.parentNode.replaceChild(fragment, listComments);

    blockFullView.addEventListener('click', onFullviewCloseClick);
    document.addEventListener('keydown', onFullviewEscPress);
  }
};
