const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '19184321-ac300e61d51c0cc0f6b691bfb';

export default class ImageApiService {
  constructor() {
    this.query = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${API_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        return hits;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
