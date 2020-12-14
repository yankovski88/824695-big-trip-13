// импортируем вью для event
// моки
import TripEventItem from "../view/trip-event-item.js"
import {renderElement, RenderPosition} from "../util/render";
import TripEventEditFormView from "../view/trip-event-edit-form";


export default class Event {
  constructor(eventContainer) {
    this._eventContainer = eventContainer;

    // данные для рендера их на сайте
    this._totalPriceItem = 0;
    this._destinations = [];
    this._startDateInfo = [];
  }

  init(tripItem) {
    this._renderEventItem(tripItem);
  }

  _renderEventItem(tripItem) {


    // const renderEventItem = (tripItem) => {
    //   const tripEventsListElement = tripEventElement.querySelector(`.trip-events__list`);

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

    renderElement(this._eventContainer, tripEventItemComponent, RenderPosition.BEFOREEND); // рендер точек
    // маршрута   tripEventsListElement

    // код который рендерит форму при клике на стрелку вниз в item
    tripEventItemComponent.setClickHandler(() => { // установили метод setClickHandler

      replaceItemToForm();
      // при удалении элемента из дом обработчик можно не удалять
      onFormSubmit(); // ЭТОТ ОБРАБОТЧИК ДОБАВЛЯЕТСЯ ВСЕГДА ПРИ КЛИКЕ НА СТРЕЛКУ, НО ЕСЛИ НАЖИМАТЬ НА ESC, ТО
      // ОН НЕ УДАЛЯЕТСЯ, А БУДЕТ ТОЛЬКО ДОБАВЛЯЕТСЯ т.е. при нажати на esc его надо удалять. Также и в обратную
      // сторону нужно удалять обработчик на ESC. ОТВЕТ: Удален элемент, то и обработчики не нужно удалять.
      document.addEventListener(`keydown`, onEscKeyPress); // после клика на стрелку вставил обработчик на ESC

      if (this._eventContainer.querySelector(`form`)) {
        const eventRollupBtn = tripEventEditComponent.getElement().querySelector(`.event__rollup-btn`);
        eventRollupBtn.addEventListener(`click`, onEventRollupBtnClick); // вставил обработчика как для и ESC onEscKeyPress
      }
    });


    this._totalPriceItem += tripItem.price; // затраты на точки маршрута

    for (let item of tripItem.additionalOffers) { // обошел веь массив через of
      this._totalPriceItem += item.price; // дополнительные затраты
    }
    this._destinations.push(tripItem.destinationItem); // закинул все города которые были в точке маршрута
    this._startDateInfo.push(tripItem.dateStart);
  };


  // }
}
