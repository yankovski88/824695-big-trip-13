// импортируем вью для event
import AddNewPointView from "../view/add-new-point.js";
import {generateId} from "../mock/mock-trip-event-item.js"; // 24
import {remove, renderElement, RenderPosition} from "../util/render";
import {UserAction, UpdateType} from "../const.js"; // 24
// import {generateId} from "../util/point.js";


export default class PointNewPresenter {
  // changeData поддерживаем получение колбека _handleViewAction который приходит с наружи
  constructor(eventContainer, changeData, offers, destinations) { // поддерживаем колбек который приходит с наружи   // 5 наблюдатель changeMode
    this._eventContainer = eventContainer; // куда рендерить
    this._changeData = changeData; // 3 нов. записываем в свойства класса
    this._offers = offers;
    this._destinations = destinations;
    this._addNewPointComponent = null;

    // this._destroyCallback = null; // stat

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._onEscKeyPress = this._onEscKeyPress.bind(this);
    this._handleCanselClick = this._handleCanselClick.bind(this); // 7del
    this._addBtn = document.querySelector(`.trip-main__event-add-btn`);

  }

  init(tripItem) { // tripItem stat callback
    // this._destroyCallback = callback; // stat

    if (this._addNewPointComponent !== null) {
      return;
    }

    this._addNewPointComponent = new AddNewPointView(this._offers, this._destinations); // вьюха для формы редоктирования tripItem
    this._addNewPointComponent.setSubmitHandler(this._handleFormSubmit); // 6del установили обработчик на удаление
    this._addNewPointComponent.setCancelHandler(this._handleCanselClick); // 6del установили обработчик на удаление

    renderElement(this._eventContainer, this._addNewPointComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._onEscKeyPress);
  }

  // метод по удалению event
  destroy() {
    if (this._addNewPointComponent === null) {
      return;
    }

    // if (this._destroyCallback !== null) { // stat
    //   this._destroyCallback();
    // }

    remove(this._addNewPointComponent);
    this._addNewPointComponent = null;

    document.removeEventListener(`keydown`, this._onEscKeyPress);
  }



  // обраотчик сохранения формы
  _handleFormSubmit(point) {
    debugger
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
      point
        // Пока у нас нет сервера, который бы после сохранения
        // выдывал честный id задачи, нам нужно позаботиться об этом самим
        // Object.assign({id: generateId()}, point)
    );

    this._addBtn.removeAttribute(`disabled`);
    this.destroy();
  }

  // обраотчик который закрывается без сохранения формы
  _onEscKeyPress(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._addBtn.removeAttribute(`disabled`);
      this.destroy();
    }
  }

  _handleCanselClick() { // 8del
    this._addBtn.removeAttribute(`disabled`);
    this.destroy();
  }
}
