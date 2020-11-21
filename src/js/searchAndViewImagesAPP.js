import ImageApiService from './apiService';
import refs from './refs';
import galleryTpl from '../templates/gallery.hbs';

const imageApiService = new ImageApiService();

refs.searchContainer.addEventListener('submit', onSearch)

refs.loadeMoreBtn.addEventListener('click', onLoadeMore)

function onSearch(event) {
  event.preventDefault();
console.log(event.currentTarget.firstElementChild.elements.query.value);
imageApiService.query = event.currentTarget.firstElementChild.elements.query.value;

  if (imageApiService.query === '') {
    return alert('Введи что-то нормальное');
}
imageApiService.fetchImages().then(appendHitsMarkup);
}

function onLoadeMore () {
  imageApiService.fetchImages().then(appendHitsMarkup);
}

function appendHitsMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryTpl(hits));
}
