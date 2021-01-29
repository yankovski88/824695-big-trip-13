import Observer from "../util/observer.js";

// создал модель
export default class Destinations extends Observer {
  constructor() {
    super();
    this._destinations = []; // храним все точки маршрута
  }

  // метод для записи всех точек маршрута
  setDestinations(destinations) {
    destinations.forEach((item)=>{
      this._destinations.push(item);
    });
  }

  // метод по возврату всех точек маршрута
  getDestinations() {
    return this._destinations;
  }
}


