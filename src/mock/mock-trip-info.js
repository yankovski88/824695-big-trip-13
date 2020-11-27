import dayjs from "dayjs";
import {getRandomInteger} from "./util.js";

// пункт назанчения
const destinations = [`Amsterdam`, `Chamonix`, `Geneva`, `Minsk`];

// функция действующего времени
const generateDateStartDestination = () => {
  return dayjs().toDate();
};

// к действующему времени прибавили рандом
const generateDate = () => {
  // const isDate = Boolean(getRandomInteger(0, 1));
  //
  // if (!isDate) {
  //   return null;
  // }

  const maxDaysGap = 3;
  const daysGap = getRandomInteger(1, maxDaysGap);

  return dayjs().add(daysGap, `day`).toDate();
};

const dateStart = generateDateStartDestination();
const dateFinish = generateDate();

const getTripInfo = () => {
  return {
    destinations,
    dateStart,
    dateFinish
  };
};

export {getTripInfo};
