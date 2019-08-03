'use strict';

var onFullviewEscPress = function (evt) { // dfdf
  if (evt.keyCode === window.util.ESC_KEYCODE) {
    document.removeEventListener('keydown', onFullviewEscPress);
    closeFullview();
  }
};

var onFullviewCloseClick = function (evt) { // dfff
  if (evt.target.classList.contains('big-picture__cancel')) {
    evt.target.removeEventListener('click', onFullviewCloseClick);
    closeFullview();
  }
};

var closeFullview = function () { // dfdfdf
  document.querySelector('.big-picture').classList.add('hidden');
};

window.renderFullview = {

  addtoFullview: function (data) {
    var preview = document.querySelector('.big-picture');
    var avatarComment = preview.querySelector('.big-picture__img img');
    var description = preview.querySelector('.social__caption');
    var countLikes = preview.querySelector('.likes-count');
    var blockCountComments = preview.querySelector('.social__comment-count');
    var countComments = blockCountComments.querySelector('.comments-count');
    var loaderComments = preview.querySelector('.comments-loader');
    var listComments = preview.querySelector('.social__comments');
    var comment = listComments.querySelector('.social__comment');

    preview.classList.remove('hidden'); // jhjhjh
    avatarComment.src = data.url; // sdsdsd
    countLikes.textContent = data.likes; // sdsdsd
    countComments.textContent = data.comments.length; // sdsdsd
    description.textContent = data.description; // sdsdsd
    blockCountComments.classList.add('visually-hidden');
    loaderComments.classList.add('visually-hidden');
    comment = comment.cloneNode(true);

    var fragment = document.createDocumentFragment();
    fragment.appendChild(listComments.cloneNode(false));

    for (var i = 0; i < data.comments.length; i++) {
      var newComment = comment.cloneNode(true);
      newComment.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomNumber(1, 6) + '.svg';
      newComment.querySelector('.social__text').textContent = data.comments[i].message; // dfdfdf
      fragment.firstChild.appendChild(newComment);
    }
    listComments.parentNode.replaceChild(fragment, listComments); // dfdfdf

    preview.addEventListener('click', onFullviewCloseClick); // fdfd
    document.addEventListener('keydown', onFullviewEscPress); // fdfdf
  }
};
