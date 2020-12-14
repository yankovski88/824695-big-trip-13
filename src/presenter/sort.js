import TripEventsSortView from "../view/trip-events-sort-view.js";
import {renderElement, RenderPosition, remove} from "../util/render";


export default class Sort {
  constructor(elementContainer) {
    this._elementContainer = elementContainer; // сделал контейнер куда нужно вставить вьюху сортировки
    // this._items = items; // мок данные
    // this._tripEventsSortComponent = TripEventsSortView(); // создал компонент сортировки
  }

  init(sortItems) { // создал метод инициализации
    this._sortItems = sortItems.slice(); // нужно скопировать чтобы напрямую не взамиодействовать с моками
    this._renderSort(this._sortItems);
  }

  // сортировка
  _renderSort(sortItems) {

    //НЕ ПОНИМАЮ хотел прописать this._tripEventsSortComponent в конструкторе, но понимаю
    // если я создаю компонент в конструкторе то я не смогу передать в него данные. Или делать чтобы данные шли
    // вместе с конструктором. Как лучше передать дополнительно с контейнером или здесь инициализзировать?
    this._tripEventsSortComponent = new TripEventsSortView(sortItems);
    renderElement(this._elementContainer, this._tripEventsSortComponent, RenderPosition.BEFOREEND); // рендер
    // сортировки
  };

}
