import NewApiService from './apiService';
import refs from './refs';
import galleryTpl from '../templates/gallery.hbs';

const newApiService = new NewApiService();

refs.searchContainer.addEventListener('submit', onSearch)

function onSearch(event) {
  event.preventDefault();
console.log(event.currentTarget.firstElementChild.elements.query.value);
  newApiService.query = event.currentTarget.firstElementChild.elements.query.value;

  if (newApiService.query === '') {
    return alert('Введи что-то нормальное');
}
newApiService.fetchImages().then(r => {
  refs.searchContainer.insertAdjacentHTML('afterend', galleryTpl(r));
});
}


