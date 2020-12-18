import dayjs from "dayjs";
import {getDateDiff} from "../util/render.js";
import AbstractView from "./abstract.js";

const createTripEventItem = (dataItems) => {
  const {id, type, price, dateStart, dateFinish, additionalOffers, destinationItem, favorite} = dataItems;

  // код который определяет favorite или нет и если да то добовляет active
  const getFavorite = (favorite) => {
    if (favorite) {
      return `event__favorite-btn--active`
    }
    return ``
  };

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

  return `<li class="trip-events__item" id="${id}">
              <div class="event">
                <time class="event__date" datetime=${dateStartDay}>${dateStartDay}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon"
                  value="${type}">
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
                <button class="event__favorite-btn  ${getFavorite(favorite)}" type="button">
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

export default class TripEventItemView extends AbstractView {
  constructor(dataItems) {
    super();
    this._dataItems = dataItems;
    // ЦЕЛЬ ПОДПИСЫВАТЬСЯ НА СОБЫТИЕ ПРЯМО ВНУТРИ КОМПОНЕНТА
    // Чтобы вся эта кортинка сработал нужно забиндить. Начинаем биндить контекст
    //
    // Получается если функция this._clickHandler не в конструкторе, то она теряет контекст конструктора и не видит
    // в нем объект с кобеком
    //
    // Uncaught TypeError: Cannot read property 'click' of undefined. Эта ошибка появляется когда теряется контекст т.е.
    // this._callback.click() вот эта функция в контексте this обращается к виндовс, а в нем нет метода click. И чтобы
    // устранить делаем bind в this._clickHandler через bind передали новый контекст this, а передали контекст
    // конструктора, а в нем уже лежит объект с колбеком click
    //
    //
    // 4. Теперь обработчик - метод класса, а не стрелочная функция.
    // Поэтому при передаче в addEventListner он теряет контекст (this),
    // а с контекстом доступ к свойствам и методам.
    // Чтобы такого не происходило нужно насильно привязать обработчик к контексту с помощью bind
    this._clickHandler = this._clickHandler.bind(this); // Не понимаю. Получается перед функцие вызвали объект {все
    // функции и свойства}.this._clickHandler(а там уже внутри наш колбек)
    // bind(this) this указывает на глобальный объект window
    // this._clickHandler = .bind получаем новую функцию которую получаем через метод bind
    // и передаем туда новый контекст
    // (this) контекст на текущий объект
    //
    // Ответ при использовании bind мы меняем контекст получается вместо this._clickHandler получим this
    // а this это весь объект получается и поулучается this._clickHandler объявленая ниже увидит себя же
    // console.log(this);
    // this._clickFavoriteHandler = this._clickFavoriteHandler.bind(this); // Не понимаю. Получается перед функцие вызвали объект {все
    // // функции и свойства}.this._clickHandler(а там уже внутри наш колбек)
    // // bind(this) this указывает на глобальный объект window
    // // this._clickHandler = .bind получаем новую функцию которую получаем через метод bind
    // // и передаем туда новый контекст
    // // (this) контекст на текущий объект
    // //
    // // Ответ при использовании bind мы меняем контекст получается вместо this._clickHandler получим this
    // // а this это весь объект получается и поулучается this._clickHandler объявленая ниже увидит себя же
    // // console.log(this);

    // this._clickFavoriteHandler = this._clickFavoriteHandler.bind(this);

    this._clickFavoriteHandler = this._clickFavoriteHandler.bind(this);
  }

  getTemplate() {
    return createTripEventItem(this._dataItems);
  }

  // в колбеке пишем код который был в колбеке
  _clickHandler(evt) {
    evt.preventDefault();
    // console.log(this); // контекстом стала кнопка если закоментировать bind
    // а если не комментировать bind, то контекстом становится объект TripEventItem и уже из конструктора из объекта
    // {click: callback} уже вызовится наш сохраненый колбек
    //
    // 3. А внутри абстрактного оброботчика вызовем колбэк
    this._callback.click(); // Не понимаю. ПОНЯЛ. Вызовем с нашего объекта колбека еще с абстракт свойство click
    // которое добавили ниже, а в этом свойстве наша функция которая передана через mian.js

    // вот за этого this теряется контекст и не может вызваться click
  }

  // чтобы поставить обработчик пишем отдельный метод который принимает один единственный параметр.(я добавил второй
  // element)
  // принимает функцию колбек которая должна быть вызвана при клике по кнопке
  setClickHandler(callback) {
    // Мы могли сразу передать callback в addEventListener,
    // но тогда для удаления обработчикав будущем,
    // нужно было бы производить это снаружи, где-то там,
    // где мы вызывали setClickHandler, что не всегда удобно
    //
    // 1 Поэтому колбэк мы запишем во внутренее свойство
    // 1 После клика, сохраняем сслыку на эту функцию в наш объект колбек, колбек описали в абстрактном классе
    // .click достаточно поставить . и прописать click и будет создано новое свойство получится типа:
    // в abstract, {click: callback} и в свойсво записали функцию ввиде колбека которая пришла с main.js
    this._callback.click = callback;

    const buttonEventItem = this.getElement().querySelector(`.event__rollup-btn`); // нашел кнопку у объекта Item
    // для открытия формы
// console.log(buttonEventItem);
    // 2. В addEventListner передадим абстрактный обработчик
    buttonEventItem.addEventListener(`click`, this._clickHandler); // вот здесь потерялся контекст стал контекст elementа.
    // в this._clickHandler не вызовется т.к. она находится в свойствах
    // конструктора куда  и добавили обработчик {click: (){...} c main.js поступает}
    // вот здесь потерялся контекст стал контекст this.getElement()
    // this._clickHandler колбэк который должен сработать и им является приватный метод _clickHandler
  }

  _clickFavoriteHandler() {
    console.log(`_clickFavoriteHandler`);
    this._callback.clickFavorite();

  }

  // метод по установке клика на зведу, будет вызываться в presentee
  setFavoriteClickHandler(callback) { //  // setBtnFavariteClickHandler
    this._callback.clickFavorite = callback;
    const btnFavorite = this.getElement().querySelector(`.event__favorite-btn`);
    btnFavorite.addEventListener(`click`, this._clickFavoriteHandler);

  }


  // _clickFavoriteHandler(evt){
  //   evt.preventDefault();
  //   this._callback.clickFavorite();
  //   // this._callback.favoriteClick();
  // }
  //
  // setBtnFavariteClickHandler(callback) {
  //   console.log(`sdf`);
  //   this._callback.clickFavorite = callback;
  //   const eventFavoriteBtn = this.getElement().querySelector(`.event__favorite-btn`);
  //   eventFavoriteBtn.addEventListener(`click`, this._clickFavoriteHandler);
  // }
  //
  // // _favoriteClickHandler(evt) {
  // //   evt.preventDefault();
  // //   this._callback.favoriteClick();
  // // }
  //
  // // setFavoriteClickHandler(callback) {
  // //   // this._callback.clickFavorite = callback;
  // //
  // //   this._callback.favoriteClick = callback;
  // //   this.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, this._favoriteClickHandler);
  // // }


}
