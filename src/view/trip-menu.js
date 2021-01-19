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
  }

  // функция которая будет возвращать разметку
  getTemplate() {
    return createTripMenu();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.attributes.value.value); // по чем кликнули цель бедем помещать в колбек который будет в main
    console.log(evt.target.attributes.value.value);
  }

// - Добавим подписку для обработчика перехода
  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
    // const menuLinks = this.getElement().querySelectorAll(`a`) ;
    // menuLinks.forEach((item)=>{
    //   console.log(item.attributes.value.value);
    //   item.addEventListener(`click`, this._menuClickHandler)
    // });
  }

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
