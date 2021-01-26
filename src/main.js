import {renderElement, RenderPosition, remove} from "./util/render";

import TripBoard from "./presenter/tripBoard";
import PointsModel from "./model/points.js"; // 3 импорт модель
import FilterModel from "./model/filter.js";
import OffersModel from "./model/offers.js";
import DestinationsModel from "./model/destinations.js";

import FilterPresenter from "./presenter/filter.js";
import StatisticsView from "./view/statistics.js";
import TripMenuView from "./view/trip-menu.js";

import Api from "./api.js";
import {MenuItem, UpdateType, FilterType} from "./const.js"; // 2stat

const AUTHORIZATION = `Basic skuile`; // jbspifSwcl1sa2 строка авторизации
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`; // зафиксированный адрес сервера
const api = new Api(END_POINT, AUTHORIZATION); // создаем экземпляр нашего Api

let currentMenuActive = MenuItem.POINTS; // меню по умолчанию

const pointsModel = new PointsModel(); // 4 создали экземпляр модели
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const filterModel = new FilterModel(); // 49

const tripEventElement = document.querySelector(`.trip-events`);

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);

const tripMenuComponent = new TripMenuView(); // 3stat
const renderMenu = () => {
  const visuallyHiddenFirstH2Element = tripControlsElement.querySelector(`h2.visually-hidden`);
  renderElement(visuallyHiddenFirstH2Element, tripMenuComponent, RenderPosition.AFTEREND); // 4stat рендер меню
};

// 5 передаем экземпляр модели в конструктор
const tripBoardPresenter = new TripBoard(tripEventElement, pointsModel, filterModel, api, offersModel, destinationsModel); //  61 создал призентер с контейнером в который вставим все
tripBoardPresenter.init(); // элементы доски

const filterPresenter = new FilterPresenter(tripControlsElement, filterModel); // 60 pointsModel
filterPresenter.init();

// 1add код который создаем новую точку маршрута
const addBtn = document.querySelector(`.trip-main__event-add-btn`);

addBtn.addEventListener(`click`, (evt) => { // нашли кноку создания новой точки маршрута
  evt.preventDefault();

  addBtn.setAttribute(`disabled`, true);
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
    tripMenuComponent.setMenuClickHandler(handleSiteMenuClick); // 1.1.stat
    // filterPresenter.init();
  }).catch(() => { // если ошибка то
  pointsModel.setPoints(UpdateType.INIT, []); // передать пустой массив с типом INIT
  pointsModel.setOffers(UpdateType.INIT, []);
  pointsModel.setDestinations(UpdateType.INIT, []);

  // renderMenu(); // не знаю или можно оставлять
  tripMenuComponent.setMenuClickHandler(handleSiteMenuClick); // 1.1.stat
});


