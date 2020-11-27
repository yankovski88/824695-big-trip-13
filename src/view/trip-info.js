import dayjs from "dayjs";

const createTripInfo = (dataItems) => {
  const {destinations, dateStart, dateFinish} = dataItems;
  const dateStartDay = dayjs(dateStart).format(`MMM DD`);
  const dateFinishDay = dayjs(dateFinish).format(`DD`);

  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${destinations[0]} &mdash; ${destinations[1]} &mdash; ${destinations[2]}</h1>
    <p class="trip-info__dates">${dateStartDay}&nbsp;&mdash;&nbsp;${dateFinishDay}</p>
  </div>
</section>`;
};

export {createTripInfo};
