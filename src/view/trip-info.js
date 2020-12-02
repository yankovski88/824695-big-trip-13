import dayjs from "dayjs";
import {createElement} from "../mock/util";

const createTripInfo = (destinations, starts) => {

  const dateStartDay = dayjs(starts[0]).format(`MMM DD`);
  const dateFinishDay = dayjs(starts[starts.length - 1]).format(`DD`);

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${destinations[0]} &mdash; ${destinations[1]} &mdash; ${destinations[2]}</h1>
    <p class="trip-info__dates">${dateStartDay}&nbsp;&mdash;&nbsp;${dateFinishDay}</p>
  </div>
</section>`;
};

// export {createTripInfo};
export default class TripInfoView {
  constructor(destinations, starts){
    this._destinations = destinations;
    this._starts = starts;

    this._element = null;
  }

  getTemplate(){
    return createTripInfo(this._destinations, this._starts);
  }

  getElement(){
    if(!this._element){
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement(){
    this._element = null;
  }
}
