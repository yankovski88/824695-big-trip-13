import TripInfoView from "./view/trip-info.js";
import TripInfoCostView from "./view/trip-info-cost.js";
import TripFilterView from "./view/trip-filter.js";
import TripEventsSortView from "./view/trip-events-sort-view.js";
import TripEventEditFormView from "./view/trip-event-edit-form.js";
import TripEventsList from "./view/trip-events-list.js";
import TripEventItem from "./view/trip-event-item.js";

import {getTripEventItem} from "./mock/mock-trip-event-item.js";
import {getTripEventsSort} from "./mock/mock-trip-events-sort.js";

import {getRandomInteger, renderElement, RenderPosition} from "./mock/util";

import TripMenuView from "./view/trip-menu.js";

import EventListEmptyMessageView from "./view/trip-event-msg.js";

const DATA_COUNT = 15;
// файл в котором будем рендерить все модули

const tripItems = new Array(DATA_COUNT).fill().map(getTripEventItem);
// Array создаем массив
// DATA_COUNT колличество эллементов в массиве, все они пустые и нужно их заполнить
// fill() метод заполняет эти элементы массива, теперь внутри там underfine
// map(tripEventItem) заполняет эти массивы методом map();

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);

const renderMenu = () => {
  const visuallyHiddenFirstH2Element = tripControlsElement.querySelector(`.visually-hidden`);
  renderElement(visuallyHiddenFirstH2Element, new TripMenuView().getElement(), RenderPosition.AFTEREND); // рендер меню
};

const renderFilter = () => {
  renderElement(tripControlsElement, new TripFilterView().getElement(), RenderPosition.BEFOREEND); // рендер фильтр хедер
};

const tripEventElement = document.querySelector(`.trip-events`);
const renderSort = () => {
  const tripEventsSortComponent = new TripEventsSortView(getTripEventsSort().sortItems);

  renderElement(tripEventElement, tripEventsSortComponent.getElement(), RenderPosition.BEFOREEND); // рендер сортировки
};

const renderEventList = () => {
  renderElement(tripEventElement, new TripEventsList().getElement(), RenderPosition.BEFOREEND);
};

const renderEventItemDestinationCost = () => {
  const tripEventsListElement = tripEventElement.querySelector(`.trip-events__list`);
  let totalPriceItem = 0;
  let destinations = [];
  let startDateInfo = [];
  for (let i = 0; i < DATA_COUNT; i++) {
    const tripEventItemComponent = new TripEventItem(tripItems[i]);
    const TripEventEditComponent = new TripEventEditFormView(tripItems[getRandomInteger(0, tripItems.length - 1)]).getElement();


    // функция которая заменяет item маршрута на форму редоктирования
    const replaceItemToForm = () => {
      // через replaceChild не сработал
      // tripEventItemComponent.getElement().firstChild.replaceChild(TripEventEditComponent, tripEventItemComponent.getElement());
      // Эта функция у тебя не работала, потому что .replaceChild() ты должен вызывать на контейнере в котором находятся элементы должны замениться, в твоем случае - это tripEventsListElement
      tripEventsListElement.replaceChild(TripEventEditComponent, tripEventItemComponent.getElement());
    };

    const replaceFormToItem = () => {
      TripEventEditComponent.replaceWith(tripEventItemComponent.getElement());
    };

    // обраотчик сохранения формы
    const onFormSubmit = () => {
      const eventSaveBtn = TripEventEditComponent.querySelector(`form`);
      eventSaveBtn.addEventListener(`submit`, (evt) => {
        evt.preventDefault();
        replaceFormToItem(); // замена формы на точку маршрута
        document.removeEventListener(`submit`, onFormSubmit); // удаление обработчика
        // document.removeEventListener(`keydown`, onEscKeyPress); // удаление обработчика, если нажали на ESC
        // document.removeEventListener(`click`, onEventRollupBtnClick); // удаление обработчика
      });
    };

    // обраотчик который закрывается без сохранения формы
    const onEscKeyPress = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToItem(); // замена формы на точку маршрута
        document.removeEventListener(`keydown`, onEscKeyPress); // удаление обработчика, если нажали на ESC
        document.removeEventListener(`submit`, onFormSubmit); // удаление обработчика
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

    renderElement(tripEventsListElement, tripEventItemComponent.getElement(), RenderPosition.BEFOREEND); // рендер точек
    // маршрута

    const buttonEventItem = tripEventItemComponent.getElement().querySelector(`.event__rollup-btn`);
    // код который рендерит форму при клике на стрелку вниз в item
    buttonEventItem.addEventListener(`click`, () => {

      replaceItemToForm();
      onFormSubmit(); // ЭТОТ ОБРАБОТЧИК ДОБАВЛЯЕТСЯ ВСЕГДА ПРИ КЛИКЕ НА СТРЕЛКУ, НО ЕСЛИ НАЖИМАТЬ НА ESC, ТО
      // ОН НЕ УДАЛЯЕТСЯ, А БУДЕТ ТОЛЬКО ДОБАВЛЯЕТСЯ т.е. при нажати на esc его надо удалять. Также и в обратную
      // сторону нужно удалять обработчик на ESC
      document.addEventListener(`keydown`, onEscKeyPress); // после клика на стрелку вставил обработчик на ESC

      if (tripEventsListElement.querySelector(`form`)) {
        const eventRollupBtn = TripEventEditComponent.querySelector(`.event__rollup-btn`);
        eventRollupBtn.addEventListener(`click`, onEventRollupBtnClick); // вставил обработчика как для и ESC onEscKeyPress
      }
    });


    totalPriceItem += tripItems[i].price; // затраты на точки маршрута

    for (let item of tripItems[i].additionalOffers) { // обошел веь массив через of
      totalPriceItem += item.price; // дополнительные затраты
    }
    destinations.push(tripItems[i].destinationItem); // закинул все города которые были в точке маршрута
    startDateInfo.push(tripItems[i].dateStart);
  }


  renderElement(tripMainElement, new TripInfoView(destinations, startDateInfo).getElement(), RenderPosition.AFTERBEGIN); // рендер промежкутка даты

  const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
  renderElement(tripInfoElement, new TripInfoCostView(totalPriceItem).getElement(), RenderPosition.BEFOREEND); // рендер цены
};

renderMenu();
renderFilter();
renderSort();
renderEventList();
if (DATA_COUNT > 0) {
  renderEventItemDestinationCost();
} else {
  const main = document.querySelector(`main`);
  const pageBodyContainer = main.querySelector(`.page-body__container`);
  main.removeChild(pageBodyContainer);
  renderElement(main, new EventListEmptyMessageView().getElement(), RenderPosition.BEFOREEND);
}
