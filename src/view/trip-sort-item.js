import {createElement} from "../mock/util.js"



const getSortItems = (sortItem) => {
  return sortItem.sortItems.reduce((total, element) => {
     return total + `<div class="trip-sort__item  trip-sort__item--${element.toLowerCase()}">
      <input id="sort-${element.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" 
      value="sort-${element.toLowerCase()}" disabled>
    <label class="trip-sort__btn" for="sort-${element.toLowerCase()}">${element}</label>
      </div>`;
  }, ``);
};

// const sortItems = {sortItems: ["Day", "EVENT", "TIME", "PRICE","OFFERS"]};
// console.log(getSortItems(sortItems));

// компонент должен как-то собраться и сгененировать дом узлы, потом эти узлы получить и их отрендорить
export default class TripSortItemView {
  // раз получается мы хотим получить готовый элемент и вставить в дом дерево, то мы должны этот элемент как-то получить
  constructor(sortItem){
    this._sortItem = sortItem; // добавил в класс параметр который должен получить шаблон
    this._element = null; // будет получен тот самый элемент для вставки в дом, но пока его нигде нет, будет null
  }

  getTemplate(){
    return getSortItems(this._sortItem);
  };

  // получаем разметку которая будет выводить тот самый элемент
  getElement(){
    if(!this._element) {
      this._element = createElement(this.getTemplate())
    }
    return this._element
  }

  // удаляем элемент
  removeElement(){
    this._element = null;
  };
}



