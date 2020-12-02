import dayjs from "dayjs";
import {createElement} from "../mock/util";
// функция по установке времени в форме
const createFieldTime = (dateItem) => {
  const {dateStart, dateFinish} = dateItem;
  // установка формата времени
  const startTime = dayjs(dateStart).format(`DD/MM/YY HH:mm`);
  const finishTime = dayjs(dateFinish).format(`DD/MM/YY HH:mm`);

  return `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
    &mdash;
<label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${finishTime}">
    </div>`;
};

export default class FieldTimeView {
  constructor(dateItem){
    this._dateItem = dateItem;

    this._element = null;
  }

  getTemplate(){
    return createFieldTime(this._dateItem);
  }

  getElement(){
    if(!this._element){
      this._element = createElement(this.getTemplate());
    }
    return this._element
  }

  removeElement(){
    this._element = null;
  }
}
