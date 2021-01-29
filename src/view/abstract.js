import {createElement} from "../util/render";

// - Опишем компонент меню как класс, который уже возвращает готовый элемент, а не шаблон
// компонент должен как-то собраться и сгененировать дом узлы, потом эти узлы получить и их отрендорить
const SHAKE_ANIMATION_TIMEOUT = 600;

export default class Abstract {
  constructor() {
    // запрещаем создавать экземпляры классы абстракт напрямую
    if (new.target === Abstract) { // если класс abstract содрежит ссылку на конструткор
      throw new Error(`class can not create from Abstract`);
    }
    this._element = null;
    this._callback = {}; // здесь мы будем сохранять и удалялть обработчики
  }

  // через этом метода вызовем функцию по отрисовке разметки. Она у всех разная и за этого создаем ее пустой
  getTemplate() {
    throw new Error(`Error, pls create getTemplate. Abstract method not implemented: getTemplate`);
  }

  // Имплиментирем этот элемент полностью т.к. работает он везде одинаково.
  // логика для получения элемента которая может быть вставлена в дом. Инициализируем элемент.
  getElement() {
    // если нет элемента, а его нет! т.к. изначально прописал
    if (!this._element) {
      // если не будет создан элемент через функцию createElement, то getTemplate будет строка и не сможем вставить в
      // дом этот элемент через replaseChild(), будет вставлятся текст в ковычках.
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  shake(callback) {
    this.getElement().style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = ``;
      callback();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}


