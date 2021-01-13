// 2 реализуем класс паттерн наблиюдатель
export default class Observer{
  constructor(){
    this._observers = []; // храним все колбеки
  }
  addObserver(observer){
    this._observers.push(observer) // добавляем колбеки
  }
  removeObserver(observer){
    this._observers = this._observers.filter((existedObserver) => existedObserver !== observer); // удаляем колбек
  }

  _notify(event, payload){ // _notify это метод который сам будет решать когда может уведомлять подписчиков.
                           // event это тип события. payload это полезная нагрузка
    // здесь происходит запуск всех колбеков переданных с tripBoard
    this._observers.forEach((observer) => observer(event, payload))
  }
}
