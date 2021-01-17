import AbstractView from "./abstract.js";
import {MenuItem} from "../const.js"; // 6stat

// 7 stat
const createTripMenu = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" value="${MenuItem.POINTS}">Table</a>
    <a class="trip-tabs__btn" href="#" value="${MenuItem.STATISTICS}">Stats</a>
    </nav>`;
};


// export default class TripMenuView extends AbstractView {
//
//   // функция которая будет возвращать разметку
//   getTemplate() {
//     return createTripMenu();
//   }
// }

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
    this._callback.menuClick(evt.target.value);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`change`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {

    const item = this.getElement().querySelector(`[value=${menuItem}]`);

    if (item !== null) {
      item.checked = true;
    }

  }
}
