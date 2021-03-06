import dayjs from "dayjs";
import AbstractView from "../view/abstract";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration); // это нужно чтобы работало вычетание дат


// добавляет
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

export const getDateInDays = (dateDiff) => {
  const timeDuration = dayjs.duration(dateDiff);
  const days = timeDuration.days();
  const hours = timeDuration.hours();
  const minutes = timeDuration.minutes();
  const time = `${(days > 0) ? addZeroToNumber(days) + `D ` : ``}${(hours > 0) ? addZeroToNumber(hours) + `H ` : ``}${(minutes > 0) ? addZeroToNumber(minutes) + `M` : ``}`;
  return time;
};

// объект с константами куда вставить елемент
const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterEnd`
};


// Цель сделать чтобы функция принимала компонент или элемент сама смотрела что ей из этого передали и отрисала как надо
// функция которая вставит внутрь шаблона элемент
const renderElement = (container, element, position) => {
  if (container instanceof AbstractView) { // если к нам приходит потомок класса Abstract
    // Оператор instanceof проверяет, принадлежит ли объект к определённому классу
    container = container.getElement(); // если вместо элемента передадли компонент, то вызываем в нем getElement
  }
  // тоже если child(element) это компонент абстракта то вызовем в нем getElement();
  if (element instanceof AbstractView) {
    element = element.getElement();
  }

  switch (position) { // попадает позиция
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

const createElement = (template) => {
  const newElement = document.createElement(`div`); // создаем пустой div
  newElement.innerHTML = template; // берем HTML в виде строки и вкладываем в этот div-блок, превращаия в DOM-элемент

  return newElement.firstChild; // возвращаем имеено вставленый элемент(ребенка) без созданого нами div
  // т.е. элемент изначально должен имет свою собственную обертку
};


const remove = (component) => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }
  component.getElement().remove();
  component.removeElement();
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};


export {getDateDiff, renderElement, createElement, RenderPosition, remove};
