import AbstractView from "./abstract.js";

export default class SmartView extends AbstractView {
  constructor() {
    super();
    this._dataItem = {}; // не
  }

  // // метод updateData, который будет обновлять данные в свойстве dataItem
  updateData(update, justDataUpdating) { // метод принимает то (update), что нужно в этом dataItem обновить // justDataUpdating
    if (!update) { // если нет обновлений
      return; // то прекратить выполнение функции
    }

    this._dataItem = Object.assign( // изменяем данные которые пришли
        {}, // создаем объект*
        this._dataItem, // проходим по старым данным*
        update // и заменяем новыми*
    );

    if (justDataUpdating) { // флаг который говорит не нужно перерисовывать, а просто обнови данные(сохрани их). Это нужно исключительно для полей ввода т.к. они умеют сами себя перерисовывать.
      return;
    }

    // if(update){ // поля ввода сами умеют перерисовываться и за этого не нужно обновлять елемент
    //   return;
    // }

    this.updateElement(); // вызываем обновить элемент
  }

  // Объявим метод updateElement, его задача удалить старый DOM элемент, вызвать генерацию нового и заменить один на другой
  updateElement() {
    let prevElement = this.getElement(); // сохранили изначальную(предыдущую) форму редактирования
    const parent = prevElement.parentElement; // сохранили родительский элементе формы edite
    this.removeElement(); // удаляем элемент Edit который сейчас создан данными

    const newElement = this.getElement(); // получаем новый элемент с новыми данными

    parent.replaceChild(newElement, prevElement); // заменяем старый элемент Edit на новый

    this.restoreHandlers(); // вызвали публичную функцию по востонавлению всех обработчиков
  }

  // публичный метод который заново навешивает обработчики
  restoreHandlers() {
    this._setInnerHandlers(); // востанавливаем приватные обработчики
    this.setSubmitHandler(this._callback.submit); // востанавливаем внешние обработчики. вызвали обработчик который был сохранен в объекте.
    // console.log(this._callback); // внутри только submit
    // this.setFormSubmitHandler(this._callback.formSubmit);
  }


}
