// // файл в котором будем рендерить все модули
// import Trip from "./presenter/trip.js";
//
//
// import TripFilterView from "./view/trip-filter.js";
// import TripEventsSortView from "./view/trip-events-sort-view.js";
//
//
// import {getTripEventItem} from "./mock/mock-trip-event-item.js";
// import {getTripEventsSort} from "./mock/mock-trip-events-sort.js";
//
// import {remove, renderElement, RenderPosition} from "./util/render";
//
// import TripMenuView from "./view/trip-menu.js";
// import TripEventItem from "./view/trip-event-item";
// import TripEventEditFormView from "./view/trip-event-edit-form";
//
//
// const DATA_COUNT = 15;
//
// const tripItems = new Array(DATA_COUNT).fill().map(getTripEventItem);
// // Array создаем массив
// // DATA_COUNT колличество эллементов в массиве, все они пустые и нужно их заполнить
// // fill() метод заполняет эти элементы массива, теперь внутри там underfine
// // map(tripEventItem) заполняет эти массивы методом map();
//
// const tripMainElement = document.querySelector(`.trip-main`);
// const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
//
// const renderMenu = () => {
//   const visuallyHiddenFirstH2Element = tripControlsElement.querySelector(`h2.visually-hidden`); // нашли тег h2 и в
//   // нем класс visually-hidden
//   renderElement(visuallyHiddenFirstH2Element, new TripMenuView(), RenderPosition.AFTEREND); // рендер меню
// };
//
// const renderFilter = () => {
//   renderElement(tripControlsElement, new TripFilterView(), RenderPosition.BEFOREEND); // рендер фильтр хедер
// };
//
// const tripEventsListElement = this._tripContainer.querySelector(`.trip-events__list`); //containerElement
//
// const renderTask = (containerElement, eventItem) => {
//
//
//
//     for (let i = 0; i < this._tripItems.length; i++) {
//       const tripEventItemComponent = new TripEventItem(tripItems[i]);
//       const tripEventEditComponent = new TripEventEditFormView(tripItems[i]);
//
//       // код который будет удалять компоненты
//       const destroy = () => {
//         remove(tripEventItemComponent);
//         remove(tripEventEditComponent);
//       };
//
//
//       // функция которая заменяет item маршрута на форму редоктирования
//       const replaceItemToForm = () => {
//         // через replaceChild не сработал
//         // Эта функция у тебя не работала, потому что .replaceChild() ты должен вызывать на контейнере в котором находятся элементы должны замениться, в твоем случае - это tripEventsListElement
//         // tripEventsListElement.replaceChild(tripEventEditComponent, tripEventItemComponent.getElement());
//         tripEventItemComponent.getElement().replaceWith(tripEventEditComponent.getElement());
//       };
//
//       // функция которая из формы редоктирования делает предложение Item
//       const replaceFormToItem = () => {
//         tripEventEditComponent.getElement().replaceWith(tripEventItemComponent.getElement());
//       };
//
//       // обраотчик сохранения формы
//       const onFormSubmit = () => {
//         tripEventEditComponent.setSubmitHandler(() => {
//           replaceFormToItem(); // замена формы на точку маршрута
//           document.removeEventListener(`submit`, onFormSubmit); // удаление обработчика
//           // Можно обработчики не удалять т.к. элемент удален. Удаляются только на document и нов созданный элемент
//           // document.removeEventListener(`keydown`, onEscKeyPress); // удаление обработчика, если нажали на ESC
//           // document.removeEventListener(`click`, onEventRollupBtnClick); // удаление обработчика
//         });
//       };
//
//       // при удаление элемента из DOM все обработчики, которые есть на нем - тоже удаляются
//       // Единственное, что тебе нужно удалять - это обработчики, которые ты вешаешь на document
//       // или другие DOM элементы, которые остаются после удаления компонента
//
//
//       // обраотчик который закрывается без сохранения формы
//       const onEscKeyPress = (evt) => {
//         if (evt.key === `Escape` || evt.key === `Esc`) {
//           evt.preventDefault();
//           replaceFormToItem(); // замена формы на точку маршрута
//           document.removeEventListener(`keydown`, onEscKeyPress); // удаление обработчика, если нажали на ESC
//           document.removeEventListener(`submit`, onFormSubmit); // удаление обработчика
//           // Можно не удалять т.к. элемент удален
//           // document.removeEventListener(`click`, onEventRollupBtnClick); // удаление обработчика
//         }
//       };
//       const onEventRollupBtnClick = (evt) => {
//         evt.preventDefault();
//         replaceFormToItem(); // замена формы на точку маршрута
//         document.removeEventListener(`keydown`, onEscKeyPress); // удаление обработчика, если нажали на ESC
//         document.removeEventListener(`submit`, onFormSubmit); // удаление обработчика
//         document.removeEventListener(`click`, onEventRollupBtnClick); // удаление обработчика
//       };
//
//       renderElement(tripEventsListElement, tripEventItemComponent, RenderPosition.BEFOREEND); // рендер точек
//       // маршрута
//
//       // код который рендерит форму при клике на стрелку вниз в item
//       tripEventItemComponent.setClickHandler(() => { // установили метод setClickHandler
//
//         replaceItemToForm();
//         // при удалении элемента из дом обработчик можно не удалять
//         onFormSubmit(); // ЭТОТ ОБРАБОТЧИК ДОБАВЛЯЕТСЯ ВСЕГДА ПРИ КЛИКЕ НА СТРЕЛКУ, НО ЕСЛИ НАЖИМАТЬ НА ESC, ТО
//         // ОН НЕ УДАЛЯЕТСЯ, А БУДЕТ ТОЛЬКО ДОБАВЛЯЕТСЯ т.е. при нажати на esc его надо удалять. Также и в обратную
//         // сторону нужно удалять обработчик на ESC. ОТВЕТ: Удален элемент, то и обработчики не нужно удалять.
//         document.addEventListener(`keydown`, onEscKeyPress); // после клика на стрелку вставил обработчик на ESC
//
//         if (tripEventsListElement.querySelector(`form`)) {
//           const eventRollupBtn = tripEventEditComponent.getElement().querySelector(`.event__rollup-btn`);
//           eventRollupBtn.addEventListener(`click`, onEventRollupBtnClick); // вставил обработчика как для и ESC onEscKeyPress
//         }
//       });
//
//
//       this._totalPriceItem += tripItems[i].price; // затраты на точки маршрута
//
//       for (let item of tripItems[i].additionalOffers) { // обошел веь массив через of
//         this._totalPriceItem += item.price; // дополнительные затраты
//       }
//       // this._destinations.push(tripItems[i].destinationItem); // закинул все города которые были в точке маршрута
//       // this._startDateInfo.push(tripItems[i].dateStart);
//
//
//       // tripEventItemComponent.getElement(); здесь надо чет другое вставить
//       this._itemPresenter[tripItems[i].id] = tripEventItemComponent.getElement();
//
//       // не понимаю что за Object, думаю код не работает, но оставлю
//       const clearTaskList = () => {
//         Object
//           .values(this._itemPresenter)
//           .forEach((presenter) => presenter.destroy());
//         this._itemPresenter = {};
//       };
//
//
//       // добавил обработчик на звезду
//       tripEventItemComponent.setBtnFavariteClickHandler(() => {
//         const eventFavoriteBtn = tripEventItemComponent.getElement().querySelector(`.event__favorite-btn`);
//         if (eventFavoriteBtn.classList.contains(`event__favorite-btn--active`)) {
//           eventFavoriteBtn.classList.remove(`event__favorite-btn--active`);
//         } else {
//           eventFavoriteBtn.classList.add(`event__favorite-btn--active`);
//         }
//       })
//     }
//
//
//
// };
//
//
//
//
// const tripEventElement = document.querySelector(`.trip-events`);
// const tripPresenter = new Trip(tripEventElement);
//
// const renderSort = () => {
//   const tripEventsSortComponent = new TripEventsSortView(getTripEventsSort().sortItems);
//
//   renderElement(tripEventElement, tripEventsSortComponent, RenderPosition.BEFOREEND); // рендер сортировки
// };
//
// renderMenu();
// renderFilter();
// // renderSort();
// tripPresenter.init(tripItems);




// файл в котором будем рендерить все модули

import TripInfoView from "./view/trip-info.js";
import TripInfoCostView from "./view/trip-info-cost.js";
import TripFilterView from "./view/trip-filter.js";
import TripEventsSortView from "./view/trip-events-sort-view.js";
import TripEventEditFormView from "./view/trip-event-edit-form.js";
import TripEventsList from "./view/trip-events-list.js";
import TripEventItem from "./view/trip-event-item.js";

import {getTripEventItem} from "./mock/mock-trip-event-item.js";
import {getTripEventsSort} from "./mock/mock-trip-events-sort.js";

import {renderElement, RenderPosition} from "./util/render";

import TripMenuView from "./view/trip-menu.js";

import EventListEmptyMessageView from "./view/trip-event-msg.js";

const DATA_COUNT = 15;

const tripItems = new Array(DATA_COUNT).fill().map(getTripEventItem);
// Array создаем массив
// DATA_COUNT колличество эллементов в массиве, все они пустые и нужно их заполнить
// fill() метод заполняет эти элементы массива, теперь внутри там underfine
// map(tripEventItem) заполняет эти массивы методом map();

const tripMainElement = document.querySelector(`.trip-main`);
const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);

const renderMenu = () => {
  const visuallyHiddenFirstH2Element = tripControlsElement.querySelector(`h2.visually-hidden`); // нашли тег h2 и в
  // нем класс visually-hidden
  renderElement(visuallyHiddenFirstH2Element, new TripMenuView(), RenderPosition.AFTEREND); // рендер меню
};

const renderFilter = () => {
  renderElement(tripControlsElement, new TripFilterView(), RenderPosition.BEFOREEND); // рендер фильтр хедер
};

const tripEventElement = document.querySelector(`.trip-events`);
const renderSort = () => {
  const tripEventsSortComponent = new TripEventsSortView(getTripEventsSort().sortItems);

  renderElement(tripEventElement, tripEventsSortComponent, RenderPosition.BEFOREEND); // рендер сортировки
};

const renderEventList = () => {
  renderElement(tripEventElement, new TripEventsList(), RenderPosition.BEFOREEND);
};

// данные для рендера их на сайте
let totalPriceItem = 0;
let destinations = [];
let startDateInfo = [];

const renderEventItem = (tripItem) => {
  const tripEventsListElement = tripEventElement.querySelector(`.trip-events__list`);

    const tripEventItemComponent = new TripEventItem(tripItem);
    const tripEventEditComponent = new TripEventEditFormView(tripItem);

    // функция которая заменяет item маршрута на форму редоктирования
    const replaceItemToForm = () => {
      // через replaceChild не сработал
      // Эта функция у тебя не работала, потому что .replaceChild() ты должен вызывать на контейнере в котором находятся элементы должны замениться, в твоем случае - это tripEventsListElement
      // tripEventsListElement.replaceChild(tripEventEditComponent, tripEventItemComponent.getElement());
      tripEventItemComponent.getElement().replaceWith(tripEventEditComponent.getElement());
    };

    // функция которая из формы редоктирования делает предложение Item
    const replaceFormToItem = () => {
      tripEventEditComponent.getElement().replaceWith(tripEventItemComponent.getElement());
    };

    // обраотчик сохранения формы
    const onFormSubmit = () => {
      tripEventEditComponent.setSubmitHandler(() => {
        replaceFormToItem(); // замена формы на точку маршрута
        document.removeEventListener(`submit`, onFormSubmit); // удаление обработчика
        // Можно обработчики не удалять т.к. элемент удален. Удаляются только на document и нов созданный элемент
        // document.removeEventListener(`keydown`, onEscKeyPress); // удаление обработчика, если нажали на ESC
        // document.removeEventListener(`click`, onEventRollupBtnClick); // удаление обработчика
      });
    };

    // при удаление элемента из DOM все обработчики, которые есть на нем - тоже удаляются
    // Единственное, что тебе нужно удалять - это обработчики, которые ты вешаешь на document
    // или другие DOM элементы, которые остаются после удаления компонента


    // обраотчик который закрывается без сохранения формы
    const onEscKeyPress = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToItem(); // замена формы на точку маршрута
        document.removeEventListener(`keydown`, onEscKeyPress); // удаление обработчика, если нажали на ESC
        document.removeEventListener(`submit`, onFormSubmit); // удаление обработчика
        // Можно не удалять т.к. элемент удален
        // document.removeEventListener(`click`, onEventRollupBtnClick); // удаление обработчика
      }
    };
    const onEventRollupBtnClick = (evt) => {
      evt.preventDefault();
      replaceFormToItem(); // замена формы на точку маршрута
      document.removeEventListener(`keydown`, onEscKeyPress); // удаление обработчика, если нажали на ESC
      document.removeEventListener(`submit`, onFormSubmit); // удаление обработчика
      document.removeEventListener(`click`, onEventRollupBtnClick); // удаление обработчика
    };

    renderElement(tripEventsListElement, tripEventItemComponent, RenderPosition.BEFOREEND); // рендер точек
    // маршрута

    // код который рендерит форму при клике на стрелку вниз в item
    tripEventItemComponent.setClickHandler(() => { // установили метод setClickHandler

      replaceItemToForm();
      // при удалении элемента из дом обработчик можно не удалять
      onFormSubmit(); // ЭТОТ ОБРАБОТЧИК ДОБАВЛЯЕТСЯ ВСЕГДА ПРИ КЛИКЕ НА СТРЕЛКУ, НО ЕСЛИ НАЖИМАТЬ НА ESC, ТО
      // ОН НЕ УДАЛЯЕТСЯ, А БУДЕТ ТОЛЬКО ДОБАВЛЯЕТСЯ т.е. при нажати на esc его надо удалять. Также и в обратную
      // сторону нужно удалять обработчик на ESC. ОТВЕТ: Удален элемент, то и обработчики не нужно удалять.
      document.addEventListener(`keydown`, onEscKeyPress); // после клика на стрелку вставил обработчик на ESC

      if (tripEventsListElement.querySelector(`form`)) {
        const eventRollupBtn = tripEventEditComponent.getElement().querySelector(`.event__rollup-btn`);
        eventRollupBtn.addEventListener(`click`, onEventRollupBtnClick); // вставил обработчика как для и ESC onEscKeyPress
      }
    });


    totalPriceItem += tripItem.price; // затраты на точки маршрута

    for (let item of tripItem.additionalOffers) { // обошел веь массив через of
      totalPriceItem += item.price; // дополнительные затраты
    }
    destinations.push(tripItem.destinationItem); // закинул все города которые были в точке маршрута
    startDateInfo.push(tripItem.dateStart);
};

const renderEventItems = (tripItems) => {
  tripItems.forEach((item) => {
    renderEventItem(item);
  });
};


// функция которая выводит дистанцию дат и точек маршрута
const renderDestination = () => {
  renderElement(tripMainElement, new TripInfoView(destinations, startDateInfo), RenderPosition.AFTERBEGIN); // рендер промежкутка даты
};

// функция которая рендерит цену
const renderTotalCost = () => {
  const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
  renderElement(tripInfoElement, new TripInfoCostView(totalPriceItem), RenderPosition.BEFOREEND); // рендер цены
};

// функция которая выводить пустое сообщение если нет Item
const renderEmptyMessage = () => {
  const main = document.querySelector(`main`);
  const pageBodyContainer = main.querySelector(`.page-body__container`);
  main.removeChild(pageBodyContainer);
  renderElement(main, new EventListEmptyMessageView(), RenderPosition.BEFOREEND);
};

renderMenu();
renderFilter();
renderSort();
renderEventList();
if (tripItems.length) {
  renderEventItems(tripItems);

  // renderEventItem();
  renderDestination();
  renderTotalCost();
} else {
  renderEmptyMessage();
}























// // файл в котором будем рендерить все модули
//
// import TripInfoView from "./view/trip-info.js";
// import TripInfoCostView from "./view/trip-info-cost.js";
// import TripFilterView from "./view/trip-filter.js";
// import TripEventsSortView from "./view/trip-events-sort-view.js";
// import TripEventEditFormView from "./view/trip-event-edit-form.js";
// import TripEventsList from "./view/trip-events-list.js";
// import TripEventItem from "./view/trip-event-item.js";
//
// import {getTripEventItem} from "./mock/mock-trip-event-item.js";
// import {getTripEventsSort} from "./mock/mock-trip-events-sort.js";
//
// import {renderElement, RenderPosition} from "./util/render";
//
// import TripMenuView from "./view/trip-menu.js";
//
// import EventListEmptyMessageView from "./view/trip-event-msg.js";
//
// const DATA_COUNT = 15;
//
// const tripItems = new Array(DATA_COUNT).fill().map(getTripEventItem);
// // Array создаем массив
// // DATA_COUNT колличество эллементов в массиве, все они пустые и нужно их заполнить
// // fill() метод заполняет эти элементы массива, теперь внутри там underfine
// // map(tripEventItem) заполняет эти массивы методом map();
//
// const tripMainElement = document.querySelector(`.trip-main`);
// const tripControlsElement = tripMainElement.querySelector(`.trip-main__trip-controls`);
//
// const renderMenu = () => {
//   const visuallyHiddenFirstH2Element = tripControlsElement.querySelector(`h2.visually-hidden`); // нашли тег h2 и в
//   // нем класс visually-hidden
//   renderElement(visuallyHiddenFirstH2Element, new TripMenuView(), RenderPosition.AFTEREND); // рендер меню
// };
//
// const renderFilter = () => {
//   renderElement(tripControlsElement, new TripFilterView(), RenderPosition.BEFOREEND); // рендер фильтр хедер
// };
//
// const tripEventElement = document.querySelector(`.trip-events`);
// const renderSort = () => {
//   const tripEventsSortComponent = new TripEventsSortView(getTripEventsSort().sortItems);
//
//   renderElement(tripEventElement, tripEventsSortComponent, RenderPosition.BEFOREEND); // рендер сортировки
// };
//
// const renderEventList = () => {
//   renderElement(tripEventElement, new TripEventsList(), RenderPosition.BEFOREEND);
// };
//
// // данные для рендера их на сайте
// let totalPriceItem = 0;
// let destinations = [];
// let startDateInfo = [];
//
// const renderEventItem = () => {
//   const tripEventsListElement = tripEventElement.querySelector(`.trip-events__list`);
//
//   for (let i = 0; i < DATA_COUNT; i++) {
//     const tripEventItemComponent = new TripEventItem(tripItems[i]);
//     const tripEventEditComponent = new TripEventEditFormView(tripItems[i]);
//
//     // функция которая заменяет item маршрута на форму редоктирования
//     const replaceItemToForm = () => {
//       // через replaceChild не сработал
//       // Эта функция у тебя не работала, потому что .replaceChild() ты должен вызывать на контейнере в котором находятся элементы должны замениться, в твоем случае - это tripEventsListElement
//       // tripEventsListElement.replaceChild(tripEventEditComponent, tripEventItemComponent.getElement());
//       tripEventItemComponent.getElement().replaceWith(tripEventEditComponent.getElement());
//     };
//
//     // функция которая из формы редоктирования делает предложение Item
//     const replaceFormToItem = () => {
//       tripEventEditComponent.getElement().replaceWith(tripEventItemComponent.getElement());
//     };
//
//     // обраотчик сохранения формы
//     const onFormSubmit = () => {
//       tripEventEditComponent.setSubmitHandler(() => {
//         replaceFormToItem(); // замена формы на точку маршрута
//         document.removeEventListener(`submit`, onFormSubmit); // удаление обработчика
//         // Можно обработчики не удалять т.к. элемент удален. Удаляются только на document и нов созданный элемент
//         // document.removeEventListener(`keydown`, onEscKeyPress); // удаление обработчика, если нажали на ESC
//         // document.removeEventListener(`click`, onEventRollupBtnClick); // удаление обработчика
//       });
//     };
//
//     // при удаление элемента из DOM все обработчики, которые есть на нем - тоже удаляются
//     // Единственное, что тебе нужно удалять - это обработчики, которые ты вешаешь на document
//     // или другие DOM элементы, которые остаются после удаления компонента
//
//
//     // обраотчик который закрывается без сохранения формы
//     const onEscKeyPress = (evt) => {
//       if (evt.key === `Escape` || evt.key === `Esc`) {
//         evt.preventDefault();
//         replaceFormToItem(); // замена формы на точку маршрута
//         document.removeEventListener(`keydown`, onEscKeyPress); // удаление обработчика, если нажали на ESC
//         document.removeEventListener(`submit`, onFormSubmit); // удаление обработчика
//         // Можно не удалять т.к. элемент удален
//         // document.removeEventListener(`click`, onEventRollupBtnClick); // удаление обработчика
//       }
//     };
//     const onEventRollupBtnClick = (evt) => {
//       evt.preventDefault();
//       replaceFormToItem(); // замена формы на точку маршрута
//       document.removeEventListener(`keydown`, onEscKeyPress); // удаление обработчика, если нажали на ESC
//       document.removeEventListener(`submit`, onFormSubmit); // удаление обработчика
//       document.removeEventListener(`click`, onEventRollupBtnClick); // удаление обработчика
//     };
//
//     renderElement(tripEventsListElement, tripEventItemComponent, RenderPosition.BEFOREEND); // рендер точек
//     // маршрута
//
//     // код который рендерит форму при клике на стрелку вниз в item
//     tripEventItemComponent.setClickHandler(() => { // установили метод setClickHandler
//
//       replaceItemToForm();
//       // при удалении элемента из дом обработчик можно не удалять
//       onFormSubmit(); // ЭТОТ ОБРАБОТЧИК ДОБАВЛЯЕТСЯ ВСЕГДА ПРИ КЛИКЕ НА СТРЕЛКУ, НО ЕСЛИ НАЖИМАТЬ НА ESC, ТО
//       // ОН НЕ УДАЛЯЕТСЯ, А БУДЕТ ТОЛЬКО ДОБАВЛЯЕТСЯ т.е. при нажати на esc его надо удалять. Также и в обратную
//       // сторону нужно удалять обработчик на ESC. ОТВЕТ: Удален элемент, то и обработчики не нужно удалять.
//       document.addEventListener(`keydown`, onEscKeyPress); // после клика на стрелку вставил обработчик на ESC
//
//       if (tripEventsListElement.querySelector(`form`)) {
//         const eventRollupBtn = tripEventEditComponent.getElement().querySelector(`.event__rollup-btn`);
//         eventRollupBtn.addEventListener(`click`, onEventRollupBtnClick); // вставил обработчика как для и ESC onEscKeyPress
//       }
//     });
//
//
//     totalPriceItem += tripItems[i].price; // затраты на точки маршрута
//
//     for (let item of tripItems[i].additionalOffers) { // обошел веь массив через of
//       totalPriceItem += item.price; // дополнительные затраты
//     }
//     destinations.push(tripItems[i].destinationItem); // закинул все города которые были в точке маршрута
//     startDateInfo.push(tripItems[i].dateStart);
//   }
// };
//
// // функция которая выводит дистанцию дат и точек маршрута
// const renderDestination = () => {
//   renderElement(tripMainElement, new TripInfoView(destinations, startDateInfo), RenderPosition.AFTERBEGIN); // рендер промежкутка даты
// };
//
// // функция которая рендерит цену
// const renderTotalCost = () => {
//   const tripInfoElement = tripMainElement.querySelector(`.trip-main__trip-info`);
//   renderElement(tripInfoElement, new TripInfoCostView(totalPriceItem), RenderPosition.BEFOREEND); // рендер цены
// };
//
// // функция которая выводить пустое сообщение если нет Item
// const renderEmptyMessage = () => {
//   const main = document.querySelector(`main`);
//   const pageBodyContainer = main.querySelector(`.page-body__container`);
//   main.removeChild(pageBodyContainer);
//   renderElement(main, new EventListEmptyMessageView(), RenderPosition.BEFOREEND);
// };
//
// renderMenu();
// renderFilter();
// renderSort();
// renderEventList();
// if (DATA_COUNT > 0) {
//   renderEventItem();
//   renderDestination();
//   renderTotalCost();
// } else {
//   renderEmptyMessage();
// }
