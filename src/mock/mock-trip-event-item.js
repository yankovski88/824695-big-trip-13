import dayjs from "dayjs";

// - Опишем статичный объект с данными
// - Попробуем сгенерировать описание задачи случайным образом

// Для создания новой точки маршрута пользователь заполняет:

//   Тип точки маршрута (один из: Taxi, Bus, Train, Ship, Transport, Drive, Flight, Check-in, Sightseeng, Restaurant).
// Пункт назначения. Выбирается из списка предложенных значений, полученных с сервера. Пользователь не может ввести свой вариант для пункта назначения.
//   Дата и время начала события. Выбор времени и даты осуществляется с помощью библиотеки flatpickr.js. Выбранная дата и время отображаются в поле в формате: день/месяц/год часы:минуты (например «25/12/2019 16:00»).
// Дата и время окончания события. Формат и требования аналогичны дате начала. Дата окончания не может быть меньше даты начала события.
//   Стоимость. Целое число.
//   Дополнительные опции. В зависимости от типа точки маршрута пользователь может выбрать дополнительные опции (offers).

// - Объявим функцию-генератор создаем объект со всеми рандомными данными
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// массив из которого выберится случайный тип маршрута
const types = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeng`, `Restaurant`];

// пункт назанчения
const destinations = [`Amsterdam`, `Chamonix`, `Geneva`];

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
// console.log(dateStart);
// цена
const prices = [500, 1000, 2000];

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

const getDescriptions = (items) => {
  const arr = [];
  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    arr.push(items[i]);
  }
  return arr;
};

const getPhoto = () => {
  const photos = [];
  const PHOTO_COUNT = 5;
  for (let i = 0; i < PHOTO_COUNT; i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random(i)}`);
  }
  return photos;
};

const getAdditionalOffer = () => {
  const arr = [];
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
  for (let i = 0; i < getRandomInteger(0, 5); i++) {
    arr.push(additionalOffer[i]);
  }
  return arr;
};
// const additionalOffer = [
//   {
//     id: 1,
//     offer: `Add luggage`,
//     price: 30,
//   },
//   {
//     id: 2,
//     offer: `Switch to comfort class`,
//     price: 100,
//   },
//   {
//     id: 3,
//     offer: `Add meal`,
//     price: 15,
//   },
//   {
//     id: 4,
//     offer: `Choose seats`,
//     price: 5,
//   },
//   {
//     id: 5,
//     offer: `Travel by train`,
//     price: 40,
//   },
// ];

// console.log(additionalOffer);
// const additionalOffer = getAdditionalOffer();
// функция которая возвращает объект со всеми данным для точки маршрута
export const tripEventItem = () => {

  return {
    type: types[getRandomInteger(1, types.length - 1)],
    destinations,
    price: prices[getRandomInteger(0, prices.length - 1)],
    dateStart,
    dateFinish,
    description: getDescriptions(descriptions),
    photoType: `http://picsum.photos/248/152?r=${Math.random(3)}`,
    photo: getPhoto(),
    sortItems: [`EVENT`, `TIME`, `PRICE`, `OFFERS`],
    additionalOffer: getAdditionalOffer(),
  };

};

