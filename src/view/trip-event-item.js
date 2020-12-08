import dayjs from "dayjs";
import {getDateDiff} from "../mock/util.js";
import AbstractView from "./abstract.js";

// import {createElement} from "../mock/util";

const createTripEventItem = (dataItems) => {
  const {type, price, dateStart, dateFinish, additionalOffers, destinationItem} = dataItems;

  const getAdditionalOffers = () => {
    return additionalOffers.reduce((total, element) => {
      return total + `
     <li class="event__offer">
                    <span class="event__offer-title">${element.offer}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${element.price}</span>
                  </li>
  `;
    }, ``);
  };

  const startDate = dayjs(dateStart).format(`HH:mm`); // часы в item
  const finishDate = dayjs(dateFinish).format(`HH:mm`);

  const dateStartDay = dayjs(dateStart).format(`MMM DD`); // дата в item

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime=${dateStartDay}>${dateStartDay}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/drive.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destinationItem}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime=${startDate}>${startDate}</time>
                    &mdash;
                    <time class="event__end-time" datetime=${finishDate}>${finishDate}</time>
                  </p>
               

                  <p class="event__duration">${getDateDiff(dayjs(dateStart), dayjs(dateFinish))}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span> 
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${getAdditionalOffers()}
               
                </ul>
                <button class="event__favorite-btn  event__favorite-btn--active" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

export default class TripEventItem extends AbstractView {
  constructor(dataItems) {
    super();
    this._dataItems = dataItems;

    // ЦЕЛЬ ПОДПИСЫВАТЬСЯ НА СОБЫТИЕ ПРЯМО ВНУТРИ КОМПОНЕНТА
    // Чтобы вся эта кортинка сработал нужно забиндить. Начинаем биндить контекст

    // 4. Теперь обработчик - метод класса, а не стрелочная функция.
    // Поэтому при передаче в addEventListner он теряет контекст (this),
    // а с контекстом доступ к свойствам и методам.
    // Чтобы такого не происходило нужно насильно привязать обработчик к контексту с помощью bind
    this._clickHandler = this._clickHandler.bind(this); // Не понимаю откуда и можно ли так
    // this._clickHandler.bind получаем новую функцию которую получаем через метод bind
    // и передаем туда новый контекст
    // (this) контекст на текущий объект
  }

  getTemplate() {
    return createTripEventItem(this._dataItems);
  }

  // в колбеке пишем код который был в колбеке
  _clickHandler(evt) {
    evt.preventDefault();

    // 3. А внутри абстрактного оброботчика вызовем колбэк
    this._callback.click(); // Не понимаю. ПОНЯЛ. Вызовем с нашего объекта колбека еще с абстракт свойство click
    // которое добавили ниже, а в этом свойстве наша функция которая передана через mian.js
  }


  // чтобы поставить обработчик пишем отдельный метод который принимает один единственный параметр.(я добавил второй
  // element)
  // принимает функцию колбек которая должна быть вызвана при клике по кнопке
  setClickHandler(callback, element) {
    // Мы могли сразу передать callback в addEventListener,
    // но тогда для удаления обработчикав будущем,
    // нужно было бы производить это снаружи, где-то там,
    // где мы вызывали setClickHandler, что не всегда удобно

    //1 Поэтому колбэк мы запишем во внутренее свойство
    // 1 После клика, сохраняем сслыку на эту функцию в наш объект колбек, колбек описали в абстрактном классе
    // .click достаточно поставить . и прописать click и будет создано новое свойство получится типа:
    // в abstract, {click: callback} и в свойсво записали функцию ввиде колбека которая пришла с main.js
    this._callback.click = callback;

    // 2. В addEventListner передадим абстрактный обработчик
    if (element) {
      element.addEventListener(`click`, this._clickHandler)
    } else {
      this.getElement().addEventListener(`click`, this._clickHandler)
      // this._clickHandler колбэк который должен сработать и им является приватный метод _clickHandler
    }
  }

}
