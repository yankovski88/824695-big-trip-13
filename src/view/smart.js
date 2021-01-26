import AbstractView from "./abstract.js";

export default class SmartView extends AbstractView {
  constructor() {
    super();
    this._dataItem = {}; // не
  }

  // 2
  // метод updateData, который будет обновлять данные в свойстве dataItem
  updateData(update, justDataUpdating) { // метод принимает то (update), что нужно в этом dataItem обновить // justDataUpdating
    if (!update) { // если нет обновлений
      return; // то прекратить выполнение функции
    }


    // изменяем данные которые пришли
    this._dataItem = Object.assign(
        {},
        this._dataItem,
        update // и заменяем новыми
    );

    if (justDataUpdating) { // флаг который говорит не нужно перерисовывать, а просто обнови данные(сохрани их). Это нужно исключительно для полей ввода т.к. они умеют сами себя перерисовывать.
      return;
    }
    this.updateElement(); // вызываем обновить элемент
  }

  // 1
  // Объявим метод updateElement, его задача удалить старый DOM элемент, вызвать генерацию нового и заменить один на другой
  updateElement() {
    let prevElement = this.getElement(); // сохранили изначальную(предыдущую) форму редактирования
    const parent = prevElement.parentElement; // сохранили родительский элементе формы edite
    this.removeElement(); // удаляем элемент Edit который сейчас создан данными
    const newElement = this.getElement(); // получаем новый элемент с новыми данными

    parent.replaceChild(newElement, prevElement); // заменяем старый элемент Edit на новый

    this.restoreHandlers(); // вызвали публичную функцию по востонавлению всех обработчиков
  }

  // обязательный публичный метод который обязательно должен быть реализован и он заново навешивает обработчики
  restoreHandlers() {
    throw new Error(`Abstract metod not implemented: resetHandlers`);
  }
}
