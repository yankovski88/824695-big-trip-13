import dayjs from "dayjs";
import he from "he"; // импортировал библиотеку по экранированию тегов от хакеров
import SmartView from "./smart.js";
// import {destinations, dataOffers} from "../mock/mock-trip-event-item.js";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";
import {UpdateType, UserAction, TYPES} from "../const";
import {getRandomInteger} from "../util/common";
import {getTripEventItem} from "../mock/mock-trip-event-item";
import Api from "../api.js";
import OffersModel from "../model/offers.js"


// функция по установке времени в форме
const createFieldTime = (dateStart, dateFinish) => {
  // установка формата времени
  const startTime = dayjs(dateStart).format(`DD/MM/YY HH:mm`);
  const finishTime = dayjs(dateFinish).format(`DD/MM/YY HH:mm`);
// debugger

  return `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
    &mdash;
<label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${finishTime}">
    </div>`;
};


// функция по отрисовке всей формы
const createTripEventEditForm = (dataItem, routePointTypes, pointDestinations) => { // destinations сюда попадают данные и запоняется шаблон
  const {dateFrom, dateTo, destination, basePrice, type, offers} = dataItem; // editFormOffers
  const editFormOffers = routePointTypes;
  const allPointDestinations = pointDestinations;


// код на получение всех оферсов по типу
  const getAllOffers = (type, offers) => {

    let typeOffers;
    for (let item of offers) {
      if (type === item.type) {
        typeOffers = item.offers;
      }
    }
    return typeOffers;
  };

  const pointOffers = getAllOffers(type, editFormOffers);

  // const editFormOffers = [
  //   {
  //     "title": `Add luggage`,
  //     "price": 50,
  //   },
  //   {
  //     "title": `Switch to comfort class`,
  //     "price": 80,
  //   },
  //   {
  //     "title": `Add meal`,
  //     "price": 15,
  //   },
  //   {
  //     "title": `Choose seats`,
  //     "price": 5,
  //   },
  //   {
  //     "title": `Travel by train`,
  //     "price": 40,
  //   },
  // ];

  // const tripItems = new Array(dataItem.length).fill().map(getTripEventItem);

  // const isDateValid = ()=>{
  //   return dateFrom < dateTo
  // };

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
    // debugger // здесь был косяк и подвисал
    return formOffers.reduce((total, element) => {
      // // код который сравнивает два массива и если совподающие объекты, то возвращает true
      const isActive = offers.some((el) => {
        return el.title === element.title;
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
                    <label class="event__label  event__type-output" for="event-destination-1">${type}</label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" 
                    value="${he.encode(destination.name)}" list="destination-list-1" >
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
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${he.encode(basePrice.toString())}" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)"   onkeyup="this.value = this.value.replace(/^0+(?=\\d)/,'');">
                  </div>
<!--{isDateValid() ?  : disabled}-->
                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
<button class="event__reset-btn" type="reset">Delete</button>
  
                  <!--<button class="event__reset-btn" type="reset"> Cancel</button>-->
    ${createEventRollupBtn()}
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                    
     ${getOffersTemplate(pointOffers)}
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

  constructor(dataItem, offers, pointDestinations) {

    super();
    // this._destinations = destinations;
    this._dataItem = TripEventEditFormView.parseDataItemToData(dataItem); // 0 превращаем объект dataItem в объект data т.к. он более полный, было this._dataItem = dataItem;
    this._offers = offers;
    this._pointDestinations = pointDestinations;
    this._datepickerFinish = null; // 1 здесь будем хранить экземпляр _datepicker т.е. открытый показанный _datepicker. Это нужно для того чтобы потом можно после закрытия формы удалить.
    this._datepickerStart = null;
    this._dateFrom = this._dataItem.dateFrom;
    this._dateTo = this._dataItem.dateTo;
    // this._editFormOffers = this._dataItem.editFormOffers
    this._saveBtnElement = this.getElement().querySelector(`.event__save-btn`);
    this._spamText = 20;
    this._addBtn = document.querySelector(`.trip-main__event-add-btn`);

    this._submitHandler = this._submitHandler.bind(this);
    this._cancelClickHandler = this._cancelClickHandler.bind(this);
    // 4
    this._changePriceHandler = this._changePriceHandler.bind(this); // бинд по замене price
    this._changeDestinationHandler = this._changeDestinationHandler.bind(this);
    this._eventChangeOfferHandler = this._eventChangeOfferHandler.bind(this);
    this._eventChangeTypeHandler = this._eventChangeTypeHandler.bind(this);
    this._rollupBtnClickHandler = this._rollupBtnClickHandler.bind(this);
    this._dueFinishDateChangeHandler = this._dueFinishDateChangeHandler.bind(this); // 2 заведем обработчик на _datepicker
    this._dueStartDateChangeHandler = this._dueStartDateChangeHandler.bind(this); // 2 заведем обработчик на _datepicker
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this); // 1del


    this._setInnerHandlers(); // обновляем внутренние обработчики
    this._setDatepickerStart(); // 4 устанавливаем _setDatepicker с помощью пакета flatpickr
    this._setDatepickerFinish(); // 4 устанавливаем _setDatepicker с помощью пакета flatpickr

  }
  // 0.1
  // парсим типа, создаем копию данных с дополниетельным данными
  static parseDataItemToData(dataItem) { // offers
    return Object.assign(
        {},
        dataItem,
      // {editFormOffers: offers},
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
    return createTripEventEditForm(this._dataItem, this._offers, this._pointDestinations);
  }

  // 5
  // публичный метод который заново навешивает обработчики
  restoreHandlers() {

    this._setInnerHandlers(); // востанавливаем приватные обработчики
    this.setSubmitHandler(this._callback.submit); // востанавливаем внешние обработчики. вызвали обработчик который был сохранен в объекте.
    this.setCancelHandler(this._callback.cancel);
    this.setRollupBtnHandler(this._callback.rollupBtn);
    this._setDatepickerFinish(); // 5 востанавливаем обработчик
    this._setDatepickerStart(); // 5 востанавливаем обработчик
    this.setDeleteClickHandler(this._callback.deleteClick); // 5del
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
      basePrice: parseInt(evt.target.value, 10) // 12 // this._dataItem.price
    }, true); // при нажатии enter закрывается форма
  }


  _changeDestinationHandler(evt) {
    evt.preventDefault();

    // код по замене всех данных объекта destination на тот который выбрал пользователь
    const getChangeDestination = (target) => { // target цель выбора пользователя
      for (let item of this._pointDestinations) { // прохождение по массиву всех объектов. destinations передали импортом
        if (target === item.name) { // когда найдется выбор пользователя в нашем массиве
          this.updateData(this._dataItem.destination = item); // то заменить прошлые данные на новый объект
        }
      }
    };
    getChangeDestination(evt.target.value);
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
    const getActiveOffers = (editFormOffers) => { //  target цель выбора пользователя
      const newOffers = []; // массив со всеми активными объектами оферов
      const idCheckOffers = []; // массив с чекнутыми офферами
      const allEmptyOffers = editFormOffers; // this._dataItem.editFormOffers; // все не чекнутые офферы

      const groupOffersElement = this.getElement().querySelector(`.event__available-offers`); // нашел группу где все оферы
      const inputOfOffersElement = groupOffersElement.querySelectorAll(`input`); // выташил из нее все инпуты по оферам
      inputOfOffersElement.forEach((item)=>{ // обхожу все инпуты
        if (item.attributes.checked) { // если чекнут
          idCheckOffers.push(item.attributes.id.textContent.slice(this._spamText)); // то добавляем title офера в массив
        }
      });


      // находим тип точки и по нему находим все егопустые оферы
      const typeEmptyOffers = [];
      const eventType = this.getElement().querySelector(`.event__type-output`).textContent;
      // будем сравнивать title из общего массива оферров конкретного этого объекта с его выделеными оферами из idCheckOffers
      for (let itemEmpty of allEmptyOffers) { // проходим по пустому массиву

        if(eventType === itemEmpty.type){
          typeEmptyOffers.push(itemEmpty)
        }
          }


      // будем сравнивать title из общего массива оферров конкретного этого объекта с его выделеными оферами из idCheckOffers
      for (let itemEmpty of typeEmptyOffers) { // проходим по пустому массиву
        idCheckOffers.some((item)=>{ // проходим по массиву где названия чеков
          for(let itemEmptyOffer of itemEmpty.offers){
            if (item === itemEmptyOffer.title) { // если название чека совпадает с заголовком пустого офера
              newOffers.push(itemEmptyOffer); // то добавляем это объект в массив
            } // получили массив чекнутых обектов для оферов
          }




      // // будем сравнивать title из общего массива оферров конкретного этого объекта с его выделеными оферами из idCheckOffers
      // for (let itemEmpty of allEmptyOffers) { // проходим по пустому массиву
      //   idCheckOffers.some((item)=>{ // проходим по массиву где названия чеков
      //     for(let itemEmptyOffer of itemEmpty.offers){
      //       if (item === itemEmptyOffer.title) { // если название чека совпадает с заголовком пустого офера
      //         newOffers.push(itemEmptyOffer); // то добавляем это объект в массив
      //       } // получили массив чекнутых обектов для оферов
      //     }

        });
      }
      this.updateData(this._dataItem.offers = newOffers); // + заменяем старые чекнутые оферы на новые
    };
    getActiveOffers(this._offers); //  вызов функции по замене старых чекнутых оферов на новые
  }


  _eventChangeTypeHandler(evt) {
    evt.preventDefault();
    // код по замене всех данных объекта offers на тот который выбрал пользователь
    const getChangeOffers = (target) => { // target цель выбора пользователя
      // debugger
      for (let item of this._offers) { // прохождение по массиву всех объектов. offers массив всех доп предложений
        if (target === item.type.toLowerCase()) { // когда найдется выбор пользователя в нашем массиве
          this.updateData(this._dataItem.type = item.type);
          // this.updateData(this._offers = item.offers);

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
        tripItem,
    );
  }

  // обработчик который вызывает сохраннеый колбек на отправку формы
  _submitHandler(evt) {
    evt.preventDefault();
    this._callback.submit(this._dataItem); // ?????????? _dataItem
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

  _rollupBtnClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollupBtn();
  }

  // установим публичный обработчик на cansel и стрелку вниз
  setRollupBtnHandler(callback) {
    this._callback.rollupBtn = callback;

    const eventRollupBtn = this.getElement().querySelector(`.event__rollup-btn`);
    eventRollupBtn.addEventListener(`click`, this._rollupBtnClickHandler);
    // this._addBtn.removeAttribute(`disabled`);

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
          }
      );
    }
  }


  _dueStartDateChangeHandler(userDate) {
    if ((dayjs(userDate).toDate() > this._dateTo)) {
      this._saveBtnElement.setAttribute(`disabled`, true);
    } else if ((dayjs(userDate).toDate() < this._dateTo)) {
      this._saveBtnElement.removeAttribute(`disabled`);
    }
    this.updateData({
      dateFrom: dayjs(userDate).toDate() // .hour(23).minute(59).second(59).toDate()
    }, true);
  }

  // 4
  _dueFinishDateChangeHandler([userDate]) {
    if (dayjs(userDate).toDate() > this._dateFrom) {
      this._saveBtnElement.removeAttribute(`disabled`);
    } else if ((dayjs(userDate).toDate() < this._dateFrom)) {
      this._saveBtnElement.setAttribute(`disabled`, true);
    }
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
  _formDeleteClickHandler(evt) { // 3del вызывается колбек. ЭТО МЕТОД.
    evt.preventDefault();
    this._callback.deleteClick(this._dataItem); // НЕ знаю что выбрать этот или нижний вариант
  }

  setDeleteClickHandler(callback) { // 2del установил обработчик на удаление. Это МЕТОД
    this._callback.deleteClick = callback; // добавление колбека в объект, для последующего его вызова по ссылке

    const eventResetBtnDel = this.getElement().querySelector(`.event__reset-btn`);
    eventResetBtnDel.addEventListener(`click`, this._formDeleteClickHandler);
  }

  _handleOfferClick() {
    // debugger
    this._changeData( // и после замены сообщаем в changeData
        UserAction.UPDATE_POINT, // 22 это говорит, что мы  только обновляем, а не удаляем или что-то добавляем.
        UpdateType.MINOR, // 23 точка никуда не девается, а только помечается меняется или нет, так что это минор.
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
