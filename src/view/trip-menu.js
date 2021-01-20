import {MenuItem} from "../const.js"; // 6stat
import AbstractView from "./abstract.js";


// 7 stat перекинули уникальное value чтобы потом на основании его редактировать
const createTripMenu = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">

    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" value="${MenuItem.POINTS}">Table</a>
    <a class="trip-tabs__btn" href="#" value="${MenuItem.STATISTICS}">Stats</a>
    </nav>`;
};


// 8 stat
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
      // this._callback.menuClick(evt.target.attributes.value.value); // по чем кликнули цель бедем помещать в колбек который будет в main
    }
    this._callback.menuClick(evt.target.attributes.value.value); // по чем кликнули цель бедем помещать в колбек который будет в main
  }

  // - Добавим подписку для обработчика перехода
  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    // this.getElement().addEventListener(`change`, this._menuClickHandler); // почему не работает change
    this._menuLinks.forEach((item)=>{
      item.addEventListener(`click`, this._menuClickHandler);
    });
  }

  // можно позже удалить код
  // - Научим представление меню учитывать выбранный пункт
  // метод в который передаем параметр значения меню value
  setMenuItem(menuItem) {

    const item = this.getElement().querySelector(`[value=${menuItem}]`);
    // item это найти в элементе меню атрибут value со значением menuItem

    if (item !== null) { // если item не равно нулю, то атрибут найден
      item.checked = true; // и этому элементу добавляем свойство checked = true, но в разметке чет оно не появляется
    }

  }
}
