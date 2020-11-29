import {createTripInfo} from "./view/trip-info.js";
import {createTripInfoCost} from "./view/trip-info-cost.js";
import {createTripMenu} from "./view/trip-menu.js";
import {createTripFilter} from "./view/trip-filter.js";
import {createTripEventsSort} from "./view/trip-events-sort.js";
import {createTripEventEditForm} from "./view/trip-event-edit-form.js";

import {createTripEventsList} from "./view/trip-events-list.js";
import {createTripEventItems} from "./view/trip-event-item.js";
import {getTripEventItem} from "./mock/mock-trip-event-item.js";
import {getTripEventsSort} from "./mock/mock-trip-events-sort.js";
import {getRandomInteger} from "./mock/util";

const POINT_COUNT = 3;
const DATA_COUNT = 15;
// файл в котором будем рендерить все модули

const tripItems = new Array(DATA_COUNT).fill().map(getTripEventItem);
// Array создаем массив
// DATA_COUNT колличество эллементов в массиве, все они пустые и нужно их заполнить
// fill() метод заполняет эти элементы массива, теперь внутри там underfine
// map(tripEventItem) заполняет эти массивы методом map();

const tripEventsSort = new Array(1).fill().map(getTripEventsSort); // создал один массив с одним объектом для сортировки

// container = место куда вставляем разметку;
// content = text разметки;
// position = определяет позицию добавляемого элемента;
const render = (container, content, position) => {
  container.insertAdjacentHTML(position, content);
};

const tripMainElement = document.querySelector(`.trip-main`);

const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const visuallyHiddenElement = tripControlsElement.querySelector(`.visually-hidden`);

render(visuallyHiddenElement, createTripMenu(), `afterEnd`); // рендер меню

render(tripControlsElement, createTripFilter(), `beforeEnd`); // рендер фильтр хедер

const tripEventElement = document.querySelector(`.trip-events`);
render(tripEventElement, createTripEventsSort(tripEventsSort[0]), `beforeEnd`); // рендер сортировки

render(tripEventElement, createTripEventEditForm(tripItems[getRandomInteger(0, tripItems.length - 1)]), `beforeEnd`); // рендер формы
// нового
// предложения

render(tripEventElement, createTripEventsList(), `beforeEnd`); // рендер формы нового предложения

const tripEventsListElement = tripEventElement.querySelector(`.trip-events__list`);
let totalPriceItem = 0;
let totalPriceAddantion = 0;
let destinations = [];
let startDateInfo = [];
for (let i = 1; i <= POINT_COUNT; i++) {
  render(tripEventsListElement, createTripEventItems(tripItems[i]), `beforeEnd`); // рендер точек маршрута
  totalPriceItem += tripItems[i].price; // затраты на точки маршрута

  for (let item of tripItems[i].additionalOffers) { // обошел веь массив через of
    totalPriceAddantion += item.price; // дополнительные затраты
  }
  destinations.push(tripItems[i].destinationItem); // закинул все города которые были в точке маршрута
  startDateInfo.push(tripItems[i].dateStart);
}

render(tripMainElement, createTripInfo(destinations, startDateInfo), `afterBegin`); // рендер маршрута tripInfo[0]

const totalPrice = totalPriceItem + totalPriceAddantion;
const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
render(tripInfoElement, createTripInfoCost(totalPrice), `beforeEnd`); // рендер цены
