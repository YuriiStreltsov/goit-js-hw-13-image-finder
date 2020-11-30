import ImageApiService from './apiService';
import refs from './refs';
import galleryTpl from '../templates/gallery.hbs';
import LoadMoreBtn from './loadMoreBtn';
import * as basicLightbox from 'basiclightbox';

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const imageApiService = new ImageApiService();

refs.searchContainer.addEventListener('submit', onSearch);

loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();

  imageApiService.query = event.currentTarget.firstElementChild.elements.query.value.trim();

  if (imageApiService.query.length === 0) {
    return;
  }
  loadMoreBtn.show();
  imageApiService.resetPage();
  clearHitsContainer();
  fetchImages();
}

async function onLoadMore() {
  const scroll = document.documentElement.scrollHeight;
  await fetchImages();
  onScroll(scroll);
}

async function fetchImages() {
  loadMoreBtn.disable();
  await imageApiService.fetchImages().then(data => {
    appendHitsMarkup(data);
    if (data.length >= 12) {
      return;
    }
    loadMoreBtn.hide();
  });
  loadMoreBtn.enable();
}

function appendHitsMarkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', galleryTpl(hits));
}

function onScroll(scroll) {
  window.scrollTo({ top: scroll - 40, behavior: 'smooth' });
}

function clearHitsContainer() {
  refs.gallery.innerHTML = '';
}

refs.gallery.addEventListener('click', openLightBox);

function openLightBox(event) {
  const targetItem = event.target;
  const IsElemGallery = targetItem.closest('img');
  if (!IsElemGallery) {
    return;
  }
  const set = { src: event.target.dataset.src, alt: event.target.alt };
  openImage(set);
}
function openImage({ src, alt }) {
  const instance = basicLightbox.create(`
  <div class="full-image-container">
  <img src="${src}" alt="${alt}" width="800" />
  
  </div>
`);
  instance.show();
}
