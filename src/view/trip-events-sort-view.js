import {createElement} from "../mock/util.js"

const getSortItems = (sortItem) => {
  return sortItem.sortItems.reduce((total, element) => {
    return total + `
                  <div class="trip-sort__item  trip-sort__item--${element.toLowerCase()}">
      <input id="sort-${element.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" 
      value="sort-${element.toLowerCase()}" disabled>
    <label class="trip-sort__btn" for="sort-${element.toLowerCase()}">${element}</label>
      </div>        
`;
  }, ``);
};

const createTripEventsSort = (dataItem) => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
     ${getSortItems(dataItem)}
    
          </form>
`;
};

// - Опишем компонент меню как класс, который уже возвращает готовый элемент, а не шаблон
// - Используем вспомогательную функцию для создания DOM-элемента по шаблону
// компонент должен как-то собраться и сгененировать дом узлы, потом эти узлы получить и их отрендорить

export default class TripEventsSortView {
  // раз получается мы хотим получить готовый элемент и вставить в дом дерево, то мы должны этот элемент как-то получить
  constructor(dataItem) {
    this._dataItem = dataItem;
    this._element = null; // будет получен тот самый элемент для вставки в дом, но пока его нигде нет, будет null
  }

  // этот метод должен возвращать разметку на основании которой будем получать этот элемент
  getTemplate() {
    return createTripEventsSort(this._dataItem);
  }


  // логика для получения элемента который будет вставлен в дом. Инициализируем элемент.
  getElement() {
    if (!this._element) { // заполнено ли содержимое поля this._element, есть ли в нем какое значение. Если значение
      // не заполнено
      this._element = createElement(this.getTemplate()); // то this._element присваиваем результат функции createElement
    }
    return this._element; // если вместо null что-то есть то это и вернем
  }

  removeElement() { // функция которая приводит элемент в нчальное состояние т.е. в null
    this._element = null;
  }
}
