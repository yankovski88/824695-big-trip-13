import AbstractView from "./abstract";

const createEventMsg = ()=>{

  return `<div class="page-body__container">
        <section class="trip-events">
          <h2 class="visually-hidden">Trip events</h2>

          <p class="trip-events__msg">Click New Event to create your first point</p>
        </section>
      </div>`;
};

export default class EventListEmptyMessageView extends AbstractView {

  getTemplate() {
    return createEventMsg();
  }
}
