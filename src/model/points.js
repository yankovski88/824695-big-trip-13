import Observer from "../util/observer.js";

// 1 создал модель
export default class PointsModel extends Observer {
  constructor() {
    super();
    this._points = []; // храним все точки маршрута
  }

  // метод для записи всех точек маршрута
  setPoints(points) {
    this._points = points.slice();
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

}


