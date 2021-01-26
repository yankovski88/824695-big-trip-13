import AbstractView from "./abstract";
import {SortType} from "../const.js";

const createTripEventsSort = (currentSortType) => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get" >
            <div class="trip-sort__item  trip-sort__item--day">
              <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" data-sort-type="${SortType.DAY}" checked ${currentSortType === SortType.DAY ? `checked` : ``}>
              <label class="trip-sort__btn" for="sort-day">Day</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--event">
              <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>
              <label class="trip-sort__btn" for="sort-event">Event</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--time" >
              <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time" data-sort-type="${SortType.TIME}" ${currentSortType === SortType.TIME ? `checked` : ``}>
              <label class="trip-sort__btn" for="sort-time">Time</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--price">
              <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" data-sort-type="${SortType.PRICE}" ${currentSortType === SortType.PRICE ? `checked` : ``}>
              <label class="trip-sort__btn" for="sort-price">Price</label>
            </div>

            <div class="trip-sort__item  trip-sort__item--offer">
              <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>
              <label class="trip-sort__btn" for="sort-offer">Offers</label>
            </div>
          </form>
`;
};


export default class TripEventsSortView extends AbstractView {
  constructor(currentSortType) {
    super();
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this); // 7 bind колбека
  }

  getTemplate() {
    return createTripEventsSort(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) { // создаем колбек по вызову сохраненного колбека
    evt.preventDefault();
    // это обработчик отрисовки новый сортировки
    this._callback.sortTypeChange(evt.path[0].dataset.sortType); // если цель тег  A то  .SortType
    // читаем дата сет атрибута evt.path[0].dataset.sortType по которому был клик
    // sortType это название которое идет сразу после data- Например data-sort-type
    // и вызваем сохраненный колбек
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback; // запись колбека из prezenter tripBoard
    this.getElement().addEventListener(`change`, this._sortTypeChangeHandler);
    // this.getElement() этот елемент, 2 находим элемент для подписки
    // .addEventListener(`click`, 3 подписываемся на событие
    // this._sortTypeChangeHandler) вызываем колбек
  }
}
