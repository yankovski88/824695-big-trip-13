import dayjs from "dayjs";
/* global require */
const duration = require(`dayjs/plugin/duration`);
dayjs.extend(duration);

// - Объявим функцию-генератор создаем объект со всеми рандомными данными
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

// добавляет 0
const addZeroToNumber = (number) => {
  return (number < 10) ? `0${number}` : number;
};

// функция по расчету разницы
const getDateDiff = (start, finish) => {
  const diffTimeInMs = finish.diff(start);
  const timeDuration = dayjs.duration(diffTimeInMs); // от конечной даты вычли начальную пример {years: 0, months: 0, days: 4, hours: 4, minutes: 1, …}
  const days = timeDuration.days(); // взяли цифру дни
  const hours = timeDuration.hours(); // взяли цифру часы
  const minutes = timeDuration.minutes(); // взяли цифру минуты
  const time = `${(days > 0) ? addZeroToNumber(days) + `D ` : ``}${(hours > 0) ? addZeroToNumber(hours) + `H ` : ``}${(minutes > 0) ? addZeroToNumber(minutes) + `M` : ``}`;
  return time;
};

// объект с константами куда вставить елемент
const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterEnd`
};

// функция которая вставит внутрь шаблона элемент
const renderElement = (container, element, position) => {
  switch (position) { // попадает позиция
    case RenderPosition.AFTERBEGIN: // если она RenderPosition.AFTERBEGIN
      container.prepend(element); // то вставить в начало(pripend())
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

const createElement = (template) =>{
  const newElement = document.createElement(`div`); // создаем пустой div
  newElement.innerHTML = template; // берем HTML в виде строки и вкладываем в этот div-блок, превращаия в DOM-элемент

  return newElement.firstChild; // возвращаем имеено вставленый элемент(ребенка) без созданого нами div
  // т.е. элемент изначально должен имет свою собственную обертку
};

export {getRandomInteger, getDateDiff, renderElement, createElement, RenderPosition};
