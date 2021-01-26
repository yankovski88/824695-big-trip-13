import {MenuItem} from "../const.js"; // 6stat
import AbstractView from "./abstract.js";


// перекинули уникальное value чтобы потом на основании его редактировать
const createTripMenu = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">

    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" value="${MenuItem.POINTS}">Table</a>
    <a class="trip-tabs__btn" href="#" value="${MenuItem.STATISTICS}">Stats</a>
    </nav>`;
};


export default class TripMenuView extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
    this._menuLinks = this.getElement().querySelectorAll(`a`);

  }

  // функция которая будет возвращать разметку
  getTemplate() {
    return createTripMenu();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._menuLinks.forEach((item)=>{
      item.classList.remove(`trip-tabs__btn--active`);
    });

    if (!(evt.target.classList.contains(`trip-tabs__btn--active`))) {
      evt.target.classList.add(`trip-tabs__btn--active`);
    }
    this._callback.menuClick(evt.target.attributes.value.value); // по чем кликнули цель бедем помещать в колбек который будет в main
  }

  // - Добавим подписку для обработчика перехода
  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this._menuLinks.forEach((item)=>{
      item.addEventListener(`click`, this._menuClickHandler);
    });
  }
}
