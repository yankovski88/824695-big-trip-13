import AddNewPointView from "../view/add-new-point.js";
import {remove, renderElement, RenderPosition} from "../util/render";
import {UserAction, UpdateType} from "../const.js";

export default class PointNew {
  // changeData поддерживаем получение колбека _handleViewAction который приходит с наружи
  constructor(eventContainer, changeData, offers, destinations) { // поддерживаем колбек который приходит с наружи, 5 наблюдатель changeMode
    this._eventContainer = eventContainer; // куда рендерить
    this._changeData = changeData; // нов. записываем в свойства класса
    this._offers = offers;
    this._destinations = destinations;
    this._addNewPointComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyPressHandler = this._escKeyPressHandler.bind(this);
    this._handleCanselClick = this._handleCanselClick.bind(this);
    this._addBtn = document.querySelector(`.trip-main__event-add-btn`);
  }

  init() {
    if (this._addNewPointComponent !== null) {
      return;
    }

    this._addNewPointComponent = new AddNewPointView(this._offers, this._destinations); // вьюха для формы редоктирования tripItem
    this._addNewPointComponent.setSubmitHandler(this._handleFormSubmit); // установили обработчик на удаление
    this._addNewPointComponent.setCancelHandler(this._handleCanselClick); // установили обработчик на удаление

    renderElement(this._eventContainer, this._addNewPointComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyPressHandler);
  }

  // метод по удалению event
  destroy() {
    if (this._addNewPointComponent === null) {
      return;
    }

    remove(this._addNewPointComponent);
    this._addNewPointComponent = null;

    document.removeEventListener(`keydown`, this._escKeyPressHandler);
  }

  // засетить компоненту добавления задачи дизейблы
  setSaving() {
    this._addNewPointComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._addNewPointComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._addNewPointComponent.shake(resetFormState);
  }

  // обраотчик сохранения формы
  _handleFormSubmit(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        point
    );

    this._addBtn.removeAttribute(`disabled`);
  }

  // обраотчик который закрывается без сохранения формы
  _escKeyPressHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._addBtn.removeAttribute(`disabled`);
      this.destroy();
    }
  }

  _handleCanselClick() {
    this._addBtn.removeAttribute(`disabled`);
    this.destroy();
  }
}
