import Observer from "../util/observer.js";

// создал модель
export default class PointsModel extends Observer {
  constructor() {
    super();
    this._points = []; // храним все точки маршрута
  }

  // метод для записи всех точек маршрута
  setPoints(updateType, points) {
    this._points = points.slice();
    this._notify(updateType); // теперь как только точки появятся модель всех уведомит
  }

  // метод по возврату всех точек маршрута
  getPoints() {
    return this._points;
  }


  // обновить точку
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
  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  // удалить точку
  deletePoint(updateType, update) {
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

    const adaptedPoint = Object.assign(
        {},
        point,
        {
        // в basePrice записали, то что пришло с сервера, плюс можно модифицировать данные как с датой
          basePrice: point.base_price,
          dateFrom: new Date(point.date_from),
          dateTo: new Date(point.date_to),
          isFavorite: point.is_favorite,
        }
    );

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
          "base_price": parseInt(point.basePrice, 10) ? parseInt(point.basePrice, 10) : 0,
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


