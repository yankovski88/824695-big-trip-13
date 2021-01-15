import Observer from "../util/observer.js";
import {FilterType} from "../const.js";

// Задача модели - хранить выбранный фильтр и уведомлять наблюдателей, если таковой изменится.
export default class FilterModel extends Observer { // 47
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING; // храним только выбранный фильтр
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter; // вместе с уведомлением будет пресылаться тот активный флиьтр
    this._notify(updateType, filter); // через _notify вызовится колбек в tripBoard и перерисуется страница
  }

  getFilter() {
    return this._activeFilter;
  }
}
