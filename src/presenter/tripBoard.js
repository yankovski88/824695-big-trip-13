// отрисовать сорт т.к. если не будет event то и не надо сорт
// отрисовать message
// отрисовать List

// 1) импортируем все вьюхи которые понадобятся для отрисовки презентера Боард

import Sort from "./sort.js"
import EventListEmptyMessageView from "../view/trip-event-msg.js"
import TripEventsList from "../view/trip-events-list.js"
import {renderElement, RenderPosition} from "../util/render";
import {getTripEventsSort} from "../mock/mock-trip-events-sort.js";
import Event from "./event.js"

export default class TripBoard {
  constructor(tripBoardContainer) { // вставляем контейнер в который будем вставлять все вьюхи
    this._tripBoardContainer = tripBoardContainer;

    this._eventListEmptyMessageComponent = new EventListEmptyMessageView();
    this._tripEventsListComponent = new TripEventsList();
    // this._tripEventElement = document.querySelector(`.trip-events`);

  }

  init(tripItems) { // нет данных для вставки
    this._tripItems = tripItems.slice(); // нужно скопировать чтобы напрямую не взамиодействовать с моками
    // создание вьюх которые нужны ИМЕННО для этогопризентера
    if (!this._tripItems.length) {
      this._renderEmptyMessage();
    } else {
      this._renderSort();
      this._renderList();
      this._renderEventItems(this._tripItems);
    }
  }

  // функция которая выводить пустое сообщение если нет Item
  _renderEmptyMessage() {
    const main = document.querySelector(`main`);
    const pageBodyContainer = main.querySelector(`.page-body__container`);
    main.removeChild(pageBodyContainer); // в main удалили pageBodyContainer
    renderElement(main, this._eventListEmptyMessageComponent, RenderPosition.BEFOREEND); // вместо удаленнного
    // контейнеа проприсовали сообщение
  };

  _renderSort() {
    const sortPresenter = new Sort(this._tripBoardContainer);
    sortPresenter.init(getTripEventsSort().sortItems);
  }

  _renderList() {
    // const renderEventList = () => {
    renderElement(this._tripBoardContainer, this._tripEventsListComponent, RenderPosition.BEFOREEND);
    // };
  }

  _renderItem(tripItem) {
    const eventPresenter = new Event(this._tripEventsListComponent.getElement());
    eventPresenter.init(tripItem)
  }

  _renderEventItems(tripItems) {
    tripItems.forEach((item) => {
      this._renderItem(item);
    });
  };
}
