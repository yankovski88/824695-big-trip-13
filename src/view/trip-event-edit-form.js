import dayjs from "dayjs";
import SmartView from "./smart.js";

// import AbstractView from "./abstract.js";


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
  const {description, photos, dateStart, dateFinish, price, destinationItem, type, additionalAllOffers} = dataItem; // additionalOffers


  // генерирует разметку фоток
  const createEventPhotoTemplate = () => {
    return photos.reduce((total, element) => { // перебрал все элементы photos и присоединил их в total
      return total + `<img class="event__photo" src="${element}" alt="Event photo">`;
    }, ``);
  };

  // добавление кнопки вверх
  const createEventRollupBtn = () => {
    return `<button class="event__rollup-btn" type="button">
         <span class="visually-hidden">Open event</span>
      </button>`;
  };


  // функция по отрисовке фрагмента всех преимуществ
  const getOffersTemplate = (additionalOffers) => {

    return additionalOffers.reduce((total, element) => {
      return total + `
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${element.id}" type="checkbox" name="event-offer-luggage"  ${
  element.check === 0 ? `` : `checked`
}>
                        
                            <label class="event__offer-label" for="event-offer-luggage-${element.id}">
                          <span class="event__offer-title">${element.offer}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${element.price}</span>
                        </label>
                      </div>`;
    }, ``);
  };

  const createTime = createFieldTime(dateStart, dateFinish);

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
                          <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" checked>
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
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destinationItem}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="Geneva"></option>
                      <option value="Chamonix"></option>
                    </datalist>
                  </div>

   ${createTime }

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro; ${price}
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
                    
     ${getOffersTemplate(additionalAllOffers)}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>

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
    // this._data = TripEventEditFormView.parseDataItemToData(dataItem);     // 0 превращаем объект dataItem в объект data т.к. он более полный


    this._submitHandler = this._submitHandler.bind(this);

    this._changePriceHandler = this._changePriceHandler.bind(this); // бинд по замене price
    // 4
    this._changeDateStartHandler = this._changeDateStartHandler.bind(this);
    this._changeDateEndHandler = this._changeDateEndHandler.bind(this);
    this._changeDestinationHandler = this._changeDestinationHandler.bind(this);
    this._eventChangeOfferHandler = this._eventChangeOfferHandler.bind(this);

    // this._eventInputPrice = this.getElement().querySelector(`.event__input--price`);
    // this._eventInputPrice.addEventListener(`change`, this._changePriceHandler)
    // // this.getElement() это класс с itema c формой редоктирования в внутри

    this._setInnerHandlers();

  }

  getTemplate() {
    return createTripEventEditForm(this._dataItem);
  }


  // // 2
  // // метод updateData, который будет обновлять данные в свойстве dataItem
  // updateData(update) { // метод принимает то (update), что нужно в этом dataItem обновить // justDataUpdating
  //   if (!update) { // если нет обновлений
  //     return; // то прекратить выполнение функции т.е. не обновлять
  //   }
  //
  //   this._dataItem = Object.assign( // изменяем данные которые пришли
  //       {}, // создаем объект*
  //       this._dataItem, // проходим по старым данным*
  //       update // и заменяем новыми*
  //   );
  //   // if(update){ // поля ввода сами умеют перерисовываться и за этого не нужно обновлять елемент
  //   //   return;
  //   // }
  //
  //   this.updateElement(); // вызываем обновить элемент
  // }
  //
  // // 1
  // // Объявим метод updateElement, его задача удалить старый DOM элемент, вызвать генерацию нового и заменить один на другой
  // updateElement() {
  //   let prevElement = this.getElement(); // сохранили изначальную(предыдущую) форму редактирования
  //   const parent = prevElement.parentElement; // сохранили родительский элементе формы edite
  //   this.removeElement(); // удаляем элемент Edit который сейчас создан данными
  //
  //   const newElement = this.getElement(); // получаем новый элемент с новыми данными
  //   parent.replaceChild(newElement, prevElement); // заменяем старый элемент Edit на новый
  //
  //   // 6
  //   this.restoreHandlers(); // вызвали публичную функцию по востонавлению всех обработчиков
  // }

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
    this._eventInputPrice.addEventListener(`change`, this._changePriceHandler); // input
    // this.getElement() это класс с itema c формой редоктирования в внутри

    this._eventInputStartTime = this.getElement().querySelector(`#event-start-time-1`);
    this._eventInputStartTime.addEventListener(`change`, this._changeDateStartHandler); // input

    this._eventInputEndTime = this.getElement().querySelector(`#event-end-time-1`);
    this._eventInputEndTime.addEventListener(`change`, this._changeDateEndHandler); // input

    this._eventInputDestination = this.getElement().querySelector(`.event__input--destination`);
    this._eventInputDestination.addEventListener(`change`, this._changeDestinationHandler); // input

    this._eventChangeOffer = this.getElement().querySelector(`.event__available-offers`);
    this._eventChangeOffer.addEventListener(`change`, this._eventChangeOfferHandler);

  }


  _changePriceHandler(evt) { // оброботчик в котором будем менять данные по цене
    evt.preventDefault();
    this.updateData({ // передаем только одну строчку которую хотим обновить т.к. assign создано выше
      price: evt.target.value // 12 // this._dataItem.price
    }); // true
  }

  // // 3.1.
  _changeDateStartHandler(evt) {
    evt.preventDefault();
    this.updateData({
      dateStart: evt.target.value
    });
  }

  _changeDateEndHandler(evt) {
    evt.preventDefault();
    this.updateData({
      dateFinish: evt.target.value
    });
  }

  _changeDestinationHandler(evt) {
    evt.preventDefault();
    this.updateData({
      destinationItem: evt.target.value
    });
  }

  _eventChangeOfferHandler(evt) {
    evt.preventDefault();
    // this.updateData({
    //   additionalAllOffers[0].check: !0
    // })
  }

  // 8
  reset() {
    this.updateData(
        this._dataItem);
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
