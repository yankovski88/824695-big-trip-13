import {createTripMainTripInfo} from "./view/trip-main-trip-info.js";
import {createTripInfoCost} from "./view/trip-info-cost.js";
import {createTripControlsTripTab} from "./view/trip-controls-trip-tab.js";
import {createTripFilter} from "./view/trip-filter.js";
import {createTripEventsTripSort} from "./view/trip-events-trip-sort.js";
import {createTripEventsList} from "./view/trip-events-list.js";
import {createTripEventsItem} from "./view/trip-events-item.js";

const POINT_COUNT = 3;
// файл в котором будем рендерить все модули

// container = место куда вставляем разметку;
// content = text разметки;
// position = определяет позицию добавляемого элемента;
const render = (container, content, position) => {
  container.insertAdjacentHTML(position, content);
};

const tripMainElement = document.querySelector(`.trip-main`);
render(tripMainElement, createTripMainTripInfo(), `afterBegin`); // рендер маршрута

const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
render(tripInfoElement, createTripInfoCost(), `beforeEnd`); // рендер цены

const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const visuallyHiddenElement = tripControlsElement.querySelector(`.visually-hidden`);

render(visuallyHiddenElement, createTripControlsTripTab(), `afterEnd`); // рендер меню

render(tripControlsElement, createTripFilter(), `beforeEnd`); // рендер фильтр хедер

const tripEventElement = document.querySelector(`.trip-events`);
render(tripEventElement, createTripEventsTripSort(), `beforeEnd`); // рендер сортировки

render(tripEventElement, createTripEventsList(), `beforeEnd`); // рендер формы нового предложения

const tripEventsListElement = tripEventElement.querySelector(`.trip-events__list`);
for (let i = 0; i < POINT_COUNT; i++) {
  render(tripEventsListElement, createTripEventsItem(), `beforeEnd`); // рендер точек маршрута
}
