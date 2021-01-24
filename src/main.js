// import TripFilterView from "./view/trip-filter.js";
import {renderElement, RenderPosition, remove} from "./util/render";
import TripMenuView from "./view/trip-menu.js";
// import TripEventEditFormView from "./view/trip-event-edit-form.js";
// import AddNewPointView from "./view/add-new-point.js";

import {getTripEventItem} from "./mock/mock-trip-event-item.js";
import TripBoard from "./presenter/tripBoard";
import TripInfo from "./presenter/tripInfo";
import PointsModel from "./model/points.js"; // 3 импорт модель
import FilterModel from "./model/filter.js"; // 48
import OffersModel from "./model/offers.js"; // 48
import DestinationsModel from "./model/destinations.js"; // 48


import FilterPresenter from "./presenter/filter.js";
// import {generateId} from "./mock/mock-trip-event-item";
// import {getRandomInteger} from "./util/common"; // 58
import {MenuItem, UpdateType, FilterType} from "./const.js"; // 2stat
import StatisticsView from "./view/statistics.js";
import Api from "./api.js";
// import {SortType} from "./const"; // stat

const AUTHORIZATION = `Basic skuilejbspifSwcl1sa2`; // j2 строка авторизации
const END_POINT = `https://13.ecmascript.pages.academy/big-trip/`; // зафиксированный адрес сервера
const api = new Api(END_POINT, AUTHORIZATION); // создаем экземпляр нашего Api


const DATA_COUNT = 5;
let currentMenuActive = MenuItem.POINTS; // меню по умолчанию

// const tripItems = new Array(DATA_COUNT).fill().map(getTripEventItem);
// Array создаем массив
// DATA_COUNT колличество эллементов в массиве, все они пустые и нужно их заполнить
// fill() метод заполняет эти элементы массива, теперь внутри там underfine
// map(tripEventItem) заполняет эти массивы методом map();

const pointsModel = new PointsModel(); // 4 создали экземпляр модели
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
// pointsModel.setPoints(tripItems); // передаем моковые данные точнее делаем их копию и записываем в массив.
// Если захотим вызывать моки тогда нужно испльзовать getPoints

const filterModel = new FilterModel(); // 49
// const addNewPointComponent = new AddNewPointView(); // 49


const tripEventElement = document.querySelector(`.trip-events`);


const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);

const tripMenuComponent = new TripMenuView(); // 3stat
// renderElement(tripEventElement, tripMenuComponent, RenderPosition.AFTEREND); // 4stat
const renderMenu = () => {
  const visuallyHiddenFirstH2Element = tripControlsElement.querySelector(`h2.visually-hidden`);
  renderElement(visuallyHiddenFirstH2Element, tripMenuComponent, RenderPosition.AFTEREND); // 4stat рендер меню
};

// думаю этот комент можно удалять
// const renderFilter = () => {
//   renderElement(tripControlsElement, new TripFilterView(filters, `everything`), RenderPosition.BEFOREEND); // 50 рендер фильтр хедер
// };
// const tripEventElement = document.querySelector(`.trip-events`);
// renderFilter();


// renderMenu();

// 5 передаем экземпляр модели в конструктор
const tripBoardPresenter = new TripBoard(tripEventElement, pointsModel, filterModel, api, offersModel, destinationsModel); //  61 создал призентер с контейнером в который вставим все
// tripEventElement это контейнер в который нужно отрисовать
const tripInfoPresenter = new TripInfo(tripMainElement, pointsModel); // tripInfoElement

tripInfoPresenter.init(); // элемент info Нужно ИСАПРАВИТЬ т.к. у нас уже модель, а не просто данные tripItems
tripBoardPresenter.init(); // элементы доски // tripItems

const filterPresenter = new FilterPresenter(tripControlsElement, filterModel); // 60 pointsModel
filterPresenter.init();


// const BLANK_POINT = {
//   "type": `Flight`,
//   "dateFrom": new Date(),
//   "dateTo": new Date(),
//   "id": generateId(),
//   "isFavorite": getRandomInteger(0, 0),
//   "destination": {
//     "description": `Lorem ipsum dolor sit amet, consectetur adipiscing…quet varius magna, non porta ligula feugiat eget.`,
//     "name": `Geneva`,
//     "pictures": [
//       {
//         "src": `http://picsum.photos/248/152?r=0.1689645545216163`,
//         "description": `event Geneva`
//       }
//     ]
//   },
//   "basePrice": ``,
//   "editFormOffers": [
//     {
//       "title": `Add luggage`,
//       "price": 50,
//     },
//     {
//       "title": `Switch to comfort class`,
//       "price": 80,
//     },
//     {
//       "title": `Add meal`,
//       "price": 15,
//     },
//     {
//       "title": `Choose seats`,
//       "price": 5,
//     },
//     {
//       "title": `Travel by train`,
//       "price": 40,
//     },
//   ],
//
//   "offers": [{
//     "title": ``,
//     "price": ``,
//   }]
// };
// const BLANK_POINT = {
//   "type": `Flight`,
//   "dateFrom": new Date(),
//   "dateTo": new Date(),
//   // "id": generateId(),
//   "isFavorite": false,
//   "destination": {
//     "name": `Geneva`,
//     "description": `Geneva, in a middle of Europe, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, famous for its crowded street markets with the best street food in Asia.`,
//     "pictures": [
//       {
//         "src": "http://picsum.photos/300/200?r=0.2711095928296725",
//         "description": "Geneva biggest supermarket"
//       },
//       {
//         "src": "http://picsum.photos/300/200?r=0.37260096662238484",
//         "description": "Geneva zoo"
//       },
//       {
//         "src": "http://picsum.photos/300/200?r=0.24136485619435555",
//         "description": "Geneva parliament building"
//       },
//       {
//         "src": "http://picsum.photos/300/200?r=0.020111608522429103",
//         "description": "Geneva city centre"
//       },
//       {
//         "src": "http://picsum.photos/300/200?r=0.7188000886995232",
//         "description": "Geneva parliament building"
//       }
//     ]
//   },
//   "basePrice": ``,
//   "editFormOffers": [
//     {
//       "title": `Choose meal`,
//       "price": 120
//     },
//     {
//       "title": `Choose seats`,
//       "price": 90
//     },
//     {
//       "title": `Upgrade to comfort class`,
//       "price": 120
//     },
//     {
//       "title": `Upgrade to business class`,
//       "price": 120
//     },
//     {
//       "title": `Add luggage`,
//       "price": 170
//     },
//     {
//       "title": `Business lounge`,
//       "price": 160
//     }
//   ],
//
//   "offers": []
//   // {
// //   "title": ``,
// //   "price": ``,
// // }
// };

// 1add код который создаем новую точку маршрута
const addBtn = document.querySelector(`.trip-main__event-add-btn`);

addBtn.addEventListener(`click`, (evt) => { // нашли кноку создания новой точки маршрута
  evt.preventDefault();

  // remove(statisticsComponent);
  // tripBoardPresenter.destroy(); // уничтожить бордпрезентер
  // filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING); // передаем в модель фильтра чтобы он обновился по умолчанию
  // tripBoardPresenter.init(); // рисуем заново доску

  addBtn.setAttribute(`disabled`, true);
  // tripBoardPresenter.createPoint(BLANK_POINT); // в борд презентере вызовем метод который показывает форму создания точки tripItems[0]

  // handleSiteMenuClick(MenuItem.ADD_NEW_POINT);
  currentMenuActive = MenuItem.ADD_NEW_POINT;

  const menuLinks = tripMenuComponent.getElement().querySelectorAll(`a`);
  menuLinks.forEach((item) => {
    item.classList.remove(`trip-tabs__btn--active`);
    item.removeAttribute(`disabled`);
    if (item.getAttribute(`value`) === `POINTS`) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  });
  remove(statisticsComponent);
  tripBoardPresenter.destroy(); // уничтожить бордпрезентер
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING); // передаем в модель фильтра чтобы он обновился по умолчанию
  tripBoardPresenter.init(); // рисуем заново доску

  tripBoardPresenter.createPoint(); // BLANK_POINT в борд презентере вызовем метод который показывает форму создания точки tripItems[0]
});

// const handlePointNewFormClose = () => {
//   addBtn.querySelector(`[value=${MenuItem.POINTS}]`).disabled = false;
//   addBtn.setMenuItem(MenuItem.POINTS);
// };

let statisticsComponent = null;

// 1stat - Опишем обработчик перехода (пока пустой)
const handleSiteMenuClick = (menuItem) => {
  if (currentMenuActive === menuItem) {
    return;
  }
  currentMenuActive = menuItem; //

  switch (currentMenuActive) {
    case MenuItem.ADD_NEW_POINT: // если пользователь кликнул добавить точку
      // Скрыть статистику
      // передать фильтр по умолчанию
      // Показать доску
      // Показать форму добавления новой задачи
      // Убрать выделение с ADD NEW TASK после сохранения
      // remove(statisticsComponent);
      // tripBoardPresenter.destroy(); // уничтожить бордпрезентер
      // filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING); // передаем в модель фильтра чтобы он обновился по умолчанию
      // tripBoardPresenter.init(); // рисуем заново доску
      //
      //
      // tripBoardPresenter.createPoint(BLANK_POINT); // в борд презентере вызовем метод который показывает форму создания точки tripItems[0]

      break;
    case MenuItem.POINTS:
      // tripBoardPresenter.destroy(); // уничтожить бордпрезентер
      remove(statisticsComponent);
      tripBoardPresenter.destroy(); // уничтожить бордпрезентер

      // Показать доску
      // Скрыть статистику
      tripBoardPresenter.init(); // рисуем заново доску
      break;
    case MenuItem.STATISTICS:
      remove(statisticsComponent);


      // Скрыть доску
      tripBoardPresenter.destroy(); // уничтожить бордпрезентер
      statisticsComponent = new StatisticsView(pointsModel.getPoints());
      // Показать статистику
      renderElement(tripEventElement, statisticsComponent, RenderPosition.BEFOREEND);
      addBtn.removeAttribute(`disabled`);

      break;
  }
};
// tripMenuComponent.setMenuClickHandler(handleSiteMenuClick); // 1.1.stat

// Для удобства отладки скроем доску
// boardPresenter.init();
// и отобразим сразу статистику
// renderElement(tripEventElement, new StatisticsView(pointsModel.getPoints()), RenderPosition.BEFOREEND);
// tripEventElement в контеинер где все точки маршрута отрисуем статистику
// new StatisticsView(pointsModel.getPoints()) в компонент статистики передали все точки
// pointsModel.getPoints() все точки которые вернулись согласно фильтров из модели по точкам из функции getPoint();
// RenderPosition.BEFOREEND позиция куда рендерится


// api.getPoints().then((points) => { // используя then мы смотрим что же там возвращается из сервера
//   // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
//   // а ещё на сервере используется snake_case, а у нас camelCase.
//   // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
//   // Есть вариант получше - паттерн "Адаптер"
//   pointsModel.setPoints(points);
// });
// pointsModel.setPoints(tripItems);


// api.getPoints()
// .then((points) => { // в случае успешного запроса
//
//   pointsModel.setPoints(UpdateType.INIT, points); // передать точки с типом обновления INIT
//   // пока задачи грузятся запрещаем смотреть статистику, это нужно чтобы не отправлялось много запросов при кликах
//   renderMenu();
//   tripMenuComponent.setMenuClickHandler(handleSiteMenuClick); // 1.1.stat
//   // filterPresenter.init();
// })
// .catch(() => { // если ошибка то
//   pointsModel.setPoints(UpdateType.INIT, []); // передать пустой массив с типом INIT
//   renderMenu();
//   tripMenuComponent.setMenuClickHandler(handleSiteMenuClick); // 1.1.stat
// });
//
// api.getOffers().then((offersArray)=>{
//   offersModel.setOffers(offersArray)}
// );

Promise.all([
  api.getOffers(),
  api.getPoints(),
  api.getDestinations(),
])
  .then(([formOffers, points, pointDestinations]) => { // destinations в случае успешного запроса
    offersModel.setOffers(formOffers);
    pointsModel.setPoints(UpdateType.INIT, points); // передать точки с типом обновления INIT
    destinationsModel.setDestinations(pointDestinations);
    // пока задачи грузятся запрещаем смотреть статистику, это нужно чтобы не отправлялось много запросов при кликах
    renderMenu();
    tripMenuComponent.setMenuClickHandler(handleSiteMenuClick); // 1.1.stat
    // filterPresenter.init();
  }).catch(() => { // если ошибка то
    pointsModel.setPoints(UpdateType.INIT, []); // передать пустой массив с типом INIT
    renderMenu();
    tripMenuComponent.setMenuClickHandler(handleSiteMenuClick); // 1.1.stat
  });

// api.getPoints().then(()=>{pointsModel.setPoints(UpdateType.INIT, points)}).catch()



// const AUTHORIZATION = `Basic skuilejbspifSwcl1sa2j`; // строка авторизации
// const END_POINT = `https://13.ecmascript.pages.academy/big-trip/`; // зафиксированный адрес сервера
// const api = new Api(END_POINT, AUTHORIZATION); // создаем экземпляр нашего Api
// api.getOffers()
//   .then((emptyOffers) => { // в случае успешного запроса
//     // const tripEventEditFormComponent =
//     new TripEventEditFormView(dataItem, emptyOffers);
//
//   })
//   .catch(() => { // если ошибка то
//   });

