// файл в котором будем рендерить все модули

import TripInfoView from "../view/trip-info.js";
import TripInfoCostView from "../view/trip-info-cost.js";
// import TripFilterView from "./view/trip-filter.js";
// import TripEventsSortView from "./view/trip-events-sort-view.js";
import TripEventEditFormView from "../view/trip-event-edit-form.js";
import TripEventsList from "../view/trip-events-list.js";
import TripEventItem from "../view/trip-event-item.js";

// import {getTripEventItem} from "../mock/mock-trip-event-item.js";
// import {getTripEventsSort} from "../mock/mock-trip-events-sort.js";

import {renderElement, RenderPosition, remove} from "../util/render";

// import TripMenuView from "./view/trip-menu.js";
//
import EventListEmptyMessageView from "../view/trip-event-msg.js";
import TripEventsSortView from "../view/trip-events-sort-view";
import {getTripEventsSort} from "../mock/mock-trip-events-sort";


// const tripEventElement = document.querySelector(`.trip-events`);
const tripMainElement = document.querySelector(`.trip-main`);
// 1. создаем шаблон призентера без реалзации функций, функции которые нужны берем из main.js. Пишем шаблон для
// всего предложения маршрута

export default class Trip {
  constructor(tripContainer) { // контеинер куда будет все рисоваться
    // инициализируем данные
    this._tripContainer = tripContainer;
    // Не понимаю зачем это this._... прописывать в конструкторе и дублировать если можно в рендере сразу указать
    // через new
    this._eventListEmptyMessageComponent = new EventListEmptyMessageView();
    this._tripEventsSortComponent = new TripEventsSortView(getTripEventsSort().sortItems);


    // // данные для рендера их на сайте
    // this._totalPriceItem = 0;
    // this._destinations = [];
    // this._startDateInfo = [];
    // this._tripInfoComponent = new TripInfoView(this._destinations, this._startDateInfo);

    this._itemPresenter = {}; // cюда будем записывать id наших точек маршрута

    // Не понимаю. Не смог вставить этот компонент цены т.к. выводило 0 пришлось через new
    // this._tripInfoCostComponent = new TripInfoCostView(this._totalPriceItem);
  }

  // все что нужно сделать для старта приложения
  init(tripItems) {

    this._tripItems = tripItems.slice(); // нужно скопировать чтобы напрямую не взамиодействовать с моками

    // создание вьюх которые нужны ИМЕННО для этогопризентера
    if (!this._tripItems.length) {
      this._renderEmptyMessage();
    }
    this._renderSort();
    this._renderEventList();
    // this._renderEventItems(this._tripItems);
    // this._renderDestination();
    // this._renderTotalCost();
  }

  // сортировка
  _renderSort() {
    renderElement(this._tripContainer, this._tripEventsSortComponent, RenderPosition.BEFOREEND); // рендер сортировки
  };

  _renderEventList() {
    renderElement(this._tripContainer, new TripEventsList(), RenderPosition.BEFOREEND);
  };

  // рендер, метод куда уйдет логика созданию и рендерингку компонетов задачи
  // текущая функция renderTask в main.js
  _renderEventItem() {

  }

  // рендер n задач за раз
  _renderEventItems(tripItems) {

    const tripEventsListElement = this._tripContainer.querySelector(`.trip-events__list`);

    for (let i = 0; i < this._tripItems.length; i++) {
      const tripEventItemComponent = new TripEventItem(tripItems[i]);
      const tripEventEditComponent = new TripEventEditFormView(tripItems[i]);

      // код который будет удалять компоненты
      const destroy = () => {
        remove(tripEventItemComponent);
        remove(tripEventEditComponent);
      };


      // функция которая заменяет item маршрута на форму редоктирования
      const replaceItemToForm = () => {
        // через replaceChild не сработал
        // Эта функция у тебя не работала, потому что .replaceChild() ты должен вызывать на контейнере в котором находятся элементы должны замениться, в твоем случае - это tripEventsListElement
        // tripEventsListElement.replaceChild(tripEventEditComponent, tripEventItemComponent.getElement());
        tripEventItemComponent.getElement().replaceWith(tripEventEditComponent.getElement());
      };

      // функция которая из формы редоктирования делает предложение Item
      const replaceFormToItem = () => {
        tripEventEditComponent.getElement().replaceWith(tripEventItemComponent.getElement());
      };

      // обраотчик сохранения формы
      const onFormSubmit = () => {
        tripEventEditComponent.setSubmitHandler(() => {
          replaceFormToItem(); // замена формы на точку маршрута
          document.removeEventListener(`submit`, onFormSubmit); // удаление обработчика
          // Можно обработчики не удалять т.к. элемент удален. Удаляются только на document и нов созданный элемент
          // document.removeEventListener(`keydown`, onEscKeyPress); // удаление обработчика, если нажали на ESC
          // document.removeEventListener(`click`, onEventRollupBtnClick); // удаление обработчика
        });
      };

      // при удаление элемента из DOM все обработчики, которые есть на нем - тоже удаляются
      // Единственное, что тебе нужно удалять - это обработчики, которые ты вешаешь на document
      // или другие DOM элементы, которые остаются после удаления компонента


      // обраотчик который закрывается без сохранения формы
      const onEscKeyPress = (evt) => {
        if (evt.key === `Escape` || evt.key === `Esc`) {
          evt.preventDefault();
          replaceFormToItem(); // замена формы на точку маршрута
          document.removeEventListener(`keydown`, onEscKeyPress); // удаление обработчика, если нажали на ESC
          document.removeEventListener(`submit`, onFormSubmit); // удаление обработчика
          // Можно не удалять т.к. элемент удален
          // document.removeEventListener(`click`, onEventRollupBtnClick); // удаление обработчика
        }
      };
      const onEventRollupBtnClick = (evt) => {
        evt.preventDefault();
        replaceFormToItem(); // замена формы на точку маршрута
        document.removeEventListener(`keydown`, onEscKeyPress); // удаление обработчика, если нажали на ESC
        document.removeEventListener(`submit`, onFormSubmit); // удаление обработчика
        document.removeEventListener(`click`, onEventRollupBtnClick); // удаление обработчика
      };

      renderElement(tripEventsListElement, tripEventItemComponent, RenderPosition.BEFOREEND); // рендер точек
      // маршрута

      // код который рендерит форму при клике на стрелку вниз в item
      tripEventItemComponent.setClickHandler(() => { // установили метод setClickHandler

        replaceItemToForm();
        // при удалении элемента из дом обработчик можно не удалять
        onFormSubmit(); // ЭТОТ ОБРАБОТЧИК ДОБАВЛЯЕТСЯ ВСЕГДА ПРИ КЛИКЕ НА СТРЕЛКУ, НО ЕСЛИ НАЖИМАТЬ НА ESC, ТО
        // ОН НЕ УДАЛЯЕТСЯ, А БУДЕТ ТОЛЬКО ДОБАВЛЯЕТСЯ т.е. при нажати на esc его надо удалять. Также и в обратную
        // сторону нужно удалять обработчик на ESC. ОТВЕТ: Удален элемент, то и обработчики не нужно удалять.
        document.addEventListener(`keydown`, onEscKeyPress); // после клика на стрелку вставил обработчик на ESC

        if (tripEventsListElement.querySelector(`form`)) {
          const eventRollupBtn = tripEventEditComponent.getElement().querySelector(`.event__rollup-btn`);
          eventRollupBtn.addEventListener(`click`, onEventRollupBtnClick); // вставил обработчика как для и ESC onEscKeyPress
        }
      });


      this._totalPriceItem += tripItems[i].price; // затраты на точки маршрута

      for (let item of tripItems[i].additionalOffers) { // обошел веь массив через of
        this._totalPriceItem += item.price; // дополнительные затраты
      }
      // this._destinations.push(tripItems[i].destinationItem); // закинул все города которые были в точке маршрута
      // this._startDateInfo.push(tripItems[i].dateStart);


      // tripEventItemComponent.getElement(); здесь надо чет другое вставить
      this._itemPresenter[tripItems[i].id] = tripEventItemComponent.getElement();

      // не понимаю что за Object, думаю код не работает, но оставлю
      const clearTaskList = () => {
        Object
          .values(this._itemPresenter)
          .forEach((presenter) => presenter.destroy());
        this._itemPresenter = {};
      };


      // добавил обработчик на звезду
      tripEventItemComponent.setBtnFavariteClickHandler(() => {
        const eventFavoriteBtn = tripEventItemComponent.getElement().querySelector(`.event__favorite-btn`);
        if (eventFavoriteBtn.classList.contains(`event__favorite-btn--active`)) {
          eventFavoriteBtn.classList.remove(`event__favorite-btn--active`);
        } else {
          eventFavoriteBtn.classList.add(`event__favorite-btn--active`);
        }
      })
    }


  };

  // функция которая выводить пустое сообщение если нет Item
  _renderEmptyMessage() {
    const main = document.querySelector(`main`);
    const pageBodyContainer = main.querySelector(`.page-body__container`);
    main.removeChild(pageBodyContainer); // в main удалили pageBodyContainer
    renderElement(main, this._eventListEmptyMessageComponent, RenderPosition.BEFOREEND); // вместо удаленнного
    // контейнеа проприсовали сообщение
  };

  // функция которая выводит дистанцию дат и точек маршрута
  // _renderDestination() {
  //   renderElement(tripMainElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN); // рендер промежкутка даты
  // };

// функция которая рендерит цену
//   _renderTotalCost() {
//     const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
//     renderElement(tripInfoElement, new TripInfoCostView(this._totalPriceItem), RenderPosition.BEFOREEND); // рендер цены
//   };

}
