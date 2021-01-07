import dayjs from "dayjs";
import EventListEmptyMessageView from "../view/trip-event-msg.js";
import TripEventsList from "../view/trip-events-list.js";
import {renderElement, RenderPosition} from "../util/render";
import {updateItem} from "../util/common.js"; // функция на обновление данных

import Event from "./event.js";
import TripEventsSortView from "../view/trip-events-sort-view";

import {SortType} from "../const";

export default class TripBoard {
  constructor(tripBoardContainer, pointsModel) {
    this._pointsModel = pointsModel; // 6 создали свойство класса, чтобы в дальнейшем переиспользовать
    this._tripBoardContainer = tripBoardContainer;
    this._eventListEmptyMessageComponent = new EventListEmptyMessageView();
    this._tripEventsListComponent = new TripEventsList();
    this._tripEventsSortComponent = new TripEventsSortView();


    this._eventPresenter = {}; // это объект в котором будут хранится инстансы всех предложений презенторов
    // инстансы это экземляр твоего класса

    this._currentSortType = SortType.DAY; // сортировка по умолчанию

    this._handleEventChange = this._handleEventChange.bind(this); // функция по обновлению данных, после клика favorite
    this._handleModeChange = this._handleModeChange.bind(this); // 1 наблюдатель

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripItems) {
    this._tripItems = tripItems.slice(); // храним отсоортированные задачи
    this._sortTripItems(this._currentSortType); // отсортировал список по умолчанию по дням

    this._sourcedTripItems = tripItems.slice(); // храним исходные задачи

    if (!this._tripItems.length) {
      this._renderEmptyMessage();
    } else {
      this._renderSort();
      this._renderList();
      this._renderEventItems(this._tripItems);
    }
  }

  _getPoints(){
    return this._pointsModel.getPoints(); // 7 реализуем получение данных точки маршрута для модели. Говорим модель дай все дайнные которые у тебя есть.
  }

  // метод если форма открыта, то закрыть, воспитатель
  _handleModeChange() { // 2 наблюдатель
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => {
        presenter.resetView(); // сбрось вью до начальной предложения (карточки)
      });
  }

  // метод который заменяет данные, клик на кнопку Edit
  _handleEventChange(updatedEvent) {
    this._tripItems = updateItem(this._tripItems, updatedEvent); // 1)часть изменили моки
    this._eventPresenter[updatedEvent.id].init(updatedEvent); // 2)часть Обновляем, вместо init можно было создать свою
    // отдельную функцию типа update, нушли в конкретный прзентер и именно его перересовали там же и init взяли
    // updatedEvent это задача в которой изменили favorite
    // this._eventPresenter это весь список id: event который был добавлен при рендере Event
    // this._eventPresenter[updatedEvent.id] это 1608250670855: Event {…}
    // init этот с renderItem
    // .init(updatedEvent) презентер с id в котором были изменения перерисовывается

  }

  // функция которая выводить пустое сообщение если нет Item
  _renderEmptyMessage() {
    const main = document.querySelector(`main`);
    const pageBodyContainer = main.querySelector(`.page-body__container`);
    main.removeChild(pageBodyContainer);
    renderElement(main, this._eventListEmptyMessageComponent, RenderPosition.BEFOREEND); // вместо удаленнного
    // контейнера проприсовали сообщение
  }

  _sortTripItems(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this._tripItems.sort((a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom)));
        break;
      case SortType.PRICE:
        this._tripItems.sort((a, b) => b.basePrice - a.basePrice);
        break;
      case SortType.TIME:
        this._tripItems.sort((a, b) => {
          const timeDurationFirst = a.dateTo - a.dateFrom; // итерируемся по каждому значению разницы времени
          const timeDurationSecond = b.dateTo - b.dateFrom; // также и для вторго времени

          return timeDurationSecond - timeDurationFirst; // возвращаем отсортированный массив от Max
        }
        );
        break;
    }
    this._currentSortType = sortType;
  }

  // метод который сортирует, удаляет старые item и рендерит новые отсортированные item
  _handleSortTypeChange(sortType) { // получаем сигнал из вьюхи что был клик и теперь надо обработать его
    this._sortTripItems(sortType); // использовали функции сортировки
    this._clearEventList(); // очищаем список
    this._renderEventItems(this._tripItems); // рендерим список заново
  }

  _renderSort() {
    renderElement(this._tripBoardContainer, this._tripEventsSortComponent, RenderPosition.BEFOREEND);
    this._tripEventsSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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
