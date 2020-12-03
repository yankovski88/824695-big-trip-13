// import {createTripInfo} from "./view/trip-info.js";
import TripInfoView from "./view/trip-info.js";

// import {createTripInfoCost} from "./view/trip-info-cost.js";
import TripInfoCostView from "./view/trip-info-cost.js";

// import {createTripMenu} from "./view/trip-menu.js";
// import {createTripFilter} from "./view/trip-filter.js";
import TripFilterView from "./view/trip-filter.js";

import TripEventsSortView from "./view/trip-events-sort-view.js";
// import {createTripEventEditForm} from "./view/trip-event-edit-form.js";
import TripEventEditFormView from "./view/trip-event-edit-form.js";
import FieldTimeView from "./view/field-time-view.js";


import TripEventsList from "./view/trip-events-list.js";
// import {createTripEventItem} from "./view/trip-event-item.js";
import TripEventItem from "./view/trip-event-item.js";

import {getTripEventItem} from "./mock/mock-trip-event-item.js";
import {getTripEventsSort} from "./mock/mock-trip-events-sort.js";
import TripSortItemView from "./view/trip-sort-item.js";

import {getRandomInteger} from "./mock/util";
import {renderTemplate, renderElement, RenderPosition} from "./mock/util";

import TripMenuView from "./view/trip-menu.js";

const POINT_COUNT = 3;
const DATA_COUNT = 15;
// файл в котором будем рендерить все модули

const tripItems = new Array(DATA_COUNT).fill().map(getTripEventItem);
// Array создаем массив
// DATA_COUNT колличество эллементов в массиве, все они пустые и нужно их заполнить
// fill() метод заполняет эти элементы массива, теперь внутри там underfine
// map(tripEventItem) заполняет эти массивы методом map();

const tripEventsSort = new Array(1).fill().map(getTripEventsSort); // создал один массив с одним объектом для
// сортировки


const tripMainElement = document.querySelector(`.trip-main`);

const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const visuallyHiddenElement = tripControlsElement.querySelector(`.visually-hidden`);
// renderTemplate(visuallyHiddenElement, createTripMenu(), `afterEnd`); // рендер меню
renderElement(visuallyHiddenElement, new TripMenuView().getElement(), RenderPosition.AFTEREND); // рендер меню


// renderTemplate(tripControlsElement, createTripFilter(), `beforeEnd`); // рендер фильтр хедер
renderElement(tripControlsElement, new TripFilterView().getElement(), RenderPosition.BEFOREEND); // рендер фильтр хедер

const tripEventElement = document.querySelector(`.trip-events`);
const tripEventsSortComponent = new TripEventsSortView();
renderElement(tripEventElement, tripEventsSortComponent.getElement(), RenderPosition.BEFOREEND); // рендер сортировки
// выбрал renderTemplate вместо renderElement т.к. некуда было вставить данные
renderElement(tripEventsSortComponent.getElement(), new TripSortItemView(tripEventsSort[0]).getElement(), RenderPosition.BEFOREEND);

const renderForm = (container, position) => {
  // renderTemplate(tripEventElement, createTripEventEditForm(tripItems[getRandomInteger(0, tripItems.length - 1)]), `beforeEnd`); // рендер формы
// renderElement(tripEventElement, new TripEventEditFormView(tripItems[getRandomInteger(0, tripItems.length - 1)]).getElement(), RenderPosition.BEFOREEND); // рендер формы
  renderElement(container, new TripEventEditFormView(tripItems[getRandomInteger(0, tripItems.length - 1)]).getElement(), position); // рендер формы

  const eventFieldGroup = document.querySelector(`.event__field-group`);
  renderElement(eventFieldGroup, new FieldTimeView(tripItems[getRandomInteger(0, tripItems.length - 1)]).getElement(), RenderPosition.AFTEREND); // рендер времени в редактировании формы
};

renderElement(tripEventElement, new TripEventsList().getElement(), RenderPosition.BEFOREEND); // рендер списка нового предложения

const tripEventsListElement = tripEventElement.querySelector(`.trip-events__list`);
let totalPriceItem = 0;
let destinations = [];
let startDateInfo = [];
for (let i = 1; i <= POINT_COUNT; i++) {
  // renderTemplate(tripEventsListElement, createTripEventItem(tripItems[i]), `beforeEnd`); // рендер точек маршрута
  const tripEventItemComponent = new TripEventItem(tripItems[i]);
  const TripEventEditComponent = new TripEventEditFormView(tripItems[getRandomInteger(0, tripItems.length - 1)]).getElement();

  // функция которая заменяет item маршрута на форму редоктирования
  const replaceItemToForm = () => {
    tripEventItemComponent.getElement().replaceWith(TripEventEditComponent);
    // через replaceChild не сработал
    // tripEventItemComponent.getElement().firstChild.replaceChild(TripEventEditComponent, tripEventItemComponent.getElement());
  };

  const replaceFormToItem = () => {
    TripEventEditComponent.replaceWith(tripEventItemComponent.getElement());
  };

  // обраотчик который появляется приредоктировании Item в форме
  const onButtonSave = () => {
    const eventSaveBtn = TripEventEditComponent.querySelector(`form`);
    eventSaveBtn.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      replaceFormToItem(); // замена формы на точку маршрута
      document.removeEventListener(`submit`, onButtonSave); // удаление обработчика
    })
  };

  renderElement(tripEventsListElement, tripEventItemComponent.getElement(), RenderPosition.BEFOREEND); // рендер точек
  // маршрута

  // код который рендерит форму при клике на стрелку вниз в item
  tripEventItemComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceItemToForm();
    onButtonSave();
  });


  totalPriceItem += tripItems[i].price; // затраты на точки маршрута

  for (let item of tripItems[i].additionalOffers) { // обошел веь массив через of
    totalPriceItem += item.price; // дополнительные затраты
  }
  destinations.push(tripItems[i].destinationItem); // закинул все города которые были в точке маршрута
  startDateInfo.push(tripItems[i].dateStart);
}

// renderTemplate(tripMainElement, createTripInfo(destinations, startDateInfo), `afterBegin`); // рендер маршрута tripInfo[0]
renderElement(tripMainElement, new TripInfoView(destinations, startDateInfo).getElement(), RenderPosition.AFTERBEGIN); // рендер
// маршрута
// tripInfo[0]


const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
// renderTemplate(tripInfoElement, createTripInfoCost(totalPriceItem), `beforeEnd`); // рендер цены
renderElement(tripInfoElement, new TripInfoCostView(totalPriceItem).getElement(), RenderPosition.BEFOREEND); // рендер цены
