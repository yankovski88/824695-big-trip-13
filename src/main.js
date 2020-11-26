import {createTripInfo} from "./view/trip-info.js";
import {createTripInfoCost} from "./view/trip-info-cost.js";
import {createTripMenu} from "./view/trip-menu.js";
import {createTripFilter} from "./view/trip-filter.js";
import {createTripEventsSort} from "./view/trip-events-sort.js";
import {createTripEventEditForm} from "./view/trip-event-edit-form.js";

import {createTripEventsList} from "./view/trip-events-list.js";
import {createTripEventItem} from "./view/trip-event-item.js";
import {tripEventItem} from "./mock/mock-trip-event-item.js";
// console.log({tripEventItem});

const POINT_COUNT = 3;
const OBJ_COUNT = 15;
// файл в котором будем рендерить все модули

const tripItems = new Array(OBJ_COUNT).fill().map(tripEventItem);
// Array создаем массив
// OBJ_COUNT колличество эллементов в массиве, все они пустые и нужно их заполнить
// fill() метод заполняет эти элементы массива, теперь внутри там underfine
// map(tripEventItem) заполняет эти массивы методом map();

const tripTotalItems = new Array(1).fill().map(tripEventItem);

// container = место куда вставляем разметку;
// content = text разметки;
// position = определяет позицию добавляемого элемента;
const render = (container, content, position) => {
  container.insertAdjacentHTML(position, content);
};

const tripMainElement = document.querySelector(`.trip-main`);
render(tripMainElement, createTripInfo(tripTotalItems[0]), `afterBegin`); // рендер маршрута

const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
render(tripInfoElement, createTripInfoCost(), `beforeEnd`); // рендер цены

const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const visuallyHiddenElement = tripControlsElement.querySelector(`.visually-hidden`);

render(visuallyHiddenElement, createTripMenu(), `afterEnd`); // рендер меню

render(tripControlsElement, createTripFilter(), `beforeEnd`); // рендер фильтр хедер

const tripEventElement = document.querySelector(`.trip-events`);
render(tripEventElement, createTripEventsSort(tripTotalItems[0]), `beforeEnd`); // рендер сортировки

render(tripEventElement, createTripEventEditForm(tripTotalItems[0]), `beforeEnd`); // рендер формы нового предложения

render(tripEventElement, createTripEventsList(), `beforeEnd`); // рендер формы нового предложения

const tripEventsListElement = tripEventElement.querySelector(`.trip-events__list`);
for (let i = 0; i < POINT_COUNT; i++) {
  render(tripEventsListElement, createTripEventItem(tripItems[i]), `beforeEnd`); // рендер точек маршрута
}

export {tripEventElement};
