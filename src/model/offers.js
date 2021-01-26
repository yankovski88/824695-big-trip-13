import Observer from "../util/observer.js";

// создал модель
export default class OffersModel extends Observer {
  constructor() {
    super();
    this._offers = []; // храним все точки маршрута
  }

  // метод для записи всех точек маршрута
  setOffers(offers) {
    offers.forEach((item)=>{
      this._offers.push(item);
    });
  }

  // метод по возврату всех точек маршрута
  getOffers() {
    return this._offers;
  }
}


