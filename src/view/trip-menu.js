import {createElement} from "../mock/util";

const createTripMenu = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
    <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`;
};


export default class TripMenuView {
  constructor() {
    this._element = null; // по умолчанию сделал елемент пустым
  }

  // функция которая будет возвращать разметку
  getTemplate() {
    return createTripMenu();
  }

  getElement() {
    if (!this._element) { // если нет элемента, а его нет! т.к. изначально прописал
      this._element = createElement(this.getTemplate()); // то создаем элемент нашего шаблона
      // НЕ понимаю зачем создовать createElement
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

