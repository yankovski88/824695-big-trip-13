import dayjs from "dayjs";
import {getRandomInteger} from "../util/common.js";
// массив из которого выберится случайный тип маршрута
const TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

// дата начала и конца поездки
const generateDate = () => {
  // const isDate = Boolean(getRandomInteger(0, 1));
  //
  // if (!isDate) {
  //   return null;
  // }

  const maxHoursGap = 4;
  const hoursGap = getRandomInteger(1, maxHoursGap);
  const dateFinish = dayjs().add(hoursGap, `day`).add(hoursGap, `hour`).add(-hoursGap, `minute`).toDate(); // рандом
  // день
  return dateFinish;
};

// функция действующего времени
const generateDateStart = () => {

  const maxDaysGap = 3;
  const daysGap = getRandomInteger(-maxDaysGap, 1);
  const dateStart = dayjs().add(daysGap, `day`).add(daysGap, `hour`).add(-maxDaysGap, `minute`).toDate();

  return dateStart;
};

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

const additionalOffers = [
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
    items.push(additionalOffers[i]);
  }
  return items;
};

// пункт назанчения
const destinationItems = [`Amsterdam`, `Chamonix`, `Geneva`, `Minsk`];

// Date.now() и Math.random() - плохие решения для генерации id
// в "продуктовом" коде, а для моков самое то.
// Для "продуктового" кода используйте что-то понадежнее,
// вроде nanoid - https://github.com/ai/nanoid
const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

// функция которая возвращает объект со всеми данным для точки маршрута
export const getTripEventItem = () => {
  return {
    id: generateId(), // будем понимать какой в event находится presenter
    type: TYPES[getRandomInteger(1, TYPES.length - 1)],
    price: prices[getRandomInteger(0, prices.length - 1)],
    dateStart: generateDateStart(),
    dateFinish: generateDate(),
    description: getDescription(descriptions),
    photos: getPhotos(),
    additionalOffers: getAdditionalOffers(),
    destinationItem: destinationItems[getRandomInteger(0, destinationItems.length - 1)],
    favorite: getRandomInteger(0, 1),
  };
};

