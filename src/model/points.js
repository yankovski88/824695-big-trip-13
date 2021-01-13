import Observer from "../util/observer.js";

// 1 создал модель
export default class PointsModel extends Observer {
  constructor() {
    super();
    this._points = []; // храним точки маршрута
  }

  setPoints(points) {
    this._points = points.slice(); // метод для записи точек маршрута
  }

  getPoints() {
    return this._points; // возвращаем данные точек маршрута
  }


// 28
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

  addPoint(updateType, update) {  // 29
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {  // 30
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


