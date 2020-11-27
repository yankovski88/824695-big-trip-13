import dayjs from "dayjs";

// массив из которого выберится случайный тип маршрута
const TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeng`, `Restaurant`];

// - Объявим функцию-генератор создаем объект со всеми рандомными данными
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


// дата начала и конца поездки
const generateDate = () => {
  // const isDate = Boolean(getRandomInteger(0, 1));
  //
  // if (!isDate) {
  //   return null;
  // }

  const maxHoursGap = 4;
  const hoursGap = getRandomInteger(1, maxHoursGap);

  return dayjs().add(hoursGap, `hour`).toDate();
};

// функция действующего времени
const generateDateStart = () => {
  return dayjs().toDate();
};

const dateStart = generateDateStart();
const dateFinish = generateDate();

// цена
const prices = [20, 50, 160, 180];

// описание от 1 до 5 предложений из текста
const descriptions = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`];

const getDescription = (items) => {
  const descriptionItems = [];
  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    descriptionItems.push(items[i]);
  }
  const description = descriptionItems.join(` `);
  return description;
};

const getPhotos = () => {
  const photos = [];
  const PHOTO_COUNT = 5;
  for (let i = 0; i < getRandomInteger(1, PHOTO_COUNT); i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random(i)}`);
  }
  return photos;
};

const additionalOffer = [
  {
    id: 1,
    offer: `Add luggage`,
    price: 30,
  },
  {
    id: 2,
    offer: `Switch to comfort class`,
    price: 100,
  },
  {
    id: 3,
    offer: `Add meal`,
    price: 15,
  },
  {
    id: 4,
    offer: `Choose seats`,
    price: 5,
  },
  {
    id: 5,
    offer: `Travel by train`,
    price: 40,
  },
];


const getAdditionalOffers = () => {
  const items = [];

  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    items.push(additionalOffer[i]);
  }
  return items;
};

const getAdditionalOfferItems = () => {
  const items = [];

  for (let i = 0; i < getRandomInteger(0, additionalOffer.length); i++) {
    items.push(additionalOffer[i]);
  }
  return items;
};


// функция которая возвращает объект со всеми данным для точки маршрута
export const getTripEventItem = () => {

  return {
    type: TYPES[getRandomInteger(1, TYPES.length - 1)],
    price: prices[getRandomInteger(0, prices.length - 1)],
    dateStart,
    dateFinish,
    description: getDescription(descriptions),
    photoType: `http://picsum.photos/248/152?r=${Math.random(3)}`,
    photos: getPhotos(),
    additionalOffer: getAdditionalOffers(),
    addOfferItem: getAdditionalOfferItems(),
  };
};

