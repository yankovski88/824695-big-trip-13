import {remove, renderElement, RenderPosition, replace} from "../util/render";
import TripEventEditFormView from "../view/trip-event-edit-form";
import TripEventItemView from "../view/trip-event-item";
import {UserAction, UpdateType, State} from "../const.js";


// 4 наблюдатель
const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Event {
  // changeData поддерживаем получение колбека _handleViewAction который приходит с наружи
  constructor(eventContainer, changeData, changeMode) { // поддерживаем колбек который приходит с наружи 5 наблюдатель
    this._eventContainer = eventContainer; // куда рендерить
    this._changeData = changeData; // нов. записываем в свойства класса
    this._changeMode = changeMode; // наблюдатель

    this._tripEventItemComponent = null;
    this._tripEventEditComponent = null;
    this._mode = Mode.DEFAULT; // наблюдатель. Изначально говорим режим дефолт

    this._destinations = [];

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._escKeyPressHandler = this._escKeyPressHandler.bind(this);
    this._onEventRollupBtnClick = this._onEventRollupBtnClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }

  init(tripItem, offers, pointDestinations) {
    this._tripItem = tripItem;
    this._offers = offers;
    this._pointDestinations = pointDestinations;
    // предыдущие компоненты будут null
    const prevTripEventItemComponent = this._tripEventItemComponent;
    const prevTripEventEditComponent = this._tripEventEditComponent;

    this._tripEventItemComponent = new TripEventItemView(this._tripItem); // виюха для item
    this._tripEventEditComponent = new TripEventEditFormView(this._tripItem, this._offers, this._pointDestinations); // вьюха для формы редоктирования

    this._tripEventEditComponent.setDeleteClickHandler(this._handleDeleteClick); // 6del установили обработчик на удаление
    this._tripEventEditComponent.setSubmitHandler(this._handleFormSubmit);

    this._tripEventItemComponent.setClickHandler(() => {
      this._replaceItemToForm();
      // при удалении элемента из дом обработчик можно не удалять. удалять на document и нов элемент обработчиком
    });

    // код который скрывает форму если кликнуть в форме редоктирования кнопку треугольник
    this._tripEventEditComponent.setRollupBtnHandler(() => {
      this._tripEventEditComponent.reset(this._tripItem); // код для удаления не сохраненных данных в форме
      this._replaceFormToItem();
    });

    // передали эти обработчики в соответствующие вьюхи
    this._tripEventItemComponent.setFavoriteClickHandler(this._handleFavoriteClick); // нужно сделать клик по favorite

    if (prevTripEventItemComponent === null || prevTripEventEditComponent === null) { // то компоненты не создавались

      renderElement(this._eventContainer, this._tripEventItemComponent, RenderPosition.BEFOREEND);
      return; // Идет прерывание функции init чтобы дальше не выполнялась
    }

    if (this._mode === Mode.DEFAULT) { // наблюдатель
      prevTripEventItemComponent.getElement().replaceWith(this._tripEventItemComponent.getElement());
    }

    if (this._mode === Mode.EDITING) { // наблюдатель
      prevTripEventEditComponent.getElement().replaceWith(this._tripEventItemComponent.getElement());
      this._mode = Mode.DEFAULT; // в местах где используем мод не завбываем его сбрасывать
    }

    // нужно удалить ссылку на предыдущий item
    remove(prevTripEventItemComponent);
    remove(prevTripEventEditComponent);
  }

  // метод по удалению event
  destroy() {
    remove(this._tripEventItemComponent);
    remove(this._tripEventEditComponent);
  }

  // наблюдатель
  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToItem();
    }
  }

  // задача этого компонента взять и засетить компоненту все эти флаги
  setViewState(state) {
    const resetFormState = () => {
      this._tripEventEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._tripEventEditComponent.updateData({
          isDisabled: true,
          isSaving: true,
        });
        break;
      case State.DELETING:
        this._tripEventEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._tripEventItemComponent.shake(resetFormState);
        this._tripEventEditComponent.shake(resetFormState);
        break;
    }
  }


  // функция которая заменяет item маршрута на форму редоктирования
  _replaceItemToForm() {
    replace(this._tripEventEditComponent, this._tripEventItemComponent);

    document.addEventListener(`keydown`, this._escKeyPressHandler);

    this._changeMode(); // наблюдатель. Сначала закрой везде Edit
    this._mode = Mode.EDITING; // наблюдатель. Потом добавь режим EDITING. Этот режим в init откроет редактирование
  }

  // функция которая из формы редоктирования делает предложение Item
  _replaceFormToItem() {
    replace(this._tripEventItemComponent, this._tripEventEditComponent);

    this._mode = Mode.DEFAULT; // наблюдатель. Текущий режим по умолчанию
  }


  // обраотчик сохранения формы
  _handleFormSubmit(update) {
    this._changeData( // Это обработчик с tripBoard this._handleEventChange в котором находится
        UserAction.UPDATE_POINT,
        UpdateType.MINOR, // идет обновление точки так что минор
        update); // update это данные которые будут добавлены во вьюхе this._dataItem
  }

  // обраотчик который закрывается без сохранения формы
  _escKeyPressHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._tripEventEditComponent.reset(this._tripItem); // код для удаления не сохраненных данных в форме
      this._replaceFormToItem();
    }
  }

  _onEventRollupBtnClick(evt) {
    evt.preventDefault();
    this._tripEventEditComponent.reset(this._tripItem); // код для удаления не сохраненных данных в форме
    this._replaceFormToItem(); // замена формы на точку маршрута
  }

  // этот метод вызывает _changeData который пришел из tripBoard _handleEventChange который является тоже методом
  // для изменения данных. Этому методу нужно сообщить измененные данные. И здесь эти данные будем менять!!!
  _handleFavoriteClick() {
    const addBtn = document.querySelector(`.trip-main__event-add-btn`);
    addBtn.removeAttribute(`disabled`);

    this._changeData( // и после замены сообщаем в changeData
        UserAction.UPDATE_POINT, // это говорит, что мы  только обновляем, а не удаляем или что-то добавляем.
        UpdateType.MINOR, // точка никуда не девается, а только помечается меняется или нет, так что это минор.
        Object.assign(
            {},
            this._tripItem, // берем текущий объект описывающий задачу
            {
              isFavorite: !this._tripItem.isFavorite // и меняем в нем признак избранности. isFavorite
              // и сообщить этот новый объект в _changeData
            }
        )
    );
  }

  _handleDeleteClick(point) {
    this._changeData( // этот тот метод который вызовет изменения в модели
        UserAction.DELETE_POINT, // передаем что хотим удалить
        UpdateType.MINOR, // что изменения минор
        point // ну и сам изменяемый элемент
    );
  }
}
