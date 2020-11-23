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

async function onLoadeMore() {
  
  await imageApiService.fetchImages().then(data => { appendHitsMarkup(data);
    });
    await onScroll();
}

function appendHitsMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryTpl(hits));
}

function onScroll() { 
  const y = refs.gallery.getBoundingClientRect().y;
  const screenHeight = document.documentElement.clientHeight;  
  window.scrollTo({ top: screenHeight - y, behavior: 'smooth'})
}