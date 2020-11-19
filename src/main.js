import {createRoute} from "./view/trip-info-route.js";
import {createCost} from "./view/trip-info-cost.js";
import {createControl} from "./view/trip-control.js";
import {createFilter} from "./view/trip-filter.js";
import {createSort} from "./view/trip-sort.js";
import {createEventEdit} from "./view/trip-form-event-edit.js";
import {createWayPoint} from "./view/trip-waypoint.js";

// файл в котором будем рендерить все модули

const POINT_COUNT = 3;

const tripMainElement = document.querySelector(`.trip-main`);
const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const visuallyHiddenElement = tripControlsElement.querySelector(`.visually-hidden`);
const tripEventElement = document.querySelector(`.trip-events`);
const tripEventsListElement = tripEventElement.querySelector(`.trip-events__list`);

const render = (container, content, position) => {
  container.insertAdjacentHTML(position, content);
};


render(tripMainElement, createRoute(), `afterBegin`); // рендер маршрута

render(tripInfoElement, createCost(), `beforeEnd`); // рендер цены

render(visuallyHiddenElement, createControl(), `afterEnd`); // рендер меню

render(tripControlsElement, createFilter(), `beforeEnd`); // рендер фильтр хедер

render(tripEventElement, createSort(), `beforeEnd`); // рендер сортировки

render(tripEventElement, createEventEdit(), `beforeEnd`); // рендер формы нового предложения

for (let i = 0; i < POINT_COUNT; i++) {
  render(tripEventsListElement, createWayPoint(), `beforeEnd`); // рендер точек маршрута
}
