import Sort from "./sort.js";
import EventListEmptyMessageView from "../view/trip-event-msg.js";
import TripEventsList from "../view/trip-events-list.js";
import {renderElement, RenderPosition} from "../util/render";
import {getTripEventsSort} from "../mock/mock-trip-events-sort.js";
import {updateItem} from "../util/common.js"; // функция на обновление данных

import Event from "./event.js";

export default class TripBoard {
  constructor(tripBoardContainer) {
    this._tripBoardContainer = tripBoardContainer;
    this._eventListEmptyMessageComponent = new EventListEmptyMessageView();
    this._tripEventsListComponent = new TripEventsList();

    this._eventPresenter = {}; // это объект в котором будут хранится инстансы всех предложений презенторов

    this._handleEventChange = this._handleEventChange.bind(this); // функция по обновлению данных, после клика favorite
    this._handleModeChange = this._handleModeChange.bind(this); // 1 наблюдатель
  }

  init(tripItems) {
    this._tripItems = tripItems.slice();
    if (!this._tripItems.length) {
      this._renderEmptyMessage();
    } else {
      this._renderSort();
      this._renderList();
      this._renderEventItems(this._tripItems);
    }
  }

  // функция если форма открыта, то закрыть, воспитатель
  _handleModeChange() { // 2 наблюдатель
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => {
        presenter.resetView(); // сбрось вью до начальной предложения (карточки)
      });
  }


  // Нак клик Edit form вызвали _handleEventChange и там изменили this._tripItems моки и тут же перерисовали this._eventPresenter[updatedEvent.id]


  // обработчик который заменяет данные, клик на кнопку Edit
  _handleEventChange(updatedEvent) {
    this._tripItems = updateItem(this._tripItems, updatedEvent); // изменили моки
    this._eventPresenter[updatedEvent.id].init(updatedEvent); // после делает инициализацию т.е.ПЕРЕресовали компонентик
    // updatedEvent это конкретная задача которую нужно обновить
    // this._eventPresenter это весь список id: event который был добавлен при рендере Event
    // updatedEvent[updatedEvent.id] это 1608250670855: Event {…}
  // .init(updatedEvent) не понимаю что это такое ведь init должен принимать массив с объектами
  }


  // функция которая выводить пустое сообщение если нет Item
  _renderEmptyMessage() {
    const main = document.querySelector(`main`);
    const pageBodyContainer = main.querySelector(`.page-body__container`);
    main.removeChild(pageBodyContainer);
    renderElement(main, this._eventListEmptyMessageComponent, RenderPosition.BEFOREEND); // вместо удаленнного
    // контейнера проприсовали сообщение
  }

  _renderSort() {
    const sortPresenter = new Sort(this._tripBoardContainer);
    sortPresenter.init(getTripEventsSort().sortItems);
  }

  // метод по удалениею всех всех предложений
  _clearEventList() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy()); // удаляем все значения
    this._eventPresenter = {}; // перезаписываем объект чтобы убить все ссылки на event презентеры
  }

  _renderList() {
    renderElement(this._tripBoardContainer, this._tripEventsListComponent, RenderPosition.BEFOREEND);
  }

  _renderItem(tripItem) {
    const eventPresenter = new Event(this._tripEventsListComponent.getElement(), this._handleEventChange, this._handleModeChange);
    // 3 наблюдатель
    eventPresenter.init(tripItem);
    this._eventPresenter[tripItem.id] = eventPresenter; // в объект записываем id с сылкой на этот event презентер
  }

  _renderEventItems(tripItems) {
    tripItems.forEach((item) => {
      this._renderItem(item);
    });

  }
}
