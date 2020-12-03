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

const renderMenu = () => {
  const visuallyHiddenElement = tripControlsElement.querySelector(`.visually-hidden`);
  renderElement(visuallyHiddenElement, new TripMenuView().getElement(), RenderPosition.AFTEREND); // рендер меню
};

const renderFilter = ()=>{
  renderElement(tripControlsElement, new TripFilterView().getElement(), RenderPosition.BEFOREEND); // рендер фильтр хедер
};

const tripEventElement = document.querySelector(`.trip-events`);
const renderSort = ()=>{
  const tripEventsSortComponent = new TripEventsSortView(tripEventsSort[0]);
  renderElement(tripEventElement, tripEventsSortComponent.getElement(), RenderPosition.BEFOREEND); // рендер сортировки
};

const renderEventList = ()=>{
// рендер списка новой точки маршрута
  renderElement(tripEventElement, new TripEventsList().getElement(), RenderPosition.BEFOREEND);
};

const renderEventItemDestinationCost = ()=>{
const tripEventsListElement = tripEventElement.querySelector(`.trip-events__list`);
let totalPriceItem = 0;
let destinations = [];
let startDateInfo = [];
for (let i = 1; i <= POINT_COUNT; i++) {
  const tripEventItemComponent = new TripEventItem(tripItems[i]);
  const TripEventEditComponent = new TripEventEditFormView(tripItems[getRandomInteger(0, tripItems.length - 1)]).getElement();

  // функция которая заменяет item маршрута на форму редоктирования
  const replaceItemToForm = () => {
    // через replaceChild не сработал
    // tripEventItemComponent.getElement().firstChild.replaceChild(TripEventEditComponent, tripEventItemComponent.getElement());
    tripEventItemComponent.getElement().replaceWith(TripEventEditComponent);
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


renderElement(tripMainElement, new TripInfoView(destinations, startDateInfo).getElement(), RenderPosition.AFTERBEGIN); // рендер промежкутка даты

const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
renderElement(tripInfoElement, new TripInfoCostView(totalPriceItem).getElement(), RenderPosition.BEFOREEND); // рендер цены
};

renderMenu();
renderFilter();
renderSort();
renderEventList();
renderEventItemDestinationCost();
