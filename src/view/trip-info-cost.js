import AbstractView from "./abstract.js";

const createTripInfoCost = (price) => {
  return `<p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${price}</span>
    </p>`;
};

export default class TripInfoCostView extends AbstractView {
  constructor(price) { // в конструктор помещаем свойства
    super(); // вызываем родительский конструктор и ничего в него не передаем т.к. так сделано в родителе.
    // СНАЧАЛА пишем super();
    this._price = price; // определили приватное поле this._price
  }

  // функция по возврату шаблона
  getTemplate() {
    return createTripInfoCost(this._price);
  }
}
