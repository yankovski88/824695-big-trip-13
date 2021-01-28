import dayjs from "dayjs";
import he from "he"; // импортировал библиотеку по экранированию тегов от хакеров
import SmartView from "./smart.js";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_POINT = {
  "type": `flight`,
  "dateFrom": new Date(),
  "dateTo": new Date(),
  "isFavorite": false,
  "destination": {
    "name": ``,
    "description": `Geneva, in a middle of Europe, for those who value comfort and coziness, with an embankment of a mighty river as a centre of attraction, famous for its crowded street markets with the best street food in Asia.`,
    "pictures": [
      {
        "src": `http://picsum.photos/300/200?r=0.2711095928296725`,
        "description": `Geneva biggest supermarket`
      },
      {
        "src": `http://picsum.photos/300/200?r=0.37260096662238484`,
        "description": `Geneva zoo`
      },
      {
        "src": `http://picsum.photos/300/200?r=0.24136485619435555`,
        "description": `Geneva parliament building`
      },
      {
        "src": `http://picsum.photos/300/200?r=0.020111608522429103`,
        "description": `Geneva city centre`
      },
      {
        "src": `http://picsum.photos/300/200?r=0.7188000886995232`,
        "description": `Geneva parliament building`
      }
    ]
  },
  "basePrice": ``,
  "allPointOffers": [
    {
      "title": `Choose meal`,
      "price": 120
    },
    {
      "title": `Choose seats`,
      "price": 90
    },
    {
      "title": `Upgrade to comfort class`,
      "price": 120
    },
    {
      "title": `Upgrade to business class`,
      "price": 120
    },
    {
      "title": `Add luggage`,
      "price": 170
    },
    {
      "title": `Business lounge`,
      "price": 160
    }
  ],

  "offers": []
};


// функция по установке времени в форме
const createFieldTime = (dateStart, dateFinish, isDisabled) => {

  // установка формата времени
  const startTime = dayjs(dateStart).format(`DD/MM/YY HH:mm`);
  const finishTime = dayjs(dateFinish).format(`DD/MM/YY HH:mm`);

  return `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}" ${isDisabled ? `disabled` : ``}>
    &mdash;
<label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${finishTime}" ${isDisabled ? `disabled` : ``}>
    </div>`;
};


// функция по отрисовке всей формы
const createTripEventEditForm = (dataItem, routePointTypes, pointDestinations) => { // сюда попадают данные и запоняется шаблон dataItem
  const {dateFrom, dateTo, destination, basePrice, type, offers, isDisabled, isSaving, allPointOffers} = dataItem;
  const emptyFormOffers = routePointTypes;
  const allPointDestinations = pointDestinations.slice();
  const getDestinations = (allDestinations) => {
    const destinations = [];
    for (const item of allDestinations) {
      destinations.push(item.name);
    }
    return destinations;
  };

  // код рисут список type
  const createDestinationsTemplate = (destinations) => {
    return destinations.reduce((total, element) => {
      const isActiveDestinations = [destination].some((el) => {
        return el === element;
      });
      return total + `<option value="${element}" ${isActiveDestinations ? `checked` : ``} ></option>`;
    }, ``);
  };

  // функция по получению массива типов точки
  const getTypes = (pointTypes) => {
    const types = [];
    for (const item of pointTypes) {
      types.push(item.type);
    }
    return types;
  };


  // генерирует разметку фоток
  const createEventPhotoTemplate = () => {
    return destination.pictures.reduce((total, element) => { // перебрал все элементы photos и присоединил их в total
      return total + `<img class="event__photo" src="${element.src}" alt="${element.description}">`;
    }, ``);
  };


  // функция по отрисовке фрагмента всех преимуществ
  const getOffersTemplate = (isDisabledElement) => {

    return allPointOffers.reduce((total, element) => {

      // код который сравнивает два массива и если совподающие объекты, то возвращает true
      const isActive = offers.some((el) => {
        return el.title === element.title;
      });
      if (element !== ``) {
        return total + `<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-${element.title}" type="checkbox" name="event-offer-luggage"  
${isActive ? `checked` : ``} ${isDisabledElement ? `disabled` : ``}>
                            <label class="event__offer-label" for="event-offer-luggage-${element.title}">
                          <span class="event__offer-title">${element.title}</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">${element.price}</span>
                        </label>
                      </div>`;
      }
      return total + ``;

    }, ``);
  };

  const createTime = createFieldTime(dateFrom, dateTo, isDisabled);

  // код рисут список type
  const getEditType = (types, isDisabledElement) => {
    return types.reduce((total, element) => {
      const isActiveType = [type].some((el) => {
        return el === element;
      });
      return total + `<div class="event__type-item">
                          <input ${isActiveType ? `checked` : ``} ${isDisabledElement ? `disabled` : ``}  id="event-type-${element.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${element.toLowerCase()}" >
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
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" ${isDisabled ? `disabled` : ``}>

                    <div class="event__type-list">
                                <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>

       ${getEditType(getTypes(emptyFormOffers), isDisabled)}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">${type}</label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(destination.name)}" list="destination-list-1" ${isDisabled ? `disabled` : ``}>
                    <datalist id="destination-list-1">
                    ${createDestinationsTemplate(getDestinations(allPointDestinations))}
           
                    </datalist>
                  </div>

   ${createTime}

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro; 
                    </label>
                    <input ${isDisabled ? `disabled` : ``} class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${he.encode(basePrice.toString())}" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"   onkeyup="this.value = this.value.replace(/^0+(?=\\d)/,'');">
                  </div>
                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isDisabled ? `disabled` : ``}>${isSaving ? `Saving...` : `Save`}</button>
<button class="event__reset-btn" type="reset" ${isDisabled ? `disabled` : ``}>Cansel</button>
  
                </header>
                <section class="event__details">
                
                  <section class="event__section  event__section--offers  ${type === `sightseeing` || type === `transport` ? `visually-hidden` : ``}">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
     ${getOffersTemplate(isDisabled)}
                    </div>
                  </section>

                  <section  
                  class="event__section  event__section--destination  ${destination.name ? `` : `visually-hidden`}">
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


export default class AddNewPoint extends SmartView {
  constructor(offers, pointDestinations) {
    super();
    this._dataItem = AddNewPoint.parseDataItemToData(BLANK_POINT); // dataItem 0 превращаем объект dataItem в объект data т.к. он более полный, было this._dataItem = dataItem;
    this._offers = offers;
    this._pointDestinations = pointDestinations;

    this._datepickerFinish = null; // здесь будем хранить экземпляр _datepicker т.е. открытый показанный _datepicker. Это нужно для того чтобы потом можно после закрытия формы удалить.
    this._datepickerStart = null;
    this._TEXT_LIMIT = 20;

    this._submitHandler = this._submitHandler.bind(this);
    this._cancelClickHandler = this._cancelClickHandler.bind(this);
    this._changePriceHandler = this._changePriceHandler.bind(this); // бинд по замене price
    this._changeDestinationHandler = this._changeDestinationHandler.bind(this);
    this._eventChangeOfferHandler = this._eventChangeOfferHandler.bind(this);
    this._eventChangeTypeHandler = this._eventChangeTypeHandler.bind(this);
    this._dueFinishDateChangeHandler = this._dueFinishDateChangeHandler.bind(this); // заведем обработчик на _datepicker
    this._dueStartDateChangeHandler = this._dueStartDateChangeHandler.bind(this); // заведем обработчик на _datepicker

    this._setInnerHandlers(); // обновляем внутренние обработчики
    this._setDatepickerStart(); // устанавливаем _setDatepicker с помощью пакета flatpickr
    this._setDatepickerFinish(); // устанавливаем _setDatepicker с помощью пакета flatpickr

  }

  // парсим типа, создаем копию данных с дополниетельным данными
  static parseDataItemToData(dataItem) {
    return Object.assign(
        {},
        dataItem,
        {
          isDisabled: false,
          isSaving: false,
          isDeleting: false,
        }
    );
  }

  // берем все данные которые накликал пользователь в форме редоктирвоания event. Далее эти данные отправим на перерисовку event.
  static parseDataToDataItem(data) {
    data = Object.assign({}, data);
    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;

    return data;
  }


  getTemplate() {
    return createTripEventEditForm(this._dataItem, this._offers, this._pointDestinations);
  }

  // публичный метод который заново навешивает обработчики
  restoreHandlers() {
    this._setInnerHandlers(); // востанавливаем приватные обработчики
    this.setSubmitHandler(this._callback.submit); // востанавливаем внешние обработчики. вызвали обработчик который был сохранен в объекте.
    this.setCancelHandler(this._callback.cancel);
    this._setDatepickerFinish(); // востанавливаем обработчик
    this._setDatepickerStart(); // востанавливаем обработчик
  }

  // обработчик который заново навешивает внутрение обработчики
  _setInnerHandlers() {
    this._eventInputPrice = this.getElement().querySelector(`.event__input--price`);
    this._eventInputPrice.addEventListener(`input`, this._changePriceHandler);

    this._eventInputDestination = this.getElement().querySelector(`.event__input--destination`);
    this._eventInputDestination.addEventListener(`change`, this._changeDestinationHandler);

    this._eventChangeOffer = this.getElement().querySelector(`.event__available-offers`); // удаление или добавление offer
    this._eventChangeOffer.addEventListener(`change`, this._eventChangeOfferHandler);

    this._eventTypeGroup = this.getElement().querySelector(`.event__type-group`);
    this._eventTypeGroup.addEventListener(`input`, this._eventChangeTypeHandler);
  }


  _changePriceHandler(evt) { // оброботчик в котором будем менять данные по цене
    evt.preventDefault();
    this.updateData({ // передаем только одну строчку которую хотим обновить т.к. assign создано выше
      basePrice: parseInt(evt.target.value, 10)
    }, true); // при нажатии enter закрывается форма
  }

  _changeDestinationHandler(evt) {
    evt.preventDefault();
    // код по замене всех данных объекта destination на тот который выбрал пользователь
    const getChangeDestination = (target) => { // target цель выбора пользователя
      for (const item of this._pointDestinations) { // прохождение по массиву всех объектов. destinations передали импортом
        if (target === item.name) { // когда найдется выбор пользователя в нашем массиве
          this.updateData({destination: item}); // то заменить прошлые данные на новый объект
          evt.target.setCustomValidity(``);
        } else if ((target !== item.name) || target === ``) {
          evt.target.setCustomValidity(`Данной точки маршрута не существует. Выберите из спииска.`);
        }
      }

    };
    getChangeDestination(evt.target.value);
    this._checkDate();
  }

  // метод по замене активных оферов
  _eventChangeOfferHandler(evt) {
    evt.preventDefault();
    if (evt.target.attributes.checked) { // если был чекнут,
      evt.target.removeAttribute(`checked`); // то удаляем чек
    } else {
      evt.target.setAttribute(`checked`, true); // если не был чекнут, то чекаем
    }

    // код по замене всех данных объекта активных offers
    const getActiveOffers = () => { //  target цель выбора пользователя
      const newOffers = []; // массив со всеми активными объектами оферов
      const idCheckOffers = []; // массив с чекнутыми офферами
      const groupOffersElement = this.getElement().querySelector(`.event__available-offers`); // нашел группу где все оферы
      const inputOfOffersElement = groupOffersElement.querySelectorAll(`input`); // выташил из нее все инпуты по оферам
      inputOfOffersElement.forEach((item) => { // обхожу все инпуты
        if (item.attributes.checked) { // если чекнут
          idCheckOffers.push(item.attributes.id.textContent.slice(this._TEXT_LIMIT)); // то добавляем title офера в массив
        }
      });

      // будем сравнивать title из общего массива оферров конкретного этого объекта с его выделеными оферами из idCheckOffers
      for (const itemEmpty of this._dataItem.allPointOffers) { // проходим по пустому массиву
        idCheckOffers.some((item) => { // проходим по массиву где названия чеков
          if (item === itemEmpty.title) { // если название чека совпадает с заголовком пустого офера
            newOffers.push(itemEmpty); // то добавляем это объект в массив
          } // получили массив чекнутых обектов для оферов
        });
      }

      this.updateData({offers: newOffers}); // + заменяем старые чекнутые оферы на новые

    };
    getActiveOffers(); //  вызов функции по замене старых чекнутых оферов на новые
    this._checkDate();
  }

  // код по замене всех данных объекта offers на тот который выбрал пользователь
  _eventChangeTypeHandler(evt) {
    this.updateData({offers: []});
    evt.preventDefault();
    const getChangeOffers = (target) => { // target цель выбора пользователя

      for (const item of this._offers) { // прохождение по массиву всех объектов. offers массив всех доп предложений
        if (target === item.type.toLowerCase()) { // когда найдется выбор пользователя в нашем массиве
          this.updateData({type: item.type});
          this.updateData({allPointOffers: item.offers});
        }
      }
    };

    // код который меняет флаг на спрятать элемент
    getChangeOffers(evt.target.value);
    this._checkDate();
  }

  // метод который после обновления проверяет дату и вводит disabled
  _checkDate() {
    if (this._dataItem.dateTo < this._dataItem.dateFrom) {
      const saveBtnElement1 = this.getElement().querySelector(`.event__save-btn`);
      saveBtnElement1.setAttribute(`disabled`, true);
    } else if (this._dataItem.dateTo > this._dataItem.dateFrom) {
      const saveBtnElement2 = this.getElement().querySelector(`.event__save-btn`);
      saveBtnElement2.removeAttribute(`disabled`);
    }
  }

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
          }
      );
    }
  }


  // обработчик устанавливаем setDatepicker
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
          }
      );
    }
  }


  _dueStartDateChangeHandler(userDate) {
    this.updateData({
      dateFrom: dayjs(userDate).toDate()
    }, true);
    this._checkDate();
  }

  _dueFinishDateChangeHandler([userDate]) {
    this.updateData({
      dateTo: dayjs(userDate).toDate()
    }, true);
    this._checkDate();
  }


  // Перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более ненужный календарь
  removeElement() { // назвали метод удаления также как и родителя
    super.removeElement(); // вызывали родительский метод удаления

    if (this._datepickerStart) {
      this._datepickerStart.destroy();
      this._datepickerStart = null;
    }

    if (this._datepickerFinish) {
      this._datepickerFinish.destroy();
      this._datepickerFinish = null;
    }

  }


}
