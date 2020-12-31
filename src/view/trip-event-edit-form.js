import dayjs from "dayjs";
import SmartView from "./smart.js";
import {destinations, dataOffers} from "../mock/mock-trip-event-item.js";

// функция по установке времени в форме
const createFieldTime = (dateStart, dateFinish) => {
  // установка формата времени
  const startTime = dayjs(dateStart).format(`DD/MM/YY HH:mm`);
  const finishTime = dayjs(dateFinish).format(`DD/MM/YY HH:mm`);

  return `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
    &mdash;
<label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${finishTime}">
    </div>`;
};

// функция по отрисовке всей формы
const createTripEventEditForm = (dataItem) => { // сюда попадают данные и запоняется шаблон
  const {dateFrom, dateTo, destination, basePrice, type, offers, editFormOffers} = dataItem; // additionalOffers, photos,

  // генерирует разметку фоток
  const createEventPhotoTemplate = () => {
    return destination.pictures.reduce((total, element) => { // перебрал все элементы photos и присоединил их в total
      return total + `<img class="event__photo" src="${element.src}" alt="${element.description}">`;
    }, ``);
  };

  // добавление кнопки вверх
  const createEventRollupBtn = () => {
    return `<button class="event__rollup-btn" type="button">
         <span class="visually-hidden">Open event</span>
      </button>`;
  };


  // функция по отрисовке фрагмента всех преимуществ
  const getOffersTemplate = (formOffers) => {

    return formOffers.reduce((total, element) => {

      // код который сравнивает два массива и если совподающие объекты, то возвращает true
      const getCoincidence = () => {
        let isItem;
        for (let item of offers) {
          if (item === element) {
            isItem = true;
          }
        }
        return isItem;
      };

      if (element.title !== ``) {
        return total + `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${element.title}" type="checkbox" name="event-offer-luggage"  
${getCoincidence() !== true ? `` : `checked`}
>
                            <label class="event__offer-label" for="event-offer-luggage-${element.title}">
                          <span class="event__offer-title">${element.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${element.price}</span>
                        </label>
                      </div>`;
      } else {
        return total + ``;
      }
    }, ``);


  };

  const createTime = createFieldTime(dateFrom, dateTo);

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                    <div class="event__type-list">
                                <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

                        <div class="event__type-item">
                          <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                          <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                          <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                          <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                          <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                          <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                          <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
                          <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                          <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                          <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                        </div>

                        <div class="event__type-item">
                          <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                          <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                        </div>
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

   ${createTime}

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro; ${basePrice}
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
    ${createEventRollupBtn()}
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                    
     ${getOffersTemplate(editFormOffers)}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${destination.description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                      ${createEventPhotoTemplate()}
                  
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>
`;
};


export default class TripEventEditFormView extends SmartView { // AbstractView
  constructor(dataItem) {
    super();
    this._dataItem = dataItem;
    this._destinations = destinations;
    // this._data = TripEventEditFormView.parseDataItemToData(dataItem);     // 0 превращаем объект dataItem в объект data т.к. он более полный


    this._submitHandler = this._submitHandler.bind(this);

    this._changePriceHandler = this._changePriceHandler.bind(this); // бинд по замене price
    // 4
    this._changeDateStartHandler = this._changeDateStartHandler.bind(this);
    this._changeDateEndHandler = this._changeDateEndHandler.bind(this);
    this._changeDestinationHandler = this._changeDestinationHandler.bind(this);
    this._eventChangeOfferHandler = this._eventChangeOfferHandler.bind(this);
    this._eventChangeTypeHandler = this._eventChangeTypeHandler.bind(this);

    this._setInnerHandlers();

  }

  getTemplate() {
    return createTripEventEditForm(this._dataItem);
  }

  // 5
  // публичный метод который заново навешивает обработчики
  restoreHandlers() {
    this._setInnerHandlers(); // востанавливаем приватные обработчики
    this.setSubmitHandler(this._callback.submit); // востанавливаем внешние обработчики. вызвали обработчик который был сохранен в объекте.
    // console.log(this._callback); // внутри только submit
  }


  // 3
  // обработчик который заново навешивает внутрение обработчики
  _setInnerHandlers() {
    this._eventInputPrice = this.getElement().querySelector(`.event__input--price`);
    this._eventInputPrice.addEventListener(`input`, this._changePriceHandler); // input
    // this.getElement() это класс с itema c формой редоктирования в внутри

    this._eventInputStartTime = this.getElement().querySelector(`#event-start-time-1`);
    this._eventInputStartTime.addEventListener(`change`, this._changeDateStartHandler); // input

    this._eventInputEndTime = this.getElement().querySelector(`#event-end-time-1`);
    this._eventInputEndTime.addEventListener(`change`, this._changeDateEndHandler); // input

    this._eventInputDestination = this.getElement().querySelector(`.event__input--destination`);
    this._eventInputDestination.addEventListener(`change`, this._changeDestinationHandler); // input

    this._eventChangeOffer = this.getElement().querySelector(`.event__available-offers`); // удаление или добавление offer
    this._eventChangeOffer.addEventListener(`change`, this._eventChangeOfferHandler);

    this._eventChangeOffer = this.getElement().querySelector(`.event__type-group`);
    this._eventChangeOffer.addEventListener(`input`, this._eventChangeTypeHandler);
  }


  _changePriceHandler(evt) { // оброботчик в котором будем менять данные по цене
    evt.preventDefault();
    this.updateData({ // передаем только одну строчку которую хотим обновить т.к. assign создано выше
      basePrice: evt.target.value // 12 // this._dataItem.price
    }, true); // при нажатии enter закрывается форма
  }

  // // 3.1.
  _changeDateStartHandler(evt) {
    evt.preventDefault();
    this.updateData({
      dateFrom: evt.target.value
    }, true);
  }

  _changeDateEndHandler(evt) {
    evt.preventDefault();
    this.updateData({
      dateTo: evt.target.value
    }, true);
  }

  _changeDestinationHandler(evt) {
    evt.preventDefault();

    // код по замене всех данных объекта destination на тот который выбрал пользователь
    const getChangeDestination = (target) => { // target цель выбора пользователя
      for (let item of destinations) { // прохождение по массиву всех объектов. destinations передали импортом
        if (target === item.name) { // когда найдется выбор пользователя в нашем массиве
          this.updateData(this._dataItem.destination = item); // то заменить прошлые данные на новый объект
        }
      }
    };
    getChangeDestination(evt.target.value);
  }

  _eventChangeOfferHandler(evt) {
    evt.preventDefault();
    // this.updateData({
    //   additionalAllOffers[0].check: !0
    // })
  }

  _eventChangeTypeHandler(evt) {
    evt.preventDefault();

    // код по замене всех данных объекта offers на тот который выбрал пользователь
    const getChangeOffers = (target) => { // target цель выбора пользователя
      for (let item of dataOffers) { // прохождение по массиву всех объектов. offers массив всех доп предложений

        if (target === item.type.toLowerCase()) { // когда найдется выбор пользователя в нашем массиве
          this.updateData(this._dataItem.type = item.type);
          this.updateData(this._dataItem.editFormOffers = item.offers);
          // this.updateData(this._dataItem.offers = item.offers); // код который перерисует, что выбрал ползьвавтель из offer в event

          // this.updateData(this._dataItem.offers[0].offers = item.offers);
          // this.updateData(this._dataItem.offers = item); // Не получилось одной строчкой заменить
        }
      }
    };
    getChangeOffers(evt.target.value);
  }

  // 8
  reset(dataStart) { // обнуляет данные до стартовых которые пришли в tripBoard
    this.updateData(
        dataStart
    );
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submit(this._dataItem);
  }


  // установим публичный обработчик на отправку формы
  setSubmitHandler(callback) {
    this._callback.submit = callback;

    const formEditEvent = this.getElement().querySelector(`form`);
    formEditEvent.addEventListener(`submit`, this._submitHandler);

  }
}
