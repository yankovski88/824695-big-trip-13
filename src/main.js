import {createTripInfo} from "./view/trip-info.js";
import {createTripInfoCost} from "./view/trip-info-cost.js";
import {createTripMenu} from "./view/trip-menu.js";
import {createTripFilter} from "./view/trip-filter.js";
import {createTripEventsSort} from "./view/trip-events-sort.js";
import {createTripEventEditForm} from "./view/trip-event-edit-form.js";
import {createTripEventsList} from "./view/trip-events-list.js";
import {createTripEventItem} from "./view/trip-event-item.js";

const POINT_COUNT = 3;
// файл в котором будем рендерить все модули

// container = место куда вставляем разметку;
// content = text разметки;
// position = определяет позицию добавляемого элемента;
const render = (container, content, position) => {
  container.insertAdjacentHTML(position, content);
};

const tripMainElement = document.querySelector(`.trip-main`);
render(tripMainElement, createTripInfo(), `afterBegin`); // рендер маршрута

const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
render(tripInfoElement, createTripInfoCost(), `beforeEnd`); // рендер цены

const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const visuallyHiddenElement = tripControlsElement.querySelector(`.visually-hidden`);

render(visuallyHiddenElement, createTripMenu(), `afterEnd`); // рендер меню

render(tripControlsElement, createTripFilter(), `beforeEnd`); // рендер фильтр хедер

const tripEventElement = document.querySelector(`.trip-events`);
render(tripEventElement, createTripEventsSort(), `beforeEnd`); // рендер сортировки

render(tripEventElement, createTripEventEditForm(), `beforeEnd`); // рендер формы нового предложения

render(tripEventElement, createTripEventsList(), `beforeEnd`); // рендер формы нового предложения

const tripEventsListElement = tripEventElement.querySelector(`.trip-events__list`);
for (let i = 0; i < POINT_COUNT; i++) {
  render(tripEventsListElement, createTripEventItem(), `beforeEnd`); // рендер точек маршрута
}
