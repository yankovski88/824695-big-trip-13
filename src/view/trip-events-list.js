// import {createElement} from "../mock/util";
import AbstractView from "./abstract.js"

const createTripEventsList = () => {
  return `<ul class="trip-events__list"></ul>
  `;
};


export default class TripEventsList extends AbstractView {


// export default class TripEventsList {
//   constructor() { // не понимаю почему нет параметра
//     this._element = null;
//   }

  // имплементируем (осуществляем) функцию getTemplate т.к. она обязательна
  getTemplate() {
    return createTripEventsList();
  }

  // логика для получения элемента которая может быть вставлена в дом. Инициализируем элемент.
  // getElement() {
  //   if (!this._element) { // если значение содержимого приватного поля не заполнено
  //     this._element = createElement(this.getTemplate()); // то this._element присваиваем результат функции createElement
  //   }
  //   return this._element;
  // }
  //
  // removeElement() {
  //   this._element = null;
  // }
}
