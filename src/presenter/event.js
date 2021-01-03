// импортируем вью для event
import {remove, renderElement, RenderPosition} from "../util/render";
import TripEventEditFormView from "../view/trip-event-edit-form";
import TripEventItemView from "../view/trip-event-item";

// 4 наблюдатель
const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export default class Event {
  // changeData поддерживаем получение колбека _handleEventChange который приходит с наружи
  constructor(eventContainer, changeData, changeMode) { // поддерживаем колбек который приходит с наружи   // 5 наблюдатель
    this._eventContainer = eventContainer;
    this._changeData = changeData; // 3 нов. записываем в свойства класса
    this._changeMode = changeMode; // 6 наблюдатель

    this._tripEventItemComponent = null;
    this._tripEventEditComponent = null;
    this._mode = Mode.DEFAULT; // 7 наблюдатель. Изначально говорим режим дефолт

    this._totalPriceItem = 0;
    this._destinations = [];
    this._startDateInfo = [];

    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._onEscKeyPress = this._onEscKeyPress.bind(this);
    this._onEventRollupBtnClick = this._onEventRollupBtnClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(tripItem) {
    this._tripItem = tripItem;


    // предыдущие компоненты будут null
    const prevTripEventItemComponent = this._tripEventItemComponent;
    const prevTripEventEditComponent = this._tripEventEditComponent;

    this._tripEventItemComponent = new TripEventItemView(this._tripItem); // виюха для item
    this._tripEventEditComponent = new TripEventEditFormView(this._tripItem); // вьюха для формы редоктирования

    // код который рендерит форму при клике на стрелку вниз в item
    this._tripEventItemComponent.setClickHandler(() => {
      this._replaceItemToForm();

      // при удалении элемента из дом обработчик можно не удалять. удалять на document и нов элемент обработчиком
      this._onFormSubmit(tripItem);
    });

    // код который скрывает форму если кликнуть в форме редоктирования кнопку треугольник
    this._tripEventEditComponent.setRollupBtnHandler(()=>{
      this._tripEventEditComponent.reset(this._tripItem); // код для удаления не сохраненных данных в форме
      this._replaceFormToItem();
    });

    // код который скрывает форму при клике на кенсел
    this._tripEventEditComponent.setCancelHandler(() => {
      this._tripEventEditComponent.reset(this._tripItem); // код для удаления не сохраненных данных в форме
      this._replaceFormToItem();
    });

    // передали эти обработчики в соответствующие вьюхи
    this._tripEventItemComponent.setFavoriteClickHandler(this._handleFavoriteClick); // нужно сделать клик по favorite

    if (prevTripEventItemComponent === null || prevTripEventEditComponent === null) { // то компоненты не создавались
      renderElement(this._eventContainer, this._tripEventItemComponent, RenderPosition.BEFOREEND);
      return; // Идет прерывание функции init чтобы дальше не выполнялась
    }

    if (this._mode === Mode.DEFAULT) { // 8 наблюдатель
      prevTripEventItemComponent.getElement().replaceWith(this._tripEventItemComponent.getElement());
    }

    if (this._mode === Mode.EDITING) { // 9 наблюдатель
      prevTripEventEditComponent.getElement().replaceWith(this._tripEventEditComponent.getElement());
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

  // 10 наблюдатель
  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToItem();
    }
  }

  // функция которая заменяет item маршрута на форму редоктирования
  _replaceItemToForm() {
    this._tripEventItemComponent.getElement().replaceWith(this._tripEventEditComponent.getElement());
    document.addEventListener(`keydown`, this._onEscKeyPress);

    this._changeMode(); // 11 наблюдатель. Сначала закрой везде Edit
    this._mode = Mode.EDITING; // 12 наблюдатель. Потом добавь режим EDITING. Этот режим в init откроет редактирование
  }

  // функция которая из формы редоктирования делает предложение Item
  _replaceFormToItem() {
    this._tripEventEditComponent.getElement().replaceWith(this._tripEventItemComponent.getElement());
    document.removeEventListener(`keydown`, this._onEscKeyPress);
    document.removeEventListener(`submit`, this._onFormSubmit);
    document.removeEventListener(`click`, this._onEventRollupBtnClick);

    this._mode = Mode.DEFAULT; // 13 наблюдатель. Текущий режим по умолчанию
  }

  // обраотчик сохранения формы
  _onFormSubmit() {
    this._tripEventEditComponent.setSubmitHandler((dataItem) => {
      this._changeData(dataItem); // 10 Это обработчик с tripBoard this._handleEventChange в котором находится
      // редоктируемый task
      this._replaceFormToItem(); // замена формы на точку маршрута
    });
  }

  // обраотчик который закрывается без сохранения формы
  _onEscKeyPress(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._tripEventEditComponent.reset(this._tripItem); // код для удаления не сохраненных данных в форме
      this._replaceFormToItem();
    }
  }

  _onEventRollupBtnClick() { // evt
    // console.log(`click`);
    // evt.preventDefault();
    this._tripEventEditComponent.reset(this._tripItem); // код для удаления не сохраненных данных в форме
    this._replaceFormToItem(); // замена формы на точку маршрута
  }

  // этот метод вызывает _changeData который пришел из tripBoard _handleEventChange который является тоже методом
  // для изменения данных. Этому методу нужно сообщить измененные данные. И здесь эти данные будем менять!!!
  _handleFavoriteClick() {
    this._changeData( // и после замены сооббщаем в changeData
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

}
