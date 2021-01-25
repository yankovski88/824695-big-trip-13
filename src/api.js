import PointsModel from "./model/points.js";
import OffersModel from "./model/offers.js";


const Method = { // методы для сервера
  GET: `GET`, // загрузить себе на комп
  PUT: `PUT`, // изменить на компе
  POST: `POST`,
  DELETE: `DELETE`,
};

const SuccessHTTPStatusRange = { // список успешных ответов от сервера
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) { // endPoint тот адрес куда мы хотим сделать запрос. authorization это некая строка авторизации
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  // 1. Если кто-то с наружи вызовет метод getPoints, то произайдет fetch обернутый в this._load метод,а url добавится к начальной ссылке
  // метод вызывает this._load со специальным url
  getPoints() {
    return this._load({url: `points`}) // this._load приватный метод который бдует брать на себя настройку фича
      // {url: `points`} специальный url
      .then(Api.toJSON) // далее делает вызов статичного метода Api.toJSON, чтобы получили формат json для работы
      .then((points) => points.map(PointsModel.adaptToClient)); // при помощи map адаптировали серварные данные на данные клиента
  }

  getOffers() {
    return this._load({url: `offers`})
      .then(Api.toJSON);
  }
  getDestinations() {
    return this._load({url: `destinations`})
      .then(Api.toJSON);
  }

  addPoint(point) {
    return this._load({
      url: `points`,
      method: Method.POST,
      body: JSON.stringify(PointsModel.adaptToServer(point)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(PointsModel.adaptToClient);
  }

  deletePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.DELETE
    })
  }



  // этот метод берет уже _load c некими настройками
  updatePoint(point) {
    return this._load({
      url: `points/${point.id}`,
      method: Method.PUT, // метод PUT
      body: JSON.stringify(PointsModel.adaptToServer(point)), //  теперь наоборот переделываем данные на серверные
      headers: new Headers({"Content-Type": `application/json`}) // объектом заголовков Headers это нужно чтобы предупредить сервер, что мы ему отправляем JSON
    })
      .then(Api.toJSON)
      .then(PointsModel.adaptToClient);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers() // пустой экземпляр глобального объекта Headers
  }) {
    headers.append(`Authorization`, this._authorization); // в этот по умолчанию пустой обект headers добавляем строку авторизации
    // строка авторизации будет передоваться как один из заголовков
    // append это встроенный метод заголовков
    // `Authorization` ключ авторизация
    // this._authorization это значение

    return fetch( // затем мы вывзываем fetch
        `${this._endPoint}/${url}`, // это используем в качестве адреса для fetch. ${url} это конкретно переданный url. this._endPoint это начало ссылки
        {method, body, headers}
    )
      .then(Api.checkStatus) // вызываем then со статичным методом Api.checkStatus и вернет response далее в методе getPoints он попадет в then
      .catch(Api.catchError); // если ошибка, то вызовится catch с методом Api.catchError
  }

  // эти 3 ниже статичных метода нужны для нашего одного приватного

  // метод проверки статуса из периода 200
  static checkStatus(response) {
    if ( // если статус не вложится от 200 до 299
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`); // то вызовется ошибка
    }

    return response;
  }

  static toJSON(response) { // это обертка над response.json() чтобы не писать ее каждый раз
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
