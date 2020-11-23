import ImageApiService from './apiService';
import refs from './refs';
import galleryTpl from '../templates/gallery.hbs';
import LoadMoreBtn from './loadMoreBtn';

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const imageApiService = new ImageApiService();

refs.searchContainer.addEventListener('submit', onSearch);

loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();

  imageApiService.query =
    event.currentTarget.firstElementChild.elements.query.value;

  if (imageApiService.query.length < 3) {
    return alert('Enter at least 3 characters');
  }
  loadMoreBtn.show();
  imageApiService.resetPage();
  clearHitsContainer();
  fetchImages();
}

async function onLoadMore() {
  await fetchImages().then(onScroll);
}

async function fetchImages() {
  loadMoreBtn.disable();
  await imageApiService.fetchImages().then(appendHitsMarkup);
  loadMoreBtn.enable();
}

function appendHitsMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryTpl(hits));
}

function onScroll() {
  console.log(refs.gallery.getBoundingClientRect());
  const y = refs.gallery.getBoundingClientRect().y;
  const screenHeight = document.documentElement.clientHeight;
  window.scrollTo({ top: screenHeight - y, behavior: 'smooth' });
}

function clearHitsContainer() {
  refs.gallery.innerHTML = '';
}
