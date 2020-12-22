import TripFilterView from "./view/trip-filter.js";
import {renderElement, RenderPosition} from "./util/render";
import TripMenuView from "./view/trip-menu.js";
import {getTripEventItem} from "./mock/mock-trip-event-item.js";
import TripBoard from "./presenter/tripBoard";
import TripInfo from "./presenter/tripInfo";

const DATA_COUNT = 15;

const tripItems = new Array(DATA_COUNT).fill().map(getTripEventItem);
// Array создаем массив
// DATA_COUNT колличество эллементов в массиве, все они пустые и нужно их заполнить
// fill() метод заполняет эти элементы массива, теперь внутри там underfine
// map(tripEventItem) заполняет эти массивы методом map();

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const renderMenu = () => {
  const visuallyHiddenFirstH2Element = tripControlsElement.querySelector(`h2.visually-hidden`);
  renderElement(visuallyHiddenFirstH2Element, new TripMenuView(), RenderPosition.AFTEREND); // рендер меню
};

const renderFilter = () => {
  renderElement(tripControlsElement, new TripFilterView(), RenderPosition.BEFOREEND); // рендер фильтр хедер
};

const tripEventElement = document.querySelector(`.trip-events`);


renderMenu();
renderFilter();
const tripBoardPresenter = new TripBoard(tripEventElement); // создал призентер с контейнером в который вставим все
const tripInfoPresenter = new TripInfo(tripMainElement); // tripInfoElement
tripInfoPresenter.init(tripItems); // элемент info
tripBoardPresenter.init(tripItems); // элементы доски


