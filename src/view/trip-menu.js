import {createElement} from "../mock/util";

const createTripMenu = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
    <a class="trip-tabs__btn" href="#">Stats</a>
    </nav>`;
};
// export {createTripMenu};


export default class TripMenuView {
  constructor(){
    this._element = null; // по умолчанию сделал елемент пустым
  };

  // функция которая будет возвращать разметку
  getTemplate(){
    return createTripMenu();
  };

  getElement(){
    if(!this._element){ // если нет элемента, а его нет! т.к. изначально прописал
     this._element = createElement(this.getTemplate()); // то создаем элемент нашего шаблона
      // НЕ понимаю зачем создовать createElement
    }
    return this._element
  }

  removeElement(){
   this._element = null;
  }
}


// import {createElement} from "../mock/util";
//
// const createTripEventsList = () => {
//   return `<ul class="trip-events__list"></ul>
//   `;
// };
//
// export default class TripEventsList {
//   constructor(){ // не понимаю почему нет параметра
//     this._element = null;
//   }
//
//   // через этом метода вызовем функцию по отрисовке разметки
//   getTemplate(){
//     return createTripEventsList();
//   }
//
//   // логика для получения элемента которая может быть вставлена в дом. Инициализируем элемент.
//   getElement(){
//     if(!this._element){ // если значение содержимого приватного поля не заполнено
//       this._element = createElement(this.getTemplate()) // то this._element присваиваем результат функции createElement
//     }
//     return this._element
//   }
//
//   removeElement(){
//     this._element = null;
//   };
// }
