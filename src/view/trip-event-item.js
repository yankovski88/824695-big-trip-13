import dayjs from "dayjs";

const createTripEventItems = (dataItems) => {
  const {type, price, dateStart, dateFinish, additionalOffers, destinationItem} = dataItems;

  const getAdditionalOffers = () => {
    return additionalOffers.reduce((total, element) => {
      return total + `
     <li class="event__offer">
                    <span class="event__offer-title">${element.offer}</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">${element.price}</span>
                  </li>
  `;
    }, ``);
  };

  const startDate = dayjs(dateStart).format(`HH:mm`); // часы в item
  const finishDate = dayjs(dateFinish).format(`HH:mm`);

  const dateStartDay = dayjs(dateStart).format(`MMM DD`); // дата в item

  const getTimeDifference = () => {
    const timeDifference = dayjs(dateFinish).subtract(dayjs(dateStart)).subtract(3, `hour`).format(`HH:mm`);

    const timeDifferenceFormat = dayjs(dateFinish).subtract(dayjs(dateStart)).subtract(3, `hour`);
    const hour = dayjs(1).subtract(2, `hour`).format(`HH:mm`);
    if (timeDifference < hour) {
      return timeDifferenceFormat.format(`m`) + `M`;
    } else {
      return timeDifferenceFormat.format(`HH:mm`);
    }
  };
  getTimeDifference();
  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${dateStartDay}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/drive.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destinationItem}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="2019-03-18T14:30">${startDate}</time>
                    &mdash;
                    <time class="event__end-time" datetime="2019-03-18T16:05">${finishDate}</time>
                  </p>
               

                  <p class="event__duration">${getTimeDifference()}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span> 
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                ${getAdditionalOffers()}
               
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

export {createTripEventItems};
