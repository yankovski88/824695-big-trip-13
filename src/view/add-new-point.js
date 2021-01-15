import dayjs from "dayjs";
import SmartView from "./smart.js";
import {destinations, dataOffers, TYPES} from "../mock/mock-trip-event-item.js";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

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

  // const isDateValid = ()=>{
  //   return dateFrom < dateTo
  // };

  // генерирует разметку фоток
  const createEventPhotoTemplate = () => {
    return destination.pictures.reduce((total, element) => { // перебрал все элементы photos и присоединил их в total
      return total + `<img class="event__photo" src="${element.src}" alt="${element.description}">`;
    }, ``);
  };

  // // добавление кнопки вверх
  // const createEventRollupBtn = () => {
  //   return `<button class="event__rollup-btn" type="button">
  //        <span class="visually-hidden">Open event</span>
  //     </button>`;
  // };


  // функция по отрисовке фрагмента всех преимуществ
  const getOffersTemplate = (formOffers) => {

    return formOffers.reduce((total, element) => {

      // // код который сравнивает два массива и если совподающие объекты, то возвращает true
      const isActive = offers.some((el) => {
        return el === element;
      });

      if (element.title !== ``) {
        return total + `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${element.title}" type="checkbox" name="event-offer-luggage"  
${isActive ? `checked` : ``}>
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


  // код рисут список type
  const getEditType = (types) => {
    return types.reduce((total, element)=>{
      const isActiveType = [type].some((el) => {
        return el === element;
      });
      return total + `<div class="event__type-item">
                          <input ${isActiveType ? `checked` : ``}  id="event-type-${element.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element.toLowerCase()}" >
                          <label class="event__type-label  event__type-label--${element.toLowerCase()}" for="event-type-${element.toLowerCase()}-1">${element}</label>
                        </div>`;
    }, ``);
  };


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

       ${getEditType(TYPES)}
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
                      &euro; 
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
                  </div>
<!--{isDateValid() ?  : disabled}-->
                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
<button class="event__reset-btn" type="reset">Cansel</button>
  
                  <!--<button class="event__reset-btn" type="reset"> Cancel</button>-->
    <!--{createEventRollupBtn()}-->
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


export default class AddNewPointView extends SmartView { // AbstractView
  constructor(dataItem) {
    super();
    this._destinations = destinations;
    this._dataItem = AddNewPointView.parseDataItemToData(dataItem); // 0 превращаем объект dataItem в объект data т.к. он более полный, было this._dataItem = dataItem;
    this._datepickerFinish = null; // 1 здесь будем хранить экземпляр _datepicker т.е. открытый показанный _datepicker. Это нужно для того чтобы потом можно после закрытия формы удалить.
    this._datepickerStart = null;
    this._dateFrom = this._dataItem.dateFrom;
    this._dateTo = this._dataItem.dateTo;

    this._submitHandler = this._submitHandler.bind(this);
    this._cancelClickHandler = this._cancelClickHandler.bind(this);
    // 4
    this._changePriceHandler = this._changePriceHandler.bind(this); // бинд по замене price
    this._changeDestinationHandler = this._changeDestinationHandler.bind(this);
    this._eventChangeOfferHandler = this._eventChangeOfferHandler.bind(this);
    this._eventChangeTypeHandler = this._eventChangeTypeHandler.bind(this);
    // this._rollupBtnClickHandler = this._rollupBtnClickHandler.bind(this);
    this._dueFinishDateChangeHandler = this._dueFinishDateChangeHandler.bind(this); // 2 заведем обработчик на _datepicker
    this._dueStartDateChangeHandler = this._dueStartDateChangeHandler.bind(this); // 2 заведем обработчик на _datepicker
    // this._isDateValid = this._isDateValid.bind(this); // 2 заведем обработчик на _datepicker
    // this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this); // 1del


    this._setInnerHandlers(); // обновляем внутренние обработчики
    this._setDatepickerStart(); // 4 устанавливаем _setDatepicker с помощью пакета flatpickr
    this._setDatepickerFinish(); // 4 устанавливаем _setDatepicker с помощью пакета flatpickr

  }
  // 0.1
  // парсим типа, создаем копию данных с дополниетельным данными
  static parseDataItemToData(dataItem) {
    return Object.assign(
      {},
      dataItem
      // {isDueDate: task.dueDate !== null,}
    );
  }

  // 0.2 берем все данные которые накликал пользователь в форме редоктирвоания event. Далее эти данные отправим на перерисовку event.
  static parseDataToDataItem(data) {
    data = Object.assign({}, data);
    // if (!data.isDueDate) {
    //   data.dueDate = null;
    // }
    return data;
  }


  getTemplate() {
    return createTripEventEditForm(this._dataItem);
  }

  // 5
  // публичный метод который заново навешивает обработчики
  restoreHandlers() {
    this._setInnerHandlers(); // востанавливаем приватные обработчики
    this.setSubmitHandler(this._callback.submit); // востанавливаем внешние обработчики. вызвали обработчик который был сохранен в объекте.
    this.setCancelHandler(this._callback.cancel);
    // this.setRollupBtnHandler(this._callback.rollupBtn);
    this._setDatepickerFinish(); // 5 востанавливаем обработчик
    this._setDatepickerStart(); // 5 востанавливаем обработчик
    // this.setDeleteClickHandler(this._callback.deleteClick); // 5del
  }

  // 3
  // обработчик который заново навешивает внутрение обработчики
  _setInnerHandlers() {
    this._eventInputPrice = this.getElement().querySelector(`.event__input--price`);
    this._eventInputPrice.addEventListener(`input`, this._changePriceHandler);
    // this.getElement() это класс с itema c формой редоктирования в внутри

    this._eventInputDestination = this.getElement().querySelector(`.event__input--destination`);
    this._eventInputDestination.addEventListener(`change`, this._changeDestinationHandler);

    this._eventChangeOffer = this.getElement().querySelector(`.event__available-offers`); // удаление или добавление offer
    this._eventChangeOffer.addEventListener(`change`, this._eventChangeOfferHandler);

    this._eventTypeGroup = this.getElement().querySelector(`.event__type-group`);
    this._eventTypeGroup.addEventListener(`input`, this._eventChangeTypeHandler);
  }

  // 3.1.
  _changePriceHandler(evt) { // оброботчик в котором будем менять данные по цене
    evt.preventDefault();
    this.updateData({ // передаем только одну строчку которую хотим обновить т.к. assign создано выше
      basePrice: evt.target.value // 12 // this._dataItem.price
    }, true); // при нажатии enter закрывается форма
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
        }
      }
    };
    getChangeOffers(evt.target.value);
  }

  // 8
  // код обнуляет данные до стартовых которые пришли в tripBoard
  reset(tripItem) {
    this.updateData(
      tripItem
    );
  }

  // обработчик который вызывает сохраннеый колбек на отправку формы
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

  // обработчик который вызывает сохранненый колбек при клике на cencel
  _cancelClickHandler(evt) {
    evt.preventDefault();
    this._callback.cancel();
  }

  // установим публичный обработчик на cansel и стрелку вниз
  setCancelHandler(callback) {
    this._callback.cancel = callback;

    const eventResetBtn = this.getElement().querySelector(`.event__reset-btn`);
    eventResetBtn.addEventListener(`click`, this._cancelClickHandler);
  }

  // _rollupBtnClickHandler(evt) {
  //   evt.preventDefault();
  //   this._callback.rollupBtn();
  // }

  // // установим публичный обработчик на cansel и стрелку вниз
  // setRollupBtnHandler(callback) {
  //   this._callback.rollupBtn = callback;
  //
  //   const eventRollupBtn = this.getElement().querySelector(`.event__rollup-btn`);
  //   eventRollupBtn.addEventListener(`click`, this._rollupBtnClickHandler);
  // }
// _isDateValid (userDate){
//     if(dayjs(userDate).toDate() > this._dateTo){
//
//       console.log(this._dateTo);
//       console.log(dayjs(userDate).toDate());
//
//       return this._dateFrom < this._dateTo
//     }
//     // return this._dateFrom < this._dateTo
//   };

  // 3 обработчик устанавливаем setDatepicker
  _setDatepickerFinish() {
    if (this._datepickerFinish) { // если был ранее _datepicker
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._datepickerFinish.destroy(); // то удаляем его
      this._datepickerFinish = null; // и зануляем его
    }

    if (this._dataItem) { // проверка или нужно вообще покаывать поле datepicker, вдруг пользователь скрыл
      // flatpickr есть смысл инициализировать только в случае,
      // если поле выбора даты доступно для заполнения
      this._datepickerFinish = flatpickr( // инициализируем это просто передаем элемент где вызывать datepickr
        this.getElement().querySelector(`#event-end-time-1`), // вставляем поле куда нужно вставить datepicker
        {
          enableTime: true, // добавлена настройка времени
          dateFormat: `d/m/y H:i`, // формат даты и времени
          defaultDate: this._dataItem.dateTo, // startTime,
          onChange: this._dueFinishDateChangeHandler, // На событие flatpickr передаём наш колбэк. типа addEventListner на datePicker. Пользоваетель в календаре выберет дату и мы ее сюда запишем
          // onClose: this._isDateValid,
        }
      );
    }
  }


  _setDatepickerStart() {
    // код на удаление _datepicker если он был открыт ранее
    if (this._datepickerStart) { // если был ранее _datepicker
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._datepickerStart.destroy(); // то удаляем его
      this._datepickerStart = null; // и зануляем его
    }


    if (this._dataItem) { // проверка или нужно вообще покаывать поле datepicker, вдруг пользователь скрыл
      // flatpickr есть смысл инициализировать только в случае,
      // если поле выбора даты доступно для заполнения
      this._datepickerStart = flatpickr( // инициализируем это просто передаем элемент где вызывать datepickr
        this.getElement().querySelector(`#event-start-time-1`), // вставляем поле куда нужно вставить datepicker
        {
          enableTime: true, // добавлена настройка времени
          dateFormat: `d/m/y H:i`, // формат даты и времени
          defaultDate: this._dataItem.dateFrom, // конечная дата со временем
          onChange: this._dueStartDateChangeHandler, // На событие flatpickr передаём наш колбэк. типа addEventListner на datePicker. Пользоваетель в календаре выберет дату и мы ее сюда запишем
          // onClose: this._isDateValid,
        }
      );
    }
  }


  _dueStartDateChangeHandler(userDate) {
    this.updateData({
      dateFrom: dayjs(userDate).toDate() // .hour(23).minute(59).second(59).toDate()
    }, true);
  }

  // 4
  _dueFinishDateChangeHandler([userDate]) {
    this.updateData({
      dateTo: dayjs(userDate).toDate() // .hour(23).minute(59).second(59).toDate()
    }, true);
  }

  // Перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более ненужный календарь
  removeElement() { // 4del назвали метод удаления также как и родителя
    super.removeElement(); // вызывали родительский метод удаления

    if (this._datepicker) { // и если есть datepicker
      this._datepicker.destroy(); // то удаляем его
      this._datepicker = null;
    }
  }

  // _formDeleteClickHandler(evt){ // 3del вызывается колбек
  //   evt.preventDefault();
  //   this._callback.delete()
  // }
  // _formDeleteClickHandler(evt) { // 3del вызывается колбек. ЭТО МЕТОД.
  //   evt.preventDefault();
  //   this._callback.deleteClick(this._dataItem); // НЕ знаю что выбрать этот или нижний вариант
  // }

  // setDeleteClickHandler(callback){ // 2del установил обработчик на удаление. Это МЕТОД
  //   this._callback.deleteClick = callback; // добавление колбека в объект, для последующего его вызова по ссылке
  //
  //   const eventResetBtnDel = this.getElement().querySelector(`.event__reset-btn`);
  //   eventResetBtnDel.addEventListener(`click`, this._formDeleteClickHandler);
  // }
}