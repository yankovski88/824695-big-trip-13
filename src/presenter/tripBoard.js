// отрисовать сорт т.к. если не будет event то и не надо сорт
// отрисовать message
// отрисовать List

// 1) импортируем все вьюхи которые понадобятся для отрисовки презентера Боард

import Sort from "./sort.js"
import EventListEmptyMessageView from "../view/trip-event-msg.js"
import TripEventsList from "../view/trip-events-list.js"
import {renderElement, RenderPosition} from "../util/render";
import {getTripEventsSort} from "../mock/mock-trip-events-sort.js";
import {updateItem} from "../util/common.js"; // функция на обновление данных

import Event from "./event.js"

export default class TripBoard {
  constructor(tripBoardContainer) { // вставляем контейнер в который будем вставлять все вьюхи
    this._tripBoardContainer = tripBoardContainer;

    this._eventListEmptyMessageComponent = new EventListEmptyMessageView();
    this._tripEventsListComponent = new TripEventsList();

    this._eventPresenter = {}; // это объект в котором будут хранится инстансы всех предложений презенторов

    this._handleEventChange = this._handleEventChange.bind(this); // функция по обновлению данных, после клика favorite
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

  // Нак клик Edit form вызвали _handleEventChange и там изменили this._tripItems моки и тут же перерисовали this._eventPresenter[updatedEvent.id]


  // здесь связь от предстовления к данным
  // обработчик который заменяет данные, клик на кнопку Edit
  // в этом обработчике изменили наши моки и тут же перерисовали наш компонентик
  // _handleEventChange метод который будет обновлять данные. выступает в роли той функции которая будет обновлять
  // данные
  // допустим обработали на кнопку Edite клик и вызвали обработчик _handleEventChange это обработчик изменения задач
  _handleEventChange(updatedEvent) {
    this._tripItems = updateItem(this._tripItems, updatedEvent); // тут же изменили моки
    this._eventPresenter[updatedEvent.id].init(updatedEvent); // после делает инициализацию т.е.ПЕРЕресовали компонентик
    // updatedEvent это конкретная задача которую нужно обновить
    // this._eventPresenter это весь список id: event который был добавлен при рендере Event
    // updatedEvent предпологаю объект который был изменен
    // updatedEvent[updatedEvent.id] получается должен получить по id обновленного объекта его event что добавляли ниже
    // вот такое например 1608250670855: Event {_eventContainer: ul.trip-events__list, _tripEventItemComponent: TripEventItemView, _tripEventEditComponent: TripEventEditFormView, _totalPriceItem: 0, _changeData: ƒ, …}
  // .init(updatedEvent) не понимаю что это такое ведь init должен принимать массив с объектами
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

  // метод по удалениею всех всех предложений
  _clearEventList() {
    Object // у глобального объекта
      .values(this._eventPresenter) // достали все значения из объекта, вернув их в виде массива
      .forEach((presenter) => presenter.destroy()); // удаляем все значения
    this._eventPresenter = {}; // перезаписываем объект чтобы убить все ссылки на event презентеры
    // здесь может не хватать сколько рендерить предложений
  }

  _renderList() {
    renderElement(this._tripBoardContainer, this._tripEventsListComponent, RenderPosition.BEFOREEND);
  }

  _renderItem(tripItem) { // создаем отдельный event
    // , this._handleEventChange
    // в Event передаем тот this._handleEventChange который описали в прошлом комите, теперь мы его передали в
    // каждый eventPresenter и теперь каждая вьюха event может вызвать _handleEventChange(который по сути является
    // изменением даты) и моковые данные начнут менятся
    const eventPresenter = new Event(this._tripEventsListComponent.getElement(), this._handleEventChange); // создаем новый компонет с
    // контейнером куда отрисовать предложение
    eventPresenter.init(tripItem);
    this._eventPresenter[tripItem.id] = eventPresenter; // в объект записываем id с сылкой на этот event презентер
  }

  _renderEventItems(tripItems) {
    tripItems.forEach((item) => {
      this._renderItem(item);
    });

  };


}
