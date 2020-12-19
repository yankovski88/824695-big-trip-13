import TripEventsSortView from "../view/trip-events-sort-view.js";
import {renderElement, RenderPosition} from "../util/render";


export default class Sort {
  constructor(elementContainer) {
    this._elementContainer = elementContainer;
  }

  init(sortItems) { // создал метод инициализации
    this._sortItems = sortItems.slice(); // нужно скопировать чтобы напрямую не взамиодействовать с моками
    this._renderSort(this._sortItems);
  }

  _renderSort(sortItems) {
    this._tripEventsSortComponent = new TripEventsSortView(sortItems);
    renderElement(this._elementContainer, this._tripEventsSortComponent, RenderPosition.BEFOREEND);
  }
}
