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
}
