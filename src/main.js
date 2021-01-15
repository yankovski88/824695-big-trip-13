import TripFilterView from "./view/trip-filter.js";
import {renderElement, RenderPosition} from "./util/render";
import TripMenuView from "./view/trip-menu.js";
import {getTripEventItem} from "./mock/mock-trip-event-item.js";
import TripBoard from "./presenter/tripBoard";
import TripInfo from "./presenter/tripInfo";
import PointsModel from "./model/points.js"; // 3 импорт модель
import FilterModel from "./model/filter.js"; // 48
import FilterPresenter from "./presenter/filter.js"; // 58


// const filters = [ // 48
//   {
//     type: `everything`,
//     name: `EVERYTHING`,
//     count: 0
//   }
// ];

const DATA_COUNT = 5;

const tripItems = new Array(DATA_COUNT).fill().map(getTripEventItem);
// Array создаем массив
// DATA_COUNT колличество эллементов в массиве, все они пустые и нужно их заполнить
// fill() метод заполняет эти элементы массива, теперь внутри там underfine
// map(tripEventItem) заполняет эти массивы методом map();

const pointsModel = new PointsModel(); // 4 создали экземпляр модели
pointsModel.setPoints(tripItems); // передаем моковые данные точнее делаем их копию и записываем в массив.
// Если захотим вызывать моки тогда нужно испльзовать getPoints

const filterModel = new FilterModel(); // 49

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
const renderMenu = () => {
  const visuallyHiddenFirstH2Element = tripControlsElement.querySelector(`h2.visually-hidden`);
  renderElement(visuallyHiddenFirstH2Element, new TripMenuView(), RenderPosition.AFTEREND); // рендер меню
};

// const renderFilter = () => {
//   renderElement(tripControlsElement, new TripFilterView(filters, `everything`), RenderPosition.BEFOREEND); // 50 рендер фильтр хедер
// };

const tripEventElement = document.querySelector(`.trip-events`);

renderMenu();
// renderFilter();
// 5 передаем экземпляр модели в конструктор
const tripBoardPresenter = new TripBoard(tripEventElement, pointsModel, filterModel); // 61 создал призентер с контейнером в который вставим все
// tripEventElement это контейнер в который нужно отрисовать
const tripInfoPresenter = new TripInfo(tripMainElement, pointsModel); // tripInfoElement

tripInfoPresenter.init(); // элемент info Нужно ИСАПРАВИТЬ т.к. у нас уже модель, а не просто данные tripItems
tripBoardPresenter.init(); // элементы доски // tripItems

const filterPresenter = new FilterPresenter(tripControlsElement, filterModel); // 60 pointsModel
filterPresenter.init();

// 1add код который создаем новую точку маршрута
const addBtn = document.querySelector(`.trip-main__event-add-btn`);
addBtn.addEventListener(`click`, (evt) => { // нашли кноку создания новой точки маршрута
  evt.preventDefault();
  addBtn.setAttribute(`disabled`, true);
  tripBoardPresenter.createPoint(); // в борд презентере вызовем метод который показывает форму создания точки tripItems[0]
});
