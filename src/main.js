import {renderElement, RenderPosition, remove} from "./util/render";
import TripBoard from "./presenter/tripBoard";
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";

import FilterPresenter from "./presenter/filter.js";
import StatisticsView from "./view/statistics.js";
import TripMenuView from "./view/trip-menu.js";
import TripInfo from "./presenter/tripInfo";


import Api from "./api/api.js";
import {MenuItem, UpdateType, FilterType} from "./const.js";
import {isOnline} from "./util/common.js";
// import {toast} from "./util/toast/toast.js";
// import Store from "./api/store.js";
// import Provider from "./api/provider.js";

const AUTHORIZATION = `Basic skuileee40`; // строка авторизации
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`; // зафиксированный адрес сервера
// const STORAGE_TYPE = window.localStorage;
// const ScoreKeyType = {
//   POINTS: `points`,
//   OFFERS: `offers`,
//   DESTINATIONS: `destinations`
// };

// const STORE_PREFIX = `bigtrip-localstorage`;
// const STORE_VER = `v1`;
// const POINTS_STORE_NAME = `${STORE_PREFIX}-${ScoreKeyType.POINTS}-${STORE_VER}`;
// const OFFERS_STORE_NAME = `${STORE_PREFIX}-${ScoreKeyType.OFFERS}-${STORE_VER}`;
// const DESTINATIONS_STORE_NAME = `${STORE_PREFIX}-${ScoreKeyType.DESTINATIONS}-${STORE_VER}`;

// const pointsStore = new Store(POINTS_STORE_NAME, STORAGE_TYPE);
// const offersStore = new Store(OFFERS_STORE_NAME, STORAGE_TYPE);
// const destinationsStore = new Store(DESTINATIONS_STORE_NAME, STORAGE_TYPE);

const api = new Api(END_POINT, AUTHORIZATION); // создаем экземпляр нашего Api
// const apiWithProvider = new Provider(api, pointsStore, offersStore, destinationsStore);


let currentMenuActive = MenuItem.POINTS; // меню по умолчанию

const pointsModel = new PointsModel(); // создали экземпляр модели
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const filterModel = new FilterModel();


const tripEventElement = document.querySelector(`.trip-events`);

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);


const tripMenuComponent = new TripMenuView();
const renderMenu = () => {
  const visuallyHiddenFirstH2Element = tripControlsElement.querySelector(`h2.visually-hidden`);
  renderElement(visuallyHiddenFirstH2Element, tripMenuComponent, RenderPosition.AFTEREND);
};

// передаем экземпляр модели в конструктор
const tripBoardPresenter = new TripBoard(tripEventElement, pointsModel, filterModel, api, offersModel, destinationsModel); // создал призентер с контейнером в который вставим все
tripBoardPresenter.init(); // элементы доски

const filterPresenter = new FilterPresenter(tripControlsElement, filterModel);

//  код который создаем новую точку маршрута
const addBtn = document.querySelector(`.trip-main__event-add-btn`);

addBtn.addEventListener(`click`, (evt) => { // нашли кноку создания новой точки маршрута
  evt.preventDefault();

  addBtn.setAttribute(`disabled`, true);
  currentMenuActive = MenuItem.ADD_NEW_POINT;
  // if (!isOnline()) {
  //   toast(`You can't create new point offline`);
  //
  // } else {

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

    tripBoardPresenter.createPoint();
  // }
});

let statisticsComponent = null;

// Опишем обработчик перехода (пока пустой)
const handleSiteMenuClick = (menuItem) => {
  if (currentMenuActive === menuItem) {
    return;
  }
  currentMenuActive = menuItem;

  switch (currentMenuActive) {
    case MenuItem.ADD_NEW_POINT: // если пользователь кликнул добавить точку
      // Скрыть статистику
      // передать фильтр по умолчанию
      // Показать доску
      // Показать форму добавления новой задачи
      // Убрать выделение с ADD NEW TASK после сохранения
      break;
    case MenuItem.POINTS:
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


// код по запросу берет все данные
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
    tripMenuComponent.setMenuClickHandler(handleSiteMenuClick);
    filterPresenter.init();
    // const tripInfoPresenter = new TripInfo(tripMainElement, pointsModel);
    // tripInfoPresenter.init(); // элемент info Нужно ИСАПРАВИТЬ т.к. у нас уже модель, а не просто данные tripItems

  }).catch(() => { // если ошибка то
    pointsModel.setPoints(UpdateType.INIT, []); // передать пустой массив с типом INIT
    pointsModel.setOffers(UpdateType.INIT, []);
    pointsModel.setDestinations(UpdateType.INIT, []);

    renderMenu(); // не знаю или можно оставлять
    tripMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  });


// window.addEventListener(`load`, () => {
//   navigator.serviceWorker.register(`/sw.js`);
// });
//
//
// window.addEventListener(`online`, () => {
//   document.title = document.title.replace(` [offline]`, ``);
//   apiWithProvider.sync();
// });
//
// window.addEventListener(`offline`, () => {
//   document.title += ` [offline]`;
// });
