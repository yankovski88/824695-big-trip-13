import Observer from "../util/observer.js";
import {getRandomInteger} from "../util/common";
import {dataOffers, generateId, getDestination} from "../mock/mock-trip-event-item";
import dayjs from "dayjs";


// 1 создал модель
export default class OffersModel extends Observer {
  constructor() {
    super();
    this._offers = []; // храним все точки маршрута
  }

  // метод для записи всех точек маршрута
  setOffers(offers) {
    offers.forEach((item)=>{
      this._offers.push(item)
    });

    // this._offers = offers.slice();
    console.log(offers)
  }

  // метод по возврату всех точек маршрута
  getOffers() {
    return this._offers;


  }



}


