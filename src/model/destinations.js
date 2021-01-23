import Observer from "../util/observer.js";
import {getRandomInteger} from "../util/common";
import {dataOffers, generateId, getDestination} from "../mock/mock-trip-event-item";
import dayjs from "dayjs";


// 1 создал модель
export default class DestinationsModel extends Observer {
  constructor() {
    super();
    this._destinations = []; // храним все точки маршрута
  }

  // метод для записи всех точек маршрута
  setDestinations(destinations) {
    destinations.forEach((item)=>{
      this._destinations.push(item)
    });
    // this._destinations = destinations.slice();
    console.log(this._destinations);
  }

  // метод по возврату всех точек маршрута
  getDestinations() {
    // console.log(this._destinations);
    return this._destinations;
  }

}



