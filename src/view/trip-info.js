// import dayjs from "dayjs";
// import AbstractView from "./abstract.js";
//
// const createTripInfo = (destinations, starts) => {
//
//   const dateStartDay = dayjs(starts[0]).format(`MMM DD`);
//   const dateFinishDay = dayjs(starts[starts.length - 1]).format(`DD`);
//
//   return `<section class="trip-main__trip-info  trip-info">
//   <div class="trip-info__main">
//     <h1 class="trip-info__title">${destinations[0]} &mdash; ${destinations[(destinations.length - 1) / 2]} &mdash; ${destinations[destinations.length - 1]}</h1>
//     <p class="trip-info__dates">${dateStartDay}&nbsp;&mdash;&nbsp;${dateFinishDay}</p>
//   </div>
// </section>`;
// };
//
// export default class TripInfoView extends AbstractView {
//   constructor(destinations, starts) {
//     super();
//     this._destinations = destinations;
//     this._starts = starts;
//   }
//
//   getTemplate() {
//     return createTripInfo(this._destinations, this._starts);
//   }
// }
