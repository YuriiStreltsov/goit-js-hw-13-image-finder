import refs from './refs';
import searchFormTpl from '../templates/searchForm.hbs';

console.log(searchFormTpl());

export default function renderSearchForm() {
  refs.header.insertAdjacentHTML('afterbegin', searchFormTpl());
}
