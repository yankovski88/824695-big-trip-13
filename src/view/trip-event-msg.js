import {createElement} from "../mock/util";

const createEventMsg = ()=>{

  return `<div class="page-body__container">
        <section class="trip-events">
          <h2 class="visually-hidden">Trip events</h2>

          <p class="trip-events__msg">Click New Event to create your first point</p>
        </section>
      </div>`;
};

export default class EventMsgView {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEventMsg();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
