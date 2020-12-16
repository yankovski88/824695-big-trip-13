// 1) импортируем все вьюхи для Info
// diferent город и растояние дней
// цена
import createTripInfoCost from "../view/trip-info-cost.js"
import TripInfoCostView from "../view/trip-info-cost";
import TripInfoView from "../view/trip-info.js";
import {renderElement, RenderPosition} from "../util/render";


export default class TripInfo {
  constructor(tripInfoContainer) { // контейнер для вставки наших вьюх / сюда нужно вставить  tripMainElement
    this._tripInfoContainer = tripInfoContainer;
    this._destinations = [];
    this._startDateInfo = [];
    this._tripInfoComponent = new TripInfoView(this._destinations, this._startDateInfo)
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
      this._totalPriceItem += tripItems[i].price; // затраты на точки маршрута

      for (let item of tripItems[i].additionalOffers) { // обошел веь массив через of
        this._totalPriceItem += item.price; // дополнительные затраты
      }
    }
    renderElement(tripInfoElement, new TripInfoCostView(this._totalPriceItem), RenderPosition.BEFOREEND); // рендер цены
  };

// функция которая выводит дистанцию дат и точек маршрута
  _renderDestination(tripItems) {


    for (let i = 0; i < tripItems.length; i++) {
      this._destinations.push(tripItems[i].destinationItem); // закинул все города которые были в точке маршрута
      this._startDateInfo.push(tripItems[i].dateStart);
    }


    renderElement(this._tripInfoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN); // рендер промежкутка даты
  };

}

