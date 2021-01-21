import Observer from "../util/observer.js";
import {getRandomInteger} from "../util/common";
import {dataOffers, generateId, getDestination} from "../mock/mock-trip-event-item";
import dayjs from "dayjs";


// 1 создал модель
export default class PointsModel extends Observer {
  constructor() {
    super();
    this._points = []; // храним все точки маршрута
  }

  // метод для записи всех точек маршрута
  setPoints(updateType, points) {
    this._points = points.slice();
console.log(updateType, points)
    this._notify(updateType); // теперь как только точки появятся модель всех уведомит
  }

  // метод по возврату всех точек маршрута
  getPoints() {
    return this._points;
  }


  // 28 обновить точку
  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting point`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  // добавить точку
  addPoint(updateType, update) { // 29
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  // удалить точку
  deletePoint(updateType, update) { // 30
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting point`);
    }
    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }


// метод Адаптер который адоптирует данные от сервера на читаемые данные для клиента
  static adaptToClient(point) { // получаем объект с неугодными нам полями изменили названия полей, удалили старые серверные и вернули отредоктированный объект
    const date = (time)=>{
      const daysGap = new Date(time).valueOf();
      const date = dayjs().add(daysGap, `day`).add(daysGap, `hour`).add(daysGap, `minute`).toDate();
return date
    };

    const adaptedPoint = Object.assign(
      {},
      point,
      {
        // в basePrice записали, то что пришло с сервера, плюс можно модифицировать данные как с датой
        basePrice: point.base_price,
        dateFrom: new Date(point.date_from).valueOf(), // date(point.date_from), //, // // На клиенте дата хранится как экземпляр Date dayjs().point.date_from.toDate(),
        dateTo: new Date(point.date_to).valueOf(), // dayjs().point.date_to.toDate(),
        isFavorite: point.is_favorite,
      }
    );

    // const dateStart = dayjs().add(daysGap, `day`).add(daysGap, `hour`).add(-maxDaysGap, `minute`).toDate();
    //
    // "type": randomType,
    //   "basePrice": prices[getRandomInteger(0, prices.length - 1)],
    //   "dateFrom": generateDateStart(),
    //   "dateTo": generateDate(),
    //   "destination": getDestination(),
    //   "id": generateId(),
    //   "isFavorite": getRandomInteger(0, 1),
    //   "offers": getActiveOffers(randomType, dataOffers),
    //   "editFormOffers": getAllOffers(randomType, dataOffers)

    // {
    //   "base_price": 1100,
    //   "date_from": "2019-07-10T22:55:56.845Z",
    //   "date_to": "2019-07-11T11:22:13.375Z",
    //   "destination": $Destination$,
    //   "id": "0",
    //   "is_favorite": false,
    //   "offers": [
    //   {
    //     "title": "Choose meal",
    //     "price": 180
    //   }, {
    //     "title": "Upgrade to comfort class",
    //     "price": 50
    //   }
    // ],
    //   "type": "bus" +
    // }

    //   basePrice: dayjs().point.base_price.toDate(),
    //     dateFrom: dayjs().point.date_from.toDate(),
    //   dateTo: dayjs().point.date_to.toDate(),
    //   isFavorite: point.is_favorite,
    //   // dueDate: point.due_date !== null ? new Date(point.due_date) : point.due_date, // На клиенте дата хранится как экземпляр Date
    // }

    // Ненужные ключи мы удаляем
    delete adaptedPoint.base_price;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.is_favorite;


    return adaptedPoint;
  }

  // и метод который адаптирует клиентские данные для сервера
  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        "date_from": new Date(point.dateFrom).toISOString(), // На сервере дата хранится в ISO формате
        "date_to": new Date(point.dateTo).toISOString(),
        "base_price": point.basePrice,
        "is_favorite": point.isFavorite,
      }
    );

    // Ненужные ключи мы удаляем
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.basePrice;
    delete adaptedPoint.isFavorite;


    return adaptedPoint;
  }


}


