import NewApiService from './apiService';
import refs from './refs';
import galleryTpl from '../templates/gallery.hbs';

const newApiService = new NewApiService();

newApiService.fetchImages().then(r => {
  refs.searchContainer.insertAdjacentHTML('afterend', galleryTpl(r));
});
