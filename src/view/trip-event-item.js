import dayjs from "dayjs";
import {getRandomInteger} from "../mock/util.js";

const createTripEventItem = (dataItems) => {
  const {type, price, dateStart, dateFinish, photoType, addOfferItem} = dataItems;

  const getAdditionalOffer = () => {
    const additionalOffers = [];
    for (let i = 0; i < addOfferItem.length; i++) {
      additionalOffers.push(`
     <li class="event__offer">
                    <span class="event__offer-title">${addOfferItem[i].offer}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${addOfferItem[i].price}</span>
                  </li>
  `);
    }
    const additionalOfferItem = additionalOffers.join(` `);
    return additionalOfferItem;
  };


  const dateS = dayjs(dateStart).format(`HH:mm`);
  const dateF = dayjs(dateFinish).format(`HH:mm`);

  const dateStartDay = dayjs(dateStart).add(getRandomInteger(-3, 3), `day`).format(`MMM DD`);
  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${dateStartDay}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="${photoType}" alt="Event type icon">
                </div>
                <h3 class="event__title">${type}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T14:30">${dateS}</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T16:05">${dateF}</time>
                  </p>
               

                  <p class="event__duration">${dayjs(dateFinish).subtract(dayjs(dateStart)).format(`HH:mm`)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span> 
                  <!--160-->
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${getAdditionalOffer()}
               
                </ul>
                <button class="event__favorite-btn  event__favorite-btn--active" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

export {createTripEventItem};
