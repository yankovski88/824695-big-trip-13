import dayjs from "dayjs";
import {getRandomInteger} from "../util/common.js";


// массив из которого выберится случайный тип маршрута
export const TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

// дата начала и конца поездки
const generateDate = () => {

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

// код по получению рандомного offer
// const getRandomOffer = (offers) => {
//   const randomNumber = getRandomInteger(0, offers.length - 1);
//   const items = [];
//   items.push(offers[randomNumber]);
//   return items;
// };

// // создал массив чисто для случайной генерации одного офера для точки
// const getEventRandomOffer = (offers) => {
//   const randomNumber = getRandomInteger(0, offers.length - 1);
//   const items = [];
//   items.push(offers[randomNumber]);
//   return items;
// };

// пункт назанчения
const destinationItems = [`Amsterdam`, `Chamonix`, `Geneva`, `Minsk`];

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

// массив со всеми офферрами в зависимости от типа
export const dataOffers = [
  {
    "type": `Taxi`,
    "offers": [
      {
        "title": `Upgrade to a business class`,
        "price": 120
      }, {
        "title": `Choose the radio station`,
        "price": 60
      }
    ]
  },
  {
    "type": `Bus`,
    "offers": [
      {
        "title": `Add luggage`,
        "price": 50,
      },
      {
        "title": `Choose seats`,
        "price": 5,
      },
    ]
  },
  {
    "type": `Train`,
    "offers": [
      {
        "title": `Add luggage`,
        "price": 50,
      },
      {
        "title": `Switch to comfort class`,
        "price": 80,
      },
      {
        "title": `Add meal`,
        "price": 15,
      },
      {
        "title": `Choose seats`,
        "price": 5,
      },
      {
        "title": `Travel by train`,
        "price": 40,
      },
    ]
  },
  {
    "type": `Ship`,
    "offers": [
      {
        "title": `Add luggage`,
        "price": 50,
      },
      {
        "title": `Switch to comfort class`,
        "price": 80,
      },
      {
        "title": `Add meal`,
        "price": 15,
      },
      {
        "title": `Choose seats`,
        "price": 5,
      },
    ]
  },
  {
    "type": `Transport`,
    "offers": [
      {
        "title": `Add luggage`,
        "price": 50,
      },
      {
        "title": `Switch to comfort class`,
        "price": 80,
      },
      {
        "title": `Add meal`,
        "price": 15,
      },
      {
        "title": `Choose seats`,
        "price": 5,
      },
    ]
  },
  {
    "type": `Drive`,
    "offers": [
      {
        "title": `Add luggage`,
        "price": 50,
      },
      {
        "title": `Add meal`,
        "price": 15,
      },
      {
        "title": `Choose seats`,
        "price": 5,
      },
    ]
  },
  {
    "type": `Flight`,
    "offers": [
      {
        "title": `Add luggage`,
        "price": 50,
      },
      {
        "title": `Switch to comfort class`,
        "price": 80,
      },
      {
        "title": `Add meal`,
        "price": 15,
      },
      {
        "title": `Choose seats`,
        "price": 5,
      },
    ]
  },
  {
    "type": `Check-in`,
    "offers": [{
      "title": `Choose seats`,
      "price": 5,
    }]
  },
  {
    "type": `Sightseeing`,
    "offers": [{
      "title": ``,
      "price": ``,
    }]
  },
  {
    "type": `Restaurant`,
    "offers": [{
      "title": ``,
      "price": ``,
    }]
  },
];


// // код который из массива с объектом возвращает тип
// const getTypeOffer = (offer) => {
//   let type;
//   for (let item of offer) {
//     type = item.type;
//   }
//   return type;
// };

// // код который из массива с объектом возвращает массив с объектами оффер
// const getOffers = (offer) => {
//   const arrs = [];
//   arrs.push(offer[0].offers[0]);
//   return arrs;
// };

// код возращает массив offers = [{}, {},]
const getActiveOffers = (type, offers) => {
  let typeOffers;
  for (let item of offers) {
    if (type === item.type) {
      typeOffers = [item.offers[0]];
    }
  }
  return typeOffers;
};
// код на получение всех оферсов по типу
const getAllOffers = (type, offers) => {
  let typeOffers;
  for (let item of offers) {
    if (type === item.type) {
      typeOffers = item.offers;
    }
  }
  return typeOffers;
};

// console.log(getActiveOffers(`Taxi`, dataOffers));

// // код на получение всех доступных офферсов
// const getAllOffers = (offer) => {
//   return offer[0].offers;
// };


// рандомный объект для event form
export const getDestination = () => {
  return {
    "description": getDescription(descriptions),
    "name": destinationItems[getRandomInteger(0, destinationItems.length - 1)],
    "pictures": [
      {
        "src": getPhotos(),
        "description": `event ${getDescription(descriptions)}`
      }
    ]
  };
};

// массив объектов для event form
export const destinations = [{
  "description": `Amsterdam ${getDescription(descriptions)}`,
  "name": `Amsterdam`,
  "pictures": [
    {
      "src": getPhotos(),
      "description": `event Amsterdam`
    }
  ]
},
{
  "description": `Chamonix ${getDescription(descriptions)}`,
  "name": `Chamonix`,
  "pictures": [
    {
      "src": getPhotos(),
      "description": `event Chamonix`
    }
  ]
},
{
  "description": `Geneva ${getDescription(descriptions)}`,
  "name": `Geneva`,
  "pictures": [
    {
      "src": getPhotos(),
      "description": `event Geneva`
    }
  ]
},
{
  "description": `Minsk ${getDescription(descriptions)}`,
  "name": `Minsk`,
  "pictures": [
    {
      "src": getPhotos(),
      "description": `event Minsk`
    }
  ]
},

];

export const getTripEventItem = () => {
  // const randomCheckOffer = getEventRandomOffer(dataOffers);
  const randomType = TYPES[getRandomInteger(1, TYPES.length - 1)];
  return {
    "type": randomType, // TYPES[getRandomInteger(1, TYPES.length - 1)], // getTypeOffer(randomCheckOffer)
    "basePrice": prices[getRandomInteger(0, prices.length - 1)],
    "dateFrom": generateDateStart(),
    "dateTo": generateDate(),
    "destination": getDestination(),
    "id": generateId(),
    "isFavorite": getRandomInteger(0, 1),
    "offers": getActiveOffers(randomType, dataOffers), // getOffers(randomCheckOffer), //, //  // getEventRandomOffer(eventOffers),
    "editFormOffers": getAllOffers(randomType, dataOffers) // getAllOffers(randomCheckOffer),
  };
};


