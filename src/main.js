import {createTripInfo} from "./view/trip-info.js";
import {createTripInfoCost} from "./view/trip-info-cost.js";
import {createTripMenu} from "./view/trip-menu.js";
import {createTripFilter} from "./view/trip-filter.js";
import {createTripEventsSort} from "./view/trip-events-sort.js";
import {createTripEventEditForm} from "./view/trip-event-edit-form.js";

import {createTripEventsList} from "./view/trip-events-list.js";
import {createTripEventItem} from "./view/trip-event-item.js";
import {getTripEventItem} from "./mock/mock-trip-event-item.js";
import {getTripEventsSort} from "./mock/mock-trip-events-sort.js";
import {getTripInfo} from "./mock/mock-trip-info.js";

const POINT_COUNT = 3;
const DATA_COUNT = 15;
// файл в котором будем рендерить все модули

const tripItems = new Array(DATA_COUNT).fill().map(getTripEventItem);
// Array создаем массив
// DATA_COUNT колличество эллементов в массиве, все они пустые и нужно их заполнить
// fill() метод заполняет эти элементы массива, теперь внутри там underfine
// map(tripEventItem) заполняет эти массивы методом map();

const tripTotalItems = new Array(1).fill().map(getTripEventItem); // сделал массив с объектом.
const tripEventsSort = new Array(1).fill().map(getTripEventsSort); // создал один массив с одним объектом для сортировки

const tripInfo = new Array(1).fill().map(getTripInfo); // создал массив с объектами для инфо

// container = место куда вставляем разметку;
// content = text разметки;
// position = определяет позицию добавляемого элемента;
const render = (container, content, position) => {
  container.insertAdjacentHTML(position, content);
};

const tripMainElement = document.querySelector(`.trip-main`);
render(tripMainElement, createTripInfo(tripInfo[0]), `afterBegin`); // рендер маршрута

const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
render(tripInfoElement, createTripInfoCost(), `beforeEnd`); // рендер цены

const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const visuallyHiddenElement = tripControlsElement.querySelector(`.visually-hidden`);

render(visuallyHiddenElement, createTripMenu(), `afterEnd`); // рендер меню

render(tripControlsElement, createTripFilter(), `beforeEnd`); // рендер фильтр хедер

const tripEventElement = document.querySelector(`.trip-events`);
render(tripEventElement, createTripEventsSort(tripEventsSort[0]), `beforeEnd`); // рендер сортировки

render(tripEventElement, createTripEventEditForm(tripTotalItems[0]), `beforeEnd`); // рендер формы нового предложения

render(tripEventElement, createTripEventsList(), `beforeEnd`); // рендер формы нового предложения

const tripEventsListElement = tripEventElement.querySelector(`.trip-events__list`);
for (let i = 0; i < POINT_COUNT; i++) {
  render(tripEventsListElement, createTripEventItem(tripItems[i]), `beforeEnd`); // рендер точек маршрута
}
