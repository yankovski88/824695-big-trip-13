// импортируем вью для event
// моки
import TripEventItem from "../view/trip-event-item.js"
import {renderElement, RenderPosition} from "../util/render";
import TripEventEditFormView from "../view/trip-event-edit-form";


export default class Event {
  constructor(eventContainer) {
    this._eventContainer = eventContainer;

    this._tripEventItemComponent = null;
    this._tripEventEditComponent = null;


    // данные для рендера их на сайте
    this._totalPriceItem = 0;
    this._destinations = [];
    this._startDateInfo = [];

    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onEscKeyPress = this._onEscKeyPress.bind(this);
    this._onEventRollupBtnClick = this._onEventRollupBtnClick.bind(this);
  }

  // удалили функцию и сделал методы для presentera
  init(tripItem) {
    this._tripItem = tripItem;
    this._tripEventItemComponent = new TripEventItem(this._tripItem); // виюха для item
    this._tripEventEditComponent = new TripEventEditFormView(this._tripItem); // вьюха для формы редоктирования

    this._replaceItemToForm();
    this._replaceFormToItem();

    renderElement(this._eventContainer, this._tripEventItemComponent, RenderPosition.BEFOREEND); // рендер точек
    // маршрута   tripEventsListElement

    // код который рендерит форму при клике на стрелку вниз в item
    this._tripEventItemComponent.setClickHandler(() => { // установили метод setClickHandler

      this._replaceItemToForm();
      // при удалении элемента из дом обработчик можно не удалять
      this._onFormSubmit(); // ЭТОТ ОБРАБОТЧИК ДОБАВЛЯЕТСЯ ВСЕГДА ПРИ КЛИКЕ НА СТРЕЛКУ, НО ЕСЛИ НАЖИМАТЬ НА ESC, ТО
      // ОН НЕ УДАЛЯЕТСЯ, А БУДЕТ ТОЛЬКО ДОБАВЛЯЕТСЯ т.е. при нажати на esc его надо удалять. Также и в обратную
      // сторону нужно удалять обработчик на ESC. ОТВЕТ: Удален элемент, то и обработчики не нужно удалять.
      document.addEventListener(`keydown`, this._onEscKeyPress); // после клика на стрелку вставил обработчик на ESC

      if (this._eventContainer.querySelector(`form`)) {
        const eventRollupBtn = this._tripEventEditComponent.getElement().querySelector(`.event__rollup-btn`);
        eventRollupBtn.addEventListener(`click`, this._onEventRollupBtnClick); // вставил обработчика как для и ESC
        // onEscKeyPress
      }
    });
  }

  // функция которая заменяет item маршрута на форму редоктирования
  _replaceItemToForm() {
    // через replaceChild не сработал
    // Эта функция у тебя не работала, потому что .replaceChild() ты должен вызывать на контейнере в котором находятся элементы должны замениться, в твоем случае - это tripEventsListElement
    // tripEventsListElement.replaceChild(tripEventEditComponent, tripEventItemComponent.getElement());
    this._tripEventItemComponent.getElement().replaceWith(this._tripEventEditComponent.getElement());
  };

  // функция которая из формы редоктирования делает предложение Item
  _replaceFormToItem() {
    this._tripEventEditComponent.getElement().replaceWith(this._tripEventItemComponent.getElement());
  };


  // обраотчик сохранения формы
  _onFormSubmit() {
    console.log(this._tripEventEditComponent);
    this._tripEventEditComponent.setSubmitHandler(() => {
      this._replaceFormToItem(); // замена формы на точку маршрута
      document.removeEventListener(`submit`, this._onFormSubmit); // удаление обработчика
      // Можно обработчики не удалять т.к. элемент удален. Удаляются только на document и нов созданный элемент
      // document.removeEventListener(`keydown`, onEscKeyPress); // удаление обработчика, если нажали на ESC
      // document.removeEventListener(`click`, onEventRollupBtnClick); // удаление обработчика
    });
  };

  // при удаление элемента из DOM все обработчики, которые есть на нем - тоже удаляются
  // Единственное, что тебе нужно удалять - это обработчики, которые ты вешаешь на document
  // или другие DOM элементы, которые остаются после удаления компонента


  // обраотчик который закрывается без сохранения формы
  _onEscKeyPress(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToItem(); // замена формы на точку маршрута
      document.removeEventListener(`keydown`, this._onEscKeyPress); // удаление обработчика, если нажали на ESC
      document.removeEventListener(`submit`, this._onFormSubmit); // удаление обработчика
      // Можно не удалять т.к. элемент удален
      // document.removeEventListener(`click`, onEventRollupBtnClick); // удаление обработчика
    }
  };

  _onEventRollupBtnClick(evt) {
    evt.preventDefault();
    this._replaceFormToItem(); // замена формы на точку маршрута
    document.removeEventListener(`keydown`, this._onEscKeyPress); // удаление обработчика, если нажали на ESC
    document.removeEventListener(`submit`, this._onFormSubmit); // удаление обработчика
    document.removeEventListener(`click`, this._onEventRollupBtnClick); // удаление обработчика
  };
}
