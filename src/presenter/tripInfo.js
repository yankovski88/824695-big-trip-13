// импортируем все вьюхи для Info
import TripInfoCostView from "../view/trip-info-cost";
import TripInfoView from "../view/trip-info.js";
import {renderElement, RenderPosition} from "../util/render";


export default class TripInfo {
  constructor(tripInfoContainer) {
    this._tripInfoContainer = tripInfoContainer;
    this._destinations = [];
    this._startDateInfo = [];
    this._tripInfoComponent = new TripInfoView(this._destinations, this._startDateInfo);
  }

  init(tripItems) {
    this._renderDestination(tripItems);
    this._renderTotalCost(tripItems);
  }

  // функция которая рендерит цену
  _renderTotalCost(tripItems) {
    const tripInfoElement = this._tripInfoContainer.querySelector(`.trip-main__trip-info`);

    this._totalPriceItem = 0;

    for (let i = 0; i < tripItems.length; i++) {
      this._totalPriceItem += tripItems[i].price;

      for (let item of tripItems[i].additionalOffers) { // обошел весь массив через of
        this._totalPriceItem += item.price; // дополнительные затраты
      }
    }
    renderElement(tripInfoElement, new TripInfoCostView(this._totalPriceItem), RenderPosition.BEFOREEND);
  }

  // функция которая выводит дистанцию дат и точек маршрута
  _renderDestination(tripItems) {
    for (let i = 0; i < tripItems.length; i++) {
      this._destinations.push(tripItems[i].destinationItem);
      this._startDateInfo.push(tripItems[i].dateStart);
    }

    renderElement(this._tripInfoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN); // рендер промежкутка даты
  }
}

